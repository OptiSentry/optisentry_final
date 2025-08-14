import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

// Marketing Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Auth Pages
import AuthLogin from "./pages/auth/login";
import AuthCallback from "./pages/auth/callback";
import AuthVerifyEmail from "./pages/auth/verify-email";

// App Pages
import AppDashboard from "./pages/app/dashboard";
import AppSettings from "./pages/app/settings";
import AppOrganization from "./pages/app/organization";
import AppAudit from "./pages/app/audit";
import AppBilling from "./pages/app/billing";

// Legal Pages
import Impressum from "./pages/legal/impressum";
import Datenschutz from "./pages/legal/datenschutz";
import AGB from "./pages/legal/agb";
import DPA from "./pages/legal/dpa";
import SLA from "./pages/legal/sla";
import Subprozessoren from "./pages/legal/subprozessoren";
import Cookies from "./pages/legal/cookies";

// DSAR Page
import Datenauskunft from "./pages/datenauskunft";

// Status Page
import Status from "./pages/status";

// Components
import { AuthGuard } from "@/components/auth/auth-guard";
import { SkipToContent } from "@/components/ui/skip-to-content";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SkipToContent />
          <BrowserRouter>
            <Routes>
              {/* Marketing Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Navigate to="/#product" replace />} />
              <Route path="/why" element={<Navigate to="/#why" replace />} />
              <Route path="/use-cases" element={<Navigate to="/#use-cases" replace />} />
              <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
              <Route path="/contact" element={<Navigate to="/#faq-feedback" replace />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<AuthLogin />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/verify-email" element={<AuthVerifyEmail />} />
              
              {/* Protected App Routes */}
              <Route path="/app" element={<AuthGuard><AppDashboard /></AuthGuard>} />
              <Route path="/app/settings" element={<AuthGuard><AppSettings /></AuthGuard>} />
              <Route path="/app/organization" element={<AuthGuard><AppOrganization /></AuthGuard>} />
              <Route path="/app/audit" element={<AuthGuard><AppAudit /></AuthGuard>} />
              <Route path="/app/billing" element={<AuthGuard><AppBilling /></AuthGuard>} />
              
              {/* Legal Routes */}
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />
              <Route path="/dpa" element={<DPA />} />
              <Route path="/sla" element={<SLA />} />
              <Route path="/subprozessoren" element={<Subprozessoren />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* DSAR Route */}
              <Route path="/datenauskunft" element={<Datenauskunft />} />
              
              {/* Status Route */}
              <Route path="/status" element={<Status />} />
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  </ThemeProvider>
);

export default App;
