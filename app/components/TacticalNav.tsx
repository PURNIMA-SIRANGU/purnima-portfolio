"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SlotData {
  title: string;
  meta: string;
  summary: string;
  bgImg: string;
}

interface NavBlockProps {
  leftSlotKey: string;
  leftHref: string;
  rightSlotKey: string;
  rightHref: string;
  liveMap: Record<string, SlotData>;
}

function TacticalNavRow({ leftSlotKey, leftHref, rightSlotKey, rightHref, liveMap }: NavBlockProps) {
  const [activeWing, setActiveWing] = useState<"left" | "right" | null>(null);

  const defaults: Record<string, SlotData> = {
    academic: { title: "Academic Details", meta: "MY_ACADEMICS", summary: "Review my continuous educational trackers, structural specialization parameters, and my complete semester-by-semester CGPA aggregate logs.", bgImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600" },
    experience: { title: "Experience", meta: "MY_TIMELINE", summary: "Explore my technical engineering timeline, where I list my professional AI/ML and full-stack industry internship milestones.", bgImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600" },
    projects: { title: "Projects", meta: "MY_BUILDS", summary: "Examine my deployed code architecture vaults, including my local speech-to-speech LLM assistant ('pArI') and my smart hostel management systems.", bgImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
    blog: { title: "Blog", meta: "MY_CHRONICLES", summary: "Read through my custom-designed technical comic blogs where I deconstruct complex microprocessors and cryptographic network protocols.", bgImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600" },
    dsa: { title: "DSA", meta: "MY_STREAM", summary: "Track my daily data structures compilation path, algorithmic complexity proofs, and my continuous program optimization streams.", bgImg: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600" },
    art: { title: "Art", meta: "MY_CREATIVITY", summary: "Step inside my graphic gallery layout to inspect my manual charcoal sketches, digital compositions, and official design blueprints.", bgImg: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" }
  };

  const left = liveMap[leftSlotKey] || defaults[leftSlotKey];
  const right = liveMap[rightSlotKey] || defaults[rightSlotKey];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center h-auto md:h-44 py-6 md:py-0 relative group">
      
      {/* 👈 LEFT OVERVIEW TEXT PANEL */}
      <div className={`md:col-span-4 px-6 md:px-8 text-left transition-all duration-500 font-mono hidden md:block ${activeWing === "left" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
        <div className="bg-zinc-950/85 border border-zinc-900/50 backdrop-blur-md p-4 rounded-xl shadow-xl">
          <span className="text-[10px] text-purple-400 font-bold block mb-1.5 tracking-normal">// {left.meta}</span>
          <p className="text-xs text-zinc-200 leading-relaxed text-justify font-normal">{left.summary}</p>
        </div>
      </div>
      
      {/* Mobile view fallback wrapper */}
      <div className="md:col-span-4 block md:hidden px-6">
        <div className="bg-zinc-950/90 border border-zinc-900/60 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-xs text-zinc-300 font-mono tracking-normal">// {left.summary}</p>
        </div>
      </div>

      {/* 📐 CENTER PILLAR: DIAGONAL SPLIT ENGINE WITH DEFINED CROSS SECTIONS */}
      <div className="md:col-span-4 h-40 md:h-full relative overflow-hidden bg-zinc-950/80 border-x-0 md:border-x border-zinc-900/60">
        
        {/* Subtle inner grid backdrop within the split hub for structure */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-plus-lighter" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "1rem 1rem"
          }}
        />

        {/* BACKGROUND IMAGE CONTAINER */}
        <div 
          style={{ 
            backgroundImage: activeWing === "left" 
              ? `url(${left.bgImg})` 
              : activeWing === "right" 
                ? `url(${right.bgImg})` 
                : "none" 
          }}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out mix-blend-normal transform scale-105 pointer-events-none ${
            activeWing ? "opacity-95 blur-0 scale-100" : "opacity-0"
          }`}
        />
        
        {/* UPPER LEFT TRIANGLE BUTTON WITH DEFINED SHADOW BRACKET LINE */}
        <Link 
          href={leftHref} 
          onMouseEnter={() => setActiveWing("left")} 
          onMouseLeave={() => setActiveWing(null)} 
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} 
          className="absolute inset-0 bg-zinc-900/50 hover:bg-black/20 transition-all duration-300 flex items-start justify-start p-6 group/wing transform-gpu hover:scale-[1.01] z-10 drop-shadow-[0_0_1px_rgba(147,51,234,0.35)]"
        >
          <span 
            className="font-sans text-lg md:text-xl font-black uppercase tracking-tighter text-zinc-300 group-hover/wing:text-purple-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {left.title}
          </span>
        </Link>

        {/* LOWER RIGHT TRIANGLE BUTTON WITH DEFINED SHADOW BRACKET LINE */}
        <Link 
          href={rightHref} 
          onMouseEnter={() => setActiveWing("right")} 
          onMouseLeave={() => setActiveWing(null)} 
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} 
          className="absolute inset-0 bg-zinc-900/30 hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-6 group/wing transform-gpu hover:scale-[1.01] z-10 drop-shadow-[0_0_1px_rgba(6,182,212,0.35)]"
        >
          <span 
            className="font-sans text-lg md:text-xl font-black uppercase tracking-tighter text-zinc-400 group-hover/wing:text-cyan-400 transition-colors text-right drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {right.title}
          </span>
        </Link>
        
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-zinc-800/10 to-transparent pointer-events-none z-20 h-full w-full rotate-[26deg] scale-150" />
      </div>

      {/* 👉 RIGHT OVERVIEW TEXT PANEL */}
      <div className={`md:col-span-4 px-6 md:px-8 text-right transition-all duration-500 font-mono hidden md:block ${activeWing === "right" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
        <div className="bg-zinc-950/85 border border-zinc-900/50 backdrop-blur-md p-4 rounded-xl shadow-xl text-right">
          <span className="text-[10px] text-cyan-400 font-bold block mb-1.5 tracking-normal">{right.meta} //</span>
          <p className="text-xs text-zinc-200 leading-relaxed text-justify font-normal">{right.summary}</p>
        </div>
      </div>
      
      {/* Mobile view fallback wrapper */}
      <div className="md:col-span-4 block md:hidden px-6 mt-2">
        <div className="bg-zinc-950/90 border border-zinc-900/60 backdrop-blur-sm p-4 rounded-xl text-right">
          <p className="text-xs text-zinc-300 font-mono tracking-normal">{right.summary} //</p>
        </div>
      </div>
    </div>
  );
}

export default function TacticalNavHub() {
  const [liveMap, setLiveMap] = useState<Record<string, SlotData>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "meta", "navigation"), (docSnap) => {
      if (docSnap.exists()) {
        setLiveMap(docSnap.data() as Record<string, SlotData>);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col mt-16">
      
      {/* 🧭 💎 HEADLINE REDESIGN: LARGER SIZE, CLEAN CORES, LIGHT BLUE TINTING */}
      <div className="w-full flex justify-center text-center select-none mb-12 px-4">
        <h2 
          className="font-mono text-base sm:text-lg md:text-2xl font-black text-cyan-400 uppercase tracking-wider flex items-center justify-center gap-4"
          style={{ textShadow: "0 4px 16px rgba(34,211,238,0.3)" }}
        >
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_#22d3ee] shrink-0" />
          EXPLORE WORKSPACE DIRECTORY
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_#22d3ee] shrink-0 hidden sm:block" />
        </h2>
      </div>

      <TacticalNavRow leftSlotKey="academic" leftHref="/about" rightSlotKey="experience" rightHref="/roadmap" liveMap={liveMap} />
      <TacticalNavRow leftSlotKey="projects" leftHref="/projects" rightSlotKey="blog" rightHref="/blog" liveMap={liveMap} />
      <TacticalNavRow leftSlotKey="dsa" leftHref="/logs" rightSlotKey="art" rightHref="/gallery" liveMap={liveMap} />
    </div>
  );
}