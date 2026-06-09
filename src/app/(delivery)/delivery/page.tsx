"use client";

import React, { useState } from "react";

interface ActiveShipment {
  id: string;
  customerName: string;
  sector: string;
  driverName: string;
  vehicle: string;
  eta: string;
  status: "On the Way" | "Loading" | "Delivered";
  statusColor: string;
}

const INITIAL_SHIPMENTS: ActiveShipment[] = [
  {
    id: "#BC-8821",
    customerName: "Jean-Luc Karangwa",
    sector: "Kimironko Sector",
    driverName: "Eric M.",
    vehicle: "Hino 300",
    eta: "14:20 PM",
    status: "On the Way",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "#BC-8819",
    customerName: "Nyarutarama Heights Ltd",
    sector: "Gasabo District",
    driverName: "David O.",
    vehicle: "TATA 407",
    eta: "Delayed",
    status: "Loading",
    statusColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "#BC-8815",
    customerName: "Prosper Uwizeye",
    sector: "Kabeza Hill",
    driverName: "Samuel T.",
    vehicle: "Isuzu ELF",
    eta: "11:15 AM",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
  },
];

export default function CarrierDispatchPage() {
  const [shipments, setShipments] = useState<ActiveShipment[]>(INITIAL_SHIPMENTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleOnboardDriver = () => {
    const driver = prompt("Enter new driver's full name:");
    if (driver) {
      triggerToast(`Driver ${driver} has been successfully onboarded!`);
    }
  };

  const handleStatusChange = (id: string) => {
    setShipments(
      shipments.map((s) => {
        if (s.id === id) {
          if (s.status === "Loading") {
            return { ...s, status: "On the Way", statusColor: "bg-blue-100 text-blue-700", eta: "45 mins" };
          } else if (s.status === "On the Way") {
            return { ...s, status: "Delivered", statusColor: "bg-green-100 text-green-700", eta: "Arrived" };
          } else {
            return { ...s, status: "Loading", statusColor: "bg-orange-100 text-orange-700", eta: "Pending" };
          }
        }
        return s;
      })
    );
    triggerToast(`Shipment status updated for ${id}!`);
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

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px] border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-label-bold text-label-bold uppercase text-xs">
              Active Fleets
            </span>
            <span className="material-symbols-outlined text-emerald-800 text-2xl">local_shipping</span>
          </div>
          <div className="mt-4">
            <p className="font-headline-lg text-headline-lg font-bold text-primary">12</p>
            <p className="text-emerald-700 font-label-md text-label-md flex items-center gap-1 mt-1 font-semibold">
              <span className="material-symbols-outlined text-sm">trending_up</span> 85% utilization
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px] border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-label-bold text-label-bold uppercase text-xs">
              Avg Delivery Time
            </span>
            <span className="material-symbols-outlined text-emerald-800 text-2xl">schedule</span>
          </div>
          <div className="mt-4">
            <p className="font-headline-lg text-headline-lg font-bold text-primary">
              42<span className="text-body-sm font-normal">m</span>
            </p>
            <p className="text-error font-label-md text-label-md flex items-center gap-1 mt-1 font-semibold">
              <span className="material-symbols-outlined text-sm">trending_down</span> +4m vs yesterday
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px] border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-label-bold text-label-bold uppercase text-xs">
              Pending Loads
            </span>
            <span className="material-symbols-outlined text-emerald-800 text-2xl">pending_actions</span>
          </div>
          <div className="mt-4">
            <p className="font-headline-lg text-headline-lg font-bold text-primary">08</p>
            <p className="text-on-surface-variant font-label-md text-label-md mt-1">
              Awaiting driver assignment
            </p>
          </div>
        </div>

        <div className="bg-emerald-800 p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[140px] text-white">
          <div className="flex justify-between items-start">
            <span className="font-label-bold text-label-bold uppercase opacity-85 text-xs">
              Efficiency Score
            </span>
            <span className="material-symbols-outlined text-2xl">speed</span>
          </div>
          <div className="mt-4">
            <p className="font-headline-lg text-headline-lg font-bold">94%</p>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-300 h-full rounded-full" style={{ width: "94%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Delivery Map Coverage */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden h-[400px] relative border border-outline-variant/10">
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-md flex items-center gap-2 border border-outline-variant/20">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-label-bold text-label-bold text-primary text-xs uppercase tracking-wider">
                  Live Tracking: Kigali Metro
                </span>
              </div>
            </div>

            <div className="w-full h-full bg-surface-container relative overflow-hidden">
              <img
                alt="Kigali Delivery Routes"
                className="w-full h-full object-cover opacity-75 grayscale-[0.2]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpO4FPPdUxe5v5baiYBE6szG76S0gd8HDAfnMktU1dCfe4CBJSD06iZGSLuAqo8rJ52l2IMI6xTIHehuSgjD3zroe0OTlfcm0hZY4jBVHoc1ZA0_zwXkZAcG6FvdVpa5tsAaNKqGmANkXO3rp-AVpapXEBa8SN8y8w8QoCC8WpsfW-oIDQTI_icjWS5F2igfHtfhxfuQJQBNnwTyQuuJfDbWdEYjs7pMYwQ0PC6zkinUU4OJREQ0WeggAqhHoENUJzg8ZoO1G9VbY"
              />
              {/* Map pinpoints overlay */}
              <div className="absolute top-[30%] left-[40%] w-8 h-8 flex items-center justify-center animate-bounce">
                <span className="material-symbols-outlined text-tertiary text-4xl">location_on</span>
              </div>
              <div className="absolute bottom-[40%] right-[30%] w-8 h-8 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
              </div>
            </div>
          </div>

          {/* Active Shipments Table */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-outline-variant/10">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-label-bold text-label-bold uppercase text-on-surface-variant text-xs">
                Active Shipments
              </h3>
              <button
                onClick={() => triggerToast("Dispatch manifest spreadsheet exported successfully!")}
                className="text-primary font-label-md text-label-md hover:underline cursor-pointer font-bold text-xs"
              >
                Export Manifest
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container text-primary font-label-bold border-b border-outline-variant/15 text-xs">
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Fleet Partner</th>
                    <th className="px-6 py-3">ETA</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {shipments.map((s) => (
                    <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{s.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">{s.customerName}</span>
                          <span className="text-[10px] text-on-surface-variant font-medium">
                            {s.sector}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-secondary-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">person</span>
                          </div>
                          <span className="text-xs font-semibold text-on-surface">
                            {s.driverName} ({s.vehicle})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{s.eta}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleStatusChange(s.id)}
                          className={`px-3 py-1 rounded-full font-label-bold text-[10px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 ${s.statusColor}`}
                          title="Click to toggle status"
                        >
                          {s.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Info Panels */}
        <div className="flex flex-col gap-6">
          {/* Route Performance */}
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10">
            <h3 className="font-label-bold text-label-bold uppercase text-on-surface-variant text-xs mb-4">
              Route Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Kigali-Gisenyi Corridor</span>
                  <span className="font-bold text-primary">88%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Metro Distribution Hub</span>
                  <span className="font-bold text-primary">96%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Rural Districts Access</span>
                  <span className="font-bold text-tertiary">74%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: "74%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Warehouse Capacity SVG */}
          <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">factory</span>
              <h3 className="font-label-bold text-label-bold uppercase text-on-surface-variant text-xs">
                Warehouse Capacity Alpha
              </h3>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3.5"
                  />
                  <path
                    className="stroke-current text-emerald-800"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="65, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-primary">65%</span>
                  <span className="text-[9px] uppercase font-semibold text-on-surface-variant">Capacity</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-surface-container p-2.5 rounded text-center">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">READY LOAD</p>
                <p className="font-bold text-sm text-primary">440 t</p>
              </div>
              <div className="bg-surface-container p-2.5 rounded text-center">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">INBOUND DOCK</p>
                <p className="font-bold text-sm text-primary">120 t</p>
              </div>
            </div>
          </div>

          {/* Onboarding Driver Card */}
          <div
            onClick={handleOnboardDriver}
            className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer active:scale-95 transition-all border border-primary/20"
          >
            <div className="relative z-10 space-y-4">
              <h4 className="font-headline-md text-headline-md font-bold text-white">New Fleet Entry</h4>
              <p className="text-body-sm opacity-85 leading-relaxed text-xs">
                Register a new independent driver to the BuildConnect logistics network.
              </p>
              <button
                type="button"
                className="bg-tertiary text-on-tertiary px-4 py-2 rounded-lg font-label-bold text-xs uppercase flex items-center gap-2 hover:brightness-105 transition-all shrink-0 cursor-pointer"
              >
                Onboard Driver
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <span
              className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform pointer-events-none select-none"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              add_road
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
