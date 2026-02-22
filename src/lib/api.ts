export type ApiResponse<T> = { data: T | null; error: string | null };

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: data.error || `Request failed with status ${res.status}`,
      };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: "Network error. Please try again." };
  }
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: unknown) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

// ─── Typed helpers ────────────────────────────────────────────────────────────

import type { User, TalentProfile, EmployerProfile, Proposal, SavedTalent, Message, Session } from "@/types/models";

// ─── Named endpoint wrappers ──────────────────────────────────────────────────

type AuthUserResponse = {
  user: { id: string; email: string; name: string; role: "TALENT" | "EMPLOYER"; createdAt: string; updatedAt: string };
};

export const authApi = {
  me: () => api.get<AuthUserResponse>("/api/auth/me"),
  login: (email: string, password: string) =>
    api.post<AuthUserResponse>("/api/auth/login", { email, password }),
  register: (name: string, email: string, password: string, role: string) =>
    api.post<AuthUserResponse>("/api/auth/register", { name, email, password, role }),
  logout: () => api.post<{ message: string }>("/api/auth/logout", {}),
};

export const talentsApi = {
  getAll: () => api.get<TalentProfile[]>("/api/talents"),
  getFeatured: () => api.get<TalentProfile[]>("/api/talents?limit=3"),
  getById: (id: string) => api.get<TalentProfile>(`/api/talents/${id}`),
  create: (payload: unknown) => api.post<TalentProfile>("/api/talents", payload),
};

export const companiesApi = {
  getById: (id: string) => api.get<EmployerProfile>(`/api/companies/${id}`),
  create: (payload: unknown) => api.post<EmployerProfile>("/api/companies", payload),
  update: (id: string, payload: unknown) => api.put<EmployerProfile>(`/api/companies/${id}`, payload),
};

export const proposalsApi = {
  getByTalent: (talentId: string) => api.get<Proposal[]>(`/api/proposals?talentId=${talentId}`),
  getByEmployer: (employerId: string) => api.get<Proposal[]>(`/api/proposals?employerId=${employerId}`),
  create: (payload: unknown) => api.post<Proposal>("/api/proposals", payload),
  update: (id: string, payload: unknown) => api.put<Proposal>(`/api/proposals/${id}`, payload),
};

export const savedTalentsApi = {
  getByEmployer: (employerId: string) => api.get<SavedTalent[]>(`/api/saved-talents?employerId=${employerId}`),
  remove: (id: string) => api.del(`/api/saved-talents/${id}`),
};

export const analyticsApi = {
  getEmployerStats: <T>(employerId: string) =>
    api.get<T>(`/api/analytics/employer?employerId=${employerId}`),
};
