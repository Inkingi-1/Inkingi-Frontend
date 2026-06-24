"use client";

import React from "react";
import Link from "next/link";
import { PortalAuth } from "@/components/PortalAuth";
import { useVendorQuote } from "@/context/VendorQuoteContext";

export default function VendorStoreCartPage() {
  const { items, itemCount, updateQuantity, removeItem, clear } = useVendorQuote();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="w-full max-w-4xl">
      <PortalAuth requiredRole="vendor" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-headline-lg text-primary font-bold">Storefront quote cart</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Preview cart for your store — separate from the buyer marketplace cart.
          </p>
        </div>
        <Link href="/vendor/store" className="text-tertiary font-bold text-sm hover:underline">
          Back to storefront
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-5xl text-outline/40 mb-4">shopping_cart_off</span>
          <p className="text-on-surface-variant mb-4">No items in your storefront cart.</p>
          <Link href="/vendor/store" className="inline-block px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm">
            Browse storefront
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 flex gap-4 border border-outline-variant/15 shadow-sm"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-primary truncate">{item.name}</h3>
                <p className="text-xs text-on-surface-variant">{item.category}</p>
                <p className="font-bold text-sm mt-1">{item.price.toLocaleString()} RWF</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded border border-outline-variant font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded border border-outline-variant font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-error p-2"
                aria-label="Remove"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}

          <div className="bg-surface-container-low rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-on-surface-variant">{itemCount} item{itemCount === 1 ? "" : "s"}</p>
              <p className="text-xl font-bold text-primary">Total: {subtotal.toLocaleString()} RWF</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={clear}
                className="px-5 py-2.5 border border-outline-variant rounded-xl text-sm font-bold"
              >
                Clear cart
              </button>
              <button
                type="button"
                onClick={() => alert("Quote saved — share this cart with your sales team or customer.")}
                className="px-5 py-2.5 bg-tertiary text-on-tertiary rounded-xl text-sm font-bold"
              >
                Save quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
