import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { useAuthContext } from '@/components/providers/auth-provider'

interface Props { children: ReactNode }

export default function MarketingLayout({ children }: Props) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="font-bold text-xl cursor-pointer">OptiSentry</a>
          <nav className="flex items-center space-x-2">
            <a href="#product" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Produkt</a>
            <a href="#why" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Warum OptiSentry</a>
            <a href="#use-cases" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Einsatz & Ergänzung</a>
            <a href="#pricing" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Preise</a>
            <a href="#faq-feedback" className="hidden md:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Fragen & Feedback</a>
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
