import React from "react";
import Link from "next/link";

export function InfoPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-14 pb-24 md:pb-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mb-6"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to home
      </Link>
      <header className="mb-8">
        <h1 className="font-headline-lg text-primary font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-on-surface-variant text-body-md mt-2">{subtitle}</p>}
      </header>
      <article className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-6 md:p-8 space-y-6 text-on-surface text-body-md leading-relaxed">
        {children}
      </article>
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-headline-md text-primary font-bold mb-3">{title}</h2>
      <div className="space-y-3 text-on-surface-variant">{children}</div>
    </section>
  );
}
