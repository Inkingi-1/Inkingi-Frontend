"use client";

import React, { useState } from "react";
import Link from "next/link";

interface BrandColor {
  name: string;
  hex: string;
  desc: string;
  type: "Primary" | "Secondary" | "Tertiary" | "Neutral";
}

const BRAND_COLORS: BrandColor[] = [
  { name: "Primary (Slate Blue)", hex: "#334C5E", desc: "Main branding blocks, header navigations, and buttons.", type: "Primary" },
  { name: "Primary Container", hex: "#4B6477", desc: "Background containers for cards and alert panels.", type: "Primary" },
  { name: "Secondary (Charcoal)", hex: "#516169", desc: "Sidebar drawers, layout anchors, and footers.", type: "Secondary" },
  { name: "Tertiary (Burnt Orange)", hex: "#7C3400", desc: "High-emphasis CTAs, checkout buttons, and order alerts.", type: "Tertiary" },
  { name: "Tertiary Container", hex: "#A24500", desc: "Secondary attention blocks and status warnings.", type: "Tertiary" },
  { name: "Surface Bright", hex: "#F7F9FC", desc: "Canvas backgrounds and main body area fill.", type: "Neutral" },
  { name: "Surface Container", hex: "#ECEEF1", desc: "List rows, separators, and inactive element borders.", type: "Neutral" },
  { name: "On Surface", hex: "#191C1E", desc: "Main typography titles, body text, and dark iconography.", type: "Neutral" },
];

export default function BrandThemePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState("BuildConnect: Solid Ground for Modern Construction");

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="px-margin-mobile md:px-margin-desktop py-lg max-w-5xl mx-auto space-y-xl">
        {/* Toast Notification */}
        {copiedColor && (
          <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <span className="material-symbols-outlined text-green-400">check_circle</span>
            <span className="font-label-bold">Copied color {copiedColor} to clipboard!</span>
          </div>
        )}

        {/* Header */}
        <header className="space-y-2">
          <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-medium">Theme Specifications</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            BuildConnect Design DNA
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            A comprehensive design system bridging the gap between heavy structural construction and high-efficiency digital logistics.
          </p>
        </header>

        {/* Philosophy Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-3">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Industrial Reliability</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We invoke a feeling of "Solid Ground". Our color choices represent construction steel framework, structural bricks, and heavy equipment, balanced with white space to evoke stability and trust.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-3">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Modern SaaS Precision</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We balance rugged materials with high legibility typography, fluid grids, and functional elevation levels. Data points, shipping coordinates, and stock listings are clean and accessible.
            </p>
          </div>
        </section>

        {/* Colors Palette Section */}
        <section className="space-y-6">
          <h3 className="font-headline-md text-headline-md text-primary font-bold border-b border-outline-variant/10 pb-4">
            Color Swatches (Click to Copy Hex)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_COLORS.map((color) => (
              <div
                key={color.hex}
                onClick={() => handleCopyColor(color.hex)}
                className="bg-white rounded-xl border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div
                  className="h-24 w-full relative"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="absolute bottom-2 right-2 bg-black/40 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                    {color.hex}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-tertiary">
                    {color.type}
                  </span>
                  <h4 className="font-label-bold text-on-surface text-sm">{color.name}</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed min-h-[44px]">
                    {color.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Testing Playground */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/10 pb-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Typography &amp; Scale Playground
            </h3>
            <input
              type="text"
              className="px-4 py-2 border border-outline-variant rounded-lg text-sm max-w-sm outline-none focus:ring-2 focus:ring-primary/20 w-full"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Type to preview font style..."
            />
          </div>

          <div className="space-y-6 divide-y divide-outline-variant/10">
            {/* Headline XL */}
            <div className="pt-6 first:pt-0">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-label-bold text-[10px] text-outline uppercase">Headline XL (Hanken Grotesk - 800)</span>
                <span className="text-xs text-on-surface-variant">48px / Line height: 56px</span>
              </div>
              <p className="font-headline-xl text-headline-xl text-primary font-extrabold truncate">
                {previewText}
              </p>
            </div>

            {/* Headline LG */}
            <div className="pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-label-bold text-[10px] text-outline uppercase">Headline LG (Hanken Grotesk - 700)</span>
                <span className="text-xs text-on-surface-variant">32px / Line height: 40px</span>
              </div>
              <p className="font-headline-lg text-headline-lg text-primary font-bold truncate">
                {previewText}
              </p>
            </div>

            {/* Headline MD */}
            <div className="pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-label-bold text-[10px] text-outline uppercase">Headline MD (Hanken Grotesk - 600)</span>
                <span className="text-xs text-on-surface-variant">24px / Line height: 32px</span>
              </div>
              <p className="font-headline-md text-headline-md text-primary font-semibold truncate">
                {previewText}
              </p>
            </div>

            {/* Body LG */}
            <div className="pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-label-bold text-[10px] text-outline uppercase">Body LG (Inter - 400)</span>
                <span className="text-xs text-on-surface-variant">18px / Line height: 28px</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant truncate">
                {previewText}
              </p>
            </div>

            {/* Label Bold */}
            <div className="pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-label-bold text-[10px] text-outline uppercase">Label Bold (Inter - 700)</span>
                <span className="text-xs text-on-surface-variant">12px / Line height: 16px</span>
              </div>
              <p className="font-label-bold text-label-bold text-tertiary uppercase tracking-wider truncate">
                {previewText}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
