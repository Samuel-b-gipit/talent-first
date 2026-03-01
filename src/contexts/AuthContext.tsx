"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, companiesApi } from "@/lib/api";

export type UserRole = "TALENT" | "EMPLOYER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  companyName: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ error?: string; user?: AuthUser }>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<{ error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await authApi.me();
      const fetchedUser = data?.user ?? null;
      setUser(fetchedUser);
      if (fetchedUser?.role === "EMPLOYER") {
        const { data: companyData } = await companiesApi.getById(
          fetchedUser.id,
        );
        setCompanyName(companyData?.companyName ?? "");
      } else {
        setCompanyName("");
      }
    } catch {
      setUser(null);
      setCompanyName("");
    }
  }, []);

  // Fetch current user on mount
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ error?: string; user?: AuthUser }> => {
      const { data, error } = await authApi.login(email, password);
      if (error || !data) return { error: error ?? "Login failed" };
      setUser(data.user);
      if (data.user.role === "EMPLOYER") {
        const { data: companyData } = await companiesApi.getById(data.user.id);
        setCompanyName(companyData?.companyName ?? "");
      } else {
        setCompanyName("");
      }
      return { user: data.user };
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: UserRole,
    ): Promise<{ error?: string; user?: AuthUser }> => {
      const { data, error } = await authApi.register(
        name,
        email,
        password,
        role,
      );
      if (error || !data) return { error: error ?? "Registration failed" };
      setUser(data.user);
      return { user: data.user };
    },
    [],
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    setCompanyName("");
    router.push("/login");
  }, [router]);

  const contextValue = useMemo(
    () => ({
      user,
      companyName,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, companyName, isLoading, login, register, logout, refreshUser],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
