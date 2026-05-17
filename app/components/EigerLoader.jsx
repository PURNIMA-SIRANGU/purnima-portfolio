"use client";

import React, { useState, useEffect } from "react";

export default function EigerLoader({ onComplete }) {
  const nameChars = ["S", "I", "R", "A", "N", "G", "U", "P", "U", "R", "N", "I", "M", "A"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Hyper-fast single-spot letter swap interval
    const textTimer = setInterval(() => {
      setCurrentIdx((prev) => {
        if (prev >= nameChars.length - 1) {
          clearInterval(textTimer);
          // Trigger smooth curtain fade reveal out matching campaign structures
          setTimeout(() => setIsFading(true), 350);
          setTimeout(() => onComplete(), 950);
          return prev;
        }
        return prev + 1;
      });
    }, 120); // Velocity flash timing per character

    return () => clearInterval(textTimer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center font-sans select-none overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"}`}>
      {/* RETRO SUB-MATRICES SCANLINES OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_0.4rem] pointer-events-none" />
      
      {/* SINGLE SPOT OVERLAPPING TYPOGRAPHY BOX */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {nameChars.map((char, index) => {
          const isActive = index === currentIdx;
          const isPast = index < currentIdx;

          return (
            <span
              key={index}
              className={`absolute text-8xl md:text-9xl font-black tracking-tighter leading-none transition-all duration-150 ease-out transform-gpu ${
                isActive 
                  ? "opacity-100 scale-100 rotate-0 text-white" 
                  : isPast 
                    ? "opacity-0 scale-125 -rotate-6 text-purple-500/10 blur-sm" 
                    : "opacity-0 scale-75 rotate-6 text-zinc-900"
              }`}
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                textShadow: isActive ? "0 0 50px rgba(168,85,247,0.3)" : "none"
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* TACTICAL RUNTIME DATA MARKS */}
      <div className="absolute bottom-12 font-mono text-[9px] tracking-[0.5em] text-zinc-600 uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
        {"\\/{ }@:@! &@=<<"} {currentIdx + 1}
      </div>
    </div>
  );
}