create table if not exists public.work_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  group_id uuid references public.facebook_groups(id) on delete set null,
  post_id uuid references public.posts(id) on delete set null,
  action text not null default 'posted',
  notes text,
  worked_at timestamptz not null default now()
);

create index if not exists work_logs_group_worked_at_idx on public.work_logs(group_id, worked_at desc);
create index if not exists work_logs_post_worked_at_idx on public.work_logs(post_id, worked_at desc);
create index if not exists work_logs_action_idx on public.work_logs(action);

alter table public.work_logs enable row level security;

drop policy if exists "No public access work logs" on public.work_logs;
create policy "No public access work logs"
on public.work_logs
for all
to anon, authenticated
using (false)
with check (false);
