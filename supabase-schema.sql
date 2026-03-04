-- Enable UUID
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  company_name text,
  country text,
  home_currency text default 'USD',
  monthly_volume numeric default 0,
  onboarding_complete boolean default false,
  role text default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Simulations table
create table public.simulations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  amount numeric not null,
  source_currency text not null,
  destination_currency text not null,
  best_route_name text not null,
  best_route_score numeric,
  savings_amount numeric,
  market_rate numeric,
  routes_data jsonb,
  ai_insight text,
  created_at timestamptz default now()
);

-- Rate Watch table
create table public.rate_watches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  base_currency text not null,
  target_currency text not null,
  alert_threshold numeric,
  alert_direction text default 'below',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Email Alerts table
create table public.email_alerts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  currency_pair text not null,
  threshold numeric not null,
  direction text default 'below',
  is_active boolean default true,
  last_triggered_at timestamptz,
  created_at timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.simulations enable row level security;
alter table public.rate_watches enable row level security;
alter table public.email_alerts enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own simulations" on public.simulations for select using (auth.uid() = user_id);
create policy "Users can insert own simulations" on public.simulations for insert with check (auth.uid() = user_id);
create policy "Users can manage own rate watches" on public.rate_watches for all using (auth.uid() = user_id);
create policy "Users can manage own email alerts" on public.email_alerts for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
