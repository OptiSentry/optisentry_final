import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MarketingLayout from '@/components/marketing-layout'

export default function UseCases() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-12 text-center">Für wen ist OptiSentry geeignet?</h1>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Startups</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Junge Unternehmen können mit OptiSentry Compliance ab Tag 1 umsetzen. Ohne ein eigenes Sicherheitsteam stemmen zu müssen, erhalten Startups sofort einsatzbereite Authentifizierung und Datenschutz-Funktionen. Die schnelle Cloud-Implementierung und vorkonfigurierten Best-Practice-Workflows bedeuten: Weniger Zeitaufwand für Sicherheit & Bürokratie, mehr Fokus auf das Produkt und Wachstum.
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Großunternehmen mit komplexen Anforderungen schätzen OptiSentrys skalierbare Governance. Durch fein einstellbare RBAC-Rollenmodelle, flexible Richtlinien und anpassbare Workflows passt sich OptiSentry Ihren Geschäftsprozessen an. Tiefe Protokollierung aller Aktionen ermöglicht es, strenge interne Compliance-Vorgaben und externe Regularien mühelos einzuhalten.
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Agenturen &amp; Partner</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sie betreuen mehrere Kund*innen und Projekte? OptiSentry ist mandantenfähig, d.h. Sie können die Daten und Zugriffe Ihrer verschiedenen Kunden sauber getrennt verwalten. Nutzen Sie White-Labeling, um OptiSentry nahtlos in das Branding Ihrer eigenen Plattform einzubetten. Vorgefertigte Reports erleichtern das Reporting an Ihre Auftraggeber.
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  )
}
