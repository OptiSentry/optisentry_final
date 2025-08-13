import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          toast({
            title: 'Anmeldefehler',
            description: 'Es gab einen Fehler bei der Anmeldung.',
            variant: 'destructive',
          })
          navigate('/auth/login')
          return
        }

        if (data.session) {
          // Check if email is verified
          if (!data.session.user.email_confirmed_at) {
            navigate('/auth/verify-email')
            return
          }
          
          // Successful login - redirect to app
          toast({
            title: 'Erfolgreich angemeldet',
            description: 'Willkommen zurück!',
          })
          navigate('/app')
        } else {
          navigate('/auth/login')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        navigate('/auth/login')
      }
    }

    handleAuthCallback()
  }, [navigate, toast])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main id="main-content" className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Anmeldung wird verarbeitet...</p>
      </main>
    </div>
  )
}