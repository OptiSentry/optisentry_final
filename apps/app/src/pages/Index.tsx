import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/components/providers/auth-provider'

const Index = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="min-h-screen">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">OptiSentry</div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/impressum')}>
              Rechtliches
            </a></Button>
            {isAuthenticated ? (
              <Button onClick={() => navigate('/app')}>
                Zur App
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth/login')}>
                Anmelden
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ihre sichere und{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  DSGVO-konforme
                </span>{' '}
                Lösung
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Passwordless Authentication, vollständige Compliance und 
                enterprise-ready Security - alles in einer Plattform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-gradient"
                  onClick={() => navigate('/auth/login')}
                >
                  Kostenlos starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild><a href="#product">
                  Demo ansehen
                </Button>
              </div>
            </motion.div>
          </div>
        
</section>

{/* Produkt Section */}
<section id="product" className="py-20 relative">
  <div className="bg-grid"></div>
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Was macht OptiSentry?</h2>
      <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
        OptiSentry verbindet sichere Authentifizierung, Audit‑Trails und Datenschutz‑Workflows
        zu einem schlanken „Command Center“. Von Login bis Löschanfrage – alles nachvollziehbar, automatisierbar, revisionssicher.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Identity & Access</CardTitle>
          <CardDescription>Passwortlos, Magic Link & RBAC</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Sichere Anmeldung ohne Friktion. Rollen, Policies und Sitzungen zentral steuern. SSO‑bereit.
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Datenschutz‑Workflows</CardTitle>
          <CardDescription>DSGVO Requests & Automatisierung</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Auskunft, Löschung, Berichtigung – als geführter Flow mit Fristen, Eskalation und Export.
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Observability</CardTitle>
          <CardDescription>Audit‑Logs & Anomalien</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Jede Veränderung nachvollziehen. Alarme bei riskanten Mustern. Export ins Data‑Warehouse.
        </CardContent>
      </Card>
    </div>

    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>So fließt der Datenstrom</CardTitle>
          <CardDescription>Visualisierte Pipeline</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="rounded-xl border p-6">
            <div className="grid grid-cols-4 items-center gap-2 text-center text-xs md:text-sm">
              <div className="p-3 rounded-lg bg-muted/30">User<br/>→ Login</div>
              <div className="p-3 rounded-lg bg-muted/30">Policy<br/>Check</div>
              <div className="p-3 rounded-lg bg-muted/30">Audit<br/>Log</div>
              <div className="p-3 rounded-lg bg-muted/30">Action<br/>Webhook</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Integrationen</CardTitle>
          <CardDescription>Out‑of‑the‑box Hooks</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Binde Ticketsysteme, Mail‑Provider und BI mit wenigen Klicks an. Webhooks & SDKs inklusive.
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{
/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Warum OptiSentry?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Modernste Technologie trifft auf deutsche Gründlichkeit
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Passwordless Security</CardTitle>
                    <CardDescription>
                      Magic Links, Google OAuth und optionale 2FA/MFA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Höchste Sicherheit ohne Passwort-Stress. 
                      Moderne Authentifizierung für bessere User Experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <Zap className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>DSGVO-konform</CardTitle>
                    <CardDescription>
                      Vollständige Compliance von Tag 1
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cookie-Management, Betroffenenrechte, 
                      Audit-Logs und AVV - alles automatisch erfüllt.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <Users className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Enterprise-Ready</CardTitle>
                    <CardDescription>
                      Skalierbar und sicher für Unternehmen
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Multi-Tenant-Architektur, Rollen-Management 
                      und umfassende Security-Header.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        
</section>

{/* Produkt Section */}
<section id="product" className="py-20 relative">
  <div className="bg-grid"></div>
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Was macht OptiSentry?</h2>
      <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
        OptiSentry verbindet sichere Authentifizierung, Audit‑Trails und Datenschutz‑Workflows
        zu einem schlanken „Command Center“. Von Login bis Löschanfrage – alles nachvollziehbar, automatisierbar, revisionssicher.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Identity & Access</CardTitle>
          <CardDescription>Passwortlos, Magic Link & RBAC</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Sichere Anmeldung ohne Friktion. Rollen, Policies und Sitzungen zentral steuern. SSO‑bereit.
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Datenschutz‑Workflows</CardTitle>
          <CardDescription>DSGVO Requests & Automatisierung</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Auskunft, Löschung, Berichtigung – als geführter Flow mit Fristen, Eskalation und Export.
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Observability</CardTitle>
          <CardDescription>Audit‑Logs & Anomalien</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Jede Veränderung nachvollziehen. Alarme bei riskanten Mustern. Export ins Data‑Warehouse.
        </CardContent>
      </Card>
    </div>

    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>So fließt der Datenstrom</CardTitle>
          <CardDescription>Visualisierte Pipeline</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="rounded-xl border p-6">
            <div className="grid grid-cols-4 items-center gap-2 text-center text-xs md:text-sm">
              <div className="p-3 rounded-lg bg-muted/30">User<br/>→ Login</div>
              <div className="p-3 rounded-lg bg-muted/30">Policy<br/>Check</div>
              <div className="p-3 rounded-lg bg-muted/30">Audit<br/>Log</div>
              <div className="p-3 rounded-lg bg-muted/30">Action<br/>Webhook</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover glass">
        <CardHeader>
          <CardTitle>Integrationen</CardTitle>
          <CardDescription>Out‑of‑the‑box Hooks</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Binde Ticketsysteme, Mail‑Provider und BI mit wenigen Klicks an. Webhooks & SDKs inklusive.
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{
/* Pricing Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Einfache Preisgestaltung</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">299€<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Starten</Button>
                </CardContent>
              </Card>

              <Card className="ring-2 ring-primary">
                <CardHeader>
                  <CardTitle>Business</CardTitle>
                  <div className="text-3xl font-bold">1.499€<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-gradient">Starten</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">Kontakt</div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full"><a href="mailto:sales@optisentry.dev?subject=Enterprise%20Anfrage">Kontaktieren</a></Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      
  {/* FAQ & Feedback */}
  <section id="faq-feedback" className="py-20">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Fragen & Feedback</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Noch etwas unklar? Schau in die häufigen Fragen – oder schick uns direkt Feedback.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="space-y-4">
            <div className="rounded-xl border p-4 glass">
              <div className="font-medium">Brauche ich ein Backend?</div>
              <div className="text-sm text-muted-foreground">Nicht zwingend. OptiSentry kann als Frontend‑Module mit Webhooks/SDKs andocken.</div>
            </div>
            <div className="rounded-xl border p-4 glass">
              <div className="font-medium">Wie funktioniert die Demo?</div>
              <div className="text-sm text-muted-foreground">Ohne Secrets läuft die Seite im Demo‑Modus – UI vollständig sichtbar, keine echte Auth/DB.</div>
            </div>
            <div className="rounded-xl border p-4 glass">
              <div className="font-medium">Ist alles DSGVO‑konform?</div>
              <div className="text-sm text-muted-foreground">Ja – mit Audit‑Trail, Lösch‑/Auskunfts‑Workflows und Datenminimierung als Prinzip.</div>
            </div>
          </div>
        </div>
        <Card className="card-hover glass">
          <CardHeader>
            <CardTitle>Feedback geben</CardTitle>
            <CardDescription>Wir freuen uns über jede Rückmeldung</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <a href="mailto:support@optisentry.dev?subject=Feedback">E‑Mail senden</a>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <a href="#product">Produkt ansehen</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

</main>

{/* Footer */}

      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="font-bold">OptiSentry</div>
          <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Button variant="link" onClick={() => navigate('/impressum')}>Impressum</Button>
            <Button variant="link" onClick={() => navigate('/datenschutz')}>Datenschutz</Button>
            <Button variant="link" onClick={() => navigate('/agb')}>AGB</Button>
            <Button variant="link" onClick={() => navigate('/cookies')}>Cookie-Einstellungen</Button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
