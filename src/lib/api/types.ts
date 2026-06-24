export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "customer" | "vendor" | "delivery" | "admin";
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: ApiUser;
}

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ApiVendor {
  _id: string;
  storeName: string;
  slug: string;
  logo?: string;
  banner?: string;
  city: string;
  district: string;
  address: string;
  isVerified: boolean;
  averageRating: number;
  reviewCount: number;
  businessDetails?: { description?: string };
}

export interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  images: string[];
  featured: boolean;
  isAvailable: boolean;
  tags: string[];
  averageRating: number;
  reviewCount: number;
  category?: ApiCategory | string;
  vendor?: ApiVendor | string;
}

export interface ApiCartItem {
  product: ApiProduct | string;
  vendor: ApiVendor | string;
  quantity: number;
  unitPrice: number;
}

export interface ApiCart {
  _id: string;
  items: ApiCartItem[];
}

export interface ApiOrder {
  _id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  shippingAddress: Record<string, unknown>;
  statusHistory?: { status: string; at: string; note?: string }[];
  createdAt?: string;
  customer?: { fullName?: string; phone?: string } | string;
}

export interface ApiNotification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

export interface ApiDelivery {
  _id: string;
  status: string;
  order?: ApiOrder | string;
  earnings?: number;
  createdAt?: string;
  dropoffLocation?: { city?: string; district?: string };
  pickupLocation?: Record<string, unknown>;
}
