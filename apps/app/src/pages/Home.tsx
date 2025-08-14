import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import MarketingLayout from '@/components/marketing-layout'

export default function Home() {
  const navigate = useNavigate()
  return (
    <MarketingLayout>
      <section className="py-20 bg-gradient-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ihre sichere und <span className="bg-gradient-primary bg-clip-text text-transparent">DSGVO-konforme</span> Lösung
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Passwordless Authentication, vollständige Compliance und Enterprise-Security – alles in einer Plattform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/login')}>Kostenlos starten</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/product')}>Demo ansehen</Button>
          </div>
        </motion.div>
      </section>

      <section className="py-20" id="product-teaser">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Was macht OptiSentry?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass card-hover">
              <CardHeader>
                <CardTitle>Identity &amp; Access</CardTitle>
                <CardDescription>Passwortlose Anmeldung und RBAC</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Benutzer können sich passwortlos anmelden – per Magic Link oder Social Login. Rollen und Berechtigungen werden zentral verwaltet.
              </CardContent>
            </Card>
            <Card className="glass card-hover">
              <CardHeader>
                <CardTitle>Datenschutz-Workflows</CardTitle>
                <CardDescription>Automatisierte DSGVO-Prozesse</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Eingebaute Workflows helfen bei Auskunfts- und Löschanfragen. Jeder Schritt wird revisionssicher dokumentiert.
              </CardContent>
            </Card>
            <Card className="glass card-hover">
              <CardHeader>
                <CardTitle>Observability</CardTitle>
                <CardDescription>Audit-Logs &amp; Anomalien-Erkennung</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                OptiSentry protokolliert alle sicherheitsrelevanten Ereignisse und warnt bei ungewöhnlichen Mustern.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Bereit für mehr Sicherheit?</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/login')}>Free starten</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/product')}>Demo ansehen</Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
