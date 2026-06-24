import { API_URL, ApiResponse } from "./types";

const ACCESS_KEY = "bc_access_token";
const REFRESH_KEY = "bc_refresh_token";
const GUEST_CART_KEY = "bc_guest_cart_id";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function getGuestCartId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(GUEST_CART_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(GUEST_CART_KEY, id);
  }
  return id;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    clearTokens();
    return null;
  }

  const json = (await res.json()) as ApiResponse<{
    accessToken: string;
    refreshToken: string;
  }>;
  setTokens(json.data.accessToken, json.data.refreshToken);
  return json.data.accessToken;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  // Always send guest cart id (login merges guest cart; logged-in users ignore it server-side)
  if (typeof window !== "undefined") {
    headers.set("x-guest-cart-id", getGuestCartId());
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError("Request timed out — is the API running on port 3000?", 408);
    }
    throw new ApiError(
      err instanceof Error ? err.message : "Network error — is the API running?",
      0
    );
  } finally {
    clearTimeout(timeout);
  }

  if (res.status === 401 && retry && getRefreshToken()) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return apiFetch<T>(path, options, false);
    }
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (json as { message?: string | string[] })?.message?.toString() ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status, json);
  }

  if (json && typeof json === "object" && "success" in json && "data" in json) {
    return (json as ApiResponse<T>).data;
  }

  return json as T;
}

export function apiGet<T>(path: string) {
  return apiFetch<T>(path);
}

export function apiPost<T>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function apiPatch<T>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function apiDelete<T>(path: string) {
  return apiFetch<T>(path, { method: "DELETE" });
}
