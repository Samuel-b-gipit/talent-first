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

export interface TalentProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
  experience: string;
  rate: number;
  availability: string;
  portfolio?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  openToRemote: boolean;
  openToContract: boolean;
  rating?: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string };
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  culture?: string | null;
  benefits: string[];
  techStack: string[];
  remotePolicy: string;
  isHiring: boolean;
  foundedYear?: string | null;
  website?: string | null;
  logo?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  employerId: string;
  talentId: string;
  position: string;
  companyName: string;
  projectType: string;
  budget: string;
  budgetType: string;
  location: string;
  remote: string;
  message: string;
  requirements?: string | null;
  benefits?: string | null;
  startDate?: string | null;
  duration?: string | null;
  status: string;
  responseMessage?: string | null;
  sentDate: string;
  employer?: EmployerProfile & { user: { name: string } };
  talent?: TalentProfile;
}

export interface SavedTalent {
  id: string;
  employerId: string;
  talentId: string;
  notes?: string | null;
  savedDate: string;
  talent?: TalentProfile;
}
