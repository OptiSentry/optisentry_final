import { motion } from 'framer-motion'
import MarketingLayout from '@/components/marketing-layout'

export default function Why() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-8">Warum OptiSentry?</h1>
            <p className="mb-4">OptiSentry ist die All-in-One Plattform für Unternehmen, die höchste Sicherheit und vollständige Compliance benötigen. Unsere Lösung vereint moderne passwortlose Authentifizierung, lückenlose Audit-Trails und automatisierte Datenschutz-Workflows – alles zentral gesteuert in einer benutzerfreundlichen Oberfläche.</p>
            <p className="mb-4">Mit OptiSentry behalten Sie Governance und Audit-Readiness jederzeit im Griff: Jeder Schritt der Nutzerverwaltung wird revisionssicher dokumentiert und ist auf Knopfdruck nachweisbar. Automatisierte Workflows reduzieren manuellen Aufwand und sorgen dafür, dass Datenschutz zur Selbstverständlichkeit wird.</p>
            <p className="mb-4">Dank der integrierten Observability erkennen Sie Anomalien sofort und können Sicherheitsvorfälle proaktiv verhindern. Gleichzeitig sparen Sie wertvolle Zeit, da wiederkehrende Aufgaben automatisiert und zentral gemanagt werden.</p>
            <p>Kurz gesagt: OptiSentry macht Sicherheit und Compliance einfach – für moderne Teams, die auf Effizienz und Transparenz setzen.</p>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  )
}
