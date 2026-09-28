-- Keep SECURITY DEFINER helpers out of the exposed API schema so they cannot
-- be called through /rest/v1/rpc. Policies reference functions by OID, so
-- moving them keeps every existing policy and trigger working.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

alter function public.current_user_role() set schema private;
alter function public.is_editor() set schema private;
alter function public.is_author() set schema private;
alter function public.is_post_author(uuid) set schema private;
alter function public.post_is_published(uuid) set schema private;

-- Bodies refer to each other by qualified name, so repoint them.
create or replace function private.is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.current_user_role() in ('editor', 'admin'), false)
$$;

create or replace function private.is_author()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.current_user_role() in ('author', 'editor', 'admin'), false)
$$;

create or replace function public.posts_guard_editor_columns()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not private.is_editor() and (select auth.uid()) is not null then
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

create or replace function public.set_user_role(p_user_id uuid, p_role public.user_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(private.current_user_role(), 'reader') <> 'admin' then
    raise exception 'only admins can change roles' using errcode = '42501';
  end if;
  update public.profiles set role = p_role where id = p_user_id;
end;
$$;

-- Trigger functions are never meant to be called directly.
alter function public.handle_new_user() set schema private;
alter function public.add_creator_as_author() set schema private;
revoke execute on function private.handle_new_user() from public, anon, authenticated;
revoke execute on function private.add_creator_as_author() from public, anon, authenticated;
