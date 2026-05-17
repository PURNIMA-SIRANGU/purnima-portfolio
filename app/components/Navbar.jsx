"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Academic Info", path: "/about" },
    { name: "Experience", path: "/roadmap" },
    { name: "Project Hub", path: "/projects" },
    { name: "Credentials", path: "/credentials" },
    { name: "Tech Blog", path: "/blog" },
    { name: "DSA Stream", path: "/logs" },
    { name: "Art Canvas", path: "/gallery" },
    { name: "Terminal", path: "/" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md font-sans transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* BRAND IDENTITY KEY LOGO - UNCHANGED */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
          <span className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
            Ecosystem Core
          </span>
        </Link>

        {/* 💻 INTERACTIVE LINK DIRECTORIES (DESKTOP) - COMPLETELY UNCHANGED */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-900 border border-zinc-800 text-cyan-400 shadow-md shadow-cyan-500/[0.02]"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* HIDDEN / DISK GATEWAY INTERFACE PORTAL */}
          <Link
            href="/admin"
            className={`ml-4 p-2 rounded-xl border border-dashed transition-all duration-300 ${
              pathname === "/admin"
                ? "border-purple-500 bg-purple-500/10 text-purple-400"
                : "border-zinc-800 text-zinc-600 hover:text-purple-400 hover:border-purple-900/60"
            }`}
            title="Admin Console Gateway"
          >
            🔒
          </Link>
        </div>

        {/* 📱 NEW MOBILE LAYOUT MODULE - ONLY SHOWS ON MOBILE VIEWS */}
        <div className="md:hidden flex items-center">
          {/* Circular Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="relative flex items-center justify-center p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:border-cyan-500/50 transition-colors group focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {/* Outermost Ring */}
            <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-zinc-600 transition-colors group-hover:stroke-cyan-400">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" fill="none" />
            </svg>
            {/* Core Center Dot */}
            <div className="absolute w-2 h-2 rounded-full bg-zinc-500 transition-all group-hover:bg-cyan-400 group-active:scale-75" />
          </button>
        </div>

      </div>

      {/* 📱 MOBILE SIDE PANEL DRAWER OVERLAY */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-xs bg-zinc-950/95 border-l border-zinc-900 backdrop-blur-lg p-6 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col gap-6 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Panel Header Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-black tracking-widest uppercase text-zinc-400">MENU // CORE</span>
          </div>
          <button 
            onClick={toggleMenu} 
            className="text-zinc-500 hover:text-zinc-200 font-mono text-[11px] tracking-widest uppercase"
          >
            [ Close ]
          </button>
        </div>

        {/* Mobile Vertical Navigation Directory */}
        <nav className="flex flex-col gap-2 overflow-y-auto pr-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-900 border border-zinc-800 text-cyan-400"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Secure Portal Mobile Inclusion */}
          <Link
            href="/admin"
            onClick={toggleMenu}
            className={`mt-4 px-4 py-3 rounded-xl border border-dashed text-xs font-semibold tracking-wider uppercase flex items-center justify-between transition-all duration-300 ${
              pathname === "/admin"
                ? "border-purple-500 bg-purple-500/10 text-purple-400"
                : "border-zinc-800 text-zinc-500 hover:text-purple-400 hover:border-purple-500/30"
            }`}
          >
            <span>Console Gateway</span>
            <span>🔒</span>
          </Link>
        </nav>
      </div>
    </nav>
  );
}