"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  showPostRequirementModal: boolean;
  setShowPostRequirementModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [role, setRoleState] = useState<UserRole>("buyer");
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [showPostRequirementModal, setShowPostRequirementModal] = useState<boolean>(false);

  // Load cart and role from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bc_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    const savedRole = localStorage.getItem("bc_role") as UserRole;
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("bc_cart", JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      saveCart(
        cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("bc_role", newRole);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        role,
        setRole,
        notificationCount,
        setNotificationCount,
        showPostRequirementModal,
        setShowPostRequirementModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
