import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MarketingLayout from '@/components/marketing-layout'

export default function Pricing() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-12 text-center">Preise &amp; Pläne – Das passende Paket</h1>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Ideal zum Ausprobieren und für kleine Projekte. Unser Free-Paket ermöglicht Ihnen einen unkomplizierten Einstieg – völlig unverbindlich.</p>
                  <p><strong>Preis:</strong> €0</p>
                  <p><strong>Enthalten:</strong> Passwortlose Authentifizierung (Magic Link, Social Logins), grundlegende Audit-Trails mit begrenzter Aufbewahrung, Bearbeitung einzelner DSGVO-Anfragen und Community-Support.</p>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Unser Pro-Paket ist auf professionelle Anwendungen und wachsende Unternehmen zugeschnitten.</p>
                  <p><strong>Preis:</strong> €299 / Monat</p>
                  <p><strong>Alles aus Free, plus:</strong> erweiterte Nutzerverwaltung, vollautomatische DSGVO-Workflows, längere Audit-Log-Aufbewahrung, volle API- und Webhook-Integration sowie priorisierter Support.</p>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Business</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Für größere Unternehmen oder streng regulierte Branchen.</p>
                  <p><strong>Preis:</strong> €1.499 / Monat</p>
                  <p><strong>Alles aus Pro, plus:</strong> unbegrenzte Skalierbarkeit, Enterprise-Integrationen (SAML/OIDC), Mandantenfähigkeit, White-Label-Optionen, erweiterte Sicherheitsfunktionen und Premium-Support &amp; SLA.</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Enterprise – Lösungen nach Maß</h2>
              <p className="mb-4">Sie suchen nach einem noch individuelleren Setup? Für Großkonzerne oder Organisationen mit speziellen Anforderungen bieten wir maßgeschneiderte Enterprise-Lösungen an.</p>
              <Button variant="outline" asChild className="mt-4">
                <a href="mailto:sales@optisentry.dev?subject=Enterprise%20Anfrage">Kontaktieren</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  )
}
