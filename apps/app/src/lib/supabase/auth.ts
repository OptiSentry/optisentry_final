import { supabase, cleanupAuthState } from './client'

export const signInWithMagicLink = async (email: string) => {
  cleanupAuthState()
  
  try {
    await supabase.auth.signOut({ scope: 'global' })
  } catch (err) {
    // Continue even if this fails
  }
  
  const redirectUrl = `${window.location.origin}/auth/callback`
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
    }
  })
  
  return { error }
}

export const signInWithGoogle = async () => {
  cleanupAuthState()
  
  try {
    await supabase.auth.signOut({ scope: 'global' })
  } catch (err) {
    // Continue even if this fails
  }
  
  const redirectUrl = `${window.location.origin}/auth/callback`
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    }
  })
  
  return { error }
}

export const signUp = async (email: string, fullName?: string) => {
  cleanupAuthState()
  
  try {
    await supabase.auth.signOut({ scope: 'global' })
  } catch (err) {
    // Continue even if this fails
  }
  
  const redirectUrl = `${window.location.origin}/auth/callback`
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password: crypto.randomUUID(), // Random password for passwordless
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: fullName || '',
      }
    }
  })
  
  return { data, error }
}

export const resendVerification = async () => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: '', // Will use the current user's email
  })
  
  return { error }
}