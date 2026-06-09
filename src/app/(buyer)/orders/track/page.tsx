"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OrderTracking() {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState<"transit" | "delivered">("transit");
  const [truckPos, setTruckPos] = useState({ x: 490, y: 310 });
  const animationRef = useRef<number | null>(null);

  // Animate the truck floating on the map
  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Float truck slightly on the Y-axis to simulate movement
      const floatY = Math.sin(elapsed * 2) * 4;
      const floatX = Math.cos(elapsed * 1.5) * 2;
      setTruckPos({ x: 490 + floatX, y: 310 + floatY });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleConfirmReceipt = () => {
    setOrderStatus("delivered");
  };

  return (
    <div className="animate-in fade-in duration-300">
      <main className="py-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mt-2">
        {/* Page Header & ETA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
          <div>
            <span className="font-label-bold text-label-bold text-tertiary uppercase tracking-wider text-xs">
              Order #BC-882193
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mt-xs text-primary font-bold">
              {orderStatus === "transit" ? "In Transit to Site" : "Successfully Delivered"}
            </h2>
          </div>
          <div className="bg-surface-container-highest p-md rounded-xl flex flex-col items-end border-l-4 border-tertiary shadow-sm text-on-surface">
            <span className="font-label-bold text-label-bold text-on-surface-variant text-xs">
              {orderStatus === "transit" ? "ESTIMATED ARRIVAL" : "DELIVERY TIME"}
            </span>
            <span className="font-headline-md text-headline-md text-tertiary font-bold">
              {orderStatus === "transit" ? "14:45 PM" : "Today, 14:32 PM"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Tracking Status Card (Left, 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <section className="bg-white p-lg rounded-2xl shadow-sm border border-outline-variant/20">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-lg uppercase tracking-widest text-xs">
                Delivery Status
              </h3>
              <div className="relative flex flex-col gap-8">
                {/* Timeline Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-outline-variant/30"></div>
                <div
                  className="absolute left-[11px] top-2 w-[2px] bg-tertiary transition-all duration-1000"
                  style={{ height: orderStatus === "transit" ? "66%" : "100%" }}
                ></div>

                {/* Step 1: Ordered */}
                <div className="relative flex gap-md items-start">
                  <div className="z-10 bg-tertiary text-white rounded-full h-6 w-6 flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-bold text-label-bold text-primary text-sm">Ordered</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Oct 24, 09:15 AM</p>
                  </div>
                </div>

                {/* Step 2: Processing */}
                <div className="relative flex gap-md items-start">
                  <div className="z-10 bg-tertiary text-white rounded-full h-6 w-6 flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-bold text-label-bold text-primary text-sm">Processing</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Oct 24, 11:30 AM</p>
                  </div>
                </div>

                {/* Step 3: Out for Delivery */}
                <div className={`relative flex gap-md items-start transition-opacity ${orderStatus === "delivered" ? "opacity-100" : ""}`}>
                  <div
                    className={`z-10 rounded-full h-6 w-6 flex items-center justify-center shadow ${
                      orderStatus === "delivered"
                        ? "bg-tertiary text-white"
                        : "bg-white border-2 border-tertiary text-tertiary animate-pulse"
                    }`}
                  >
                    {orderStatus === "delivered" ? (
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check
                      </span>
                    ) : (
                      <div className="w-2.5 h-2.5 bg-tertiary rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-label-bold text-label-bold text-primary text-sm">Out for Delivery</h4>
                    <p className="font-body-sm text-body-sm text-primary font-bold italic text-xs">
                      {orderStatus === "transit" ? "Arriving in 15 mins" : "Completed today"}
                    </p>
                  </div>
                </div>

                {/* Step 4: Delivered */}
                <div className={`relative flex gap-md items-start transition-opacity duration-500 ${orderStatus === "delivered" ? "opacity-100" : "opacity-40"}`}>
                  <div
                    className={`z-10 rounded-full h-6 w-6 flex items-center justify-center shadow ${
                      orderStatus === "delivered" ? "bg-tertiary text-white" : "bg-outline-variant/50 text-white"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">home</span>
                  </div>
                  <div>
                    <h4 className={`font-label-bold text-label-bold text-sm ${orderStatus === "delivered" ? "text-primary" : "text-on-surface-variant"}`}>
                      Delivered
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      {orderStatus === "delivered" ? "Delivered at 14:32 PM" : "Expected by 15:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cargo details */}
            <section className="bg-white p-lg rounded-2xl shadow-sm border border-outline-variant/20">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-md uppercase tracking-widest text-xs">
                Cargo Details
              </h3>
              <div className="flex items-center gap-md mt-4">
                <div className="h-16 w-16 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    alt="Cargo contents"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzYWE4-RrP00oMYDuvwHgvs7TPoMJNQoYJsBrJkwdKU6dMuexk80mclfL9k4XYc4JbL6Nhww-PHHAsrdZDrWUxKNX-jq6t3zxNVqQpVtmXF7STjhR3bQBfU6ZuYZ6t0OYggQrtk2hpdeZSj1vMHLAMGFReEWAGeGtR_yCztq2o8VOI0IctQY6r9q2iq-Bc9UnZ_gWkPoEMZLi_YhdyW_NSYT7xcip9aEIjjfCCe8RTSj7B_OvnEvi2OcgXsps4aAFAtn6iLadOhh0"
                  />
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-primary text-sm">Premium Grade Cement & Rebar</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5">50 Units | 2.5 Tons</p>
                </div>
              </div>
            </section>
          </div>

          {/* Map View (Bento Center/Right, 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <section className="relative bg-surface-container-low rounded-2xl shadow-sm overflow-hidden h-[450px] lg:h-full min-h-[500px] border border-outline-variant/15 flex flex-col">
              {/* Map Placeholder Image */}
              <img
                alt="Map view of Kigali"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-30 pointer-events-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClP94MsaKu-7xeUOnFHfAJcOxDmqU3gUeGxPhSgad536Nhy6On9afdImq2wathSh11L5w9hRtVDoXxT2RmLRFPPKfIE_9mKeqdBVjbvnXeOc9d4vSOa7-hRYdVxi-8XpES8YrTK92jfho0Jj2yvmwvU8fe7F9hJqzkytmUiPzhNSQInyAQAcSEUo7kqsWTNpC3WGNp6Ywc-32pkhpz5CY1ieMX--sXxbPbn8o0d5mt-SFu0pyh5lhGJJAxgwbd3s8eYCOd7Mc6kIE"
              />

              {/* Simulated Map Overlay (SVG) */}
              <div className="absolute inset-0 p-lg z-10">
                <svg className="w-full h-full" viewBox="0 0 800 500">
                  <path
                    d="M100,400 Q200,350 300,380 T500,320 T700,100"
                    fill="none"
                    stroke="#73787c"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    className="opacity-40"
                  ></path>
                  <path
                    d="M100,400 Q200,350 300,380 T500,320"
                    fill="none"
                    stroke="#7c3400"
                    strokeLinecap="round"
                    strokeWidth="6"
                    className="transition-all duration-300"
                  ></path>
                  {/* Origin Marker */}
                  <circle cx="100" cy="400" fill="#334c5e" r="8" shadow-md="true"></circle>
                  {/* Current Truck Marker */}
                  {orderStatus === "transit" && (
                    <g transform={`translate(${truckPos.x}, ${truckPos.y})`} className="transition-transform duration-100">
                      <circle className="animate-ping opacity-25" cx="0" cy="0" fill="#7c3400" r="18"></circle>
                      <circle cx="0" cy="0" fill="#7c3400" r="12" className="shadow-md"></circle>
                      <circle cx="0" cy="0" fill="#ffffff" r="4"></circle>
                    </g>
                  )}
                  {/* Destination Marker */}
                  <g transform="translate(700, 100)">
                    <circle
                      cx="0"
                      cy="0"
                      fill={orderStatus === "delivered" ? "#7c3400" : "#334c5e"}
                      r="12"
                      className="shadow-md animate-pulse"
                    ></circle>
                    {orderStatus === "delivered" && (
                      <circle cx="0" cy="0" fill="#ffffff" r="4"></circle>
                    )}
                    <text
                      className={`font-label-bold text-label-bold text-[11px] font-bold`}
                      x="20"
                      y="5"
                      fill="#334c5e"
                    >
                      CONSTRUCTION SITE B (Vision City)
                    </text>
                  </g>
                </svg>
              </div>

              {/* Map Zoom Controls */}
              <div className="absolute top-md right-md flex flex-col gap-xs z-20">
                <button className="bg-white hover:bg-surface-container transition-colors w-8 h-8 rounded shadow-md flex items-center justify-center text-primary font-bold text-lg">
                  +
                </button>
                <button className="bg-white hover:bg-surface-container transition-colors w-8 h-8 rounded shadow-md flex items-center justify-center text-primary font-bold text-lg">
                  -
                </button>
                <button className="bg-white hover:bg-surface-container transition-colors w-8 h-8 rounded shadow-md flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-sm">my_location</span>
                </button>
              </div>

              {/* Driver Floating Card */}
              {orderStatus === "transit" && (
                <div className="absolute bottom-md left-md right-md lg:left-lg lg:right-auto lg:w-96 z-20 animate-in slide-in-from-bottom duration-300">
                  <div className="bg-white/90 backdrop-blur-md p-md rounded-xl shadow-xl flex items-center justify-between border border-white/20">
                    <div className="flex items-center gap-md">
                      <div className="relative">
                        <img
                          alt="Driver Headshot"
                          className="h-12 w-12 rounded-full object-cover border-2 border-tertiary"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7oe8uQaWXOiOHVWoQ7b4ionAGlDKieHZbrbD7zseHywK84_QwzyS8GKhsWrytupePHToZ8bC4GgkxfkSjX0W1KDd06pq9zDA7AJwhv8wkxWcglJMlmDOOUkvGBmpuxgNcgIhKyIOgS_XQ3f2slTGKJFEKXEyXFs7MTymTOjBg1eveyKGJhK9X1gaBgz9tHkyXx-sTaTmCE44T8KmybOxpNRN3mf6o3lM9fn0DusmjehhzQ2bX6jUNgFPPVCBK5IGZKtz_CpwQHBM"
                        />
                        <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h5 className="font-label-bold text-label-bold text-primary text-sm">Jean-Claude</h5>
                        <p className="text-xs text-on-surface-variant font-medium">Truck #RAE 123</p>
                      </div>
                    </div>
                    <div className="flex gap-xs">
                      <button
                        onClick={() => alert("Calling Jean-Claude (+250 788 000 123)...")}
                        className="h-9 w-9 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/95 transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                      </button>
                      <button
                        onClick={() => alert("Opening chat with Jean-Claude...")}
                        className="h-9 w-9 bg-tertiary text-white rounded-full flex items-center justify-center hover:bg-tertiary-container transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[16px]">message</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Action controls */}
        <div className="mt-lg flex flex-wrap gap-md justify-end">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to cancel this delivery request?")) {
                router.push("/marketplace");
              }
            }}
            className="px-lg py-3 border border-primary text-primary font-label-bold text-label-bold rounded-xl hover:bg-surface-container transition-all active:scale-95 text-xs uppercase tracking-wider"
          >
            Cancel Request
          </button>
          <button
            onClick={() => alert("Invoice downloaded! (#BC-882193-INV)")}
            className="px-lg py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-xl shadow hover:bg-primary/95 transition-all active:scale-95 text-xs uppercase tracking-wider"
          >
            View Invoice
          </button>
          {orderStatus === "transit" ? (
            <button
              onClick={handleConfirmReceipt}
              className="px-xl py-3 bg-tertiary text-on-tertiary font-label-bold text-label-bold rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-wider"
            >
              Confirm Receipt
            </button>
          ) : (
            <button
              disabled
              className="px-xl py-3 bg-emerald-100 text-emerald-800 font-label-bold text-label-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              Receipt Confirmed
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
