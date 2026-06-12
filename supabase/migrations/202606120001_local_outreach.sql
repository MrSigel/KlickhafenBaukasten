alter table public.customers
  add column if not exists last_local_email_at timestamptz,
  add column if not exists local_email_count integer not null default 0,
  add column if not exists local_outreach_status text not null default 'open';

alter table public.customers
  drop constraint if exists customers_local_outreach_status_check;

alter table public.customers
  add constraint customers_local_outreach_status_check
  check (local_outreach_status in ('open', 'contacted', 'replied', 'not_interested', 'customer', 'archived'));

create table if not exists public.local_outreach_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  email text not null,
  action text not null default 'email_address_used',
  worked_at timestamptz not null default now()
);

create index if not exists customers_local_outreach_idx
on public.customers(local_outreach_status, last_local_email_at, created_at);

create index if not exists local_outreach_logs_customer_id_idx
on public.local_outreach_logs(customer_id, worked_at desc);

alter table public.local_outreach_logs enable row level security;

drop policy if exists "No public access local_outreach_logs" on public.local_outreach_logs;

create policy "No public access local_outreach_logs"
on public.local_outreach_logs for all
to anon, authenticated
using (false)
with check (false);
