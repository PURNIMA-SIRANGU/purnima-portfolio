import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import React from "react"; // Explicitly import React for types

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Ecosystem Portfolio",
  description: "Next-gen Cloud Architecture Deployment Showcase",
  // 🆕 Integrated your Google Search Console verification code safely here
  verification: {
    google: "kM6RjFintIF-6FRFBZsvBgq-7s0TxYRw_I-AplX7Al8",
  },
};

// Add explicit type definition for layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body 
      suppressHydrationWarning={true}
      className="bg-zinc-950 text-zinc-100 antialiased selection:bg-cyan-500 selection:text-black min-h-screen flex flex-col">
        {/* Navbar component */}
        <Navbar />
        
        {/* Main application rendering zone */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}