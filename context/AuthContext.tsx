"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, AuthUser, RegisterPayload } from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("credskill_user");
    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as AuthUser;
      if (parsed?.id) {
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem("credskill_user");
      localStorage.removeItem("credskill_user_id");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await api.login({ email, password });
    localStorage.setItem("credskill_user", JSON.stringify(loggedInUser));
    localStorage.setItem("credskill_user_id", String(loggedInUser.id));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (payload: RegisterPayload) => {
    const registeredUser = await api.register(payload);
    localStorage.setItem("credskill_user", JSON.stringify(registeredUser));
    localStorage.setItem("credskill_user_id", String(registeredUser.id));
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    localStorage.removeItem("credskill_user");
    localStorage.removeItem("credskill_user_id");
    setUser(null);
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
