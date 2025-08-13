import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/components/providers/auth-provider'

const Index = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="min-h-screen relative">\n      <div className="bg-grid"></div>\n      <div className="gradient-beam gradient-beam--1"></div>\n      <div className="gradient-beam gradient-beam--2"></div>\n      <div className="gradient-beam gradient-beam--3"></div>
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
            </Button>
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
                <Button size="lg" className="magnetic" variant="outline">
                  Demo ansehen
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
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
                  <Card className="card-hover glass"Header>
                    <Shield className="h-10 w-10 text-primary mb-4" />
                    <Card className="card-hover glass"Title>Passwordless Security</CardTitle>
                    <Card className="card-hover glass"Description>
                      Magic Links, Google OAuth und optionale 2FA/MFA
                    </CardDescription>
                  </CardHeader>
                  <Card className="card-hover glass"Content>
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
                  <Card className="card-hover glass"Header>
                    <Zap className="h-10 w-10 text-primary mb-4" />
                    <Card className="card-hover glass"Title>DSGVO-konform</CardTitle>
                    <Card className="card-hover glass"Description>
                      Vollständige Compliance von Tag 1
                    </CardDescription>
                  </CardHeader>
                  <Card className="card-hover glass"Content>
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
                  <Card className="card-hover glass"Header>
                    <Users className="h-10 w-10 text-primary mb-4" />
                    <Card className="card-hover glass"Title>Enterprise-Ready</CardTitle>
                    <Card className="card-hover glass"Description>
                      Skalierbar und sicher für Unternehmen
                    </CardDescription>
                  </CardHeader>
                  <Card className="card-hover glass"Content>
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

        {/* Pricing Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Einfache Preisgestaltung</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-hover glass">
                <Card className="card-hover glass"Header>
                  <Card className="card-hover glass"Title>Pro</CardTitle>
                  <div className="text-3xl font-bold">299€<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <Card className="card-hover glass"Content>
                  <Button className="w-full">Starten</Button>
                </CardContent>
              </Card>

              <Card className="ring-2 ring-primary">
                <Card className="card-hover glass"Header>
                  <Card className="card-hover glass"Title>Business</CardTitle>
                  <div className="text-3xl font-bold">1.499€<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <Card className="card-hover glass"Content>
                  <Button className="w-full btn-gradient">Starten</Button>
                </CardContent>
              </Card>

              <Card className="card-hover glass">
                <Card className="card-hover glass"Header>
                  <Card className="card-hover glass"Title>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">Kontakt</div>
                </CardHeader>
                <Card className="card-hover glass"Content>
                  <Button variant="outline" className="w-full">Kontaktieren</Button>
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
