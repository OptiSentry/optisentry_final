import { motion } from 'framer-motion'
import MarketingLayout from '@/components/marketing-layout'

export default function Product() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-8">Was macht OptiSentry?</h1>
            <p className="mb-4">OptiSentry fungiert als “Command Center” für Ihre User- und Datenverwaltung. Es verbindet sichere Authentifizierung, Audit-Trails und Datenschutz-Workflows in einer schlanken Plattform. Von der ersten Anmeldung Ihrer Nutzer bis zur Datenlöschung auf Anfrage – jeder Schritt ist nachvollziehbar, automatisierbar und revisionssicher dokumentiert. Nachfolgend die Kernfunktionen von OptiSentry im Überblick:</p>
            <p className="mb-4"><strong>Identity &amp; Access:</strong> Benutzer können sich passwortlos anmelden – per Magic Link oder Social Login (z.B. Google OAuth). Verwalten Sie Rollen und Berechtigungen zentral via RBAC (Role-Based Access Control) und setzen Sie individuelle Sicherheits-Policies. OptiSentry ist SSO-fähig (Single Sign-On) und schützt Ihre Accounts effektiv vor Brute-Force-Angriffen, ohne die Nutzererfahrung zu beeinträchtigen.</p>
            <p className="mb-4"><strong>Datenschutz‑Workflows:</strong> Erfüllen Sie Datenschutzanforderungen automatisiert. Eingebaute Workflows helfen Ihnen bei der Bearbeitung von DSGVO-Anfragen – etwa Auskunftsbegehren oder Löschanfragen Ihrer Nutzer – auf Knopfdruck. OptiSentry sorgt dafür, dass jeder Löschvorgang vollständig nachvollzogen wird und fristgerecht erfolgt. Vorlagen und Automatismen reduzieren manuellen Aufwand, sodass Compliance keine Last mehr ist.</p>
            <p className="mb-8"><strong>Observability:</strong> Behalten Sie alle Aktivitäten im Blick. OptiSentry erstellt umfassende Audit-Logs für sicherheitsrelevante Ereignisse – vom Login-Versuch über Einstellungsänderungen bis hin zur Datenexport-Anfrage. Intelligente Algorithmen erkennen Anomalien (z.B. ungewöhnliche Login-Muster) und können Sie sofort alarmieren. Dank übersichtlicher Dashboards und Suchfunktionen finden Sie im Bedarfsfall jedes Ereignis in Sekunden und sind optimal auf Security Audits vorbereitet.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-4">So fließt der Datenstrom</h2>
            <p className="mb-4">Wie integriert sich OptiSentry in Ihren Ablauf? Unsere Plattform wurde so entwickelt, dass alle relevanten Datenströme sicher gebündelt werden. Ein typischer Ablauf könnte so aussehen:</p>
            <p className="mb-4"><strong>Benutzer-Login:</strong> Ein Nutzer meldet sich in Ihrer Anwendung über OptiSentry an – zum Beispiel durch Klick auf einen Magic Link in seiner E-Mail. OptiSentry überprüft die Anfrage, authentifiziert den Nutzer und erstellt sofort einen Log-Eintrag über den erfolgreichen (oder fehlgeschlagenen) Login.</p>
            <p className="mb-4"><strong>Laufende Überwachung:</strong> Während der Nutzung Ihrer Anwendung protokolliert OptiSentry fortlaufend wichtige Ereignisse. Änderungen an Profileinstellungen, Admin-Aktionen oder Zugriffsversuche werden in Echtzeit erfasst. Bei Auffälligkeiten – etwa wiederholten Fehlversuchen oder Zugriffsanomalien – schlägt das System Alarm oder erzwingt zusätzliche Sicherheitsmaßnahmen (z.B. MFA).</p>
            <p className="mb-4"><strong>Datenschutz-Vorgänge:</strong> Ihr Kunde entscheidet sich, von seinem Recht auf Vergessenwerden Gebrauch zu machen und stellt eine Löschanfrage. OptiSentry initiiert automatisch den vordefinierten Workflow: Alle personenbezogenen Daten dieses Nutzers werden in den angebundenen Systemen identifiziert und gemäß Richtlinie gelöscht. Jeder Schritt – vom Empfang der Anfrage bis zur Bestätigung der Löschung – wird vollständig dokumentiert.</p>
            <p className="mb-8"><strong>Auswertung &amp; Nachweis:</strong> Alle oben genannten Aktivitäten sind im OptiSentry-Dashboard einsehbar. Sie können Berichte exportieren, um z.B. internen oder externen Auditoren lückenlos nachzuweisen, dass Sie den Datenschutz einhalten. Gleichzeitig lassen sich die gewonnenen Erkenntnisse nutzen, um Ihre Sicherheitsmaßnahmen kontinuierlich zu optimieren.</p>
            <p className="mb-4">Kurz gesagt: OptiSentry integriert sich nahtlos in Ihre bestehende Infrastruktur. Es empfängt Input von Ihren Anwendungen (Logins, Events, Anfragen), übernimmt Sicherheits- und Compliance-Aufgaben automatisiert im Hintergrund und liefert Ihnen verwertbare Daten zurück – sicher, transparent und effizient.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-4">Integrationen – nahtlos in Ihre Systeme</h2>
            <p className="mb-4">OptiSentry lässt sich einfach in Ihren bestehenden Tech-Stack integrieren. Dank unserer klar dokumentierten REST-API und bereitgestellter SDKs (für gängige Sprachen und Frameworks) binden Sie OptiSentry im Handumdrehen in Frontend und Backend ein. Wichtige Ereignisse können über Webhooks an Ihre anderen Dienste gemeldet werden – so bleiben z.B. Ihr CRM, Ihre E-Mail-Systeme oder Monitoring-Tools stets auf dem neuesten Stand.</p>
            <p className="mb-4">Darüber hinaus bieten wir Out-of-the-box-Integrationen für häufige Anwendungsfälle: von Identity-Providern (Google, Microsoft &amp; Co. für Single Sign-On) bis hin zu Kommunikations- und Ticketing-Systemen. OptiSentry fügt sich reibungslos ein, statt Ihre Abläufe zu stören.</p>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  )
}
