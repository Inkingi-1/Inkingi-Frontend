"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { PortalAuth } from "@/components/PortalAuth";
import { deliveriesApi } from "@/lib/api";
import { ApiDelivery, ApiOrder } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

const STATUS_LABELS: Record<string, { label: string; color: string; next?: string }> = {
  assigned: { label: "Assigned", color: "bg-orange-100 text-orange-700", next: "on_the_way" },
  packed: { label: "Loading", color: "bg-orange-100 text-orange-700", next: "on_the_way" },
  confirmed: { label: "Confirmed", color: "bg-slate-100 text-slate-700", next: "on_the_way" },
  pending: { label: "Pending", color: "bg-slate-100 text-slate-700", next: "on_the_way" },
  on_the_way: { label: "On the way", color: "bg-primary-container text-on-primary-container", next: "delivered" },
  delivered: { label: "Delivered", color: "bg-secondary-container text-on-secondary-container" },
};

function orderFromDelivery(d: ApiDelivery): (ApiOrder & { customer?: { fullName?: string; phone?: string } }) | null {
  if (!d.order || typeof d.order === "string") return null;
  return d.order as ApiOrder & { customer?: { fullName?: string; phone?: string } };
}

function customerName(order: ReturnType<typeof orderFromDelivery>): string {
  if (!order?.customer || typeof order.customer === "string") return "Customer";
  return order.customer.fullName || "Customer";
}

function dropoffLabel(d: ApiDelivery): string {
  const drop = d.dropoffLocation as { city?: string; district?: string; street?: string } | undefined;
  if (!drop) return "Kigali";
  return [drop.street, drop.district, drop.city].filter(Boolean).join(", ") || "Kigali";
}

