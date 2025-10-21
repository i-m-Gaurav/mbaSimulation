import { useMemo, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { ConceptPage } from "./components/ConceptPage";
import { SimulationPage } from "./components/SimulationPage";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { LoginModal } from "./components/auth/LoginModal";
import { SignupModal } from "./components/auth/SignupModal";

export type SimulationPage =
  | "warehouse"
  | "factory"
  | "showroom"
  | "trading"
  | "marketing"
  | "hr"
  | "finance";
export type PageType = "home" | "subject" | "concept" | "simulation";

export interface NavigationState {
  page: PageType;
  subjectId?: string;
  conceptId?: string;
  simulationId?: string;
}

function App() {
  const [navigation, _setNavigation] = useState<NavigationState>({
    page: "home",
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // gate navigation through auth
  const { user } = useAuth();

  const protectedPages: PageType[] = useMemo(
    () => ["subject", "concept", "simulation"],
    []
  );

  const setNavigation = (nav: NavigationState) => {
    if (protectedPages.includes(nav.page) && !user) {
      setShowLogin(true);
      return;
    }
    _setNavigation(nav);
  };

  const renderCurrentPage = () => {
    switch (navigation.page) {
      case "subject":
        if (!user) {
          setShowLogin(true);
          return <HomePage onNavigate={setNavigation} />;
        }
        return (
          <SubjectPage
            subjectId={navigation.subjectId!}
            onNavigate={setNavigation}
          />
        );
      case "concept":
        if (!user) {
          setShowLogin(true);
          return <HomePage onNavigate={setNavigation} />;
        }
        return (
          <ConceptPage
            conceptId={navigation.conceptId!}
            subjectId={navigation.subjectId!}
            onNavigate={setNavigation}
          />
        );
      case "simulation":
        if (!user) {
          setShowLogin(true);
          return <HomePage onNavigate={setNavigation} />;
        }
        return (
          <SimulationPage
            simulationId={navigation.simulationId!}
            onNavigate={setNavigation}
          />
        );
      default:
        return <HomePage onNavigate={setNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation
        navigation={navigation}
        onNavigate={setNavigation}
        onShowLogin={() => setShowLogin(true)}
        onShowSignup={() => setShowSignup(true)}
      />
      <main className="pt-20">{renderCurrentPage()}</main>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
