# RouteWise — Complete Installation Guide

## Prerequisites

Install these on your laptop first:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org
   - Choose "LTS" version
   - After install, verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com

---

## Step 1: Set Up the Project

Open your Terminal (Mac/Linux) or Command Prompt (Windows):

```bash
# Navigate to where you want the project
cd Desktop

# The project folder is already named routewise
# Just navigate into it:
cd routewise

# Install all dependencies
npm install
```

This will take 1–2 minutes to download packages.

---

## Step 2: Set Up Supabase (Free Database)

1. Go to **https://supabase.com** and create a free account
2. Click **"New Project"** → choose a name (e.g., "routewise") and password
3. Wait ~2 minutes for the project to be ready
4. Go to **Settings → API** on the left sidebar
5. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

6. Go to **SQL Editor** in the left sidebar
7. Click **"New Query"**
8. Open the file `supabase-schema.sql` from the project folder
9. Copy all contents and paste into the SQL Editor
10. Click **"Run"** — this creates all tables and seeds data

---

## Step 3: Set Up OpenAI (Optional — for real AI insights)

Without OpenAI, the app uses smart demo AI responses. To use real AI:

1. Go to **https://platform.openai.com** and create an account
2. Go to **API Keys** → **Create new secret key**
3. Copy the key (starts with `sk-...`)

If you skip this, the app still works with demo AI insights.

---

## Step 4: Configure Environment Variables

1. Open the file `.env.local` in the project folder with any text editor (Notepad, VS Code, etc.)
2. Replace the placeholder values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-actual-anon-key
OPENAI_API_KEY=sk-...your-openai-key-here
```

3. Save the file

**Note:** If you don't have Supabase/OpenAI keys yet, the app still runs using built-in mock data. Just leave `.env.local` as-is for demo mode.

---

## Step 5: Run the App

```bash
# In the project folder (routewise), run:
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
```

---

## Step 6: Open in Browser

Open your browser and go to:
**http://localhost:3000**

You'll see the RouteWise landing page!

---

## Using the App

### Simulate a Payment
1. Click **"Simulate Payment"** on the landing page
2. Enter an amount (e.g., `10000`)
3. Select source currency (e.g., `NGN`)
4. Select destination currency (e.g., `USD`)
5. Click **"Simulate Payment"**
6. See route comparison + AI insight

### View Dashboard
- Click **"Dashboard"** in the nav bar
- See analytics, charts, and recent simulations

### Export Results
- After simulating, click **"Export CSV"** to download results

---

## Build for Production (Optional)

```bash
# Build optimized production version
npm run build

# Start production server
npm start
```

---

## Project Folder Structure

```
routewise/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── simulate/page.tsx     ← Simulator page
│   ├── dashboard/page.tsx    ← Analytics dashboard
│   ├── api/
│   │   ├── simulate/route.ts    ← Calculation API
│   │   └── ai-insight/route.ts  ← AI API
│   └── globals.css
├── components/
│   ├── SimulationForm.tsx    ← Payment form
│   ├── ResultsTable.tsx      ← Route comparison table
│   ├── AIInsightPanel.tsx    ← AI recommendations
│   └── AnalyticsCharts.tsx   ← Recharts dashboards
├── lib/
│   ├── calculations.ts       ← Financial engine
│   ├── mockData.ts           ← Seed data & FX rates
│   └── supabase.ts           ← DB client
├── supabase-schema.sql       ← Database setup
├── .env.local                ← Your API keys (private)
├── .env.example              ← Template for keys
└── INSTALL.md                ← This file
```

---

## Troubleshooting

**"Cannot find module" error:**
```bash
npm install
```

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
# Then open http://localhost:3001
```

**Supabase connection error:**
- Double-check your `.env.local` values
- Make sure URL has no trailing slash
- Ensure anon key is the full string

**App works without Supabase/OpenAI?**
Yes! The app runs in demo mode with all mock data if no API keys are configured.

---

## Deploy to Vercel (Free Hosting)

1. Push code to GitHub
2. Go to **https://vercel.com** and import your repo
3. Add environment variables in Vercel dashboard
4. Click Deploy — your app gets a public URL!

---

## Support

- Next.js docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
