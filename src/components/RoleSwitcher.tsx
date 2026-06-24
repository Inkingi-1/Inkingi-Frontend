"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { useRouter, usePathname } from "next/navigation";

const ROLE_OPTIONS: { role: UserRole; label: string; description: string; icon: string; href: string; color: string }[] = [
  {
    role: "buyer",
    label: "Buyer Portal",
    description: "Shop materials, track orders",
    icon: "shopping_cart",
    href: "/",
    color: "text-primary",
  },
  {
    role: "vendor",
    label: "Vendor Portal",
    description: "Manage store & inventory",
    icon: "storefront",
    href: "/vendor",
    color: "text-tertiary",
  },
  {
    role: "carrier",
    label: "Carrier Portal",
    description: "Dispatch & deliveries",
    icon: "local_shipping",
    href: "/delivery",
    color: "text-primary",
  },
];

function roleFromPathname(pathname: string): UserRole {
  if (pathname.startsWith("/vendor")) return "vendor";
  if (pathname.startsWith("/delivery")) return "carrier";
  return "buyer";
}

export default function RoleSwitcher() {
  const { setRole } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const activeRole = roleFromPathname(pathname);

  const handleRoleChange = useCallback(
    (newRole: UserRole, href: string) => {
      setRole(newRole);
      setIsOpen(false);
      router.push(href);
    },
    [router, setRole]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Hide on auth pages — keeps login/checkout focused
  if (pathname === "/login") {
    return null;
  }

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case "buyer":
        return "Buyer";
      case "vendor":
        return "Vendor";
      case "carrier":
        return "Carrier";
    }
  };

  const getRoleColor = (r: UserRole) => {
    switch (r) {
      case "buyer":
        return "bg-primary text-on-primary";
      case "vendor":
        return "bg-tertiary-container text-on-tertiary-container";
      case "carrier":
        return "bg-primary text-on-primary";
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[9998] bg-black/20 cursor-pointer"
          aria-label="Close role menu"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-24 left-4 md:bottom-6 md:left-auto md:right-6 z-[9999]">
        {isOpen && (
          <div className="absolute bottom-full left-0 md:left-auto md:right-0 mb-3 w-[min(100vw-2rem,280px)] bg-white rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant/30">
              <p className="text-[11px] font-bold text-outline uppercase tracking-wider">Switch Portal View</p>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Preview buyer, vendor, or carrier experience</p>
            </div>
            <div className="p-2">
              {ROLE_OPTIONS.map((option) => {
                const isActive = activeRole === option.role;
                return (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => handleRoleChange(option.role, option.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer hover:bg-surface-container ${
                      isActive ? "bg-secondary-container/60 ring-1 ring-primary/20" : ""
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined mt-0.5 ${option.color}`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {option.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-body-sm ${isActive ? option.color : "text-on-surface"}`}>
                        {option.label}
                        {isActive && (
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-container px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{option.description}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline text-lg mt-0.5">chevron_right</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-label-bold text-label-bold uppercase tracking-wider transition-all duration-200 active:scale-95 hover:shadow-xl cursor-pointer ${getRoleColor(
            activeRole
          )}`}
        >
          <span className="material-symbols-outlined text-lg">
            {isOpen ? "close" : "admin_panel_settings"}
          </span>
          <span className="hidden sm:inline">Role:</span> {getRoleLabel(activeRole)}
          <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? "rotate-180" : ""}`}>
            expand_less
          </span>
        </button>
      </div>
    </>
  );
}
