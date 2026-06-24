"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  cartApi,
  notificationsApi,
  requirementsApi,
  categoryName,
  productImage,
  vendorName,
} from "@/lib/api";
import { ApiCart, ApiNotification, ApiProduct } from "@/lib/api/types";
import { getAccessToken } from "@/lib/api/client";
import { resolveMaterialImage, MATERIAL_IMAGES } from "@/lib/productImages";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  supplier: string;
}

export type UserRole = "buyer" | "vendor" | "carrier";

interface AppContextType {
  cart: CartItem[];
  cartLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity"> & { productId?: string }) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  role: UserRole;
  setRole: (role: UserRole) => void;
  notificationCount: number;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  showPostRequirementModal: boolean;
  setShowPostRequirementModal: (show: boolean) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
  postRequirement: (data: {
    material: string;
    quantity: string;
    location: string;
    description: string;
  }) => Promise<void>;
  apiOnline: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
  href?: string;
  image?: string;
}

function mapCartFromApi(apiCart: ApiCart | null | undefined): CartItem[] {
  const items = apiCart?.items ?? [];
  return items.map((item) => {
    const product = item.product as ApiProduct;
    const productId =
      typeof product === "object" && product?._id
        ? product._id
        : typeof item.product === "string"
          ? item.product
          : String(product ?? "unknown");
    return {
      id: productId,
      title: typeof product === "object" && product?.name ? product.name : "Product",
      price: item.unitPrice ?? 0,
      image: typeof product === "object" ? productImage(product) : resolveMaterialImage("materials"),
      quantity: item.quantity ?? 1,
      category: typeof product === "object" ? categoryName(product.category as never) : "",
      supplier: vendorName(item.vendor as never),
    };
  });
}

function notificationImage(type: string, message: string): string {
  if (type.includes("delivery")) return MATERIAL_IMAGES.tools;
  if (type.includes("requirement")) return resolveMaterialImage(message);
  if (type.includes("order")) return MATERIAL_IMAGES.cement;
  return resolveMaterialImage(message);
}

function mapNotification(n: ApiNotification): AppNotification {
  const orderId = n.data?.orderId as string | undefined;
  const trackHref = orderId ? `/orders/track?orderId=${orderId}` : "/orders/track";
  const href = n.type.includes("vendor")
    ? "/vendor/notifications"
    : n.type.includes("order")
    ? trackHref
    : n.type.includes("delivery")
    ? trackHref
    : "/notifications";
  return {
    id: n._id,
    title: n.title,
    message: n.message,
    time: new Date(n.createdAt).toLocaleString(),
    read: n.isRead,
    type: n.type,
    href,
    image: notificationImage(n.type, n.message),
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [role, setRoleState] = useState<UserRole>("buyer");
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showPostRequirementModal, setShowPostRequirementModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [apiOnline, setApiOnline] = useState(true);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartFetchGenRef = useRef(0);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 4000);
  }, []);

  const clearToast = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(null);
  }, []);

  const applyCart = useCallback((apiCart: ApiCart | null | undefined) => {
    setCart(mapCartFromApi(apiCart));
  }, []);

  const refreshCart = useCallback(async () => {
    const gen = ++cartFetchGenRef.current;
    setCartLoading(true);
    try {
      const apiCart = await cartApi.get();
      if (gen === cartFetchGenRef.current) {
        applyCart(apiCart);
        setApiOnline(true);
      }
    } catch {
      if (gen === cartFetchGenRef.current) setApiOnline(false);
    } finally {
      if (gen === cartFetchGenRef.current) setCartLoading(false);
    }
  }, [applyCart]);

  const refreshNotifications = useCallback(async () => {
    if (!getAccessToken()) return;
    try {
      const list = await notificationsApi.list();
      setNotifications(Array.isArray(list) ? list.map(mapNotification) : []);
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    }
  }, []);

  useEffect(() => {
    const savedRole = localStorage.getItem("bc_role") as UserRole;
    if (savedRole === "buyer" || savedRole === "vendor" || savedRole === "carrier") {
      setRoleState(savedRole);
    }
    void refreshCart();
    void refreshNotifications();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bc_access_token") {
        void refreshCart();
        void refreshNotifications();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refreshCart, refreshNotifications]);

  useEffect(() => {
    if (!getAccessToken()) return;
    const id = setInterval(() => void refreshNotifications(), 30_000);
    const onFocus = () => {
      void refreshNotifications();
      void refreshCart();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [refreshNotifications, refreshCart]);

  const addToCart = useCallback(
    async (item: Omit<CartItem, "quantity"> & { productId?: string }) => {
      const productId = item.productId || item.id;
      try {
        const apiCart = await cartApi.addItem(productId, 1);
        cartFetchGenRef.current++;
        applyCart(apiCart);
        setApiOnline(true);
        showToast(`${item.title} added to cart`);
      } catch {
        setCart((prev) => {
          const existing = prev.find((i) => i.id === item.id);
          if (existing) {
            return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
          }
          return [...prev, { ...item, quantity: 1 }];
        });
        showToast(`${item.title} added to cart (offline)`);
      }
    },
    [applyCart, showToast]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      try {
        const apiCart = await cartApi.removeItem(id);
        cartFetchGenRef.current++;
        applyCart(apiCart);
      } catch {
        setCart((prev) => prev.filter((i) => i.id !== id));
      }
    },
    [applyCart]
  );

  const updateCartQuantity = useCallback(
    async (id: string, qty: number) => {
      if (qty <= 0) return removeFromCart(id);
      try {
        const apiCart = await cartApi.updateItem(id, qty);
        cartFetchGenRef.current++;
        applyCart(apiCart);
      } catch {
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
      }
    },
    [applyCart, removeFromCart]
  );

  const clearCart = useCallback(async () => {
    try {
      if (getAccessToken()) await cartApi.clear();
    } catch {
      // ignore
    }
    cartFetchGenRef.current++;
    setCart([]);
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("bc_role", newRole);
  }, []);

  const markNotificationRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    if (getAccessToken()) {
      try {
        await notificationsApi.markRead(id);
      } catch {
        // keep local state
      }
    }
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (getAccessToken()) {
      try {
        await notificationsApi.markAllRead();
      } catch {
        // ignore
      }
    }
  }, []);

  const postRequirement = useCallback(
    async (data: { material: string; quantity: string; location: string; description: string }) => {
      if (!getAccessToken()) {
        showToast("Please sign in to post a requirement");
        throw new Error("Not authenticated");
      }
      await requirementsApi.create(data);
      await refreshNotifications();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("bc-requirement-posted"));
      }
      showToast(`Requirement posted! Suppliers in ${data.location} will respond soon.`);
    },
    [refreshNotifications, showToast]
  );

  const value = useMemo<AppContextType>(
    () => ({
      cart,
      cartLoading,
      refreshCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      role,
      setRole,
      notificationCount: unreadCount,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      refreshNotifications,
      showPostRequirementModal,
      setShowPostRequirementModal,
      toastMessage,
      showToast,
      clearToast,
      postRequirement,
      apiOnline,
    }),
    [
      cart,
      cartLoading,
      refreshCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      role,
      setRole,
      unreadCount,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      refreshNotifications,
      showPostRequirementModal,
      toastMessage,
      showToast,
      clearToast,
      postRequirement,
      apiOnline,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
