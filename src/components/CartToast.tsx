"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function CartToast() {
  const { toastMessage, clearToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-bottom-4 fade-in duration-200"
      role="status"
      aria-live="polite"
    >
      <div className="bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[90vw] border border-outline-variant/20">
        <span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
        <p className="font-body-sm text-sm flex-1">{toastMessage}</p>
        <Link
          href="/cart"
          onClick={clearToast}
          className="text-tertiary-fixed font-label-bold text-xs hover:underline whitespace-nowrap"
        >
          View cart
        </Link>
        <button
          type="button"
          onClick={clearToast}
          aria-label="Dismiss"
          className="text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}
