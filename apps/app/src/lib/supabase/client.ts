import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
if (!supabaseUrl || !supabaseAnonKey) throw new Error('Missing Supabase env vars')
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } })
