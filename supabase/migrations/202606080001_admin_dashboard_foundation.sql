-- Klickhafen admin dashboard foundation
-- Run this in Supabase SQL editor or through the Supabase CLI.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'in_review', 'answered', 'converted', 'closed', 'spam')),
  salutation text,
  first_name text not null,
  last_name text not null,
  company text,
  email text not null,
  website_url text,
  requested_service text not null,
  platform text,
  message text not null,
  file_url text,
  source text not null default 'website',
  admin_notes text,
  customer_id uuid,
  converted_at timestamptz
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active', 'inactive', 'blocked')),
  customer_number text unique,
  type text not null default 'business' check (type in ('private', 'business')),
  salutation text,
  first_name text,
  last_name text,
  company text,
  email text not null,
  phone text,
  website_url text,
  street text,
  postal_code text,
  city text,
  country text not null default 'Deutschland',
  tax_number text,
  vat_id text,
  notes text
);

alter table public.inquiries
  add constraint inquiries_customer_id_fkey
  foreign key (customer_id) references public.customers(id)
  on delete set null;

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  offer_number text not null unique,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired', 'cancelled')),
  title text not null,
  description text,
  valid_until date,
  currency text not null default 'EUR',
  discount_type text not null default 'none' check (discount_type in ('none', 'percent', 'fixed')),
  discount_value numeric(12,2) not null default 0 check (discount_value >= 0),
  vat_enabled boolean not null default false,
  vat_rate numeric(5,2) not null default 19 check (vat_rate >= 0),
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  vat_cents integer not null default 0 check (vat_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  payment_model text not null default 'standard' check (payment_model in ('standard', 'fixed_30_30_40', 'project_25_rest_30_days')),
  accepted_at timestamptz,
  sent_at timestamptz,
  notes text
);

create table if not exists public.offer_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  position integer not null default 1 check (position > 0),
  type text not null default 'service' check (type in ('service', 'hourly', 'package', 'discount', 'fee')),
  title text not null,
  description text,
  quantity numeric(10,2) not null default 1 check (quantity >= 0),
  unit text not null default 'Stück',
  unit_price_cents integer not null default 0 check (unit_price_cents >= 0),
  line_total_cents integer not null default 0 check (line_total_cents >= 0)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  offer_id uuid references public.offers(id) on delete set null,
  invoice_number text not null unique,
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'partially_paid', 'overdue', 'cancelled', 'refunded')),
  title text not null default 'Rechnung',
  currency text not null default 'EUR',
  issue_date date not null default current_date,
  due_date date,
  paid_at timestamptz,
  payment_method text check (payment_method in ('paypal', 'bank_transfer', 'crypto', 'other')),
  discount_type text not null default 'none' check (discount_type in ('none', 'percent', 'fixed')),
  discount_value numeric(12,2) not null default 0 check (discount_value >= 0),
  vat_enabled boolean not null default false,
  vat_rate numeric(5,2) not null default 19 check (vat_rate >= 0),
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  vat_cents integer not null default 0 check (vat_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  amount_paid_cents integer not null default 0 check (amount_paid_cents >= 0),
  notes text
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  position integer not null default 1 check (position > 0),
  type text not null default 'service' check (type in ('service', 'hourly', 'package', 'discount', 'fee')),
  title text not null,
  description text,
  quantity numeric(10,2) not null default 1 check (quantity >= 0),
  unit text not null default 'Stück',
  unit_price_cents integer not null default 0 check (unit_price_cents >= 0),
  line_total_cents integer not null default 0 check (line_total_cents >= 0)
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  description text,
  is_secret boolean not null default false
);

create index if not exists inquiries_status_created_at_idx on public.inquiries(status, created_at desc);
create index if not exists inquiries_email_idx on public.inquiries(email);
create index if not exists customers_email_idx on public.customers(email);
create index if not exists offers_customer_id_idx on public.offers(customer_id);
create index if not exists offers_status_idx on public.offers(status);
create index if not exists offer_items_offer_id_idx on public.offer_items(offer_id);
create index if not exists invoices_customer_id_idx on public.invoices(customer_id);
create index if not exists invoices_status_idx on public.invoices(status);
create index if not exists invoice_items_invoice_id_idx on public.invoice_items(invoice_id);

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists set_offers_updated_at on public.offers;
create trigger set_offers_updated_at
before update on public.offers
for each row execute function public.set_updated_at();

drop trigger if exists set_offer_items_updated_at on public.offer_items;
create trigger set_offer_items_updated_at
before update on public.offer_items
for each row execute function public.set_updated_at();

drop trigger if exists set_invoices_updated_at on public.invoices;
create trigger set_invoices_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists set_invoice_items_updated_at on public.invoice_items;
create trigger set_invoice_items_updated_at
before update on public.invoice_items
for each row execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

alter table public.inquiries enable row level security;
alter table public.customers enable row level security;
alter table public.offers enable row level security;
alter table public.offer_items enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.settings enable row level security;

drop policy if exists "No public select inquiries" on public.inquiries;
drop policy if exists "No public insert inquiries" on public.inquiries;
drop policy if exists "No public update inquiries" on public.inquiries;
drop policy if exists "No public delete inquiries" on public.inquiries;
drop policy if exists "No public access customers" on public.customers;
drop policy if exists "No public access offers" on public.offers;
drop policy if exists "No public access offer_items" on public.offer_items;
drop policy if exists "No public access invoices" on public.invoices;
drop policy if exists "No public access invoice_items" on public.invoice_items;
drop policy if exists "No public access settings" on public.settings;

-- RLS deliberately exposes no anon/authenticated access.
-- Server-side API routes must use SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- This keeps customer, offer, invoice and settings data private.
create policy "No public select inquiries"
on public.inquiries for select
to anon, authenticated
using (false);

create policy "No public insert inquiries"
on public.inquiries for insert
to anon, authenticated
with check (false);

create policy "No public update inquiries"
on public.inquiries for update
to anon, authenticated
using (false)
with check (false);

create policy "No public delete inquiries"
on public.inquiries for delete
to anon, authenticated
using (false);

create policy "No public access customers"
on public.customers for all
to anon, authenticated
using (false)
with check (false);

create policy "No public access offers"
on public.offers for all
to anon, authenticated
using (false)
with check (false);

create policy "No public access offer_items"
on public.offer_items for all
to anon, authenticated
using (false)
with check (false);

create policy "No public access invoices"
on public.invoices for all
to anon, authenticated
using (false)
with check (false);

create policy "No public access invoice_items"
on public.invoice_items for all
to anon, authenticated
using (false)
with check (false);

create policy "No public access settings"
on public.settings for all
to anon, authenticated
using (false)
with check (false);

insert into public.settings (key, value, description, is_secret)
values
  ('business_profile', '{"name":"Klickhafen","owner":"Enrico Gross","email":"hallo@klickhafen.net","website":"klickhafen.net","small_business_vat":true}'::jsonb, 'Öffentliche Unternehmensdaten für Angebote und Rechnungen', false),
  ('pricing', '{"hourly_rate_cents":2900,"currency":"EUR","vat_enabled":false,"vat_rate":19}'::jsonb, 'Standardpreise und MwSt.-Konfiguration', false)
on conflict (key) do nothing;
