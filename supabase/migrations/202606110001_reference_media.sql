alter table public.references
  add column if not exists media_url text,
  add column if not exists media_type text check (media_type in ('image', 'video'));

insert into storage.buckets (id, name, public)
values ('reference-media', 'reference-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read reference media" on storage.objects;
create policy "Public can read reference media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'reference-media');

drop policy if exists "No public write reference media" on storage.objects;
create policy "No public write reference media"
on storage.objects
for all
to anon, authenticated
using (false)
with check (false);
