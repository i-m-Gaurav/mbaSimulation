// Simple API helper using fetch
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    const status = res.status;
    let json: unknown = null;
    try {
      json = await res.json();
    } catch {
      // noop
    }

    if (!res.ok) {
      const msg =
        json && typeof json === "object" && "message" in json
          ? String((json as Record<string, unknown>).message)
          : res.statusText || "Request failed";
      return { status, error: msg };
    }
    return { status, data: json as T };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Network error";
    return { status: 0, error: message };
  }
}

export const Endpoints = {
  login: "/api/users/login",
  signup: "/api/users/signup",
  profile: "/api/users/getProfile",
  configGet: "/api/config/getConfig",
  simulationCreate: "/api/simulations",
  simulationUpdate: "/api/simulations/",
  simulationGet: "/api/simulations/",
  ordersCreate: "/api/orders",
} as const;
