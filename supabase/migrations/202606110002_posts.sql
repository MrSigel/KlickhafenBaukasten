create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text not null,
  category text,
  platform text not null default 'facebook',
  status text not null default 'active' check (status in ('active', 'archived')),
  notes text,
  last_copied_at timestamptz,
  copy_count integer not null default 0 check (copy_count >= 0)
);

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create index if not exists posts_status_created_at_idx on public.posts(status, created_at desc);
create index if not exists posts_category_idx on public.posts(category);
create index if not exists posts_platform_idx on public.posts(platform);

alter table public.posts enable row level security;

drop policy if exists "No public access posts" on public.posts;
create policy "No public access posts"
on public.posts
for all
to anon, authenticated
using (false)
with check (false);
