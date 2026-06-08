create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor text not null default 'admin',
  action text not null,
  entity_type text not null,
  entity_id uuid,
  title text,
  description text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.activity_logs enable row level security;

drop policy if exists "No public activity log access" on public.activity_logs;
create policy "No public activity log access"
on public.activity_logs
for all
to anon, authenticated
using (false)
with check (false);

create index if not exists activity_logs_created_at_idx on public.activity_logs (created_at desc);
create index if not exists activity_logs_entity_idx on public.activity_logs (entity_type, entity_id);
