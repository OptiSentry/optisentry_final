import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAuthContext } from '@/components/providers/auth-provider'
import { resendVerification } from '@/lib/supabase/auth'
import { signOut } from '@/lib/supabase/client'

export default function AuthVerifyEmail() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user, isEmailVerified } = useAuthContext()

  // Redirect if email is already verified
  if (isEmailVerified) {
    navigate('/app')
    return null
  }

  // Redirect if not logged in
  if (!user) {
    navigate('/auth/login')
    return null
  }

  const handleResendVerification = async () => {
    setLoading(true)
    try {
      const { error } = await resendVerification()
      if (error) {
        toast({
          title: 'Fehler beim Versenden',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Bestätigungs-E-Mail versendet',
          description: 'Überprüfen Sie Ihr Postfach für die neue E-Mail.',
        })
      }
    } catch (error) {
      toast({
        title: 'Unerwarteter Fehler',
        description: 'Bitte versuchen Sie es später erneut.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <main id="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">E-Mail bestätigen</CardTitle>
              <CardDescription>
                Wir haben eine Bestätigungs-E-Mail an {user?.email} gesendet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren.
                    Die E-Mail sollte innerhalb weniger Minuten ankommen.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Keine E-Mail erhalten?
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleResendVerification}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="mr-2 h-4 w-4" />
                    )}
                    E-Mail erneut senden
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full text-muted-foreground"
                  >
                    Mit anderem Konto anmelden
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Überprüfen Sie auch Ihren Spam-Ordner, falls die E-Mail nicht ankommt.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}