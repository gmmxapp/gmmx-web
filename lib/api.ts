const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.gmmx.app";

type ApiErrorBody = {
  error?: string;
  message?: string;
  details?: string[];
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 12000); // 12 seconds timeout

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      },
      cache: "no-store"
    });

    clearTimeout(id);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      let body = {} as ApiErrorBody;
      try { body = JSON.parse(text); } catch { body.message = text; }
      console.error(`[API ERROR] ${path}:`, response.status, body);
      
      const details = body.details?.length ? ` ${body.details.join("; ")}` : "";
      throw new Error(body.error ?? body.message ?? `Request failed (${response.status})${details}`);
    }

    return response.json() as Promise<T>;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      console.error(`[API TIMEOUT] ${path} took longer than 12 seconds.`);
      throw new Error(`Connection timed out fetching from backend. Check if api.gmmx.app is accessible.`);
    }
    console.error(`[API FETCH FAILED] ${path}:`, error);
    throw error;
  }
}

export type RegisterOwnerPayload = {
  ownerName: string;
  mobile: string;
  email: string;
  gymName: string;
  location: string;
  slug: string;
  pin: string;
  hasMicrosite: boolean;
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
  hasMicrosite: boolean;
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
  const backendPayload = {
    gymName: payload.gymName,
    subdomain: payload.slug,
    ownerName: payload.ownerName,
    email: payload.email,
    phone: payload.mobile,
    pin: payload.pin
  };

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendPayload)
  });

  if (!response.ok) {
     const data = await response.json().catch(() => ({}));
     throw new Error(data.message || data.error || "Registration failed");
  }

  return response.json() as Promise<RegisterOwnerResponse>;
}

export function fetchPublicGymProfile(slug: string) {
  return apiFetch<any>(`/tenants/lookup/${slug}`);
}

export function fetchDashboardSummary(tenantSlug: string) {
  return apiFetch<any>(`/dashboard/summary?tenantSlug=${tenantSlug}`);
}

export function createMember(payload: CreateUserPayload) {
  return apiFetch<CreateUserResponse>("/member", {
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
