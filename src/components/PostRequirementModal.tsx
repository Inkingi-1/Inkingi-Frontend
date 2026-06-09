"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function PostRequirementModal() {
  const { showPostRequirementModal, setShowPostRequirementModal } = useApp();
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!showPostRequirementModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMaterial("");
      setQuantity("");
      setLocation("");
      setDescription("");
      setShowPostRequirementModal(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-on-background/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary text-on-primary px-6 py-4 flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md">Post Construction Requirement</h3>
          <button 
            onClick={() => setShowPostRequirementModal(false)}
            className="text-on-primary/80 hover:text-white transition-colors"
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
            <p className="text-on-surface-variant text-body-sm">
              We have broadcasted your request to verified suppliers in {location || "Rwanda"}. You will receive bids shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Material / Tool needed</label>
              <input 
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
                <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Quantity / Volume</label>
                <input 
                  type="text" 
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 150 Bags, 40 Sheets"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Site Location</label>
                <input 
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
              <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Additional details</label>
              <textarea 
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
                onClick={() => setShowPostRequirementModal(false)}
                className="px-6 py-3 border border-outline-variant/30 rounded-xl text-primary font-bold text-body-sm hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-3 bg-tertiary-container text-on-tertiary-container hover:bg-tertiary rounded-xl font-label-bold text-body-sm transition-all"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
