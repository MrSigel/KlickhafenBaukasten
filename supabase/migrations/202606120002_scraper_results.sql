alter table public.customers
  add column if not exists industry text,
  add column if not exists lead_source text;

create table if not exists public.scraper_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  query text,
  business_name text,
  industry text,
  city text,
  website text,
  email text,
  phone text,
  source text,
  status text not null default 'new',
  notes text,
  imported_customer_id uuid references public.customers(id) on delete set null,
  constraint scraper_results_status_check check (status in ('new', 'imported', 'ignored', 'failed'))
);

create index if not exists scraper_results_status_created_at_idx
on public.scraper_results(status, created_at desc);

create index if not exists scraper_results_email_idx
on public.scraper_results(email);

create index if not exists scraper_results_website_idx
on public.scraper_results(website);

alter table public.scraper_results enable row level security;

drop policy if exists "No public access scraper_results" on public.scraper_results;

create policy "No public access scraper_results"
on public.scraper_results for all
to anon, authenticated
using (false)
with check (false);
