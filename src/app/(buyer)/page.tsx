"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const { addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const categories = [
    { name: "Cement", icon: "precision_manufacturing", tag: "cement" },
    { name: "Iron Sheets", icon: "architecture", tag: "roofing" },
    { name: "Plumbing", icon: "plumbing", tag: "plumbing" },
    { name: "Electrical", icon: "electric_bolt", tag: "electrical" },
    { name: "Paints", icon: "format_paint", tag: "paints" },
    { name: "Tiles", icon: "grid_view", tag: "tiles" },
  ];

  const featuredMaterials = [
    {
      id: "cement-cimerwa",
      title: "CIMERWA 32.5N Cement",
      price: 12500,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE67LnqKl_EWebcOgmZFsGOv_HO2gzYM9BBr-bcG-ki8dtD3CMgzZzPB0S46FEPUuz1CcFhvpKzLB8QDDYyaTp5-LmLLPGQf4wuuSbCHNMz0r8UuGqY2LYiu1i7YPFlHW5k42Z1RAs151787Sj6apji1WBysvn6rqldnakAri-ZHP5K6tqH_1leiGu-bxojBKtchCVetUHyZTUh-_yUGBV6DMY1lVgs7aZYKgec2-zeuVUh6hoccBjAJ4cSg4X1i_OlOxeza3N9ec",
      category: "Cement",
      supplier: "Kigali City Hardware",
      badge: "BEST SELLER",
      stock: "IN STOCK",
    },
    {
      id: "roofing-blue",
      title: "Blue Matte Iron Sheets",
      price: 8200,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj6ZSG2PpgoaP3axFvAHmeH3DnYNSS0mtENdtTGoQ25Nv8PXqR-xBJ1sHRBoejZWsEjV-n-wR2CfnR0aXTWfPpxnjHQxjtIMU2LQZt02gDPZ4cHNwyFwAlFZceIXjhqR22N12f1ZMj37XpLvIm2beREOqOQG08jDELsD-Ltkwerk1QLQSkIhvTbs0qGkPnc7x-4KkJVUcjjjozjXcEv2XSqg4XBm6W9TGofWb1_4JShsG0Lrhge3yL6YIofuiaVcKS0VBTLlW-T38",
      category: "Roofing",
      supplier: "Rubavu Builders Ltd",
      badge: null,
      stock: "IN STOCK",
    },
    {
      id: "wire-copper",
      title: "2.5mm Copper House Wire",
      price: 45000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACcP_6KklRsZiU-Z2yxpXf8nIVIsk7W7dWcdi-q7Kb6DRnlfRaVDk9Xye_gyWgLCJv3qXHi5uCOZWvm0AdbgevrFLr5flRh1xYwtkK2LTfveCQpf5nG4Sm5aVrYKqjxdCBsbA4osHXZEK5KfDjPebV4eccElAdFJWH_pQyy_JA0QcIdaB5_rGD646X1RnYXOxfRHtjSlnMSqnItuW5fRth9U1WI542iym3WFAIeV8yGlP6buswlVEWMFYoDgS2bIIsdAYAFSvolCA",
      category: "Electrical",
      supplier: "Gikondo Electricals",
      badge: null,
      stock: "LOW STOCK",
    },
    {
      id: "tiles-gres",
      title: "Gres Porcelain Tiles 60x60",
      price: 18500,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3sRA03IQ_pXidlR7GBtjxzQZ-lcHStgJgEJ-oOEp4GjOPalpzlegHhmpa-52zfVqlPPIGV4OQ13qqVNGreD59CqXdCyX9WaAyGLEDvJ4BYOl3fyqaqhs0lroft5NGp97kR23LhsDWC8w5_CtfBEF9zH6E6lCNEwREMZ7XKxgWIHe4B_wFJUpdov3zkMm_AcXLDlPs1sr83FrPBWGW2C0mcEdu460hNhjHcDNKO18dQaJ2wR-nOtVWm_b0Qrz9Mw8Ct_or7xWg3DA",
      category: "Finishing",
      supplier: "Kigali City Hardware",
      badge: null,
      stock: "IN STOCK",
    },
  ];

  const trustedSuppliers = [
    {
      name: "Kigali City Hardware",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWHhpz9jSOaIN4fP2JrytDm6R3YcyvDo0Km2_pIX4KmY61HwTAWdnGDfdrGl5alEsI4i_p5fsmmdrXCfIncWL60TdkYP0FQ20eZDvf6Pta6W1eJUZp-XbXu7DEJrpPM7WZVDUH-ZRmxBSCCLipSQfqMK9SA2NDfeVLIxWeleCXl0EG7BY60bdufudvNXu_rRCrhPSAY8H_yD2mpKBF52FhzVCo4eQpL1yTwSfLZTzep8unO50MGTrcsFRRRqsMW-NHtImx7qyrLQ",
      location: "Nyarugenge, Kigali",
      rating: "4.9",
      tags: ["Cement", "Plumbing"],
    },
    {
      name: "Rubavu Builders Ltd",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-3zN43Zyln-2x_P2OvJsLOPxSJr41SOSj8Bqpip4hmJqKLbDyNgRdAYDWTWzhPSMec73hxa3yFuHdSr5NOtP3aOXJrdloKaukIkxhxV_0VOBDuEWhoj3cviMnMP1wjuwwbhcWzuvfsifJbvZ2aJzn3_-wxr9fwBhyOyuP-cNyAdeadDKJ2evIPJ96isN3_VPMNHFrDU5DYlZFa2BbnphbuZLG0ZeiasYrQ5Tux8NxDiNdirSJAJMBMSK2tBcdttEJw8bgenKpNf8",
      location: "Rubavu, Western Province",
      rating: "4.7",
      tags: ["Steel", "Tools"],
    },
    {
      name: "Gikondo Electricals",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE-EVp1ehE3if_ppphzYK0iw2Bxttnf5CJDh8RlPI_26eyG5try5eVXN6WR-4rTjRQaZs07NEqzKuM687pAlnuoGeTmwjxa9mjeqt6vXEjz1dLnsnttKcseCoIX_4xAV9He_8RLe5miP6ZWO81mvODovgbmKCPXD1E0FTCIdLBfE4QyFSLlQGx_2Ncs9g1qVp5_tICiNFSIy7V0WgqjdE2TahDj7lwGzZMFNAtK4CfbQq1K8I42uzO78rDANSdWl-1x6gHB4v6E54",
      location: "Kicukiro, Kigali",
      rating: "4.8",
      tags: ["Electrical", "Safety"],
    },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden bg-primary-container py-xl px-margin-mobile md:px-margin-desktop">
        <div className="absolute inset-0 z-0">
          <img
            alt="Construction site"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC392fNndgyAdWl2KUMV_M9dk6zw27cE9NvCmrGPLfLqmuDug5QBH8HfhWQbVN4VaakPC4qjznktJI5bLAOdeGGjrKhVG_Jgr2nW0bnDUBu5qRgigzleN9LF3haT1rBaG7OWYLPPA6CY9ZkCEYNx9_io_18c0rBd7t2De-KbStAzPVbkiy_wG1jIeM9KkGO6XsJAVAQ-hUXV4Gnz5zwBXVq8YcTFPEiCKYuJkFf3JOQvCrH0Uf5SbYexkdd9xfPE52ZDLe1Jk3cYes"
          />
        </div>
        <div className="relative z-10 max-w-4xl text-center w-full">
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white mb-6 leading-tight">
            Connecting Builders to Suppliers
          </h1>
          <p className="font-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto text-lg">
            The most reliable marketplace for construction materials in Rwanda. Secure, fast, and professional logistics
            for every project scale.
          </p>

          {/* Search Component */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/marketplace?q=${encodeURIComponent(searchQuery)}&l=${encodeURIComponent(
                locationQuery
              )}`;
            }}
            className="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto text-on-surface"
          >
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-outline-variant/30">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                className="w-full border-none focus:ring-0 font-body-md py-3 outline-none"
                placeholder="Search cement, iron sheets, tools..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3">
              <span className="material-symbols-outlined text-outline">location_on</span>
              <input
                className="w-full border-none focus:ring-0 font-body-md py-3 outline-none"
                placeholder="Kigali, Rwanda"
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-white transition-all px-8 py-3.5 rounded-xl font-label-bold text-sm uppercase tracking-wider active:scale-95 duration-100"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Browse Categories</h2>
            <p className="text-on-surface-variant font-body-sm mt-1">Everything you need from foundation to finishing.</p>
          </div>
          <Link
            href="/marketplace"
            className="text-tertiary hover:text-tertiary/80 transition-colors font-label-bold flex items-center gap-1 group"
          >
            VIEW ALL{" "}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/marketplace?category=${cat.tag}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-tertiary-container hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">{cat.icon}</span>
              </div>
              <span className="font-label-bold text-on-surface text-sm block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline-md text-headline-md text-primary">Featured Materials</h2>
          <div className="flex gap-2">
            <Link
              href="/marketplace"
              className="px-6 py-2.5 border border-outline-variant/50 rounded-xl font-label-bold text-primary hover:bg-surface-container transition-colors uppercase tracking-wider text-xs"
            >
              Go to Marketplace
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredMaterials.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden group flex flex-col hover:shadow-md transition-all duration-300">
              <div className="relative h-48 bg-surface-container-low overflow-hidden">
                <Link href={`/marketplace/product/${prod.id}`}>
                  <img
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    src={prod.image}
                  />
                </Link>
                {prod.badge && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider text-tertiary">
                    {prod.badge}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-on-surface-variant text-[11px] font-label-bold uppercase tracking-wider">
                  {prod.category}
                </p>
                <Link href={`/marketplace/product/${prod.id}`}>
                  <h3 className="font-headline-md text-body-lg text-primary mt-1 hover:text-tertiary transition-colors cursor-pointer line-clamp-1 font-bold">
                    {prod.title}
                  </h3>
                </Link>
                <p className="text-xs text-outline mt-0.5">By {prod.supplier}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-headline-md text-primary font-bold">{prod.price.toLocaleString()} RWF</span>
                  <div className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {prod.stock}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full mt-4 py-2.5 border border-primary text-primary rounded-xl font-label-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95 duration-100"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works (Bento Layout) */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-primary text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-headline-lg-mobile md:text-headline-lg mb-4 text-3xl">
              Streamlining Rwanda's Construction
            </h2>
            <p className="text-primary-fixed-dim font-body-md max-w-xl mx-auto">
              Our end-to-end logistics and escrow billing ensure your site never stops moving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/20 rounded-full blur-2xl group-hover:bg-tertiary/40 transition-colors"></div>
              <div className="text-tertiary-fixed font-headline-xl text-5xl mb-4 opacity-80">01</div>
              <h3 className="font-headline-md text-xl mb-3 text-white">Intelligent Search</h3>
              <p className="text-primary-fixed-dim font-body-sm leading-relaxed text-sm">
                Search through thousands of verified supplier inventories instantly. Filter by location, price, and brand
                specifications.
              </p>
              <span className="material-symbols-outlined mt-8 text-4xl opacity-50 block">search_insights</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed/10 rounded-full blur-2xl"></div>
              <div className="text-tertiary-fixed font-headline-xl text-5xl mb-4 opacity-80">02</div>
              <h3 className="font-headline-md text-xl mb-3 text-white">Secure Ordering</h3>
              <p className="text-primary-fixed-dim font-body-sm leading-relaxed text-sm">
                Escrow-based payments ensure your money is safe until materials arrive and quality is verified on-site by
                your representative.
              </p>
              <span className="material-symbols-outlined mt-8 text-4xl opacity-50 block">verified_user</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="text-tertiary-fixed font-headline-xl text-5xl mb-4 opacity-80">03</div>
              <h3 className="font-headline-md text-xl mb-3 text-white">Real-time Tracking</h3>
              <p className="text-primary-fixed-dim font-body-sm leading-relaxed text-sm">
                Monitor your delivery truck's GPS location and estimated arrival time directly from the dashboard for maximum
                site coordination.
              </p>
              <span className="material-symbols-outlined mt-8 text-4xl opacity-50 block">local_shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quincailleries */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-headline-md text-headline-md text-primary">Trusted Suppliers</h2>
          <Link
            href="/vendor"
            className="bg-white px-5 py-2.5 rounded-xl border border-outline-variant font-label-bold text-primary hover:bg-surface-container-low transition-all text-xs uppercase tracking-wider active:scale-95 duration-100"
          >
            BECOME A VENDOR
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustedSuppliers.map((supp) => (
            <div key={supp.name} className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-start gap-5 hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                <img alt={supp.name} className="w-full h-full object-cover" src={supp.image} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-headline-md text-body-lg text-primary font-bold">{supp.name}</h4>
                  <div className="flex items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-label-bold text-xs">{supp.rating}</span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-xs mt-1">{supp.location}</p>
                <div className="flex gap-2 mt-4">
                  {supp.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-surface-container rounded text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-white">
        <h2 className="font-headline-md text-headline-md text-primary text-center mb-12">
          Trusted by Rwanda's Top Developers
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <div className="flex-1 p-8 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <div className="flex gap-1 text-tertiary mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
            <p className="italic text-on-surface font-body-md mb-8 text-sm leading-relaxed">
              "BuildConnect has completely changed how we manage our supply chain. We no longer spend hours calling different
              quincailleries. Everything is transparent and delivered on time."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary font-bold">JB</div>
              <div>
                <p className="font-label-bold text-primary text-sm">Eng. Jean Bosco</p>
                <p className="text-on-surface-variant text-[11px]">Project Lead, Kigali Heights</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-8 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <div className="flex gap-1 text-tertiary mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
            <p className="italic text-on-surface font-body-md mb-8 text-sm leading-relaxed">
              "The escrow system gives me peace of mind. As a residential builder, knowing my payment is only released upon
              on-site delivery verification is the security I've always wanted."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed-dim flex items-center justify-center text-secondary font-bold">AU</div>
              <div>
                <p className="font-label-bold text-primary text-sm">Alice Uwimana</p>
                <p className="text-on-surface-variant text-[11px]">Independent Contractor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale text-xs font-bold text-outline uppercase tracking-wider">
          <span>BRD Bank</span>
          <span>RRA Approved</span>
          <span>NIRDA</span>
          <span>City of Kigali</span>
        </div>
      </section>
    </div>
  );
}
