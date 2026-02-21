"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export type UserRole = "TALENT" | "EMPLOYER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await authApi.me();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  // Fetch current user on mount
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      const { data, error } = await authApi.login(email, password);
      if (error || !data) return { error: error ?? "Login failed" };
      setUser(data.user);
      return {};
    },
    []
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: UserRole
    ): Promise<{ error?: string }> => {
      const { data, error } = await authApi.register(name, email, password, role);
      if (error || !data) return { error: error ?? "Registration failed" };
      setUser(data.user);
      return {};
    },
    []
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
