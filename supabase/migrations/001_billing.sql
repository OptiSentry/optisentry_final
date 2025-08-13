-- Simplified but complete billing DDL
create table if not exists public.plans(code text primary key, name text not null, price_cents int not null, interval text not null check (interval in ('month','year')), features jsonb not null default '{}'::jsonb, active boolean not null default true);
insert into public.plans(code,name,price_cents,interval,features,active) values
('free','Free',0,'month','{}',true),
('pro','Pro',29900,'month','{}',true),
('business','Business',149900,'month','{}',true) on conflict (code) do nothing;
create table if not exists public.subscriptions(id uuid primary key default gen_random_uuid(), org_id uuid not null references public.organizations(id) on delete cascade, plan_code text not null references public.plans(code), provider text not null, provider_customer_id text not null, provider_subscription_id text not null, status text not null, trial_ends_at timestamptz, current_period_end timestamptz, canceled_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.entitlements(org_id uuid primary key references public.organizations(id) on delete cascade, plan_code text not null references public.plans(code), features jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
create table if not exists public.usage_counters(org_id uuid not null references public.organizations(id) on delete cascade, metric text not null, period_start date not null, value bigint not null default 0, primary key(org_id, metric, period_start));
create table if not exists public.billing_events(id bigserial primary key, provider text not null, event_id text not null, event_type text not null, payload jsonb not null, created_at timestamptz not null default now(), unique(provider,event_id));
alter table public.subscriptions enable row level security; alter table public.entitlements enable row level security; alter table public.usage_counters enable row level security; alter table public.billing_events enable row level security;
create policy subs_read on public.subscriptions for select using (exists (select 1 from public.organization_members m where m.org_id=org_id and m.user_id=auth.uid()));
create policy ent_read on public.entitlements for select using (exists (select 1 from public.organization_members m where m.org_id=org_id and m.user_id=auth.uid()));
create policy usage_read on public.usage_counters for select using (exists (select 1 from public.organization_members m where m.org_id=org_id and m.user_id=auth.uid()));
create policy subs_write_service on public.subscriptions for all to service_role using (true) with check (true);
create policy ent_write_service on public.entitlements for all to service_role using (true) with check (true);
create policy usage_write_service on public.usage_counters for all to service_role using (true) with check (true);
create policy events_write_service on public.billing_events for all to service_role using (true) with check (true);
create or replace function public.set_entitlements_for_org(p_org uuid, p_plan text) returns void language plpgsql security definer as $$
begin
  insert into public.entitlements(org_id, plan_code, features, updated_at) values (p_org, p_plan, coalesce((select features from public.plans where code=p_plan),'{}'::jsonb), now())
  on conflict(org_id) do update set plan_code=excluded.plan_code, features=excluded.features, updated_at=now();
end; $$;
