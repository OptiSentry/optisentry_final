import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const isDemo = typeof window !== 'undefined' && (!window.__ENV__ || !window.__ENV__.VITE_SUPABASE_URL)

export default function DemoNotice() {
  if (!isDemo) return null
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto z-50">
      <Alert className="glass max-w-xl border-primary/30">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Demo-Modus aktiv: Supabase-Keys sind nicht gesetzt. App läuft ohne Auth/DB.
        </AlertDescription>
      </Alert>
    </div>
  )
}
