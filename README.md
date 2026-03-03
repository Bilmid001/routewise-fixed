# 🚀 RouteWise — Smart Cross-Border Payment Route Optimizer

> A production-ready cross-border payment decision intelligence platform for SMEs.

---

## 📋 TABLE OF CONTENTS

1. [What is RouteWise?](#what-is-routewise)
2. [Prerequisites — Install These First](#prerequisites)
3. [Step-by-Step Installation](#installation)
4. [Setting Up Supabase (Database)](#supabase-setup)
5. [Setting Up OpenAI (AI Insights)](#openai-setup)
6. [Running the App](#running)
7. [Project Structure](#project-structure)
8. [Troubleshooting](#troubleshooting)

---

## What is RouteWise?

RouteWise compares 4 payment rails (Bank Transfer, Wallet, Card, Direct API) for any cross-border transaction and tells you which route saves the most money and settles the fastest. It uses real financial calculations and AI explanations.

---

## Prerequisites

You need to install these programs on your laptop **before** anything else.

### 1. Install Node.js (v18 or newer)

- Go to: https://nodejs.org
- Download the **LTS (Long Term Support)** version
- Run the installer, click Next through all steps
- To verify: open Terminal (Mac/Linux) or Command Prompt (Windows) and type:
  ```
  node --version
  ```
  You should see something like: `v20.11.0`

### 2. Install Git (optional but recommended)

- Go to: https://git-scm.com/downloads
- Download for your OS and install

### 3. A Code Editor (recommended)

- Download VS Code: https://code.visualstudio.com

---

## Installation

### Step 1 — Get the Project Files

**Option A: If you have the ZIP file:**
1. Extract the ZIP to a folder on your computer (e.g., `C:\Projects\routewise` or `~/Projects/routewise`)

**Option B: If using Git:**
```bash
git clone <your-repo-url>
cd routewise
```

### Step 2 — Open Terminal in the Project Folder

**Windows:**
- Open File Explorer, navigate to the `routewise` folder
- Click the address bar, type `cmd`, press Enter
- OR: Right-click in the folder → "Open in Terminal"

**Mac:**
- Open Terminal app
- Type: `cd ` (with a space) then drag the folder into Terminal, press Enter

**VS Code (easiest):**
- Open VS Code
- File → Open Folder → Select the `routewise` folder
- Press `` Ctrl+` `` (backtick) to open the built-in terminal

### Step 3 — Install Dependencies

In the terminal (inside the routewise folder), run:

```bash
npm install
```

This downloads all required packages. It may take 1-3 minutes.
You'll see a `node_modules` folder appear.

---

## Supabase Setup

Supabase is a free cloud database. The app works without it (uses mock data), but for full functionality:

### Step 1 — Create Free Account

1. Go to: https://supabase.com
2. Click "Start your project" → Sign up with GitHub or email
3. Create a new project:
   - Give it a name: `routewise`
   - Set a strong database password (save this!)
   - Choose a region close to you
   - Wait ~2 minutes for it to set up

### Step 2 — Run the Database Schema

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Open the file `supabase-schema.sql` from the routewise folder
4. Copy ALL the contents and paste into the SQL Editor
5. Click **"Run"** (green button)
6. You should see: `RouteWise schema setup complete ✓`

### Step 3 — Get Your API Keys

1. In Supabase, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
3. Also copy the **service_role** key (under "Project API keys" section)

### Step 4 — Add Keys to .env.local

Open the `.env.local` file in your project folder and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...
```

---

## OpenAI Setup

The AI explanation feature requires an OpenAI API key. **Without it, the app uses a smart rule-based explanation — it still works great!**

### To enable OpenAI:

1. Go to: https://platform.openai.com
2. Sign up / Log in
3. Go to **API Keys** → Create new key
4. Copy the key (starts with `sk-...`)
5. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-...your-key-here...
```

**Note:** OpenAI requires a paid account with credits. Start with $5 credit for testing.

---

## Running the App

### Development Mode (for testing)

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

You should see the RouteWise landing page! 🎉

### Production Build (for deployment)

```bash
npm run build
npm start
```

---

## How to Use the App

### 1. Landing Page (http://localhost:3000)
- Overview of RouteWise
- Click "Simulate Payment" to get started

### 2. Payment Simulator (http://localhost:3000/simulate)
1. Enter the **amount** (e.g., 10000)
2. Select **source currency** (e.g., USD)
3. Select **destination currency** (e.g., NGN)
4. Click **"Find Best Route"**
5. View ranked results with fees, FX rates, and settlement times
6. See AI explanation of the best route
7. Export results as CSV

### 3. Dashboard (http://localhost:3000/dashboard)
- View analytics, charts, and route performance data

---

## Project Structure

```
routewise/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── layout.tsx            ← Root layout (fonts, metadata)
│   ├── globals.css           ← Global styles
│   ├── simulate/
│   │   └── page.tsx          ← Payment simulator page
│   ├── dashboard/
│   │   └── page.tsx          ← Analytics dashboard
│   └── api/
│       ├── simulate/
│       │   └── route.ts      ← Calculation engine API
│       └── ai-insight/
│           └── route.ts      ← AI recommendation API
├── components/
│   ├── Navbar.tsx            ← Navigation bar
│   ├── SimulationForm.tsx    ← Transaction input form
│   ├── ResultsTable.tsx      ← Route comparison results
│   ├── AIInsightPanel.tsx    ← AI explanation panel
│   └── AnalyticsCharts.tsx   ← Recharts dashboard charts
├── lib/
│   ├── supabase.ts           ← Database client
│   ├── calculations.ts       ← Financial calculation engine
│   ├── scoring.ts            ← Route scoring algorithm
│   └── mockData.ts           ← Fallback data (no DB needed)
├── supabase-schema.sql       ← Database setup script
├── .env.local                ← Your secret keys (never commit this!)
├── .env.example              ← Template for env variables
├── package.json              ← Project dependencies
├── tailwind.config.ts        ← Styling configuration
└── tsconfig.json             ← TypeScript configuration
```

---

## Troubleshooting

### "command not found: npm"
→ Node.js is not installed. Go back to Prerequisites and install Node.js.

### "Cannot find module" errors
→ Run `npm install` again from the project folder.

### App shows blank page / errors
→ Check the terminal for error messages.
→ Make sure `.env.local` exists (copy from `.env.example` and fill in values).

### "Port 3000 already in use"
→ Another app is using port 3000. Run: `npm run dev -- --port 3001`
→ Then open http://localhost:3001

### Supabase connection errors
→ The app will automatically fall back to mock data.
→ Check your SUPABASE_URL and ANON_KEY in `.env.local`.
→ Make sure you ran the SQL schema in the Supabase SQL Editor.

### AI insight not loading
→ Without an OpenAI key, the app uses rule-based insights — this is normal.
→ Check your OPENAI_API_KEY in `.env.local`.

### "NEXT_PUBLIC_ variables not working"
→ Always restart `npm run dev` after editing `.env.local`.

---

## Deployment to Vercel (Optional)

1. Push your code to GitHub (remove `.env.local` first — use `.gitignore`)
2. Go to: https://vercel.com → Connect your GitHub repo
3. Add your environment variables in Vercel's dashboard
4. Click Deploy — it's live in minutes!

---

## Key Financial Formulas Used

```
FX_Adjusted_Rate = Market_Rate × (1 + spread_percent)
Converted_Amount = Amount × FX_Adjusted_Rate
Total_Fee = flat_fee + (Amount × percentage_fee)
Final_Received = Converted_Amount − Total_Fee

Cost_Score = Best_Final_Received / Route_Final_Received
Speed_Score = Fastest_Time / Route_Time
Final_Score = (0.5 × Cost_Score) + (0.3 × Speed_Score) + (0.2 × Reliability_Score)
```

---

## ⚠️ Important Disclaimer

All transactions in RouteWise are **simulations only**. No real money is moved. FX rates are realistic mocks for demonstration purposes.

---

Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and OpenAI.
