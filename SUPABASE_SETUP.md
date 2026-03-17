# RouteWise — Supabase Setup Guide

## Step 1 — Create Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose a name (e.g. "routewise"), set a password, pick closest region
4. Wait ~2 minutes for it to provision

## Step 2 — Run the SQL Schema
1. In your project, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy ALL of the SQL from `supabase-schema.sql` and paste it in
4. Click **Run** — you should see "Success"

## Step 3 — Get Your Keys
1. Go to **Settings → API** (gear icon, left sidebar)
2. Copy these 3 values into your `.env.local` file:
   - **Project URL** → NEXT_PUBLIC_SUPABASE_URL
   - **anon public** key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - **service_role** key (click eye to reveal) → SUPABASE_SERVICE_ROLE_KEY

## Step 4 — Enable Google Auth (optional)
1. Go to **Authentication → Providers**
2. Click **Google** and toggle it on
3. You need a Google OAuth Client ID and Secret from console.cloud.google.com
4. Without Google, email/password login still works fine

## Step 5 — Disable Email Confirmation (for easier testing)
1. Go to **Authentication → Settings**
2. Toggle OFF "Enable email confirmations"
3. Now users can log in immediately after signup without clicking an email link

## Step 6 — Check RLS is Working
After you run the SQL, verify in **Authentication → Policies** that you see
policies on the `simulations`, `profiles`, `email_alerts`, and `rate_watches` tables.
