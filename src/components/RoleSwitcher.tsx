"use client";

import React, { useState } from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setIsOpen(false);
    if (newRole === "buyer") {
      router.push("/");
    } else if (newRole === "vendor") {
      router.push("/vendor");
    } else if (newRole === "carrier") {
      router.push("/delivery");
    }
  };

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
        return "bg-emerald-600 text-white";
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[999]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-label-bold text-label-bold uppercase tracking-wider transition-all duration-200 active:scale-95 hover:shadow-xl ${getRoleColor(
            role
          )}`}
        >
          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          <span className="hidden sm:inline">Role:</span> {getRoleLabel(role)}
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-3 bg-white dark:bg-inverse-surface rounded-2xl shadow-xl border border-outline-variant/30 py-2 w-48 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="px-4 py-1 text-[11px] font-bold text-outline uppercase border-b border-outline-variant/30 mb-1">
              Select Portal View
            </div>
            <button
              onClick={() => handleRoleChange("buyer")}
              className={`w-full text-left px-4 py-2 hover:bg-surface-container transition-colors font-medium text-body-sm flex items-center gap-2 ${
                role === "buyer" ? "text-primary font-bold" : "text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              Buyer Portal
            </button>
            <button
              onClick={() => handleRoleChange("vendor")}
              className={`w-full text-left px-4 py-2 hover:bg-surface-container transition-colors font-medium text-body-sm flex items-center gap-2 ${
                role === "vendor" ? "text-tertiary font-bold" : "text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              Vendor Portal
            </button>
            <button
              onClick={() => handleRoleChange("carrier")}
              className={`w-full text-left px-4 py-2 hover:bg-surface-container transition-colors font-medium text-body-sm flex items-center gap-2 ${
                role === "carrier" ? "text-emerald-600 font-bold" : "text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              Carrier Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
