"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useApp();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("main");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = deliveryMethod === "standard" ? 15000 : 45000;
  const vat = Math.round(subtotal * 0.18);
  const total = subtotal + shippingCost + vat;

  const handleCompleteOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Create a mock order inside localstorage if needed, or just clear cart
      clearCart();
      setIsSubmitting(false);
      router.push("/orders/track");
    }, 2000);
  };

  const scrollToSection = (id: string, step: number) => {
    setActiveStep(step);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col animate-in fade-in duration-300">
      {/* Secure Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-outline-variant/30 h-16 flex justify-between items-center px-margin-mobile md:px-margin-desktop shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="active:scale-95 duration-150 hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center text-primary"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">BuildConnect</h1>
        </div>
        <div className="flex items-center gap-xs">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-full shadow-sm text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      </header>

      <main className="mt-16 mb-32 flex-grow overflow-x-hidden">
        {/* Stepper Navigation */}
        <nav className="w-full bg-surface-container-low py-4 px-margin-mobile md:px-margin-desktop sticky top-16 z-40 border-b border-outline-variant/30 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center relative">
            <div className="absolute h-0.5 bg-outline-variant/30 w-full top-1/2 -translate-y-1/2 z-0"></div>
            <button
              onClick={() => scrollToSection("delivery-address", 1)}
              className="z-10 flex flex-col items-center gap-2 focus:outline-none"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all shadow ${
                  activeStep === 1
                    ? "bg-primary text-on-primary scale-110"
                    : "bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant/50"
                }`}
              >
                1
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep === 1 ? "text-primary" : "text-on-surface-variant"}`}>
                ADDRESS
              </span>
            </button>

            <button
              onClick={() => scrollToSection("delivery-method", 2)}
              className="z-10 flex flex-col items-center gap-2 focus:outline-none"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all shadow ${
                  activeStep === 2
                    ? "bg-primary text-on-primary scale-110"
                    : "bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant/50"
                }`}
              >
                2
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep === 2 ? "text-primary" : "text-on-surface-variant"}`}>
                SHIPPING
              </span>
            </button>

            <button
              onClick={() => scrollToSection("payment-method", 3)}
              className="z-10 flex flex-col items-center gap-2 focus:outline-none"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all shadow ${
                  activeStep === 3
                    ? "bg-primary text-on-primary scale-110"
                    : "bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant/50"
                }`}
              >
                3
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep === 3 ? "text-primary" : "text-on-surface-variant"}`}>
                PAYMENT
              </span>
            </button>
          </div>
        </nav>

        {/* Form Sections */}
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-12">
          {/* Section 1: Delivery Address */}
          <section className="space-y-md scroll-mt-48" id="delivery-address" onMouseEnter={() => setActiveStep(1)}>
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">1. Delivery Site</h2>
              <button className="text-tertiary font-label-bold text-label-bold hover:underline text-xs">
                ADD NEW SITE
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Map mockup */}
              <div className="md:col-span-7 bg-white rounded-2xl shadow-sm overflow-hidden relative group min-h-[300px] border border-outline-variant/20">
                <img
                  alt="Map of Kigali"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZeP-tqWsmDvWAqkDMRgpLBb_lNEsy5eQHiOPcDO9wVgX8upe1_GcFDAQPhhHbstAvBRy7gKx0UZvJTgEp2qC0Vqv2iDHQ-VeunlOXcJDGz-yeQjJJ4fOnRet2dKjtzcOgBsyUxzdXV01n9Kwb3SOMQlmM5ZYnQBVcxunph5fCsNmND990VMLEArnrtAove0kYAnkciFxAEayY2e1h1VCYztZbgq0T3zYV0ntMXAP3Q7AdfoUOEzBh0n8DF7trcmqOner_QDRpUUI"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl flex items-center gap-4 border border-white/30 shadow-md">
                  <span className="material-symbols-outlined text-tertiary text-2xl">location_on</span>
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface text-sm">
                      {selectedAddress === "main" ? "Vision City Phase II - Plot 402" : "Masoro Warehouse Alpha"}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {selectedAddress === "main" ? "Gacuriro, Gasabo District, Kigali" : "Prime Economic Zone, Kigali"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Selection cards */}
              <div className="md:col-span-5 space-y-4">
                <button
                  type="button"
                  onClick={() => setSelectedAddress("main")}
                  className={`w-full text-left p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedAddress === "main"
                      ? "border-primary bg-primary-container/10 shadow-sm"
                      : "border-outline-variant bg-white hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-primary">domain</span>
                      <div>
                        <p className={`font-label-bold text-label-bold text-sm ${selectedAddress === "main" ? "text-primary" : "text-on-surface"}`}>
                          Main Construction Site
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">Plot 402, Gacuriro, Kigali</p>
                        <p className="text-xs text-on-surface-variant mt-1">+250 788 123 456</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === "main" ? "border-primary" : "border-outline"}`}>
                      {selectedAddress === "main" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAddress("warehouse")}
                  className={`w-full text-left p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedAddress === "warehouse"
                      ? "border-primary bg-primary-container/10 shadow-sm"
                      : "border-outline-variant bg-white hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">home_work</span>
                      <div>
                        <p className={`font-label-bold text-label-bold text-sm ${selectedAddress === "warehouse" ? "text-primary" : "text-on-surface"}`}>
                          Warehouse Alpha
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">Prime Economic Zone, Masoro</p>
                        <p className="text-xs text-on-surface-variant mt-1">+250 788 654 321</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === "warehouse" ? "border-primary" : "border-outline"}`}>
                      {selectedAddress === "warehouse" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Delivery Method */}
          <section className="space-y-md scroll-mt-48" id="delivery-method" onMouseEnter={() => setActiveStep(2)}>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">2. Delivery Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Standard */}
              <button
                type="button"
                onClick={() => setDeliveryMethod("standard")}
                className={`text-left p-6 rounded-2xl border-2 cursor-pointer flex flex-col justify-between min-h-[160px] transition-all relative ${
                  deliveryMethod === "standard"
                    ? "border-primary bg-primary-container/5 shadow-sm"
                    : "border-outline-variant bg-white hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary rounded-xl text-on-primary">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <p className={`font-label-bold text-label-bold ${deliveryMethod === "standard" ? "text-primary" : "text-on-surface"}`}>
                      Standard Trucking
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">2-3 Business Days</p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-end mt-4">
                  <span className="text-xs text-on-surface-variant">Cost-effective for bulk materials</span>
                  <span className="font-bold text-lg text-primary">15,000 RWF</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === "standard" ? "border-primary" : "border-outline"}`}>
                    {deliveryMethod === "standard" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </button>

              {/* Express */}
              <button
                type="button"
                onClick={() => setDeliveryMethod("express")}
                className={`text-left p-6 rounded-2xl border-2 cursor-pointer flex flex-col justify-between min-h-[160px] transition-all relative ${
                  deliveryMethod === "express"
                    ? "border-primary bg-primary-container/5 shadow-sm"
                    : "border-outline-variant bg-white hover:border-tertiary"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bolt
                    </span>
                  </div>
                  <div>
                    <p className={`font-label-bold text-label-bold ${deliveryMethod === "express" ? "text-primary" : "text-on-surface"}`}>
                      Express Courier
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Same Day (Order before 11 AM)</p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-end mt-4">
                  <span className="text-xs text-on-surface-variant">Priority logistics for urgent orders</span>
                  <span className="font-bold text-lg text-primary">45,000 RWF</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === "express" ? "border-primary" : "border-outline"}`}>
                    {deliveryMethod === "express" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section className="space-y-md scroll-mt-48" id="payment-method" onMouseEnter={() => setActiveStep(3)}>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">3. Payment Method</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* MTN MoMo */}
              <button
                type="button"
                onClick={() => setPaymentMethod("momo")}
                className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between hover:shadow-md transition-all ${
                  paymentMethod === "momo" ? "border-primary bg-primary-container/10" : "border-outline-variant bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                    <span className="font-extrabold text-black text-xs font-sans tracking-tighter">MTN MoMo</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface text-sm">MTN Mobile Money</p>
                    <p className="text-xs text-on-surface-variant">Instant escrow hold authorization via push prompt</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "momo" ? "border-primary" : "border-outline"}`}>
                  {paymentMethod === "momo" && <div className="w-3.5 h-3.5 bg-primary rounded-full"></div>}
                </div>
              </button>

              {/* Airtel Money */}
              <button
                type="button"
                onClick={() => setPaymentMethod("airtel")}
                className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between hover:shadow-md transition-all ${
                  paymentMethod === "airtel" ? "border-primary bg-primary-container/10" : "border-outline-variant bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E30613] flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                    <span className="font-black text-white text-[10px] font-sans">Airtel</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface text-sm">Airtel Money</p>
                    <p className="text-xs text-on-surface-variant">Secure mobile wallet payment transfer</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "airtel" ? "border-primary" : "border-outline"}`}>
                  {paymentMethod === "airtel" && <div className="w-3.5 h-3.5 bg-primary rounded-full"></div>}
                </div>
              </button>

              {/* Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between hover:shadow-md transition-all ${
                  paymentMethod === "bank" ? "border-primary bg-primary-container/10" : "border-outline-variant bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined">account_balance</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface text-sm">Bank Transfer (RWF/USD)</p>
                    <p className="text-xs text-on-surface-variant">Bank of Kigali, I&M Bank, Equity, Cogebanque</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank" ? "border-primary" : "border-outline"}`}>
                  {paymentMethod === "bank" && <div className="w-3.5 h-3.5 bg-primary rounded-full"></div>}
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Order Summary Sticky Footer */}
      <footer className="fixed bottom-0 w-full z-50 bg-white border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-4 flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">ORDER TOTAL</p>
              <p className="font-headline-md text-headline-md text-primary font-bold text-xl">
                {(subtotal > 0 ? total : 1245000).toLocaleString()} RWF
              </p>
            </div>
            <div className="border-l border-outline-variant/50 pl-8 hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">shopping_basket</span>
                <p className="text-xs text-on-surface-variant">
                  {cart.length > 0
                    ? `${cart.length} Items: ${cart.map((i) => i.title.split(" ")[0]).join(", ")}`
                    : "3 Items: Cement, Rebar, Sand"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => router.push("/cart")}
              className="flex-grow md:flex-initial px-6 py-3 border border-primary text-primary hover:bg-primary/5 rounded-xl font-label-bold text-xs uppercase tracking-wider transition-all active:scale-95 duration-100"
            >
              SAVE DRAFT
            </button>
            <button
              onClick={handleCompleteOrder}
              disabled={isSubmitting}
              className="flex-grow md:flex-initial px-10 py-3 bg-tertiary text-on-tertiary hover:brightness-110 rounded-xl font-label-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95 duration-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "COMPLETE ORDER"
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
