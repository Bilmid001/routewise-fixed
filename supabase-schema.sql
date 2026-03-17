-- RouteWise Database Schema
-- Run this entire file in Supabase SQL Editor → New query → Run

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES TABLE ────────────────────────────────────────────────────────────
-- Extends Supabase's built-in auth.users table
create table if not exists public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  email           text,
  full_name       text,
  company_name    text,
  country         text default 'Nigeria',
  home_currency   text default 'NGN',
  monthly_volume  numeric default 0,
  onboarding_complete boolean default false,
  role            text default 'user',
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ─── SIMULATIONS TABLE ─────────────────────────────────────────────────────────
create table if not exists public.simulations (
  id                   uuid default uuid_generate_v4() primary key,
  user_id              uuid references public.profiles(id) on delete cascade not null,
  amount               numeric not null,
  source_currency      text not null,
  destination_currency text not null,
  best_route_name      text not null,
  best_route_score     numeric,
  savings_amount       numeric default 0,
  market_rate          numeric,
  routes_data          jsonb,
  ai_insight           text,
  created_at           timestamptz default now()
);

-- ─── EMAIL ALERTS TABLE ────────────────────────────────────────────────────────
create table if not exists public.email_alerts (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid references public.profiles(id) on delete cascade not null,
  currency_pair   text not null,
  threshold       numeric not null,
  direction       text default 'below',
  is_active       boolean default true,
  last_triggered_at timestamptz,
  created_at      timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
alter table public.profiles     enable row level security;
alter table public.simulations  enable row level security;
alter table public.email_alerts enable row level security;

-- Profiles: users can only read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Simulations: users can only read/insert their own simulations
create policy "Users can view own simulations"
  on public.simulations for select using (auth.uid() = user_id);

create policy "Users can insert own simulations"
  on public.simulations for insert with check (auth.uid() = user_id);

create policy "Users can delete own simulations"
  on public.simulations for delete using (auth.uid() = user_id);

-- Email alerts: users manage their own alerts
create policy "Users can manage own alerts"
  on public.email_alerts for all using (auth.uid() = user_id);

-- ─── AUTO-CREATE PROFILE ON SIGNUP ────────────────────────────────────────────
-- This function runs automatically every time a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── ADMIN ACCESS (optional) ───────────────────────────────────────────────────
-- Run this separately to give yourself admin role:
-- update public.profiles set role = 'admin' where email = 'your@email.com';
