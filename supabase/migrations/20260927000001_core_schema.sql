-- Codelog core schema: profiles, taxonomy (categories, tags, series), posts.
-- Security model: every table has RLS enabled. The Next.js app talks to
-- Supabase only from the server (BFF), but RLS is the final authority.

create extension if not exists unaccent with schema extensions;
create extension if not exists citext with schema extensions;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('reader', 'author', 'editor', 'admin');
create type public.post_status as enum ('draft', 'review', 'published', 'archived');
create type public.post_level as enum ('beginner', 'intermediate', 'advanced');
create type public.tag_status as enum ('pending', 'approved');

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Immutable wrapper so unaccent can be used in generated columns / indexes.
create or replace function public.immutable_unaccent(text)
returns text
language sql
immutable
parallel safe
set search_path = ''
as $$
  select extensions.unaccent('extensions.unaccent'::regdictionary, $1)
$$;

-- ---------------------------------------------------------------------------
-- Profiles (one row per auth user; readers and authors share this table)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username extensions.citext not null unique
    check (username ~ '^[a-z0-9][a-z0-9_-]{2,29}$'),
  display_name text not null check (char_length(display_name) between 1 and 80),
  avatar_url text,
  bio text check (char_length(bio) <= 500),
  specialty text check (char_length(specialty) <= 80),
  website_url text,
  github_username text,
  x_username text,
  role public.user_role not null default 'reader',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Role helpers. SECURITY DEFINER so policies can read roles without
-- recursing through profiles' own RLS.
create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role from public.profiles p where p.id = (select auth.uid())
$$;

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_user_role() in ('editor', 'admin'), false)
$$;

create or replace function public.is_author()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_user_role() in ('author', 'editor', 'admin'), false)
$$;

-- Create a profile when a user signs up. Username comes from OAuth metadata
-- or the email local part, made unique with a numeric suffix.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  base text;
  candidate text;
  n int := 0;
begin
  base := lower(coalesce(
    new.raw_user_meta_data ->> 'user_name',
    new.raw_user_meta_data ->> 'preferred_username',
    split_part(coalesce(new.email, ''), '@', 1),
    'user'
  ));
  base := regexp_replace(public.immutable_unaccent(base), '[^a-z0-9_-]', '', 'g');
  if char_length(base) < 3 then
    base := base || 'user';
  end if;
  base := left(base, 24);
  candidate := base;
  while exists (select 1 from public.profiles where username = candidate) loop
    n := n + 1;
    candidate := base || n::text;
  end loop;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    candidate,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', candidate),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Taxonomy
-- ---------------------------------------------------------------------------
create table public.categories (
  id bigint generated always as identity primary key,
  parent_id bigint references public.categories (id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 60),
  description text,
  icon text,
  color text check (color ~ '^#[0-9a-fA-F]{6}$'),
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index categories_parent_id_idx on public.categories (parent_id);

-- Categories form a tree of at most two levels.
create or replace function public.enforce_category_depth()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.parent_id is not null then
    if new.parent_id = new.id then
      raise exception 'category cannot be its own parent';
    end if;
    if exists (select 1 from public.categories c where c.id = new.parent_id and c.parent_id is not null) then
      raise exception 'categories can only be nested two levels deep';
    end if;
    if exists (select 1 from public.categories c where c.parent_id = new.id) then
      raise exception 'a category with children cannot become a child';
    end if;
  end if;
  return new;
end;
$$;

create trigger categories_enforce_depth
  before insert or update of parent_id on public.categories
  for each row execute function public.enforce_category_depth();

create table public.tags (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 40),
  status public.tag_status not null default 'pending',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.series (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 120),
  description text,
  cover_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger series_set_updated_at
  before update on public.series
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 160),
  excerpt text check (char_length(excerpt) <= 300),
  content_md text not null default '',
  -- Rendered at publish time by the app; readers never trigger rendering.
  content_html text,
  toc jsonb not null default '[]'::jsonb,
  reading_minutes int not null default 1 check (reading_minutes > 0),
  cover_url text,
  status public.post_status not null default 'draft',
  level public.post_level not null default 'beginner',
  category_id bigint not null references public.categories (id) on delete restrict,
  series_id bigint references public.series (id) on delete set null,
  series_position int check (series_position > 0),
  seo_title text check (char_length(seo_title) <= 70),
  seo_description text check (char_length(seo_description) <= 160),
  review_note text,
  created_by uuid not null default auth.uid() references public.profiles (id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search tsvector,
  constraint posts_series_position_unique unique (series_id, series_position),
  constraint posts_series_position_requires_series check (series_position is null or series_id is not null)
);

create index posts_status_published_at_idx on public.posts (status, published_at desc);
create index posts_category_id_idx on public.posts (category_id);
create index posts_series_id_idx on public.posts (series_id);
create index posts_created_by_idx on public.posts (created_by);
create index posts_search_idx on public.posts using gin (search);

create or replace function public.posts_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  new.search :=
    setweight(to_tsvector('simple', public.immutable_unaccent(coalesce(new.title, ''))), 'A') ||
    setweight(to_tsvector('simple', public.immutable_unaccent(coalesce(new.excerpt, ''))), 'B') ||
    setweight(to_tsvector('simple', public.immutable_unaccent(coalesce(new.content_md, ''))), 'C');
  return new;
end;
$$;

create trigger posts_before_write
  before insert or update on public.posts
  for each row execute function public.posts_before_write();

