// ============================================================
// FILE: supabase.js
// PURPOSE: Supabase client — shared instance for auth + database
// SECTION: Shared lib — imported by Contact, Login, ProtectedRoute, portals
// DATA: Set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in .env.local
// MANUAL EDITS: Do not change this file; update .env.local instead
// CLAUDE AUTOMATION: Add typed helpers here as tables are added
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[AO AI] Supabase env vars missing.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local\n' +
    'Get these from: https://supabase.com/dashboard → Settings → API'
  )
}

/**
 * Shared Supabase client.
 * Use this instance everywhere — do not call createClient() again elsewhere.
 */
export const supabase = createClient(
  supabaseUrl     || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)
