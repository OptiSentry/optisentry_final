import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function AppBilling() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and invoices.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your workspace is on the Free plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Free</div>
              <div className="text-sm text-muted-foreground">Basic features, limited usage</div>
            </div>
            <Button onClick={() => navigate('/app/upgrade')}>
              Upgrade
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Billing portal</div>
              <div className="text-sm text-muted-foreground">View past invoices and payment methods</div>
            </div>
            <Button variant="outline" onClick={() => navigate('/app/settings')}>
              Open settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
