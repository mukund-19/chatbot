# BharatShop AI Deployment Guide

## 1. Local Development
```bash
# Install dependencies
npm install

# Seed local catalogue and database
npm run seed

# Run automated test suite
npm run test

# Start development server
npm run dev
# Server accessible at http://localhost:3000
```

## 2. Production Build & Execution
```bash
# Compile client bundle
npm run build

# Start production server
npm run start
```

## 3. Environment Variables
Configure the following in `.env`:
```env
# Server
PORT=3000
NODE_ENV=production

# LLM Provider Configuration
LLM_PROVIDER=gemini # 'gemini' | 'groq' | 'local_fallback'
LLM_MODEL=gemini-3.8-flash

# API Keys (Server-side only; never expose to frontend)
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Supabase (Optional - seamless migration)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 4. Cloud Deployment (Cloud Run, Vercel, Render)
The application is pre-configured with a unified Express server (`server.ts`) that serves the compiled Vite assets (`dist/`) in production while exposing all `/api` endpoints on port 3000.
