"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StandaloneCertificatesPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Lightbox Modal State for Ultra-Clear High-Resolution Previews
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const qExp = query(collection(db, "experiences"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(qExp, (snapshot) => {
      setExperiences(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef || !containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-amber-500 font-mono tracking-[0.3em] text-xs">
        <p className="animate-pulse">FETCHING CERTIFICATE MATRIX LEDGER...</p>
      </div>
    );
  }

  const certifications = experiences;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-hidden px-6 py-24 md:px-12 md:py-32"
      style={{
        background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(245, 158, 11, 0.02), transparent 80%), #050505`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-24 relative z-10">
        
        {/* ==================== REFACTORED HEADER CONFIGURATION WITH LOW-BRIGHTNESS STICKY NOTE ==================== */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-zinc-900 pb-12 w-full">
          
          {/* Header Info Left Block */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-amber-500 block">
              Verification Repository
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-100 leading-none">
              Technical <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-600 bg-clip-text text-transparent">Certifications Vault</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-light pt-2 leading-relaxed text-justify">
              An official cryptographic directory documenting verified domain specializations, advanced academic achievements, and technological project validations.
            </p>
          </div>

          {/* 📌 ARCHIVAL PARTICIPATION STICKY NOTE RIGHT BLOCK (DESATURATED / LOW-BRIGHTNESS GLASS) */}
          <div className="lg:col-span-5 w-full flex justify-end relative pt-4 lg:pt-0">
            <div className="w-full max-w-sm relative rotate-1 hover:rotate-0 transition-transform duration-300 font-mono select-none">
              {/* Darkened/Translucent Sticky Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-800/30 backdrop-blur-md border border-zinc-700/40 skew-x-12 z-20" />
              
              {/* Muted Translucent Note Frame */}
              <div className="bg-amber-500/10 text-amber-200/90 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-amber-500/30 rounded-xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-amber-500/20 pointer-events-none" />

                <div className="text-[9px] font-bold tracking-wider text-amber-500/60 uppercase border-b border-zinc-900/60 pb-2 mb-4 flex items-center justify-between">
                  <span>// RECORD_ID: PARTICIPATIONS</span>
                  <span className="w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-start gap-2.5 group/item">
                    <span className="text-amber-500/50 shrink-0 mt-0.5 select-none text-[10px]">01 //</span>
                    <div>
                      <span className="text-zinc-200 font-bold group-hover/item:text-amber-300 transition-colors">TechNova Hackathon</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Organized by SVECW</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 group/item">
                    <span className="text-amber-500/50 shrink-0 mt-0.5 select-none text-[10px]">02 //</span>
                    <div>
                      <span className="text-zinc-200 font-bold group-hover/item:text-amber-300 transition-colors">Gnan Explore PPT Presentation</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Presented at UNITE Forum</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 group/item">
                    <span className="text-amber-500/50 shrink-0 mt-0.5 select-none text-[10px]">03 //</span>
                    <div>
                      <span className="text-zinc-200 font-bold group-hover/item:text-amber-300 transition-colors">DT&I Innovative Presentation</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Design Thinking & Innovation Track</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 group/item">
                    <span className="text-amber-500/50 shrink-0 mt-0.5 select-none text-[10px]">04 //</span>
                    <div>
                      <span className="text-zinc-200 font-bold group-hover/item:text-amber-300 transition-colors">Technical Project Expo</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Hosted at Sir C.R. Reddy College of Engineering</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 group/item">
                    <span className="text-amber-500/50 shrink-0 mt-0.5 select-none text-[10px]">05 //</span>
                    <div>
                      <span className="text-amber-400 font-extrabold tracking-tight">International Case Summit</span>
                      <p className="text-[10px] text-amber-500/80 font-bold mt-0.5">✨ IIM Bangalore Vista 2025</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-4 text-[7px] text-zinc-600 tracking-widest text-right font-black uppercase">
                  # AUTH_STK_VERIFIED_2026
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HIGH-FIDELITY CERTIFICATES VERTICAL EXHIBITION STACK */}
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            {certifications.map(exp => (
              <div 
                key={exp.id} 
                className="group border border-zinc-900 bg-zinc-900/[0.04] hover:bg-zinc-900/[0.12] rounded-3xl p-6 md:p-10 transition-all duration-500 hover:border-zinc-800 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
              >
                {/* Info Column Text Stack */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl md:text-3xl font-bold tracking-tight text-zinc-200 group-hover:text-amber-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-xs md:text-sm font-mono tracking-wider uppercase text-zinc-500">
                        {exp.organization}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed text-justify border-t border-zinc-900/60 pt-4">
                    <p>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase font-black block mb-1 tracking-wider">
                        Project Implementation & Scope:
                      </span> 
                      {exp.whatIDid}
                    </p>
                    <p>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase font-black block mb-1 tracking-wider">
                        Core Knowledge Acquired:
                      </span> 
                      {exp.whatILearned}
                    </p>
                    {exp.perks && (
                      <p>
                        <span className="text-[10px] font-mono text-zinc-600 uppercase font-black block mb-1 tracking-wider">
                          Validation Accolades & Badges:
                        </span> 
                        <span className="text-zinc-300 font-medium">{exp.perks}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 font-mono">
                    {exp.verifyUrl && (
                      <a 
                        href={exp.verifyUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[11px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        Verify Document ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* INTERACTIVE CERTIFICATE IMAGE CONTAINER NODE (CRYSTAL CLEAR SELECTION) */}
                {exp.certImageUrl && (
                  <div className="lg:col-span-2 w-full flex justify-center lg:justify-end">
                    <div 
                      onClick={() => setLightboxImage(exp.certImageUrl)}
                      className="w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-zinc-900 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:border-amber-500/40 transition-all duration-500 bg-black/60 p-2 cursor-zoom-in relative group/img shadow-2xl"
                    >
                      <img 
                        src={exp.certImageUrl} 
                        alt="Credential Snapshot Preview" 
                        className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover/img:scale-[1.02] antialiased image-render-crisp" 
                        style={{ imageRendering: "auto", backfaceVisibility: "hidden" }}
                      />
                      <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-1 text-xs text-zinc-200 uppercase font-mono tracking-widest transition-opacity duration-300 backdrop-blur-[1px]">
                        <span>🔍 Expand View</span>
                        <span className="text-[9px] text-zinc-400 lowercase font-normal">Click to reveal canvas</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-zinc-900 rounded-3xl p-12 text-center font-mono text-xs text-zinc-600 max-w-md mx-auto select-none">
            <span className="text-xl opacity-30 block mb-2">📜</span>
            <p className="uppercase tracking-wider font-bold">No Certification Nodes Detected</p>
          </div>
        )}

      </div>

      {/* ULTRA-LARGE CINEMATIC LIGHTBOX VIEWPORT MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Top Control Bar Status Line */}
          <div className="w-full max-w-6xl flex justify-between items-center mb-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-2">
            <span>Asset Preview Engine // Instance 2026</span>
            <button className="text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider">
              Close [ESC]
            </button>
          </div>

          {/* Expanded Container Viewport */}
          <div 
            className="w-full max-w-6xl max-h-[82vh] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 p-2 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={lightboxImage} 
              alt="High Resolution Verified Credential Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}