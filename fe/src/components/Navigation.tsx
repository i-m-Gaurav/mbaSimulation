import {
  Home,
  GraduationCap,
  LogIn,
  LogOut,
  UserPlus,
  User,
} from "lucide-react";
import { NavigationState } from "../App";
import { useAuth } from "../hooks/useAuth";

interface NavigationProps {
  navigation: NavigationState;
  onNavigate: (nav: NavigationState) => void;
  onShowLogin?: () => void;
  onShowSignup?: () => void;
}

export function Navigation({
  navigation,
  onNavigate,
  onShowLogin,
  onShowSignup,
}: NavigationProps) {
  const { user, logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate({ page: "home" })}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MBA Master
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Interactive Business Learning Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => onNavigate({ page: "home" })}
                className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  navigation.page === "home"
                    ? "text-indigo-700 bg-indigo-50 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <button
                    onClick={onShowLogin}
                    className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={onShowSignup}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign up</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg text-indigo-700 text-sm font-medium flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={() =>
                      onNavigate({ page: "subject", subjectId: "operations" })
                    }
                    className={`group relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      navigation.page !== "home"
                        ? "text-indigo-700 bg-indigo-50 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
