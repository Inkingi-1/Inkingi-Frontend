"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockStores, Store } from "@/data/mockStores";

export default function StoreDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Find store by id, or default to the first one if not found but show a banner
  const [store, setStore] = useState<Store | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const found = mockStores.find((s) => s.id === id);
      if (found) {
        setStore(found);
        setNotFound(false);
      } else {
        // Fallback to kigali-industrial-hub but set notFound flag
        setStore(mockStores[0]);
        setNotFound(true);
      }
    }
  }, [id]);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full">
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md mb-6">
          <Link className="hover:text-primary transition-colors" href="/stores">
            Stores Directory
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-medium">{store.name}</span>
        </nav>

        {notFound && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3 border border-error/20">
            <span className="material-symbols-outlined text-error">warning</span>
            <div>
              <p className="font-label-bold">Store Not Found</p>
              <p className="text-body-sm">
                The store ID "{id}" was not found in our database. Displaying default verified partner details instead.
              </p>
            </div>
          </div>
        )}

        {/* Hero Header Section */}
        <section className="mb-xl relative rounded-xl overflow-hidden min-h-[320px] flex flex-col justify-end p-8 text-white group shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent z-10"></div>
          <img
            alt={store.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={store.image}
          />
          <div className="relative z-20">
            <div className="flex flex-wrap gap-2 mb-4">
              {store.verified && (
                <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-label-md font-label-bold flex items-center gap-1">
                  <span
                    className="material-symbols-outlined !text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  Verified Vendor
                </span>
              )}
              {store.expressDelivery && (
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-label-md font-label-bold flex items-center gap-1">
                  <span className="material-symbols-outlined !text-[14px]">local_shipping</span>
                  Express Delivery
                </span>
              )}
            </div>
            <h2 className="font-headline-xl text-headline-xl mb-2 leading-tight font-bold">
              {store.name}
            </h2>
            <p className="font-body-lg text-body-lg max-w-2xl opacity-90">
              {store.description}
            </p>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* About Us Story */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
              <h3 className="font-headline-lg text-headline-lg text-primary font-bold">Our Story</h3>
            </div>
            <div className="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
              <p>
                Founded on the principles of <strong>Industrial Reliability</strong>, {store.name} began as a dedicated supplier serving regional contractors. Today, we stand as a cornerstone of Rwandan development, bridging the gap between large-scale manufacturing and localized project sites.
              </p>
              <p>
                We understand that construction is more than just building; it's about the security and legacy of the people of Rwanda. Our materials are sourced with rigorous quality control, ensuring every item meets the highest standards of structural integrity.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-surface-container-low rounded-lg text-center">
                <p className="text-primary font-headline-md text-headline-md font-bold">{store.yearsActive}+</p>
                <p className="text-label-md font-label-md text-outline">Years Active</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg text-center">
                <p className="text-primary font-headline-md text-headline-md font-bold">{store.projectsSupplied}+</p>
                <p className="text-label-md font-label-md text-outline">Projects Supplied</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg text-center">
                <p className="text-primary font-headline-md text-headline-md font-bold">{store.compliance}</p>
                <p className="text-label-md font-label-md text-outline">Compliance</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg text-center">
                <p className="text-primary font-headline-md text-headline-md font-bold">{store.dispatchTime}</p>
                <p className="text-label-md font-label-md text-outline">Dispatch Time</p>
              </div>
            </div>
          </div>

          {/* Registration & Certs */}
          <div className="md:col-span-4 space-y-gutter">
            <div className="bg-primary-container text-on-primary-container rounded-xl p-lg shadow-sm border border-primary/20">
              <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2 font-bold text-white">
                <span className="material-symbols-outlined text-white">verified_user</span>
                Credentials
              </h3>
              <ul className="space-y-4 font-body-sm">
                <li className="flex justify-between border-b border-on-primary-container/20 pb-2">
                  <span className="opacity-80">RDB Reg No:</span>
                  <span className="font-label-bold">{store.regNumber}</span>
                </li>
                <li className="flex justify-between border-b border-on-primary-container/20 pb-2">
                  <span className="opacity-80">VAT Number:</span>
                  <span className="font-label-bold">{store.vatNumber}</span>
                </li>
                <li className="flex justify-between border-b border-on-primary-container/20 pb-2">
                  <span className="opacity-80">RRA Status:</span>
                  <span className="bg-emerald-500/25 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    {store.status}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-tertiary">
                <span className="material-symbols-outlined">eco</span>
                <h3 className="font-label-bold text-label-bold uppercase tracking-widest">
                  Sustainability
                </h3>
              </div>
              <p className="font-body-sm text-on-surface-variant mb-4">
                {store.sustainabilityCertificate}
              </p>
              <button className="w-full py-2 px-4 border border-tertiary text-tertiary rounded-lg font-label-bold hover:bg-tertiary/5 transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100 cursor-pointer">
                <span className="material-symbols-outlined text-sm">download</span>
                View Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Policies & FAQ Section */}
        <section className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Return Policy */}
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/30 border-l-4 border-l-tertiary flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined">assignment_return</span>
                Return &amp; Verification
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-tertiary/10 text-tertiary w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold">
                    7d
                  </div>
                  <div>
                    <h4 className="font-label-bold text-on-surface mb-1 text-sm">
                      Standard Verification Period
                    </h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      All bulk materials (sand, gravel, timber) must be verified at the point of delivery. A 7-day technical verification applies for structural items like rebar and cement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-tertiary/10 text-tertiary w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined">rule</span>
                  </div>
                  <div>
                    <h4 className="font-label-bold text-on-surface mb-1 text-sm">
                      Eligibility Criteria
                    </h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      Returns are accepted only if materials are in original condition and haven't been integrated into structures. Bagged cement must be stored dry to remain eligible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex gap-4">
              <Link
                href="/marketplace"
                className="flex-1 py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container text-center rounded-lg font-label-bold text-xs uppercase active:scale-95 duration-100 cursor-pointer"
              >
                Browse Shop Catalog
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-surface-container-highest dark:bg-inverse-surface rounded-xl p-lg shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed mb-6 font-bold">
              Construction FAQ
            </h3>
            <div className="space-y-3">
              {store.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-center p-4 cursor-pointer font-label-bold text-on-surface text-left focus:outline-none"
                  >
                    <span className="text-sm font-semibold">{faq.question}</span>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${
                        openFAQIndex === idx ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openFAQIndex === idx ? "max-h-40 border-t border-outline-variant/10 p-4" : "max-h-0"
                    }`}
                  >
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
