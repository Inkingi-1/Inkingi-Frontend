import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import { AppProvider } from "@/context/AppContext";
import RoleSwitcher from "@/components/RoleSwitcher";
import PostRequirementModal from "@/components/PostRequirementModal";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
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
        <AppProvider>
          <PWARegister />
          <RoleSwitcher />
          <PostRequirementModal />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
