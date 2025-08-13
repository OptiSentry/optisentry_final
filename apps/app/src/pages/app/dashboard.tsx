import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthContext } from '@/components/providers/auth-provider'

export default function AppDashboard() {
  const { user } = useAuthContext()

  return (
    <div className="container py-8">
      <main id="main-content">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Willkommen, {user?.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ihr Dashboard wird hier angezeigt.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}