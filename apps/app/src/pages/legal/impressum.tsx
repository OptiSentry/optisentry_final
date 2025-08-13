import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Impressum() {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Impressum</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p><strong>Verantwortlich:</strong> OptiSentry</p>
          <p>Diese Seite dient als Platzhalter, bis die vollständigen Angaben ergänzt sind.</p>
        </CardContent>
      </Card>
    </div>
  );
}
