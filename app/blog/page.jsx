"use client";

import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ComicVisualInsightsMatrix() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);

  useEffect(() => {
    const qBlogs = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(qBlogs, (snapshot) => {
      setBlogs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-xs text-purple-400 gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-t-purple-500 border-r-transparent border-zinc-800 animate-spin" />
        <span>COMPILING HIGH-END COMIC CANVAS STACKS...</span>
      </div>
    );
  }

  // Asymmetric frame sizing setup that dynamically controls how blocks break down across the screen
  const gridFrameStyles = [
    "md:col-span-2 md:row-span-2 border-purple-500/30 shadow-purple-950/20",
    "md:col-span-1 md:row-span-1 border-cyan-900/60 shadow-cyan-950/10 md:rotate-1",
    "md:col-span-1 md:row-span-2 border-zinc-800 shadow-black/40 md:-rotate-1",
    "md:col-span-2 md:row-span-1 border-amber-900/60 shadow-amber-950/10",
    "md:col-span-1 md:row-span-1 border-rose-900/60 shadow-rose-950/10 md:rotate-1"
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans px-6 py-32 relative overflow-hidden">
      {/* BACKGROUND GRAPH GRID MATRIX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.03),transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="space-y-4 max-w-2xl select-none">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-purple-400 font-bold bg-purple-950/20 border border-purple-900/40 px-3 py-1 rounded-md">Visual Log Matrix</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-50 leading-none">
            TECHNICAL <br />
            <span className="bg-gradient-to-r from-purple-400 via-zinc-200 to-cyan-400 bg-clip-text text-transparent">CHRONICLES</span>
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-light text-justify">Deconstructing computational complexity architectures through high-end asymmetric comic frame masks, overlapping editorial typography, and modular visual block viewports.</p>
        </header>

        {/* ==================== 01 / DYNAMIC COMIC SPLIT-SCREEN REVEAL HERO ==================== */}
        {blogs.length > 0 && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-zinc-950/20 border border-zinc-900/60 p-4 rounded-[2.5rem] overflow-hidden relative group">
            
            {/* LARGE IMMERSIVE HERO IMAGE MASK PANEL WITH MULTI-KEY DATABASE FALLBACKS */}
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden relative min-h-[400px] lg:min-h-[500px] bg-zinc-900">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-103 filter brightness-[0.7] contrast-[1.15]"
                style={{ 
                  backgroundImage: `url(${
                    blogs[activeFrameIdx]?.frameImageUrl || 
                    blogs[activeFrameIdx]?.imageUrl || 
                    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000"
                  })` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-90 pointer-events-none" />
              <div className="absolute top-6 left-6 font-mono text-[9px] text-zinc-400 tracking-widest bg-black/80 px-3 py-1 rounded border border-zinc-800/60 backdrop-blur-md">
                FEATURE_STORY // LAYER_0{activeFrameIdx + 1}
              </div>
            </div>

            {/* HERO NARRATIVE PANEL WITH OVERLAY TYPOGRAPHY */}
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-zinc-950/60 backdrop-blur-xl rounded-[2rem] border border-zinc-900">
              <div className="space-y-6">
                <div className="flex justify-between items-center font-mono text-[10px]">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">
                    {blogs[activeFrameIdx]?.tags ? blogs[activeFrameIdx].tags.slice(0, 2).join(" // ") : "SYSTEM_LOG"}
                  </span>
                  <span className="text-zinc-600 font-semibold tracking-widest">INSTANCE_2026</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none uppercase">
                    {blogs[activeFrameIdx]?.title}
                  </h2>
                  <div className="h-[2px] w-12 bg-purple-500/50" />
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed text-justify">
                  {blogs[activeFrameIdx]?.excerpt}
                </p>
              </div>

              {/* CONTROLLER DIAL FOOTER */}
              <div className="pt-6 border-t border-zinc-900/80 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {blogs.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFrameIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx === activeFrameIdx ? "w-8 bg-purple-500" : "w-2 bg-zinc-800 hover:bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">PAGE REVEAL // ACTIVE</span>
              </div>
            </div>
          </section>
        )}

        {/* ==================== 02 / THE MULTI-GRID COMIC BOOK FLUID FRAME MATRIX ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-auto md:auto-rows-[520px]">
          {blogs.map((post, index) => {
            const frameConfig = gridFrameStyles[index % gridFrameStyles.length];
            const currentImgAsset = post.frameImageUrl || post.imageUrl;

            return (
              <div 
                key={post.id || index}
                className={`border bg-zinc-950/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-500/30 ${frameConfig}`}
              >
                {/* INTERACTION 1: FULL-BLEED BACKGROUND MASK LAYER IMAGE */}
                {currentImgAsset && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-[0.05] group-hover:opacity-15 group-hover:scale-105 transition-all duration-700 pointer-events-none filter grayscale contrast-[1.2] brightness-70"
                    style={{ backgroundImage: `url(${currentImgAsset})` }}
                  />
                )}

                {/* HEADER LABEL INFO CHANNELS */}
                <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500 tracking-wider relative z-10">
                  <span className="bg-black/60 px-2.5 py-1 border border-zinc-900/80 rounded">PANEL_GRID // 0{index + 1}</span>
                  <div className="flex gap-1.5 justify-end">
                    {post.tags && post.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-cyan-400 font-bold uppercase">#{t}</span>
                    ))}
                  </div>
                </div>

                {/* INTERACTION 2: SOLID VISIBLE INLINE COMIC FRAME IMAGE BOX */}
                {currentImgAsset && (
                  <div className="w-full h-44 md:h-48 rounded-2xl overflow-hidden border border-zinc-900/80 my-4 relative z-10 shrink-0 bg-zinc-900">
                    <img 
                      src={currentImgAsset} 
                      alt={post.title} 
                      className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85] group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
                  </div>
                )}

                {/* CONTENT AREA */}
                <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight uppercase group-hover:text-purple-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed text-justify line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* BOTTOM FOOTER UTILITIES TIMELINE ACTIONS */}
                <div className="border-t border-zinc-900/60 pt-4 mt-2 flex justify-between items-center text-[10px] font-mono text-zinc-500 relative z-10 shrink-0">
                  <span className="uppercase tracking-wide">CHRONICLE LAYER LOG //</span>
                  <button className="text-zinc-400 group-hover:text-white font-black uppercase tracking-widest transition-colors flex items-center gap-1 focus:outline-none">
                    Read Frame <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>

                {/* INK BOX CORNER CROSSHAIR ACCENTS */}
                <span className="absolute top-2 right-3 text-[10px] font-mono text-zinc-900 pointer-events-none group-hover:text-zinc-700">┘</span>
                <span className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-900 pointer-events-none group-hover:text-zinc-700">┌</span>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}