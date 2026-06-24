"use client";

import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ordersApi } from "@/lib/api";
import { ApiOrder } from "@/lib/api/types";

const STATUS_STEPS = [
  { key: "pending", label: "Ordered" },
  { key: "confirmed", label: "Confirmed" },
  { key: "packed", label: "Processing" },
  { key: "on_the_way", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function statusIndex(status: string) {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  if (idx >= 0) return idx;
  if (status === "assigned") return 3;
  return 0;
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

export default function OrderTracking() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  );
}

function OrderTrackingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const orderIdParam = searchParams.get("orderId");

  const [orderId, setOrderId] = useState<string | null>(orderIdParam);
  const [trackData, setTrackData] = useState<Record<string, unknown> | null>(null);
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [recentOrders, setRecentOrders] = useState<ApiOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [truckPos, setTruckPos] = useState({ x: 490, y: 310 });
  const animationRef = useRef<number | null>(null);

  const loadOrders = useCallback(() => {
    if (!isAuthenticated) {
      setOrdersLoading(false);
      return;
    }
    setOrdersLoading(true);
    ordersApi
      .list()
      .then((res) => setRecentOrders(res.data ?? []))
      .catch(() => setRecentOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    setOrderId(orderIdParam);
  }, [orderIdParam]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (!orderId) return;
    setDetailLoading(true);
    Promise.all([ordersApi.track(orderId), ordersApi.get(orderId)])
      .then(([track, ord]) => {
        setTrackData(track);
        setOrder(ord);
      })
      .catch(() => {
        setTrackData(null);
        setOrder(null);
      })
      .finally(() => setDetailLoading(false));
  }, [orderId]);

  const apiStatus = (trackData?.status as string) || order?.status || "pending";
  const isDelivered = apiStatus === "delivered";
  const isTransit = ["assigned", "on_the_way", "packed", "confirmed"].includes(apiStatus);
  const currentStep = statusIndex(apiStatus);
  const orderNumber = (trackData?.orderNumber as string) || order?.orderNumber || "—";
  const history = (trackData?.statusHistory as { status: string; at: string }[]) || order?.statusHistory || [];

  useEffect(() => {
    if (!isTransit) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTruckPos({ x: 490 + Math.cos(elapsed * 1.5) * 2, y: 310 + Math.sin(elapsed * 2) * 4 });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isTransit]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20 px-margin-mobile">
        <h2 className="font-headline-md text-primary mb-2">Sign in to track orders</h2>
        <Link href="/login" className="text-tertiary hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  if (!orderId) {
    return (
      <main className="py-12 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <h2 className="font-headline-lg text-primary font-bold mb-6">Your Orders</h2>
        {ordersLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline-variant/20">
            <p className="text-on-surface-variant mb-4">No orders yet.</p>
            <Link href="/marketplace" className="text-tertiary font-bold hover:underline">
              Browse marketplace
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((o) => (
              <li key={o._id}>
                <Link
                  href={`/orders/track?orderId=${o._id}`}
                  className="block bg-white p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">{o.orderNumber}</span>
                    <span className="text-xs uppercase font-bold text-tertiary">{o.status}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {o.total?.toLocaleString()} RWF • {formatDate(o.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }

  if (detailLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!order && !trackData) {
    return (
      <div className="text-center py-20 px-margin-mobile">
        <h2 className="font-headline-md text-primary mb-2">Order not found</h2>
        <Link href="/orders/track" className="text-tertiary hover:underline">
          View all orders
        </Link>
      </div>
    );
  }

  const progressPct = Math.min(100, ((currentStep + 1) / STATUS_STEPS.length) * 100);

  return (
    <div className="animate-in fade-in duration-300">
      <main className="py-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mt-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
          <div>
            <span className="font-label-bold text-tertiary uppercase tracking-wider text-xs">
              Order #{orderNumber}
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg mt-xs text-primary font-bold">
              {isDelivered ? "Successfully Delivered" : isTransit ? "In Transit to Site" : "Order Placed"}
            </h2>
          </div>
          <div className="bg-surface-container-highest p-md rounded-xl flex flex-col items-end border-l-4 border-tertiary shadow-sm">
            <span className="font-label-bold text-on-surface-variant text-xs uppercase">Status</span>
            <span className="font-headline-md text-tertiary font-bold capitalize">{apiStatus.replace(/_/g, " ")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <section className="bg-white p-lg rounded-2xl shadow-sm border border-outline-variant/20">
              <h3 className="font-label-bold text-on-surface-variant mb-lg uppercase tracking-widest text-xs">
                Delivery Status
              </h3>
              <div className="relative flex flex-col gap-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-outline-variant/30" />
                <div
                  className="absolute left-[11px] top-2 w-[2px] bg-tertiary transition-all duration-1000"
                  style={{ height: `${progressPct}%` }}
                />
                {STATUS_STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  const hist = history.find((h) => h.status === step.key);
                  return (
                    <div key={step.key} className="relative flex gap-md items-start">
                      <div
                        className={`z-10 rounded-full h-6 w-6 flex items-center justify-center shadow ${
                          done ? "bg-tertiary text-white" : "bg-outline-variant/50 text-white"
                        }`}
                      >
                        {done ? (
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-label-bold text-primary text-sm">{step.label}</h4>
                        <p className="text-on-surface-variant text-xs">{formatDate(hist?.at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {order && (
              <section className="bg-white p-lg rounded-2xl shadow-sm border border-outline-variant/20">
                <h3 className="font-label-bold text-on-surface-variant mb-md uppercase tracking-widest text-xs">
                  Order Summary
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Total: <span className="font-bold text-primary">{order.total?.toLocaleString()} RWF</span>
                </p>
                {order.shippingAddress && (
                  <p className="text-xs text-on-surface-variant mt-2">
                    Ship to: {(order.shippingAddress as { street?: string }).street},{" "}
                    {(order.shippingAddress as { city?: string }).city}
                  </p>
                )}
              </section>
            )}
          </div>

          <div className="lg:col-span-8">
            <section className="relative bg-surface-container-low rounded-2xl shadow-sm overflow-hidden h-[450px] lg:min-h-[500px] border border-outline-variant/15">
              <img
                alt="Map view"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 pointer-events-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClP94MsaKu-7xeUOnFHfAJcOxDmqU3gUeGxPhSgad536Nhy6On9afdImq2wathSh11L5w9hRtVDoXxT2RmLRFPPKfIE_9mKeqdBVjbvnXeOc9d4vSOa7-hRYdVxi-8XpES8YrTK92jfho0Jj2yvmwvU8fe7F9hJqzkytmUiPzhNSQInyAQAcSEUo7kqsWTNpC3WGNp6Ywc-32pkhpz5CY1ieMX--sXxbPbn8o0d5mt-SFu0pyh5lhGJJAxgwbd3s8eYCOd7Mc6kIE"
              />
              <div className="absolute inset-0 p-lg z-10">
                <svg className="w-full h-full" viewBox="0 0 800 500">
                  <path d="M100,400 Q200,350 300,380 T500,320 T700,100" fill="none" stroke="#73787c" strokeWidth="4" strokeDasharray="10 10" className="opacity-40" />
                  <path d="M100,400 Q200,350 300,380 T500,320" fill="none" stroke="#7c3400" strokeLinecap="round" strokeWidth="6" />
                  <circle cx="100" cy="400" fill="#334c5e" r="8" />
                  {isTransit && !isDelivered && (
                    <g transform={`translate(${truckPos.x}, ${truckPos.y})`}>
                      <circle className="animate-ping opacity-25" cx="0" cy="0" fill="#7c3400" r="18" />
                      <circle cx="0" cy="0" fill="#7c3400" r="12" />
                    </g>
                  )}
                  <g transform="translate(700, 100)">
                    <circle cx="0" cy="0" fill={isDelivered ? "#7c3400" : "#334c5e"} r="12" />
                    <text x="20" y="5" fill="#334c5e" className="text-[11px] font-bold">
                      Delivery site
                    </text>
                  </g>
                </svg>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-lg flex flex-wrap gap-md justify-end">
          <Link
            href="/orders/track"
            className="px-lg py-3 border border-primary text-primary font-label-bold rounded-xl hover:bg-surface-container transition-all text-xs cursor-pointer"
          >
            All orders
          </Link>
          <button
            type="button"
            onClick={() => router.push("/marketplace")}
            className="px-lg py-3 bg-primary text-on-primary font-label-bold rounded-xl shadow hover:bg-primary/95 transition-all text-xs cursor-pointer"
          >
            Continue shopping
          </button>
        </div>
      </main>
    </div>
  );
}