export default function CarrierDispatchPage() {
  const [shipments, setShipments] = useState<ApiDelivery[]>([]);
  const [earnings, setEarnings] = useState({ totalEarnings: 0, deliveryCount: 0 });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    setLoadError("");
    try {
      const [assigned, earn] = await Promise.all([deliveriesApi.assigned(), deliveriesApi.earnings()]);
      setShipments(assigned);
      setEarnings({
        totalEarnings: earn.totalEarnings || 0,
        deliveryCount: earn.deliveryCount || 0,
      });
    } catch (err) {
      setShipments([]);
      setLoadError(err instanceof ApiError ? err.message : "Could not load deliveries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshData();
    const interval = setInterval(() => void refreshData(), 30_000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleOnboardDriver = () => {
    const driver = prompt("Enter new driver's full name:");
    if (driver?.trim()) {
      triggerToast(`Driver ${driver.trim()} has been successfully onboarded!`);
    }
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const meta = STATUS_LABELS[currentStatus] || STATUS_LABELS.assigned;
    const next = meta.next;
    if (!next) return;

    setUpdatingId(id);
    try {
      await deliveriesApi.updateStatus(id, next);
      if (next === "delivered") {
        await deliveriesApi.confirm(id);
      }
      await refreshData();
      triggerToast(`Status updated to ${next.replace(/_/g, " ")}`);
    } catch {
      triggerToast("Failed to update. Sign in as driver@buildconnect.rw");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportManifest = () => {
    if (!shipments.length) {
      triggerToast("No active shipments to export");
      return;
    }
    const rows = [
      ["Order ID", "Customer", "Drop-off", "Status", "Created"],
      ...shipments.map((s) => {
        const order = orderFromDelivery(s);
        return [
          order?.orderNumber || s._id.slice(-6),
          customerName(order),
          dropoffLabel(s),
          s.status,
          s.createdAt ? new Date(s.createdAt).toLocaleString() : "",
        ];
      }),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buildconnect-manifest-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("Dispatch manifest downloaded");
  };

  const pendingCount = shipments.filter((s) => s.status !== "on_the_way").length;

  return (
    <div className="w-full animate-in fade-in duration-300 pb-20 lg:pb-0">
      <PortalAuth requiredRole="carrier" />

      {toastMessage && (
        <div className="fixed top-20 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
          <span className="font-label-bold">{toastMessage}</span>
        </div>
      )}

      {loadError && (
        <div className="mb-6 bg-error-container text-on-error-container p-3 rounded-xl text-sm flex items-center justify-between gap-4">
          <span>{loadError}</span>
          <button type="button" onClick={() => void refreshData()} className="font-bold underline shrink-0">
            Retry
          </button>
        </div>
      )}

      <section className="mb-6">
        <h1 className="font-headline-lg text-primary font-bold">Dispatch dashboard</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Manage assigned deliveries and update status for customer tracking.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10 min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold uppercase text-xs">Active fleets</span>
            <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
          </div>
          <p className="font-headline-lg font-bold text-primary mt-4">{shipments.length}</p>
          <p className="text-primary/80 text-sm mt-1 font-semibold">Assigned to you</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10 min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold uppercase text-xs">Avg delivery time</span>
            <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
          </div>
          <p className="font-headline-lg font-bold text-primary mt-4">
            42<span className="text-body-sm font-normal">m</span>
          </p>
          <p className="text-on-surface-variant text-sm mt-1">Estimated metro route</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10 min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold uppercase text-xs">Pending loads</span>
            <span className="material-symbols-outlined text-primary text-2xl">pending_actions</span>
          </div>
          <p className="font-headline-lg font-bold text-primary mt-4">{pendingCount}</p>
          <p className="text-on-surface-variant text-sm mt-1">
            {earnings.deliveryCount} completed · RWF {earnings.totalEarnings.toLocaleString()} earned
          </p>
        </div>

        <div className="bg-primary p-6 rounded-xl shadow-lg min-h-[140px] text-on-primary">
          <div className="flex justify-between items-start">
            <span className="font-bold uppercase opacity-90 text-xs">Efficiency score</span>
            <span className="material-symbols-outlined text-2xl">speed</span>
          </div>
          <p className="font-headline-lg font-bold mt-4">94%</p>
          <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-secondary-fixed h-full rounded-full" style={{ width: "94%" }} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[360px] relative border border-outline-variant/10">
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-md flex items-center gap-2 border border-outline-variant/20">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-bold text-primary text-xs uppercase tracking-wider">
                  Live tracking: Kigali metro
                </span>
              </div>
            </div>
            <div className="w-full h-full bg-surface-container relative overflow-hidden">
              <img
                alt="Kigali delivery routes"
                className="w-full h-full object-cover opacity-75 grayscale-[0.2]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpO4FPPdUxe5v5baiYBE6szG76S0gd8HDAfnMktU1dCfe4CBJSD06iZGSLuAqo8rJ52l2IMI6xTIHehuSgjD3zroe0OTlfcm0hZY4jBVHoc1ZA0_zwXkZAcG6FvdVpa5tsAaNKqGmANkXO3rp-AVpapXEBa8SN8y8w8QoCC8WpsfW-oIDQTI_icjWS5F2igfHtfhxfuQJQBNnwTyQuuJfDbWdEYjs7pMYwQ0PC6zkinUU4OJREQ0WeggAqhHoENUJzg8ZoO1G9VbY"
              />
              <div className="absolute top-[30%] left-[40%] animate-bounce">
                <span className="material-symbols-outlined text-primary text-4xl">location_on</span>
              </div>
              <div className="absolute bottom-[40%] right-[30%]">
                <span className="material-symbols-outlined text-secondary text-3xl">local_shipping</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-bold uppercase text-on-surface-variant text-xs">Active shipments</h3>
              <button
                type="button"
                onClick={handleExportManifest}
                className="text-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Export manifest (CSV)
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container text-primary font-bold border-b border-outline-variant/15 text-xs">
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Drop-off</th>
                    <th className="px-6 py-3">ETA</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                        Loading assignments...
                      </td>
                    </tr>
                  ) : shipments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                        No active deliveries. Place an order as{" "}
                        <strong>customer@buildconnect.rw</strong> — it auto-assigns to the demo driver.
                      </td>
                    </tr>
                  ) : (
                    shipments.map((s) => {
                      const order = orderFromDelivery(s);
                      const st = STATUS_LABELS[s.status] || { label: s.status, color: "bg-slate-100 text-slate-700" };
                      const canAdvance = Boolean(st.next);
                      return (
                        <tr key={s._id} className="hover:bg-surface-container-low transition-colors">
                          <td className="px-6 py-4 font-bold text-primary">
                            {order?.orderNumber || s._id.slice(-6)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-on-surface">{customerName(order)}</span>
                          </td>
                          <td className="px-6 py-4 text-xs text-on-surface-variant max-w-[180px] truncate">
                            {dropoffLabel(s)}
                          </td>
                          <td className="px-6 py-4 font-medium text-on-surface-variant">~45 min</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              type="button"
                              disabled={!canAdvance || updatingId === s._id}
                              onClick={() => handleStatusChange(s._id, s.status)}
                              className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all ${
                                canAdvance ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default opacity-80"
                              } ${st.color} disabled:opacity-50`}
                              title={canAdvance ? "Click to advance status" : "Completed"}
                            >
                              {updatingId === s._id ? "Updating..." : st.label}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <h3 className="font-bold uppercase text-on-surface-variant text-xs mb-4">Route performance</h3>
            <div className="space-y-4">
              {[
                { label: "Kigali–Gisenyi corridor", pct: 88 },
                { label: "Metro distribution hub", pct: 96 },
                { label: "Rural districts access", pct: 74 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{row.label}</span>
                    <span className="font-bold text-primary">{row.pct}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer" onClick={handleOnboardDriver}>
            <h4 className="font-headline-md font-bold">New fleet entry</h4>
            <p className="text-body-sm opacity-90 leading-relaxed text-xs mt-2">
              Register a new independent driver to the BuildConnect logistics network.
            </p>
            <button
              type="button"
              className="mt-4 bg-white text-primary px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:brightness-105 transition-all"
            >
              Onboard driver
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <Link
            href="/delivery/services"
            className="bg-white p-6 rounded-xl border border-primary/20 shadow-sm hover:border-primary/40 transition-colors block"
          >
            <span className="material-symbols-outlined text-primary text-2xl mb-2">request_quote</span>
            <h4 className="font-bold text-primary">Logistics offers</h4>
            <p className="text-xs text-on-surface-variant mt-1">Fee calculator and service tiers</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
