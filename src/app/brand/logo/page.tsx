"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LogoShowcasePage() {
  const [copied, setCopied] = useState(false);

  const svgCode = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="80" width="120" height="80" rx="4" fill="#334C5E" />
  <path d="M40 80 L100 30 L160 80" stroke="#7C3400" stroke-width="12" fill="none" stroke-linejoin="round" />
  <circle cx="100" cy="100" r="25" fill="white" />
  <path d="M85 100 H115 M100 85 V115" stroke="#7C3400" stroke-width="6" stroke-linecap="round" />
</svg>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="px-margin-mobile md:px-margin-desktop py-lg max-w-5xl mx-auto space-y-lg">
        {/* Breadcrumb & Header */}
        <header className="space-y-2">
          <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
            <Link className="hover:text-primary transition-colors" href="/brand/theme">
              Design DNA
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-medium">Brand Logo Assets</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            Logo & Brand Assets
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl">
            The BuildConnect Rwanda identity represents structural integrity and precision supply chain logistics.
          </p>
        </header>

        {/* Logo Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo Card */}
          <div className="md:col-span-5 bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col items-center gap-6">
            <div className="w-full aspect-square bg-surface rounded-lg flex items-center justify-center p-8 border border-outline-variant/10">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                <rect x="40" y="80" width="120" height="80" rx="4" fill="#334c5e" />
                <path d="M40 80 L100 30 L160 80" stroke="#7c3400" strokeWidth="12" fill="none" strokeLinejoin="round" />
                <circle cx="100" cy="100" r="25" fill="white" />
                <path d="M85 100 H115 M100 85 V115" stroke="#7c3400" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-full flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 h-11 bg-primary text-on-primary rounded-lg font-label-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 duration-100"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                {copied ? "Copied SVG!" : "Copy SVG Code"}
              </button>
              <a
                href={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
                download="buildconnect_rwanda_logo.svg"
                className="flex-grow-0 px-4 h-11 border border-primary text-primary hover:bg-primary/5 rounded-lg flex items-center justify-center cursor-pointer active:scale-95 duration-100"
                title="Download SVG file"
              >
                <span className="material-symbols-outlined">download</span>
              </a>
            </div>
          </div>

          {/* Design Anatomy details */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary font-bold border-b border-outline-variant/10 pb-4">
              Logo Anatomy
            </h3>
            <div className="space-y-6 text-on-surface-variant font-body-md">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">foundation</span>
                </div>
                <div>
                  <h4 className="font-label-bold text-on-surface text-sm">Industrial Base (Slate Blue)</h4>
                  <p className="text-xs leading-relaxed mt-1">
                    The solid base block represents steel framework structures and the steady foundations of Kigali quincailleries.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/10 text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">roofing</span>
                </div>
                <div>
                  <h4 className="font-label-bold text-on-surface text-sm">Built Environment (Burnt Orange)</h4>
                  <p className="text-xs leading-relaxed mt-1">
                    The triangular truss represents active roofing, development, and expansion across the hills of Rwanda.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">center_focus_strong</span>
                </div>
                <div>
                  <h4 className="font-label-bold text-on-surface text-sm">Precision Targeting (Crosshair)</h4>
                  <p className="text-xs leading-relaxed mt-1">
                    The centered white target and crosshair represent digital accuracy in logistics and freight route dispatching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
