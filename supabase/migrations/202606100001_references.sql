create extension if not exists "pgcrypto";

create table if not exists public.references (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  url text not null,
  description text,
  screenshot_url text,
  status text not null default 'draft' check (status in ('draft', 'active', 'inactive', 'archived')),
  sort_order integer not null default 0,
  featured boolean not null default false
);

drop trigger if exists set_references_updated_at on public.references;
create trigger set_references_updated_at
before update on public.references
for each row execute function public.set_updated_at();

create index if not exists references_public_sort_idx
on public.references (status, featured desc, sort_order asc, created_at desc);

alter table public.references enable row level security;

drop policy if exists "Public can read active references" on public.references;
create policy "Public can read active references"
on public.references
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "No public write references" on public.references;
create policy "No public write references"
on public.references
for all
to anon, authenticated
using (false)
with check (false);

insert into storage.buckets (id, name, public)
values ('reference-screenshots', 'reference-screenshots', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read reference screenshots" on storage.objects;
create policy "Public can read reference screenshots"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'reference-screenshots');

drop policy if exists "No public write reference screenshots" on storage.objects;
create policy "No public write reference screenshots"
on storage.objects
for all
to anon, authenticated
using (false)
with check (false);
