"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DeliveryServicesPage() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcWeight, setCalcWeight] = useState("");
  const [calcZone, setCalcZone] = useState("Kigali Metro");
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(calcWeight) || 0;
    let base = 0;
    if (calcZone === "Kigali Metro") {
      base = weight > 10 ? 0 : 5000; // Free for heavy loads (bulk order simulation)
    } else if (calcZone === "Peri-Urban") {
      base = 15000 + weight * 500;
    } else {
      base = 45000 + weight * 1000;
    }

    setCalculatedFee(base);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[99] bg-emerald-800 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-10">
        <div className="space-y-4">
          <span className="text-tertiary font-label-bold text-label-bold tracking-widest uppercase text-xs">
            Kigali Industrial Hub
          </span>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary leading-tight font-bold">
            Solid Ground for Your Logistics.
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Transparency in every ton. Whether it's structural steel or finishing tiles, our delivery network ensures your site never stands still.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 cursor-pointer text-xs uppercase"
            >
              Calculate Fee
              <span className="material-symbols-outlined text-sm">calculate</span>
            </button>
            <Link
              href="/orders/track"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-label-bold hover:bg-primary/5 transition-all text-xs uppercase cursor-pointer text-center"
            >
              Track Shipment
            </Link>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video lg:aspect-square">
          <img
            alt="Warehouse Operations"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWKMqgdY0qxKjjOIvzQ9p0REEIfejZKyWuK7-sb8EttHBIdWeVIXv917cPC3HD6PPd1oYGkOd31zu9Kxx3v0x_u8whfSVOs7Sf85IY9ScOsaI6OlbGJbF9WFr2W4sOKPBJ0NMkShXDzIrbsiyB33ZJMHombxsAFu7Hwt0GswFjeyW6NM_kirz1ekseueeL-MFrF8OQt9wMeTRbqFowPQ7CVkEM633KTIRAfrLvU6_knLEdRGc_rCZYKkFaKAzG3sjOIZM67BpxgJQ"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-lg flex items-center justify-between border-l-4 border-l-tertiary border border-outline-variant/30">
            <div>
              <p className="font-label-bold text-primary text-sm">Live Hub Traffic</p>
              <p className="text-xs text-on-surface-variant font-medium">Optimal loading times currently active.</p>
            </div>
            <div className="flex items-center text-emerald-700 gap-1 shrink-0">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span className="text-label-bold text-xs uppercase tracking-wider">FAST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Drawer/Modal */}
      {calcOpen && (
        <div className="bg-white border border-outline-variant/30 rounded-xl p-6 shadow-md mb-8 max-w-xl animate-in slide-in-from-top duration-200">
          <h3 className="font-headline-md text-headline-md text-primary font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">calculate</span>
            Freight Calculator
          </h3>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-bold text-on-surface-variant mb-1 uppercase">
                  ESTIMATED WEIGHT (TONS)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5.5"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full h-11 px-3 border border-outline-variant/30 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  required
                  step="0.1"
                  min="0.1"
                />
              </div>
              <div>
                <label className="block text-xs font-label-bold text-on-surface-variant mb-1 uppercase">
                  DESTINATION ZONE
                </label>
                <select
                  value={calcZone}
                  onChange={(e) => setCalcZone(e.target.value)}
                  className="w-full h-11 px-3 border border-outline-variant/30 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm cursor-pointer"
                >
                  <option>Kigali Metro</option>
                  <option>Peri-Urban</option>
                  <option>Rural Districts</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between pt-2">
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase active:scale-95 cursor-pointer"
              >
                Get Cost Estimate
              </button>
              {calculatedFee !== null && (
                <div className="text-right">
                  <span className="text-xs text-on-surface-variant block font-medium">Estimated Fee:</span>
                  <span className="font-bold text-lg text-tertiary">
                    {calculatedFee === 0 ? "FREE DELIVERY" : `${calculatedFee.toLocaleString()} RWF`}
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Bento Grid: Service Options */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col items-center text-center space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
          <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px]">store</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">Self-Pickup</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Collect directly from Kigali Industrial Hub. No loading fees, immediate availability.
          </p>
          <div className="pt-2 text-tertiary font-label-bold text-sm">RWF 0</div>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-primary/15 shadow-sm flex flex-col items-center text-center space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px]">local_shipping</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">Doorstep Delivery</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Last-mile logistics to your construction site with heavy-vehicle crane off-loading support.
          </p>
          <div className="pt-2 text-tertiary font-label-bold text-sm">From RWF 5,000</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col items-center text-center space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
          <div className="w-16 h-16 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px]">hub</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">Project Logistics</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Scheduled multi-load deliveries locked to lock pricing over large-scale development phases.
          </p>
          <div className="pt-2 text-tertiary font-label-bold text-sm">Custom Quote</div>
        </div>
      </section>

      {/* Delivery Zone & Fee Schedule */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-low rounded-2xl p-6 mb-10 border border-outline-variant/20">
        {/* Map Visualization */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Coverage Map</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block"></span> Metro
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary block"></span> Rural
              </div>
            </div>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-outline-variant/20 relative">
            <img
              alt="Kigali Delivery Zones"
              className="w-full h-full object-cover grayscale-[0.4]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1hFSCOzLCDP2hBZ9AbHtmn-qOhPUUNY3oT3aTMkRC5eeUhXmm_zWF_MyjhCe1SrwGbz1y4OXiN6WkBdvUZtt2uzF_pcRO6nTjfe8enzZqdOiYItZ2v3R67RYv8Cjhxoz_7XkSsP4CocJRwPMviwtI40Yaut-Ei_eyGHZf845OHPXthWkX60WJuAgMmIY_9RSAndcNSnAsmWbdTFX7mG8yCQX8uzqu9uwdzC3pHnoX_CJe_UMuQA5tOvwQADRKffLqanZrRKl3fto"
            />
            <div className="absolute inset-0 p-4">
              <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-primary/20 animate-ping rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Fee & Timeline Table */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">Service Schedule</h3>
          <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant/40 border-b border-outline-variant/20 text-xs font-label-bold text-primary">
                  <th className="p-4">Zone</th>
                  <th className="p-4">Cost</th>
                  <th className="p-4">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-on-surface">Kigali Metro</p>
                    <p className="text-xs text-on-surface-variant font-medium">Nyarugenge, Kicukiro, Gasabo</p>
                  </td>
                  <td className="p-4 text-tertiary font-bold">FREE*</td>
                  <td className="p-4 text-on-surface font-medium">Same-day</td>
                </tr>
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-on-surface">Peri-Urban</p>
                    <p className="text-xs text-on-surface-variant font-medium">Bugesera, Rwamagana</p>
                  </td>
                  <td className="p-4 font-bold text-on-surface">15,000 RWF</td>
                  <td className="p-4 text-on-surface font-medium">24 Hours</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-on-surface">Rural Districts</p>
                    <p className="text-xs text-on-surface-variant font-medium">Upcountry Hubs</p>
                  </td>
                  <td className="p-4 font-bold text-on-surface">45,000+ RWF</td>
                  <td className="p-4 text-on-surface font-medium">48-72 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-on-surface-variant italic px-2">
            *Free delivery applies to orders above RWF 500,000 within the Metro zone.
          </p>
          <div className="mt-auto p-4 bg-tertiary-fixed rounded-xl flex items-start gap-4 border border-tertiary/10">
            <span className="material-symbols-outlined text-tertiary text-2xl shrink-0">info</span>
            <p className="text-xs text-on-tertiary-fixed font-medium leading-relaxed">
              Heavy cargo requiring crane offloading may incur additional equipment fees. Contact support for site assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Materials Handling Guarantee */}
      <section className="bg-primary text-on-primary rounded-2xl overflow-hidden relative border border-primary/20 shadow-md">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="p-8 md:p-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-headline-lg text-white font-bold mb-4">Handling with Precision.</h2>
            <p className="text-on-primary-container text-body-lg mb-6 leading-relaxed">
              We understand the fragility of ceramics and the weight of rebar. Our logistics team is trained specifically for construction material handling.
            </p>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                <span>Moisture-protected transport for cement and plaster bags.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                <span>Shock-absorbent loading for premium tiles and glass handles.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                <span>Real-time GPS tracking link for all site deliveries.</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              className="rounded-lg shadow-lg w-full h-40 object-cover border-2 border-white/10"
              alt="Driver securing load"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOwjnBExwGvVP9EZbBl2gx_jBRD6qQ4E93Y-r-R72sh94HWFNEdoXo3aYYF7BoWffn78YLPEO-jkYQWtx_dEiqPi2Se2SVJfeoPUj_1eGi-_oZLYMXGwUj8Tg5fSAMGuRwr7DXNXykOkQ1QTMMgZIkzn-Ebuxf_cT4VqCB4h_UujgNh4HoLN8SrRRwUUAwUb1dyMQh9GDapBfW7F707CBLHKMx8lJ9yZtwiksGnmeG3IvDw5b1SJQKMbyTLPKsGNvMZw3SNy-y84o"
            />
            <img
              className="rounded-lg shadow-lg w-full h-40 object-cover mt-6 border-2 border-white/10"
              alt="Logistics truck"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5CXIooz6dtilmV--fQCuFVZ79oddn1cxbQN6KVHl_2DQuGrGRcN4KLvMw1grD3FZ7QmD735znZq7qhZJzFwuyjaTmUsbsQMEH3taEV2eLPOsXjBEadu_4UE3d0aNjWKNiFRlqT5CHdkIcUvzDKRvTImipV2Owquwicr0kOULGOtQQy1XRsGpY4tQ_NtBXqDwCWoQxEVrxmvAlVgD9PJQiJRlauRRaERVUzjbB2Xb9Dyn6rkPLQM80Ls7tRzkWUUdQTGv7E55xXY"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
