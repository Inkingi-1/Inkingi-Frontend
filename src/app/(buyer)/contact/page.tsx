"use client";

import React, { useState } from "react";
import { InfoPageLayout, InfoSection } from "@/components/InfoPageLayout";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName("");
    setEmail("");
    setMessage("");
    setSubject("General inquiry");
  };

  return (
    <InfoPageLayout
      title="Contact us"
      subtitle="Reach the BuildConnect team for support, partnerships, or account questions."
    >
      <InfoSection title="Office">
        <p>
          <strong>BuildConnect Rwanda</strong>
          <br />
          KN 4 Ave, Nyarugenge
          <br />
          Kigali, Rwanda
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+250788000000" className="text-primary font-semibold hover:underline">
            +250 788 000 000
          </a>
          <br />
          Email:{" "}
          <a href="mailto:support@buildconnect.rw" className="text-primary font-semibold hover:underline">
            support@buildconnect.rw
          </a>
        </p>
        <p className="text-sm">Hours: Mon–Sat, 8:00–18:00 (CAT)</p>
      </InfoSection>

      <InfoSection title="Send a message">
        {sent && (
          <div className="bg-secondary-container text-on-secondary-container p-3 rounded-xl text-sm font-medium">
            Thank you — your message has been received. We will respond within 1–2 business days.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-11 px-4 border border-outline-variant rounded-lg outline-none cursor-pointer"
            >
              <option>General inquiry</option>
              <option>Order support</option>
              <option>Vendor partnership</option>
              <option>Delivery / logistics</option>
              <option>Account & roles</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 border border-outline-variant rounded-lg outline-none resize-y focus:ring-2 focus:ring-primary/20"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all"
          >
            Send message
          </button>
        </form>
      </InfoSection>
    </InfoPageLayout>
  );
}
