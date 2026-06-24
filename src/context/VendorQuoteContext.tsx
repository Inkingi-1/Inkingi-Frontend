"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export interface VendorQuoteItem {
  id: string;
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface VendorQuoteContextType {
  items: VendorQuoteItem[];
  itemCount: number;
  addItem: (item: Omit<VendorQuoteItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
}

const STORAGE_KEY = "bc_vendor_quote_cart";

const VendorQuoteContext = createContext<VendorQuoteContextType | undefined>(undefined);

export function VendorQuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<VendorQuoteItem[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const persist = useCallback((next: VendorQuoteItem[]) => {
    setItems(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addItem = useCallback(
    (item: Omit<VendorQuoteItem, "quantity"> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        let next: VendorQuoteItem[];
        if (existing) {
          next = prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
        } else {
          next = [...prev, { ...item, quantity: qty }];
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (id: string, qty: number) => {
      if (qty <= 0) {
        removeItem(id);
        return;
      }
      setItems((prev) => {
        const next = prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [removeItem]
  );

  const clear = useCallback(() => persist([]), [persist]);

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);

  const value = useMemo(
    () => ({ items, itemCount, addItem, removeItem, updateQuantity, clear }),
    [items, itemCount, addItem, removeItem, updateQuantity, clear]
  );

  return <VendorQuoteContext.Provider value={value}>{children}</VendorQuoteContext.Provider>;
}

export function useVendorQuote() {
  const ctx = useContext(VendorQuoteContext);
  if (!ctx) throw new Error("useVendorQuote must be used within VendorQuoteProvider");
  return ctx;
}
