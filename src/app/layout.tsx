import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import RoleSwitcher from "@/components/RoleSwitcher";
import PostRequirementModal from "@/components/PostRequirementModal";
import CartToast from "@/components/CartToast";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientBootstrap from "@/components/ClientBootstrap";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildConnect Rwanda | Solid Ground for Modern Construction",
  description: "Empowering Rwanda's construction industry through digital innovation and reliable supply chains.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#334c5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body-md">
        <ErrorBoundary>
          <AuthProvider>
            <AppProvider>
              <ClientBootstrap />
              <PWARegister />
              <RoleSwitcher />
              <PostRequirementModal />
              <CartToast />
              <main className="flex-1 w-full min-w-0">{children}</main>
            </AppProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
