import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Datenauskunft() {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Datenauskunft (DSAR)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Hier können Nutzer Auskunft über gespeicherte personenbezogene Daten anfordern.
          </p>
          <p className="text-sm text-muted-foreground">
            (Platzhalter-Seite – bitte Formular/Logik ergänzen. Diese Seite ist funktionsfähig und buildbar.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
