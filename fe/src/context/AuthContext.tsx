import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch, Endpoints } from "../utils/api";

export interface UserProfile {
  username: string;
  email: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = "mba_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const saveToken = useCallback((t: string | null) => {
    setToken(t);
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }
    const res = await apiFetch<UserProfile>(
      Endpoints.profile,
      { method: "GET" },
      token
    );
    if (res.data) setUser(res.data);
    else if (res.status === 401) {
      // token invalid
      saveToken(null);
      setUser(null);
    }
  }, [token, saveToken]);

  const login: AuthContextValue["login"] = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        const res = await apiFetch<{ token: string }>(Endpoints.login, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (res.data?.token) {
          saveToken(res.data.token);
          await refreshProfile();
          return { ok: true };
        }
        return { ok: false, error: res.error || "Login failed" };
      } finally {
        setLoading(false);
      }
    },
    [refreshProfile, saveToken]
  );

  const signup: AuthContextValue["signup"] = useCallback(
    async (username, email, password) => {
      setLoading(true);
      try {
        const res = await apiFetch<{ token: string }>(Endpoints.signup, {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
        });
        if (res.data?.token) {
          saveToken(res.data.token);
          await refreshProfile();
          return { ok: true };
        }
        return { ok: false, error: res.error || "Signup failed" };
      } finally {
        setLoading(false);
      }
    },
    [refreshProfile, saveToken]
  );

  const logout = useCallback(() => {
    saveToken(null);
    setUser(null);
  }, [saveToken]);

  useEffect(() => {
    // on mount or token change, refresh profile
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, login, signup, logout, refreshProfile }),
    [user, token, loading, login, signup, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
