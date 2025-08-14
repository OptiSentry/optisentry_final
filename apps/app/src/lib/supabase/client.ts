import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'
declare global { interface Window { __ENV__?: Record<string, string|undefined> } }
const runtimeEnv = (typeof window !== 'undefined' && (window as any).__ENV__) || {} as Record<string, string|undefined>;
const supabaseUrl = (runtimeEnv.VITE_SUPABASE_URL as string) ?? (import.meta.env.VITE_SUPABASE_URL as string)
const supabaseAnonKey = (runtimeEnv.VITE_SUPABASE_ANON_KEY as string) ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Running in demo mode.')
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } })
  : ({
      auth: {
        async signOut() { return { error: null } },
        async signInWithOtp() { return { error: new Error('Supabase nicht konfiguriert') } },
        async getSession() { return { data: { session: null }, error: null } },
        async getUser() { return { data: { user: null }, error: null } },
        onAuthStateChange(cb?: any) {
          const subscription = { unsubscribe(){} }
          if (typeof cb === 'function') cb('INITIAL_SESSION', { session: null })
          return { data: { subscription }, error: null } as any
        },
      },
      from() { return { select: async () => ({ data: [], error: null }) } as any },
    } as any)

export async function cleanupAuthState() {
  try {
    // local-only signout to clear stored session without network dependency
    // @ts-ignore - supabase auth scope may not exist in older clients
    await supabase.auth.signOut({ scope: 'local' });
  } catch {}
  if (typeof window !== 'undefined') {
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith('sb-'))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch {}
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) throw error;
  } finally {
    await cleanupAuthState();
  }
}
