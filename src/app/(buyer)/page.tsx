"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useFeaturedProducts, useCategories, useVendors } from "@/hooks/useApiData";
import { categoryName, productImage, productPrice, vendorName, vendorLogoImage, requirementsApi } from "@/lib/api";
import { resolveMaterialImage } from "@/lib/productImages";

const CATEGORY_ICONS: Record<string, string> = {
  cement: "precision_manufacturing",
  roofing: "architecture",
  plumbing: "plumbing",
  electrical: "electric_bolt",
  paints: "format_paint",
  tiles: "grid_view",
  steel: "construction",
  tools: "build",
  safety: "health_and_safety",
};

export default function LandingPage() {
  const { addToCart, setShowPostRequirementModal } = useApp();
  const { isAuthenticated } = useAuth();
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts(4);
  const apiCategories = useCategories();
  const { data: vendorsData } = useVendors();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [requirements, setRequirements] = useState<
    Array<{ _id: string; material: string; quantity: string; location: string; description?: string; createdAt?: string }>
  >([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setRequirements([]);
      return;
    }
    const load = () => {
      requirementsApi
        .list()
        .then((list) => {
          const items = Array.isArray(list) ? list.slice(0, 4) : [];
          setRequirements(
            items.map((r) => ({
              _id: String(r._id ?? ""),
              material: String(r.material ?? ""),
              quantity: String(r.quantity ?? ""),
              location: String(r.location ?? ""),
              description: r.description ? String(r.description) : undefined,
              createdAt: r.createdAt ? String(r.createdAt) : undefined,
            }))
          );
        })
        .catch(() => setRequirements([]));
    };
    load();
    window.addEventListener("bc-requirement-posted", load);
    return () => window.removeEventListener("bc-requirement-posted", load);
  }, [isAuthenticated]);

  const categories = apiCategories.length
    ? apiCategories.slice(0, 6).map((c) => ({
        name: c.name,
        icon: CATEGORY_ICONS[c.slug] || "category",
        tag: c.slug,
      }))
    : [
        { name: "Cement", icon: "precision_manufacturing", tag: "cement" },
        { name: "Roofing", icon: "architecture", tag: "roofing" },
        { name: "Plumbing", icon: "plumbing", tag: "plumbing" },
        { name: "Electrical", icon: "electric_bolt", tag: "electrical" },
        { name: "Steel", icon: "construction", tag: "steel" },
        { name: "Tools", icon: "build", tag: "tools" },
      ];

  const trustedSuppliers = (vendorsData?.data ?? []).slice(0, 3);

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
              className="bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-white transition-all px-8 py-3.5 rounded-xl font-label-bold text-sm active:scale-95 duration-100"
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
            className="text-tertiary hover:text-tertiary/80 hover:underline transition-colors font-label-bold flex items-center gap-1 group cursor-pointer"
          >
            View all{" "}
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
              className="px-6 py-2.5 border border-outline-variant/50 rounded-xl font-label-bold text-primary hover:bg-surface-container hover:border-primary/30 transition-colors text-xs cursor-pointer"
            >
              Go to marketplace
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="col-span-full text-center text-on-surface-variant py-8">
              Start the API and run npm run seed to see featured products.
            </p>
          ) : (
            featuredProducts.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden group flex flex-col hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 bg-surface-container-low overflow-hidden">
                  <Link href={`/marketplace/product/${prod._id}`}>
                    <img
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      src={productImage(prod)}
                    />
                  </Link>
                  {prod.featured && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider text-tertiary">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-on-surface-variant text-[11px] font-label-bold uppercase tracking-wider">
                    {categoryName(prod.category as never)}
                  </p>
                  <Link href={`/marketplace/product/${prod._id}`}>
                    <h3 className="font-headline-md text-body-lg text-primary mt-1 hover:text-tertiary transition-colors cursor-pointer line-clamp-1 font-bold">
                      {prod.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-outline mt-0.5">By {vendorName(prod.vendor as never)}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-headline-md text-primary font-bold">
                      {productPrice(prod).toLocaleString()} RWF
                    </span>
                    <div className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      {prod.stock > 10 ? "IN STOCK" : prod.stock > 0 ? "LOW STOCK" : "OUT OF STOCK"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: prod._id,
                        productId: prod._id,
                        title: prod.name,
                        price: productPrice(prod),
                        image: productImage(prod),
                        category: categoryName(prod.category as never),
                        supplier: vendorName(prod.vendor as never),
                      })
                    }
                    className="w-full mt-4 py-2.5 border border-primary text-primary rounded-xl font-label-bold text-xs hover:bg-primary hover:text-white transition-all active:scale-95 duration-100 cursor-pointer"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Posted requirements */}
      {isAuthenticated && requirements.length > 0 && (
        <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">Your Posted Requirements</h2>
              <p className="text-on-surface-variant text-body-sm mt-1">Recent quote requests sent to suppliers</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPostRequirementModal(true)}
              className="text-tertiary font-label-bold text-xs hover:underline"
            >
              Post new
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={resolveMaterialImage(req.material)}
                    alt={req.material}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary text-sm line-clamp-1">{req.material}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{req.quantity}</p>
                  <p className="text-xs text-tertiary font-bold mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {req.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works (Bento Layout) */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-primary text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-headline-lg-mobile md:text-headline-lg mb-4 text-3xl">
              Streamlining Rwanda's Construction
            </h2>
            <p className="text-primary-fixed-dim font-body-md text-body-md max-w-[36rem] mx-auto text-center leading-relaxed">
              Our end-to-end logistics and escrow billing ensure your site never stops moving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden hover:bg-white/15 hover:border-white/20 transition-colors">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/20 rounded-full blur-2xl group-hover:bg-tertiary/40 transition-colors"></div>
              <div className="text-tertiary-fixed font-headline-xl text-5xl mb-4 opacity-80">01</div>
              <h3 className="font-headline-md text-xl mb-3 text-white">Intelligent Search</h3>
              <p className="text-primary-fixed-dim font-body-sm leading-relaxed text-sm">
                Search through thousands of verified supplier inventories instantly. Filter by location, price, and brand
                specifications.
              </p>
              <span className="material-symbols-outlined mt-8 text-4xl opacity-50 block">search_insights</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden hover:bg-white/15 hover:border-white/20 transition-colors">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed/10 rounded-full blur-2xl"></div>
              <div className="text-tertiary-fixed font-headline-xl text-5xl mb-4 opacity-80">02</div>
              <h3 className="font-headline-md text-xl mb-3 text-white">Secure Ordering</h3>
              <p className="text-primary-fixed-dim font-body-sm leading-relaxed text-sm">
                Escrow-based payments ensure your money is safe until materials arrive and quality is verified on-site by
                your representative.
              </p>
              <span className="material-symbols-outlined mt-8 text-4xl opacity-50 block">verified_user</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden hover:bg-white/15 hover:border-white/20 transition-colors">
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
            className="bg-white px-5 py-2.5 rounded-xl border border-outline-variant font-label-bold text-primary hover:bg-surface-container-low hover:border-primary/30 transition-all text-xs active:scale-95 duration-100 cursor-pointer"
          >
            Become a vendor
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustedSuppliers.length === 0 ? (
            <p className="col-span-full text-center text-on-surface-variant">
              Verified suppliers appear here once the API is seeded.
            </p>
          ) : (
            trustedSuppliers.map((supp) => (
              <Link
                key={supp._id}
                href={`/stores/${supp._id}`}
                className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-start gap-5 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                  <img
                    alt={supp.storeName}
                    className="w-full h-full object-cover"
                    src={vendorLogoImage(supp)}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-label-bold text-primary text-sm">{supp.storeName}</h3>
                    <span className="text-tertiary font-bold text-xs flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {supp.averageRating}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-1">
                    {supp.district}, {supp.city}
                  </p>
                  {supp.isVerified && (
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                </div>
              </Link>
            ))
          )}
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
