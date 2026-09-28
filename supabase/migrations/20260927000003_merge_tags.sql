-- Merge a duplicate tag into another (e.g. "next-js" into "nextjs").
-- SECURITY INVOKER: runs with the caller's rights, so RLS still decides.
create or replace function public.merge_tags(p_source bigint, p_target bigint)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not private.is_editor() then
    raise exception 'only editors can merge tags' using errcode = '42501';
  end if;
  if p_source = p_target then
    raise exception 'cannot merge a tag into itself';
  end if;

  insert into public.post_tags (post_id, tag_id)
  select post_id, p_target from public.post_tags where tag_id = p_source
  on conflict do nothing;

  delete from public.tags where id = p_source;
end;
$$;

revoke execute on function public.merge_tags(bigint, bigint) from public, anon;
grant execute on function public.merge_tags(bigint, bigint) to authenticated;
