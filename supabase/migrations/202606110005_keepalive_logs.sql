create table if not exists public.keepalive_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'vercel-cron'
);

create index if not exists keepalive_logs_created_at_idx on public.keepalive_logs(created_at desc);

alter table public.keepalive_logs enable row level security;

drop policy if exists "No public access keepalive logs" on public.keepalive_logs;
create policy "No public access keepalive logs"
on public.keepalive_logs
for all
to anon, authenticated
using (false)
with check (false);
