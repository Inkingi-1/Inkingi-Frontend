"use client";

import React, { useState } from "react";

interface DeliveryZone {
  region: string;
  minOrder: number;
  fee: number;
  isFree: boolean;
}

const INITIAL_ZONES: DeliveryZone[] = [
  { region: "Kigali Urban", minOrder: 50000, fee: 0, isFree: true },
  { region: "Kigali Peri-Urban", minOrder: 100000, fee: 5000, isFree: false },
  { region: "Eastern Province", minOrder: 500000, fee: 15000, isFree: false },
];

export default function StoreSettingsPage() {
  const [storeName, setStoreName] = useState("Kigali Industrial Hub");
  const [email, setEmail] = useState("hub-logistics@kih.rw");
  const [mtnEnabled, setMtnEnabled] = useState(true);
  const [mtnCode, setMtnCode] = useState("678901");
  const [airtelEnabled, setAirtelEnabled] = useState(false);
  const [airtelWallet, setAirtelWallet] = useState("");
  const [zones, setZones] = useState<DeliveryZone[]>(INITIAL_ZONES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Store profile configurations saved successfully!");
  };

  const handleSavePayments = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Payment wallet settings updated!");
  };

  const handleDeactivate = () => {
    if (confirm("WARNING: Are you sure you want to deactivate your storefront? This will hide your products from the public marketplace.")) {
      showToast("Storefront deactivated. Status is now OFFLINE.");
    }
  };

  const handleUploadDocument = () => {
    showToast("Document upload simulated: File added to review vault.");
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[99] bg-primary text-on-primary px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-bold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="mb-8">
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
          Vendor Settings
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Configure your shop presence, payments, and operational zones.
        </p>
      </header>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (Anchor links) */}
        <nav className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24 h-fit">
          <a
            className="block px-4 py-2.5 rounded-lg bg-primary-container/15 text-primary font-label-bold border-l-4 border-primary"
            href="#store-profile"
          >
            Store Profile
          </a>
          <a
            className="block px-4 py-2.5 rounded-lg text-on-surface-variant font-label-bold hover:bg-surface-container transition-all"
            href="#payments"
          >
            Payments
          </a>
          <a
            className="block px-4 py-2.5 rounded-lg text-on-surface-variant font-label-bold hover:bg-surface-container transition-all"
            href="#delivery"
          >
            Delivery Zones
          </a>
          <a
            className="block px-4 py-2.5 rounded-lg text-on-surface-variant font-label-bold hover:bg-surface-container transition-all"
            href="#documents"
          >
            Document Vault
          </a>
          <a
            className="block px-4 py-2.5 rounded-lg text-error font-label-bold hover:bg-error-container/20 transition-all"
            href="#danger-zone"
          >
            Danger Zone
          </a>
        </nav>

        {/* Configuration Panels */}
        <div className="lg:col-span-9 space-y-6">
          {/* Section: Store Profile */}
          <section
            id="store-profile"
            className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6 scroll-mt-20"
          >
            <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-2xl">store</span>
              <h3 className="font-headline-md text-headline-md font-bold">Store Profile</h3>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Banner Upload */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden bg-surface-container-high group shadow-inner">
                <img
                  alt="Store banner"
                  className="w-full h-full object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbqmA1FE1G6ftYLVHuB6pgwfDsPKTHzn3-dZU1GgOuGv9W5nKZpdGAjuBvzj1hzcdp1PIT_gq7gdNj99qhCmH2DuLrwh6izB5nv-1bJQq1_ffmpQh84Yi4zxwLQWAlyL9WVLdINYNtbQfuxiBxheENUf15560hJfbxJNfxgbsCWvWqlSXkOQmSXq8vCUuQ0geNG88GAjVB-RJuNBvFluhHX3gfUxyPAoUNxQYpr9lQjUOEtFyQHSowG_BIUQTU2gaNMsmDA2hPiVg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-white text-primary px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold shadow-md">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Change Banner
                  </div>
                </div>
              </div>

              {/* Logo & Basic Info */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative -mt-16 ml-4 shrink-0">
                  <div className="w-24 h-24 rounded-xl border-4 border-white bg-surface-container-high overflow-hidden shadow-lg">
                    <img
                      alt="Store logo"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRt-5S_2VjfFHQVoiB_6Aj9j3DthiEObRR8VNOQdsbZ83oSLCTXSiuM2-3zm3yNl2UyAMgdT8tdoxvOilPuQonobAJMggXVTUEtsnU-EWuAZVev0BIlf9QwrMGKloeRXKj0AIbmFbyStigqSAdSbR7fsdOMnhygIhMJgriCYrYEx45TOmSZhI3EJMAFTNwnEgy8e1UvFTcVBkIR-YjdAQl4-20YeAvx6JPssqMceY2tdngWk-Ts75E0C_hKVg5amdykZ-95C0bcDo"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg border-2 border-white cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface-variant block mb-2">
                      Store Name
                    </label>
                    <input
                      className="w-full h-11 px-4 border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary/20 outline-none text-on-surface"
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface-variant block mb-2">
                      Contact Email
                    </label>
                    <input
                      className="w-full h-11 px-4 border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary/20 outline-none text-on-surface"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-2 space-y-3">
                <label className="font-label-bold text-label-bold text-on-surface-variant block">
                  Operating Hours
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 border border-outline-variant/20 rounded-lg flex justify-between items-center bg-surface-container-low">
                    <span className="font-label-bold text-xs">Mon - Fri</span>
                    <span className="font-body-sm text-xs">08:00 - 18:00</span>
                  </div>
                  <div className="p-3 border border-outline-variant/20 rounded-lg flex justify-between items-center bg-surface-container-low">
                    <span className="font-label-bold text-xs">Saturday</span>
                    <span className="font-body-sm text-xs">09:00 - 14:00</span>
                  </div>
                  <div className="p-3 border border-outline-variant/20 rounded-lg flex justify-between items-center bg-surface-container-low opacity-50">
                    <span className="font-label-bold text-xs">Sunday</span>
                    <span className="font-body-sm text-xs">Closed</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </section>

          {/* Section: Payments */}
          <section
            id="payments"
            className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6 scroll-mt-20"
          >
            <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-2xl">payments</span>
              <h3 className="font-headline-md text-headline-md font-bold">Payment Settings</h3>
            </div>

            <form onSubmit={handleSavePayments} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MTN */}
                <div className="p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xs shrink-0">
                        MTN
                      </div>
                      <div>
                        <p className="font-label-bold text-sm">MTN MoMo</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                          Merchant Pay
                        </p>
                      </div>
                    </div>
                    <input
                      checked={mtnEnabled}
                      onChange={(e) => setMtnEnabled(e.target.checked)}
                      className="text-primary rounded focus:ring-primary cursor-pointer h-5 w-5"
                      type="checkbox"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      className="w-full h-10 px-3 border border-outline-variant/30 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Merchant Code"
                      type="text"
                      value={mtnCode}
                      onChange={(e) => setMtnCode(e.target.value)}
                      disabled={!mtnEnabled}
                    />
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      Funds settle instantly to this merchant account.
                    </p>
                  </div>
                </div>

                {/* Airtel */}
                <div className="p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0">
                        AIR
                      </div>
                      <div>
                        <p className="font-label-bold text-sm">Airtel Money</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                          Business Wallet
                        </p>
                      </div>
                    </div>
                    <input
                      checked={airtelEnabled}
                      onChange={(e) => setAirtelEnabled(e.target.checked)}
                      className="text-primary rounded focus:ring-primary cursor-pointer h-5 w-5"
                      type="checkbox"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      className="w-full h-10 px-3 border border-outline-variant/30 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Wallet Number (073...)"
                      type="text"
                      value={airtelWallet}
                      onChange={(e) => setAirtelWallet(e.target.value)}
                      disabled={!airtelEnabled}
                    />
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      Setup required for Airtel Money settlements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  Update Payment Methods
                </button>
              </div>
            </form>
          </section>

          {/* Section: Delivery Zones */}
          <section
            id="delivery"
            className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6 scroll-mt-20"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">local_shipping</span>
                <h3 className="font-headline-md text-headline-md font-bold">Delivery Zones</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  const region = prompt("Enter region name:");
                  if (region) {
                    setZones([...zones, { region, minOrder: 100000, fee: 7000, isFree: false }]);
                    showToast(`Added new zone ${region}!`);
                  }
                }}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-label-bold shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                Add Zone
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-xs uppercase font-label-bold text-on-surface-variant">
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Min. Order (RWF)</th>
                    <th className="py-3 px-4">Fee (RWF)</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-sm">
                  {zones.map((zone, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-primary">{zone.region}</td>
                      <td className="py-3 px-4">{zone.minOrder.toLocaleString()} RWF</td>
                      <td className="py-3 px-4">
                        {zone.isFree ? "Free Delivery" : `${zone.fee.toLocaleString()} RWF`}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            const newFee = prompt(`Enter new fee for ${zone.region}:`, zone.fee.toString());
                            if (newFee !== null) {
                              const updated = [...zones];
                              updated[idx].fee = parseInt(newFee) || 0;
                              updated[idx].isFree = updated[idx].fee === 0;
                              setZones(updated);
                              showToast(`Updated delivery fee for ${zone.region}!`);
                            }
                          }}
                          className="text-primary hover:bg-primary/5 p-1 rounded cursor-pointer"
                          title="Edit Zone Fee"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Document Vault */}
          <section
            id="documents"
            className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6 scroll-mt-20"
          >
            <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-2xl">folder_shared</span>
              <h3 className="font-headline-md text-headline-md font-bold">Document Vault</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-outline-variant bg-surface flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-sm">RDB Business License</p>
                    <p className="text-[10px] text-green-700 font-semibold">Verified until 2025</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Downloading RDB License...")}
                  className="text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>

              <div className="p-4 rounded-lg border border-outline-variant bg-surface flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-sm">RRA Tax Certificate</p>
                    <p className="text-[10px] text-blue-700 font-semibold">Updated 2 days ago</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Downloading RRA Certificate...")}
                  className="text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>

              <div
                onClick={handleUploadDocument}
                className="p-4 rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform">
                    upload_file
                  </span>
                  <p className="text-xs font-label-bold text-on-surface-variant mt-1">
                    Upload New Document
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Danger Zone */}
          <section
            id="danger-zone"
            className="bg-error-container/10 p-6 rounded-xl border border-error/20 space-y-4 scroll-mt-20"
          >
            <div className="flex items-center gap-2 text-error">
              <span className="material-symbols-outlined">warning</span>
              <h3 className="font-label-bold text-xs uppercase tracking-widest">Danger Zone</h3>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="space-y-1">
                <p className="font-label-bold text-on-surface text-sm">Store Deactivation</p>
                <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed max-w-lg">
                  Temporarily hide your products from the marketplace. You can reactivate at any time.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDeactivate}
                className="bg-error hover:bg-error/95 text-on-error px-6 py-2.5 rounded-lg font-label-bold text-xs uppercase active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
              >
                Deactivate Store
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