-- Only editors may change who created a post or the editor's review note.
create or replace function public.posts_guard_editor_columns()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not public.is_editor() and (select auth.uid()) is not null then
    if new.created_by is distinct from old.created_by then
      raise exception 'only editors can change created_by' using errcode = '42501';
    end if;
    if new.review_note is distinct from old.review_note then
      raise exception 'only editors can change review_note' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

create trigger posts_guard_editor_columns
  before update on public.posts
  for each row execute function public.posts_guard_editor_columns();

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

create table public.post_authors (
  post_id uuid not null references public.posts (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete restrict,
  position smallint not null default 0,
  primary key (post_id, profile_id)
);

create index post_authors_profile_id_idx on public.post_authors (profile_id);

create table public.post_tags (
  post_id uuid not null references public.posts (id) on delete cascade,
  tag_id bigint not null references public.tags (id) on delete cascade,
  primary key (post_id, tag_id)
);

create index post_tags_tag_id_idx on public.post_tags (tag_id);

-- The creator of a post is always listed as its first author.
create or replace function public.add_creator_as_author()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.post_authors (post_id, profile_id, position)
  values (new.id, new.created_by, 0)
  on conflict do nothing;
  return new;
end;
$$;

create trigger posts_add_creator_as_author
  after insert on public.posts
  for each row execute function public.add_creator_as_author();

create or replace function public.is_post_author(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.post_authors pa
    where pa.post_id = p_post_id and pa.profile_id = (select auth.uid())
  )
$$;

create or replace function public.post_is_published(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.posts p where p.id = p_post_id and p.status = 'published')
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.series enable row level security;
alter table public.posts enable row level security;
alter table public.post_authors enable row level security;
alter table public.post_tags enable row level security;

-- profiles: public read; users edit their own profile but never their role.
create policy "profiles are public" on public.profiles
  for select to anon, authenticated using (true);
create policy "users update own profile" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));
create policy "admins update any profile" on public.profiles
  for update to authenticated
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

revoke update on public.profiles from authenticated;
grant update (username, display_name, avatar_url, bio, specialty, website_url, github_username, x_username)
  on public.profiles to authenticated;
-- Role changes go through this function so only admins can do them.
create or replace function public.set_user_role(p_user_id uuid, p_role public.user_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(public.current_user_role(), 'reader') <> 'admin' then
    raise exception 'only admins can change roles' using errcode = '42501';
  end if;
  update public.profiles set role = p_role where id = p_user_id;
end;
$$;
revoke execute on function public.set_user_role(uuid, public.user_role) from public, anon;

-- categories & series: public read, editors manage.
create policy "categories are public" on public.categories
  for select to anon, authenticated using (true);
create policy "editors manage categories" on public.categories
  for all to authenticated using (public.is_editor()) with check (public.is_editor());

create policy "series are public" on public.series
  for select to anon, authenticated using (true);
create policy "editors manage series" on public.series
  for all to authenticated using (public.is_editor()) with check (public.is_editor());

-- tags: approved tags are public; authors see and propose pending tags.
create policy "approved tags are public" on public.tags
  for select to anon, authenticated
  using (status = 'approved' or public.is_author());
create policy "authors propose tags" on public.tags
  for insert to authenticated
  with check (
    public.is_author()
    and created_by = (select auth.uid())
    and (status = 'pending' or public.is_editor())
  );
create policy "editors update tags" on public.tags
  for update to authenticated using (public.is_editor()) with check (public.is_editor());
create policy "editors delete tags" on public.tags
  for delete to authenticated using (public.is_editor());

-- posts
create policy "published posts are public" on public.posts
  for select to anon, authenticated
  using (
    status = 'published'
    or created_by = (select auth.uid())
    or public.is_post_author(id)
    or public.is_editor()
  );
-- Authors create drafts or submit for review; only editors publish.
create policy "authors create posts" on public.posts
  for insert to authenticated
  with check (
    public.is_author()
    and created_by = (select auth.uid())
    and (status in ('draft', 'review') or public.is_editor())
  );
create policy "authors update own unpublished posts" on public.posts
  for update to authenticated
  using (public.is_post_author(id) and status in ('draft', 'review'))
  with check (public.is_post_author(id) and status in ('draft', 'review'));
create policy "editors update posts" on public.posts
  for update to authenticated using (public.is_editor()) with check (public.is_editor());
create policy "authors delete own drafts" on public.posts
  for delete to authenticated
  using (public.is_post_author(id) and status = 'draft');
create policy "editors delete posts" on public.posts
  for delete to authenticated using (public.is_editor());

-- post_authors
create policy "authors of visible posts are public" on public.post_authors
  for select to anon, authenticated
  using (public.post_is_published(post_id) or public.is_post_author(post_id) or public.is_editor());
create policy "authors manage co-authors" on public.post_authors
  for insert to authenticated
  with check (public.is_post_author(post_id) or public.is_editor());
create policy "authors remove co-authors" on public.post_authors
  for delete to authenticated
  using ((public.is_post_author(post_id) and profile_id <> (select auth.uid())) or public.is_editor());

-- post_tags
create policy "tags of visible posts are public" on public.post_tags
  for select to anon, authenticated
  using (public.post_is_published(post_id) or public.is_post_author(post_id) or public.is_editor());
create policy "authors tag own posts" on public.post_tags
  for insert to authenticated
  with check (public.is_post_author(post_id) or public.is_editor());
create policy "authors untag own posts" on public.post_tags
  for delete to authenticated
  using (public.is_post_author(post_id) or public.is_editor());
