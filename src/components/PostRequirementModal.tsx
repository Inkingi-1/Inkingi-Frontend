"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { getAccessToken } from "@/lib/api/client";

export default function PostRequirementModal() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showPostRequirementModal, setShowPostRequirementModal, postRequirement } = useApp();
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showPostRequirementModal) return null;

  const resetForm = () => {
    setMaterial("");
    setQuantity("");
    setLocation("");
    setDescription("");
    setSubmitted(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    setShowPostRequirementModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !getAccessToken()) {
      setShowPostRequirementModal(false);
      router.push("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      await postRequirement({ material, quantity, location, description });
      setSubmitted(true);
      setTimeout(() => {
        resetForm();
        setShowPostRequirementModal(false);
      }, 2200);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-on-background/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-requirement-title"
      >
        <div className="bg-primary text-on-primary px-6 py-4 flex justify-between items-center">
          <h3 id="post-requirement-title" className="font-headline-md text-headline-md">
            Post Construction Requirement
          </h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-on-primary/80 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Requirement Posted!</h4>
            <p className="text-on-surface-variant text-body-sm max-w-[20rem] leading-relaxed">
              We have broadcast your request to verified suppliers in {location || "Rwanda"}. Check notifications for
              supplier bids.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="req-material" className="block text-xs font-bold text-primary mb-1">
                Material / tool needed
              </label>
              <input
                id="req-material"
                type="text"
                required
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. CIMERWA 32.5N Cement, Iron Sheets, etc."
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="req-quantity" className="block text-xs font-bold text-primary mb-1">
                  Quantity / volume
                </label>
                <input
                  id="req-quantity"
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 150 Bags, 40 Sheets"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label htmlFor="req-location" className="block text-xs font-bold text-primary mb-1">
                  Site location
                </label>
                <input
                  id="req-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kigali, Huye, Rubavu"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-description" className="block text-xs font-bold text-primary mb-1">
                Additional details
              </label>
              <textarea
                id="req-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify delivery timeline, custom specifications, brand preference..."
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-outline-variant/30 rounded-xl text-primary font-bold text-body-sm hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-white rounded-xl font-label-bold text-body-sm transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
