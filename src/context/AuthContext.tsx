"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { authApi } from "@/lib/api";
import { ApiUser } from "@/lib/api/types";
import { clearTokens, getAccessToken, setTokens } from "@/lib/api/client";

interface AuthContextType {
  user: ApiUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ApiUser>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "bc_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      const token = getAccessToken();
      setHasToken(!!token);
      if (saved && token) {
        setUser(JSON.parse(saved));
      } else if (!token) {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      }
    } catch {
      clearTokens();
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setHasToken(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    setTokens(result.accessToken, result.refreshToken);
    setUser(result.user);
    setHasToken(true);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    localStorage.removeItem("bc_role");
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      if (getAccessToken()) await authApi.logout();
    } catch {
      // ignore
    }
    clearTokens();
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setHasToken(false);
  }, []);

  const refreshUser = useCallback(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setHasToken(!!getAccessToken());
  }, []);

  const isAuthenticated = !!user && hasToken;

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, isAuthenticated, login, logout, refreshUser]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function mapApiRoleToPortal(role: ApiUser["role"]): "buyer" | "vendor" | "carrier" {
  if (role === "vendor") return "vendor";
  if (role === "delivery") return "carrier";
  return "buyer";
}

export function getHomeRouteForRole(role: ApiUser["role"]): string {
  if (role === "admin") return "/admin";
  if (role === "vendor") return "/vendor";
  if (role === "delivery") return "/delivery";
  return "/";
}

export function roleLabel(role: ApiUser["role"]): string {
  const labels: Record<ApiUser["role"], string> = {
    customer: "Customer",
    vendor: "Vendor",
    delivery: "Driver",
    admin: "Admin",
  };
  return labels[role] ?? role;
}
