"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
        
        {/* BRAND IDENTITY KEY LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
          <span className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
            Ecosystem Core
          </span>
        </Link>

        {/* INTERACTIVE LINK DIRECTORIES */}
        <div className="flex items-center gap-1 md:gap-2">
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

      </div>
    </nav>
  );
}