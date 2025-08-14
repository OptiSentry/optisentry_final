import { useState } from 'react'
import { motion } from 'framer-motion'
import MarketingLayout from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import KpiLineChart from '@/components/charts/KpiLineChart'
import KpiBarChart from '@/components/charts/KpiBarChart'
import KpiDonut from '@/components/charts/KpiDonut'
import { ArrowRight, ShieldCheck, Repeat, Clock, BarChart3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const [chart, setChart] = useState<'identity'|'privacy'|'observability'|null>(null)
  return (
    <MarketingLayout>
      <motion.section id="top" className="scroll-mt-24 py-32 text-center bg-[var(--gradient-hero)]" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Ihre sichere und DSGVO-konforme Lösung</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Passwordless Authentication, vollständige Compliance und Enterprise-Security – alles in einer Plattform.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => (window.location.href='/auth/login')}>Kostenlos starten</Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('product')?.scrollIntoView({behavior:'smooth'})}>Demo ansehen</Button>
        </div>
      </motion.section>

      <section id="product" className="scroll-mt-24 py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Was macht OptiSentry?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card onClick={() => setChart('identity')} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Identity &amp; Access</CardTitle>
                <CardDescription>Passwortlos (Magic Link, Social), RBAC &amp; Policies, SSO-ready.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Sichere Anmeldung ohne Friktion. Rollen und Sitzungen zentral steuern.</CardContent>
            </Card>
            <Card onClick={() => setChart('privacy')} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Datenschutz-Workflows</CardTitle>
                <CardDescription>DSGVO Requests (Auskunft, Löschung, Berichtigung) mit Fristen &amp; Eskalation, Export.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Geführte Flows statt manueller Kleinarbeit – revisionssicher dokumentiert.</CardContent>
            </Card>
            <Card onClick={() => setChart('observability')} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Observability</CardTitle>
                <CardDescription>Audit-Logs, Anomalie-Erkennung, Alerts, Export ins DWH.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Jede Veränderung nachvollziehen – in Sekunden auffindbar.</CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-center mt-12 text-sm text-muted-foreground">
            <span>Login</span><ArrowRight className="mx-2 h-4 w-4" />
            <span>Policy Check</span><ArrowRight className="mx-2 h-4 w-4" />
            <span>Audit Log</span><ArrowRight className="mx-2 h-4 w-4" />
            <span>Action/Webhook</span>
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 py-24 bg-muted/50">
        <div className="container grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <ShieldCheck className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Governance &amp; Audits</h3>
              <p className="text-sm text-muted-foreground">Tiefe Protokollierung, klare Nachweise.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Repeat className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Automatisierung</h3>
              <p className="text-sm text-muted-foreground">Weniger manueller Aufwand, mehr Zuverlässigkeit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Zeitgewinn</h3>
              <p className="text-sm text-muted-foreground">Fokus auf Produkt statt Compliance-Bürokratie.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <BarChart3 className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Skalierbarkeit</h3>
              <p className="text-sm text-muted-foreground">Wächst mit Nutzerzahl &amp; Anforderungen.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-24 py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Einsatz &amp; Ergänzung</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Startups</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Compliance ab Tag 1; schnelle Cloud-Implementierung; Templates.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">RBAC, Policies, SSO, Mandanten, Reports für interne/externe Audits.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Agenturen &amp; Partner</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Mehrere Kund:innen verwalten, White-Label, Reporting.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Preise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>0 €</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 text-sm text-muted-foreground space-y-2">
                <p>Passwordless (1 App)</p>
                <p>Basic Logs (30 Tage)</p>
                <p>manuelle DSGVO-Flows</p>
                <p>Basis-API</p>
                <p>Community Support</p>
              </CardContent>
              <Button onClick={() => (window.location.href='/auth/login')}>Kostenlos starten</Button>
            </Card>
            <Card className="p-6 flex flex-col relative border-primary">
              <Badge className="absolute top-4 right-4" variant="secondary">Beliebt</Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>299 €/Monat</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 text-sm text-muted-foreground space-y-2">
                <p>Automatisierte DSGVO-Workflows</p>
                <p>längere Log-Retention (6–12 M)</p>
                <p>Multi-Project</p>
                <p>vollständige API/Webhooks/SDKs</p>
                <p>prior. Support</p>
              </CardContent>
              <Button onClick={() => (window.location.href='/auth/login')}>Jetzt upgraden</Button>
            </Card>
            <Card className="p-6 flex flex-col">
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <CardDescription>1.499 €/Monat</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 text-sm text-muted-foreground space-y-2">
                <p>SSO (SAML/OIDC)</p>
                <p>Mandanten</p>
                <p>White-Label</p>
                <p>Datenresidenz</p>
                <p>erweiterte Reports</p>
                <p>24/7 Premium-Support mit SLA</p>
              </CardContent>
              <Button asChild variant="outline"><a href="mailto:sales@optisentry.dev?subject=Business%20Anfrage">Kontakt aufnehmen</a></Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq-feedback" className="scroll-mt-24 py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Fragen &amp; Feedback</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Brauche ich ein Backend?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">OptiSentry funktioniert sowohl mit als auch ohne eigenes Backend.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wie funktioniert die Demo?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Die Demo zeigt einen vordefinierten Flow mit echten Komponenten.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>DSGVO-Konformität?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Alle Prozesse sind revisionssicher dokumentiert und auditierbar.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weitere Fragen?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Unser Team hilft gerne weiter.</CardContent>
            </Card>
          </div>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Feedback geben</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button variant="outline" asChild><a href="mailto:sales@optisentry.dev?subject=Feedback">E-Mail senden</a></Button>
              <Button asChild><a href="#product">Produkt ansehen</a></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog open={chart!==null} onOpenChange={() => setChart(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {chart==='identity' && 'Identity & Access'}
              {chart==='privacy' && 'Datenschutz-Workflows'}
              {chart==='observability' && 'Observability'}
            </DialogTitle>
          </DialogHeader>
          {chart==='identity' && <KpiLineChart />}
          {chart==='privacy' && <KpiBarChart />}
          {chart==='observability' && <KpiDonut />}
        </DialogContent>
      </Dialog>
    </MarketingLayout>
  )
}
