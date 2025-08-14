import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'
declare global { interface Window { __ENV__?: Record<string, string|undefined> } }
const runtimeEnv = (typeof window !== 'undefined' && (window as any).__ENV__) || {} as Record<string, string|undefined>;
const supabaseUrl = (runtimeEnv.VITE_SUPABASE_URL as string) ?? (import.meta.env.VITE_SUPABASE_URL as string)
const supabaseAnonKey = (runtimeEnv.VITE_SUPABASE_ANON_KEY as string) ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string)

/**
 * Create a Supabase client if credentials are provided. If the credentials are missing
 * (for example when running locally without secrets or when deploying a static demo),
 * fall back to a no‑op client that implements only the methods used in this application.
 */
let supabase: any;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
} else {
  // Fallback demo client: returns empty results and provides no‑op methods
  console.warn('Supabase credentials missing. Running in demo mode.');
  supabase = {
    auth: {
      signOut: async (_opts?: any) => ({ error: null }),
    },
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      delete: async () => ({ data: [], error: null }),
    }),
  } as any;
}

export { supabase };

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
