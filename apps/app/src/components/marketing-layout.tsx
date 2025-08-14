import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { useAuthContext } from '@/components/providers/auth-provider'

interface Props { children: ReactNode }

export default function MarketingLayout({ children }: Props) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">OptiSentry</div>
          <nav className="flex items-center space-x-2">
            <Link to="/product" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Produkt</Link>
            <Link to="/why" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Warum OptiSentry</Link>
            <Link to="/use-cases" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Einsatz & Ergänzung</Link>
            <Link to="/pricing" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Preise</Link>
            <Link to="/contact" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Fragen & Feedback</Link>
            <Button variant="ghost" onClick={() => navigate('/impressum')} className="hidden md:inline-flex">
              Rechtliches
            </Button>
            <ThemeToggle />
            {isAuthenticated ? (
              <Button onClick={() => navigate('/app')} className="ml-1">Zur App</Button>
            ) : (
              <Button onClick={() => navigate('/auth/login')} className="ml-1">Anmelden</Button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1" id="main-content">{children}</main>
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
  )
}
