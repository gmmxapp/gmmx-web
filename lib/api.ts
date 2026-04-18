const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type ApiErrorBody = {
  error?: string;
  message?: string;
  details?: string[];
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    const details = body.details?.length ? ` ${body.details.join("; ")}` : "";
    throw new Error(body.error ?? body.message ?? `Request failed (${response.status})${details}`);
  }

  return response.json() as Promise<T>;
}

export type RegisterOwnerPayload = {
  ownerName: string;
  mobile: string;
  email: string;
  gymName: string;
  location: string;
  slug: string;
  password: string;
};

export type RegisterOwnerResponse = {
  tenantId: string;
  slug: string;
  ownerId: string;
  trialEndsAt: string;
};

export type PublicGymProfile = {
  slug: string;
  gymName: string;
  location: string;
  about: string;
  contactPhone: string;
  themePrimary: string;
};

export type CreateUserPayload = {
  tenantSlug: string;
  fullName: string;
  mobile: string;
  email: string;
};

export type CreateUserResponse = {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  role: string;
};

export async function registerOwner(payload: RegisterOwnerPayload) {
  const response = await fetch("/api/auth/owner/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
     const data = await response.json().catch(() => ({}));
     throw new Error(data.message || data.error || "Registration failed");
  }

  return response.json() as Promise<RegisterOwnerResponse>;
}

export function fetchPublicGymProfile(slug: string) {
  return apiFetch<PublicGymProfile>(`/api/public/${slug}`);
}

export function fetchDashboardSummary(tenantSlug: string) {
  return apiFetch<DashboardSummary>(`/api/dashboard/summary?tenantSlug=${tenantSlug}`);
}

export function createMember(payload: CreateUserPayload) {
  return apiFetch<CreateUserResponse>("/api/member", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function createTrainer(payload: CreateUserPayload) {
  return apiFetch<CreateUserResponse>("/api/trainer", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export type DashboardSummary = {
  tenantSlug: string;
  activeMembers: number;
  activeTrainers: number;
  todayAttendance: number;
  trialDaysLeft: number;
  memberLimit: number;
  trainerLimit: number;
};
