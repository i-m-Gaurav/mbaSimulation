import { useMemo, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { ConceptPage } from "./components/ConceptPage";
import { SimulationPage } from "./components/SimulationPage";
import { ResultsPage } from "./components/simulations/ResultsPage";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { LoginModal } from "./components/auth/LoginModal";
import { SignupModal } from "./components/auth/SignupModal";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  // navigation state is derived from URL; no separate state needed
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
    // convert nav object to a path and navigate
    switch (nav.page) {
      case "home":
        navigate("/");
        break;
      case "subject":
        navigate(`/subject/${nav.subjectId}`);
        break;
      case "concept":
        navigate(`/concept/${nav.subjectId}/${nav.conceptId}`);
        break;
      case "simulation":
        navigate(`/simulation/${nav.simulationId}`);
        break;
    }
  };

  // derive a minimal NavigationState for active nav highlighting from URL
  const path = location.pathname;
  let derivedNav: NavigationState = { page: "home" };
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "subject" && parts[1]) {
    derivedNav = { page: "subject", subjectId: parts[1] };
  } else if (parts[0] === "concept" && parts[1] && parts[2]) {
    derivedNav = { page: "concept", subjectId: parts[1], conceptId: parts[2] };
  } else if (parts[0] === "simulation" && parts[1]) {
    derivedNav = { page: "simulation", simulationId: parts[1] };
  }
  const currentNav = derivedNav;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation
        navigation={currentNav}
        onNavigate={setNavigation}
        onShowLogin={() => setShowLogin(true)}
        onShowSignup={() => setShowSignup(true)}
      />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={setNavigation} />} />
          <Route
            path="/subject/:subjectId"
            element={<SubjectRoute onNavigate={setNavigation} />}
          />
          <Route
            path="/concept/:subjectId/:conceptId"
            element={<ConceptRoute onNavigate={setNavigation} />}
          />
          <Route
            path="/simulation/:simulationId"
            element={<SimulationRoute onNavigate={setNavigation} />}
          />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
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

// Small route wrappers to extract params and render pages
function SubjectRoute({
  onNavigate,
}: {
  onNavigate: (nav: NavigationState) => void;
}) {
  const { subjectId = "" } = useParams();
  return <SubjectPage subjectId={subjectId} onNavigate={onNavigate} />;
}

function ConceptRoute({
  onNavigate,
}: {
  onNavigate: (nav: NavigationState) => void;
}) {
  const { subjectId = "", conceptId = "" } = useParams();
  return (
    <ConceptPage
      subjectId={subjectId}
      conceptId={conceptId}
      onNavigate={onNavigate}
    />
  );
}

function SimulationRoute({
  onNavigate,
}: {
  onNavigate: (nav: NavigationState) => void;
}) {
  const { simulationId = "" } = useParams();
  return <SimulationPage simulationId={simulationId} onNavigate={onNavigate} />;
}

function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
