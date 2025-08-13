import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/components/providers/auth-provider'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export function AuthGuard({ 
  children, 
  requireEmailVerification = true 
}: AuthGuardProps) {
  const { user, loading, isAuthenticated, isEmailVerified } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/auth/login')
        return
      }
      
      if (requireEmailVerification && !isEmailVerified) {
        navigate('/auth/verify-email')
        return
      }
    }
  }, [loading, isAuthenticated, isEmailVerified, navigate, requireEmailVerification])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || (requireEmailVerification && !isEmailVerified)) {
    return null
  }

  return <>{children}</>
}