import { pickProductImage, pickVendorBanner, pickVendorLogo } from "../productImages";
import { apiDelete, apiGet, apiPatch, apiPost } from "./client";
import {
  ApiCart,
  ApiCategory,
  ApiDelivery,
  ApiNotification,
  ApiOrder,
  ApiProduct,
  ApiVendor,
  AuthTokens,
  PaginatedResult,
} from "./types";

export const authApi = {
  login: (email: string, password: string) =>
    apiPost<AuthTokens>("/auth/login", { email, password }),
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => apiPost<AuthTokens>("/auth/register", data),
  logout: () => apiPost<{ message: string }>("/auth/logout", {}),
};

export const productsApi = {
  list: (params?: Record<string, string | number | boolean>) => {
    const qs = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";
    return apiGet<PaginatedResult<ApiProduct>>(`/products${qs}`);
  },
  featured: (limit = 8) => apiGet<ApiProduct[]>(`/products/featured?limit=${limit}`),
  get: (id: string) => apiGet<ApiProduct>(`/products/${id}`),
  recommendations: (id: string) => apiGet<ApiProduct[]>(`/products/${id}/recommendations`),
  create: (data: {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    images?: string[];
    tags?: string[];
    featured?: boolean;
  }) => apiPost<ApiProduct>("/products", data),
  update: (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      category: string;
      price: number;
      stock: number;
      images: string[];
      tags: string[];
      featured: boolean;
      isAvailable: boolean;
    }>
  ) => apiPatch<ApiProduct>(`/products/${id}`, data),
  remove: (id: string) => apiDelete<{ message: string }>(`/products/${id}`),
};

export const categoriesApi = {
  list: () => apiGet<ApiCategory[]>("/categories"),
};

export const vendorsApi = {
  list: (page = 1, limit = 20) =>
    apiGet<PaginatedResult<ApiVendor>>(`/vendors?page=${page}&limit=${limit}`),
  get: (id: string) => apiGet<ApiVendor>(`/vendors/${id}`),
  getMe: () => apiGet<ApiVendor>("/vendors/me"),
  dashboard: () => apiGet<Record<string, unknown>>("/vendors/me/dashboard"),
  analytics: () => apiGet<Record<string, unknown>>("/vendors/me/analytics"),
  myProducts: async () => {
    const store = await apiGet<ApiVendor>("/vendors/me");
    return productsApi.list({ vendor: store._id, limit: 50 });
  },
};

export const cartApi = {
  get: () => apiGet<ApiCart>("/cart"),
  addItem: (productId: string, quantity = 1) =>
    apiPost<ApiCart>("/cart/items", { productId, quantity }),
  updateItem: (productId: string, quantity: number) =>
    apiPatch<ApiCart>(`/cart/items/${productId}`, { quantity }),
  removeItem: (productId: string) => apiDelete<ApiCart>(`/cart/items/${productId}`),
  clear: () => apiDelete<ApiCart>("/cart"),
};

export const ordersApi = {
  list: () => apiGet<PaginatedResult<ApiOrder>>("/orders"),
  create: (shippingAddress: Record<string, unknown>, notes?: string) =>
    apiPost<ApiOrder>("/orders", { shippingAddress, notes }),
  get: (id: string) => apiGet<ApiOrder>(`/orders/${id}`),
  track: (id: string) => apiGet<Record<string, unknown>>(`/orders/${id}/track`),
  cancel: (id: string) => apiPost<ApiOrder>(`/orders/${id}/cancel`, {}),
};

export const paymentsApi = {
  initiate: (orderId: string, provider = "cash_on_delivery") =>
    apiPost<Record<string, unknown>>("/payments/initiate", { orderId, provider }),
};

export const notificationsApi = {
  list: () => apiGet<ApiNotification[]>("/notifications"),
  markRead: (id: string) => apiPatch<ApiNotification>(`/notifications/${id}/read`, {}),
  markAllRead: () => apiPatch<{ message: string }>("/notifications/read-all", {}),
};

export const requirementsApi = {
  create: (data: {
    material: string;
    quantity: string;
    location: string;
    description?: string;
  }) => apiPost<Record<string, unknown>>("/requirements", data),
  list: () => apiGet<Record<string, unknown>[]>("/requirements"),
};

export const deliveriesApi = {
  assigned: () => apiGet<ApiDelivery[]>("/deliveries/assigned"),
  updateStatus: (id: string, status: string) =>
    apiPatch<ApiDelivery>(`/deliveries/${id}/status`, { status }),
  confirm: (id: string) => apiPost<ApiDelivery>(`/deliveries/${id}/confirm`, {}),
  earnings: () => apiGet<Record<string, number>>("/deliveries/earnings"),
  history: () => apiGet<ApiDelivery[]>("/deliveries/history"),
};

export const healthApi = {
  check: () => apiGet<{ status: string }>("/health"),
};

// Helpers to map API models to UI
export function productImage(product: ApiProduct): string {
  const category =
    typeof product.category === "object" ? product.category?.name : undefined;
  return pickProductImage(product.images, product.name, product.tags, category);
}

export function productPrice(product: ApiProduct): number {
  return product.discountPrice ?? product.price;
}

export function vendorName(vendor: ApiVendor | string | undefined): string {
  if (!vendor) return "Supplier";
  if (typeof vendor === "string") return "Supplier";
  return vendor.storeName;
}

export function vendorBannerImage(vendor: ApiVendor): string {
  return pickVendorBanner(vendor);
}

export function vendorLogoImage(vendor: ApiVendor): string {
  return pickVendorLogo(vendor);
}

export function categoryName(category: ApiCategory | string | undefined): string {
  if (!category) return "Materials";
  if (typeof category === "string") return "Materials";
  return category.name;
}
