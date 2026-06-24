"use client";

import React, { useState } from "react";
import { PortalAuth } from "@/components/PortalAuth";
import { vendorsApi } from "@/lib/api";
import { buildVendorSalesReportPdf, downloadPdfBlob } from "@/lib/vendorPdfReport";
import { ApiError } from "@/lib/api/client";

export default function SalesAnalyticsPage() {
  const [reportDownloading, setReportDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const handleDownloadReport = async () => {
    setReportDownloading(true);
    setDownloadError("");
    try {
      const [analytics, store] = await Promise.all([vendorsApi.analytics(), vendorsApi.getMe()]);
      const chart = analytics.chartData as { labels?: string[]; revenue?: number[]; orders?: number[] } | undefined;
      const blob = buildVendorSalesReportPdf({
        storeName: store.storeName,
        generatedAt: new Date().toLocaleString(),
        totalEarnings: (analytics.totalEarnings as number) ?? 0,
        totalOrders: (analytics.totalOrders as number) ?? 0,
        averageRating: (analytics.averageRating as number) ?? 0,
        reviewCount: (analytics.reviewCount as number) ?? 0,
        chartLabels: chart?.labels ?? [],
        revenueSeries: chart?.revenue ?? [],
        ordersSeries: chart?.orders ?? [],
      });
      const safeName = store.storeName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      downloadPdfBlob(blob, `buildconnect-sales-report-${safeName}-${Date.now()}.pdf`);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      setDownloadError(err instanceof ApiError ? err.message : "Could not generate report");
    } finally {
      setReportDownloading(false);
    }
  };

  return (
    <div className="w-full">
      <PortalAuth requiredRole="vendor" />
      {downloadError && (
        <div className="mb-4 bg-error-container text-on-error-container p-3 rounded-xl text-sm">{downloadError}</div>
      )}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
            Business Intelligence
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Real-time performance metrics for your construction materials supply chain.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDownloadReport}
            className="px-6 py-2.5 bg-tertiary text-white font-label-bold text-label-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            {reportDownloading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                Preparing...
              </>
            ) : downloaded ? (
              <>
                <span className="material-symbols-outlined text-sm text-green-300">check_circle</span>
                Report Saved
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">download</span>
                Download report (PDF)
              </>
            )}
          </button>
          <div className="bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/30 flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors text-xs font-bold text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Last 30 Days
          </div>
        </div>
      </div>

      {/* Bento Grid - Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10 border-l-4 border-l-primary">
          <p className="text-label-bold font-label-bold text-on-surface-variant text-[10px] uppercase mb-2">
            Total Revenue
          </p>
          <div className="flex items-end justify-between flex-wrap gap-1">
            <span className="font-headline-md text-headline-md text-primary font-bold">RWF 4.28M</span>
            <span className="text-xs font-bold text-green-600 shrink-0 mb-1">+12.4%</span>
          </div>
        </div>
        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
          <p className="text-label-bold font-label-bold text-on-surface-variant text-[10px] uppercase mb-2">
            Order Conversion
          </p>
          <div className="flex items-end justify-between flex-wrap gap-1">
            <span className="font-headline-md text-headline-md text-primary font-bold">4.2%</span>
            <span className="text-xs font-bold text-green-600 shrink-0 mb-1">+0.8%</span>
          </div>
        </div>
        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
          <p className="text-label-bold font-label-bold text-on-surface-variant text-[10px] uppercase mb-2">
            Inventory Turn
          </p>
          <div className="flex items-end justify-between flex-wrap gap-1">
            <span className="font-headline-md text-headline-md text-primary font-bold">18.5x</span>
            <span className="text-xs font-bold text-tertiary shrink-0 mb-1">Target 20x</span>
          </div>
        </div>
        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-outline-variant/10">
          <p className="text-label-bold font-label-bold text-on-surface-variant text-[10px] uppercase mb-2">
            Avg Order Value
          </p>
          <div className="flex items-end justify-between flex-wrap gap-1">
            <span className="font-headline-md text-headline-md text-primary font-bold">RWF 85.2K</span>
            <span className="text-xs font-bold text-on-surface-variant shrink-0 mb-1">Steady</span>
          </div>
        </div>
      </div>

      {/* Charts & Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart Graphics */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Revenue Trends</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block"></span> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim block"></span> Target
              </span>
            </div>
          </div>
          {/* Chart visual representation */}
          <div className="h-64 relative flex items-end justify-between gap-3 mt-4 px-2">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              <div className="border-t border-outline"></div>
              <div className="border-t border-outline"></div>
              <div className="border-t border-outline"></div>
              <div className="border-t border-outline"></div>
            </div>
            {/* Custom line bar trends */}
            <div className="flex-1 h-[40%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 1.2M
              </div>
            </div>
            <div className="flex-1 h-[55%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 1.6M
              </div>
            </div>
            <div className="flex-1 h-[45%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 1.3M
              </div>
            </div>
            <div className="flex-1 h-[70%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 2.1M
              </div>
            </div>
            <div className="flex-1 h-[65%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 1.9M
              </div>
            </div>
            <div className="flex-1 h-[85%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 2.6M
              </div>
            </div>
            <div className="flex-1 h-[95%] bg-primary/10 border-t-2 border-primary relative group cursor-pointer hover:bg-primary/20 transition-all rounded-t">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                RWF 2.9M
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Category Breakdown (1 col) */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold mb-6">
              Sales Breakdown
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-label-bold font-label-bold text-on-surface">Cement (CIMERWA)</span>
                  <span className="text-label-md font-label-md">64%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[64%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-label-bold font-label-bold text-on-surface">Structural Steel</span>
                  <span className="text-label-md font-label-md">28%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[28%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-label-bold font-label-bold text-on-surface">Finishing Tiles</span>
                  <span className="text-label-md font-label-md">8%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[8%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Top category: CIMERWA 32.5N</span>
            <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
          </div>
        </div>
      </div>

      {/* Product Performances & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Top Performing Products
            </h3>
            <span className="text-primary text-xs font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
              <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center overflow-hidden border border-outline-variant/20">
                <img
                  alt="Cement"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbmyprAjNogIfAvqlXRd2kjlTUGwNjX1YROj4wfqMafdIDQkKCsv4W6q8My5TmIFB2ljca2M5dXq4Esu0hFahMS-36AvbG6tPU36S_21fmLJk0U1YV6Mltwv6FzkHaCwnAS16IV4Qdvaoi0FmVG0AiF8Wb0WFcGv8mQK4L4tHb_YuLRugMnDwwfJ8BIlyA6g5Xob2IBoTnv5t-KvTaMets7He-DvlAFKWX76RDfum8N6yhDB_Xgo0-x4v-NkwcwgPa9kXzWn4aJo0"
                />
              </div>
              <div className="flex-grow">
                <p className="font-label-bold text-label-bold text-on-surface text-sm">CIMERWA Cement 32.5N</p>
                <p className="text-xs text-on-surface-variant">1,240 bags sold</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-label-bold text-label-bold text-primary">RWF 14.8M</p>
                <p className="text-[10px] text-green-600 font-bold">+5%</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 hover:bg-surface-container-low transition-colors rounded-lg border-t border-outline-variant/10">
              <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center overflow-hidden border border-outline-variant/20">
                <img
                  alt="Steel"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARbnGf1SGcG-s-ZG8xgJL24FLOAcC2kP6qHcfdO3N-o4gsxtF_MjBrjRa-mW5Ei1MscPM7NUbsZGyXSZX5WxxXU5MTrOmVEij0VjHAUqrfTUMhADST6yxSskMuqlqp8cYhd7xuGlAqm48spEeX2g45ZswrU17ySKoJQi_pGibV6jRQraUBMxhJen0z8OCPE-xAu9_afc6qw2tMzy0nYl6cbSzcH6gsm394QpL6o59uC4j-Ll_H4dZiNuZ7EaYelOXGaDQdDPETaTo"
                />
              </div>
              <div className="flex-grow">
                <p className="font-label-bold text-label-bold text-on-surface text-sm">Structural Rebar 12mm</p>
                <p className="text-xs text-on-surface-variant">45 bundles sold</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-label-bold text-label-bold text-primary">RWF 9.2M</p>
                <p className="text-[10px] text-green-600 font-bold">+12%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Funnel chart */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/10">
          <h3 className="font-headline-md text-headline-md text-primary font-bold mb-6">
            Views to Sales Funnel
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-label-bold uppercase text-on-surface-variant">Product Views</span>
                <span className="text-xs font-bold text-on-surface">12,450</span>
              </div>
              <div className="w-full h-12 bg-primary/5 rounded-lg flex items-center px-4 overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full bg-primary/10 w-[100%] rounded-l-lg"></div>
                <span className="relative z-10 text-xs font-bold text-primary">Baseline Reach</span>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-label-bold uppercase text-on-surface-variant">Added to Cart</span>
                <span className="text-xs font-bold text-on-surface">1,820 (14.6%)</span>
              </div>
              <div className="w-full h-12 bg-primary/5 rounded-lg flex items-center px-4 overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full bg-primary/20 w-[60%] rounded-l-lg"></div>
                <span className="relative z-10 text-xs font-bold text-primary">High Intent Interest</span>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-label-bold uppercase text-on-surface-variant">Completed Orders</span>
                <span className="text-xs font-bold text-on-surface">522 (4.2%)</span>
              </div>
              <div className="w-full h-12 bg-primary/5 rounded-lg flex items-center px-4 overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full bg-primary w-[30%] rounded-l-lg"></div>
                <span className="relative z-10 text-xs font-bold text-white">Revenue Conversions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
