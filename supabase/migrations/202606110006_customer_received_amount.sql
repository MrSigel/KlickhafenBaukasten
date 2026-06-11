alter table public.customers
add column if not exists received_amount_cents integer not null default 0 check (received_amount_cents >= 0);
