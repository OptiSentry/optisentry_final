import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import MarketingLayout from '@/components/marketing-layout'

export default function Contact() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-8">Kontakt – Wir sind für Sie da</h1>
            <p className="mb-4">Haben Sie Fragen oder wünschen Sie eine persönliche Beratung? Möchten Sie eine Live-Demo vereinbaren oder mehr über unsere Enterprise-Angebote erfahren? Kontaktieren Sie uns – wir helfen Ihnen gerne weiter.</p>
            <p className="mb-4">Unser Team steht Ihnen mit Rat und Tat zur Seite, um Ihre Anforderungen zu verstehen und gemeinsam die optimale Lösung zu finden. Zögern Sie nicht, uns zu folgenden Themen anzusprechen:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
              <li>Allgemeine Anfragen und Plan-Auswahl</li>
              <li>Produkt-Demos</li>
              <li>Individuelle Angebote und Enterprise-Setups</li>
              <li>Technischer Support &amp; Feedback</li>
            </ul>
            <p className="mb-4">So erreichen Sie uns: Schreiben Sie eine E-Mail an <a className="underline" href="mailto:contact@optisentry.com">contact@optisentry.com</a>. Auf Wunsch rufen wir Sie auch gerne zurück – hinterlassen Sie uns dazu einfach Ihre Telefonnummer und einen passenden Zeitpunkt.</p>
            <p className="mb-8">Wir bemühen uns, jede Anfrage innerhalb eines Werktages zu beantworten. Selbstverständlich behandeln wir Ihre Angaben vertraulich.</p>
            <Button asChild size="lg">
              <a href="mailto:contact@optisentry.com">E-Mail senden</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  )
}
