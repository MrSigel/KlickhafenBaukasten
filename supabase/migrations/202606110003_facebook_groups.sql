create table if not exists public.facebook_groups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  url text not null,
  category text,
  account_owner text,
  status text not null default 'active' check (status in ('active', 'archived')),
  notes text,
  last_opened_at timestamptz,
  open_count integer not null default 0 check (open_count >= 0)
);

drop trigger if exists set_facebook_groups_updated_at on public.facebook_groups;
create trigger set_facebook_groups_updated_at
before update on public.facebook_groups
for each row execute function public.set_updated_at();

create index if not exists facebook_groups_sort_idx on public.facebook_groups(status, category, last_opened_at desc, created_at desc);
create index if not exists facebook_groups_category_idx on public.facebook_groups(category);
create index if not exists facebook_groups_account_owner_idx on public.facebook_groups(account_owner);

alter table public.facebook_groups enable row level security;

drop policy if exists "No public access facebook groups" on public.facebook_groups;
create policy "No public access facebook groups"
on public.facebook_groups
for all
to anon, authenticated
using (false)
with check (false);
