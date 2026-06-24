"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, refreshCart, cartLoading } = useApp();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 15000 : 0;
  const promoDiscount = discountApplied ? subtotal * 0.1 : 0; // 10% discount
  const vat = subtotal > 0 ? Math.round((subtotal - promoDiscount) * 0.18) : 0;
  const total = subtotal > 0 ? subtotal + deliveryFee + vat - promoDiscount : 0;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "BUILD10") {
      setDiscountApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try 'BUILD10'");
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <main className="py-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mt-2">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end border-b border-outline-variant pb-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Shopping Cart</h2>
              <span className="text-on-surface-variant font-label-md font-bold">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/20 flex flex-col items-center justify-center">
                {cartLoading ? (
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                ) : (
                  <>
                <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">shopping_cart_off</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Your Cart is Empty</h3>
                <p className="text-on-surface-variant text-body-sm max-w-[24rem] leading-relaxed">
                  You haven't added any construction materials to your cart yet. Explore the marketplace to find what you need.
                </p>
                <Link
                  href="/marketplace"
                  className="mt-6 px-6 py-3 bg-primary text-on-primary hover:bg-primary/95 transition-all rounded-xl font-label-bold text-xs active:scale-95 duration-100"
                  >
                  Browse marketplace
                </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 md:p-6 flex flex-col md:flex-row gap-6 group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-outline-variant/10"
                  >
                    <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30">
                      <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-primary text-body-lg mb-1">{item.title}</h3>
                          <p className="text-on-surface-variant text-body-sm">
                            Supplier: {item.supplier} • {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="material-symbols-outlined text-outline hover:text-error transition-colors h-fit p-1"
                        >
                          delete
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center justify-between mt-4 md:mt-0 gap-4">
                        <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-surface-bright">
                          <button
                            className="px-3 py-1 hover:bg-surface-container transition-colors active:bg-secondary-container text-lg font-bold"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            className="w-12 text-center bg-transparent border-none focus:ring-0 font-label-bold text-on-surface outline-none"
                            min="1"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                          />
                          <button
                            className="px-3 py-1 hover:bg-surface-container transition-colors active:bg-secondary-container text-lg font-bold"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-headline-md text-on-surface font-bold text-lg">
                            {Math.round(item.price * item.quantity).toLocaleString()} RWF
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-outline-variant font-medium">
                              ({item.price.toLocaleString()} RWF / unit)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-on-surface-variant hover:text-error text-body-sm font-bold flex items-center gap-1.5 px-3 py-1.5 hover:bg-error-container/20 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">remove_shopping_cart</span>
                    Clear Cart
                  </button>
                </div>
              </div>
            )}

            {/* Delivery Estimate Banner */}
            {cart.length > 0 && (
              <div className="bg-secondary-container/30 border border-secondary-container rounded-2xl p-4 flex items-start gap-4 text-on-surface">
                <span className="material-symbols-outlined text-primary mt-1">local_shipping</span>
                <div>
                  <h4 className="font-label-bold text-primary uppercase tracking-wider text-xs">Delivery Estimate</h4>
                  <p className="text-body-md text-on-secondary-container text-sm mt-0.5">
                    Standard Logistics Ground Delivery: <span className="font-bold text-primary">Thursday, 24th Oct</span> (Kigali Metro Area)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 border border-outline-variant/15">
                  <h3 className="font-headline-md text-on-surface mb-6 font-bold">Order Summary</h3>
                  <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant">Subtotal</span>
                      <span className="text-on-surface font-medium">{subtotal.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant">Delivery Fee</span>
                      <span className="text-on-surface font-medium">{deliveryFee.toLocaleString()} RWF</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-body-md text-error">
                        <span className="font-bold">10% Promo Discount</span>
                        <span className="font-bold">-{promoDiscount.toLocaleString()} RWF</span>
                      </div>
                    )}
                    <div className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant">VAT (18%)</span>
                      <span className="text-on-surface font-medium">{vat.toLocaleString()} RWF</span>
                    </div>
                    <div className="h-px bg-outline-variant my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-headline-md text-primary font-bold">Total</span>
                      <span className="font-headline-lg text-primary text-2xl font-bold">{total.toLocaleString()} RWF</span>
                    </div>
                  </div>
                  {/* CTA Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-tertiary text-on-tertiary font-label-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group duration-100 text-xs"
                  >
                    Proceed to checkout
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </button>
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      100% Secure Transaction
                    </div>
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-[18px]">assignment_return</span>
                      7-Day Material Verification Period
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 border border-outline-variant/15">
                  <div className="flex gap-2">
                    <input
                      className="flex-grow bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface"
                      placeholder="Promo Code (BUILD10)"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white font-label-bold rounded-xl active:scale-95 transition-all text-xs"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && <p className="text-xs text-error mt-2 font-medium">{promoError}</p>}
                  {discountApplied && <p className="text-xs text-emerald-600 mt-2 font-bold">10% Promo discount applied successfully!</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
