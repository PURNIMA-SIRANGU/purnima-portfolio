"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HorizontalImmersiveRoadmap() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [dbExperiences, setDbExperiences] = useState([]);

  // Statically bound structural internship array with rich, distinct solid color fills
  const staticInternships = [
    {
      title: "Data Science Intern",
      organization: "IntrnForte",
      duration: "Aug 2024 - Aug 2025 · 1 yr 1 mo",
      location: "Remote",
      scope: "Executed core data synthesis models, handled exploratory data analysis routines, and configured custom logic routines using MATLAB parameters.",
      vectors: "Exploratory Data Analysis and MATLAB tracking environments.",
      themeClass: "bg-[#0c2024] border-cyan-800 text-zinc-100 hover:border-cyan-400",
      dotClass: "border-cyan-400 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]",
      textClass: "text-cyan-300"
    },
    {
      title: "Full Stack Developer Intern",
      organization: "IntrnForte",
      duration: "Aug 2024 - Aug 2025 · 1 yr 1 mo",
      location: "Remote",
      scope: "Designed, integrated, and optimized interactive component layouts and modular architectures for high-end web applications.",
      vectors: "Front-End Development setups and responsive UI frameworks.",
      themeClass: "bg-[#241707] border-amber-800 text-zinc-100 hover:border-amber-400",
      dotClass: "border-amber-400 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]",
      textClass: "text-amber-300"
    },
    {
      title: "AI & Machine Learning Intern",
      organization: "Innovate Intern",
      duration: "Jun 2025 - Aug 2025 · 3 mos",
      location: "Remote",
      scope: "Immerse engineered intelligent cognitive pipelines and automated algorithmic execution modules for descriptive data modeling sets.",
      vectors: "Artificial Intelligence (AI) and Machine Learning logic models.",
      themeClass: "bg-[#14122b] border-indigo-800 text-zinc-100 hover:border-indigo-400",
      dotClass: "border-indigo-400 bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]",
      textClass: "text-indigo-300"
    },
    {
      title: "Python Developer Intern",
      organization: "Codec Technologies India",
      duration: "Jul 2025 - Aug 2025 · 2 mos",
      location: "On-site",
      scope: "Built, debugged, and launched clean algorithmic utility structures and backend script assets using structured data routines.",
      vectors: "Python (Programming Language) ecosystem parameters.",
      themeClass: "bg-[#290c14] border-rose-800 text-zinc-100 hover:border-rose-400",
      dotClass: "border-rose-400 bg-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]",
      textClass: "text-rose-300"
    },
    {
      title: "Flutter Developer Intern",
      organization: "Navodita Infotech",
      duration: "Aug 2025 - Dec 2025 · 5 mos",
      location: "Remote",
      scope: "Engineered mobile application interface flows, state tracking systems, and responsive layout primitives using the Dart compiler.",
      vectors: "Flutter cross-platform system modeling architectures.",
      themeClass: "bg-[#091f14] border-emerald-800 text-zinc-100 hover:border-emerald-400",
      dotClass: "border-emerald-400 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]",
      textClass: "text-emerald-300"
    }
  ];

  // Ring Array Style Mapping Matrix to dynamically dress future entries pushed from Admin
  const styleMatrix = [
    { bg: "bg-[#0c2024] border-cyan-800 text-zinc-100 hover:border-cyan-400", dot: "border-cyan-400 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]", text: "text-cyan-300" },
    { bg: "bg-[#241707] border-amber-800 text-zinc-100 hover:border-amber-400", dot: "border-amber-400 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]", text: "text-amber-300" },
    { bg: "bg-[#14122b] border-indigo-800 text-zinc-100 hover:border-indigo-400", dot: "border-indigo-400 bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]", text: "text-indigo-300" },
    { bg: "bg-[#290c14] border-rose-800 text-zinc-100 hover:border-rose-400", dot: "border-rose-400 bg-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]", text: "text-rose-300" },
    { bg: "bg-[#091f14] border-emerald-800 text-zinc-100 hover:border-emerald-400", dot: "border-emerald-400 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]", text: "text-emerald-300" }
  ];

  // Listen live to user data stream
  useEffect(() => {
    const qExp = query(collection(db, "experiences"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(qExp, (snapshot) => {
      setDbExperiences(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Mouse Coordinate Aura Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Arrow Click Navigation Action
  const handleScrollClick = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 460;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Unify static cards with newly deployed admin database cards safely
  const roadmapPushedCards = dbExperiences
    .filter(e => e.type === "internship_roadmap")
    .map((exp, idx) => {
      const styleTemplate = styleMatrix[(staticInternships.length + idx) % styleMatrix.length];
      return {
        title: exp.title,
        organization: exp.organization,
        duration: exp.duration,
        location: exp.location || "Remote",
        scope: exp.scope,
        vectors: exp.vectors,
        themeClass: styleTemplate.bg,
        dotClass: styleTemplate.dot,
        textClass: styleTemplate.text
      };
    });

  const internships = [...staticInternships, ...roadmapPushedCards];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-x-hidden pb-32"
      style={{
        background: `radial-gradient(1000px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.01), transparent 85%), #030303`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-32 space-y-24 relative z-10">
        
        {/* HEADINGS */}
        <header className="space-y-6 max-w-3xl select-none">
          <span className="text-xs font-mono uppercase tracking-[0.5em] font-black text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-3 py-1.5 rounded-md">
            Ecosystem Timeline Matrix
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-100 leading-none">
            Professional <br />
            <span className="bg-gradient-to-r from-cyan-400 via-zinc-200 to-indigo-500 bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed text-justify font-light">
            Tracing the evolution of a multi-disciplinary engineering trajectory—bridging full-stack system architectures and cognitive data pipelines with elite selections in advanced quantum computational logic and national artificial intelligence community frameworks.
          </p>
        </header>

        {/* ==================== 01 / HORIZONTAL INTERNSHIPS STREAM CONSOLE ==================== */}
        <section className="relative pt-8 group/section">
          
          {/* NAVIGATION ARROWS */}
          <button 
            onClick={() => handleScrollClick("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-2xl opacity-0 group-hover/section:opacity-100 hidden md:flex focus:outline-none"
            aria-label="Scroll Left"
          >
            <span className="text-xl font-bold font-mono">←</span>
          </button>
          
          <button 
            onClick={() => handleScrollClick("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-2xl opacity-0 group-hover/section:opacity-100 hidden md:flex focus:outline-none"
            aria-label="Scroll Right"
          >
            <span className="text-xl font-bold font-mono">→</span>
          </button>

          {/* EDGE MASKS */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none hidden md:block" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none hidden md:block" />

          {/* HORIZONTAL CONTAINER */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-12 overflow-x-auto pb-32 pt-32 px-12 scrollbar-none items-center snap-x snap-mandatory relative scroll-smooth"
          >
            {/* THICK TIMELINE CENTER TRACK */}
            <div className="absolute left-0 right-0 h-[4px] bg-zinc-900 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block" />

            {internships.map((exp, index) => {
              const waveYOffset = Math.sin(index * 1.0) * 85;

              return (
                <div 
                  key={index}
                  className="w-[320px] md:w-[420px] shrink-0 snap-center group relative transition-transform duration-500"
                  style={{
                    transform: `translateY(${waveYOffset}px)`
                  }}
                >
                  {/* COLOR-MATCHED TRACK NODE */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-[-10px] md:top-1/2 md:-translate-y-1/2 h-3.5 w-3.5 rounded-full z-20 transition-all duration-300 group-hover:scale-125 pointer-events-none ${exp.dotClass}`} />

                  {/* SOLID COLOR FILLED TILES */}
                  <div className={`border p-8 transition-all duration-500 flex flex-col justify-between h-[450px] relative rounded-[2rem] hover:shadow-2xl hover:-translate-y-1 ${exp.themeClass}`}>
                    
                    <div className="space-y-5">
                      <div className="flex justify-between items-center font-mono text-[10px]">
                        <span className="bg-black/40 border border-white/5 text-zinc-300 px-2.5 py-1 rounded">
                          {exp.duration.split(" · ")[0]}
                        </span>
                        <span className={`tracking-wider uppercase font-bold ${exp.textClass}`}>
                          {exp.location}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
                          {exp.title}
                        </h3>
                        <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 font-bold">
                          {exp.organization}
                        </p>
                      </div>

                      {/* TEXT BOXES WITH HIGHER CONTRAST AGAINST COLOR BACKGROUND */}
                      <div className="space-y-4 text-sm text-zinc-200/90 font-light border-t border-white/10 pt-4 text-justify leading-relaxed">
                        <p>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1 tracking-wider">Execution Scope:</span>
                          {exp.scope}
                        </p>
                        <p>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1 tracking-wider">Core System Stack:</span>
                          <span className="text-white font-normal">{exp.vectors}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-zinc-400 flex justify-between items-center">
                      <span>TRACK LOG // IND_0{index + 1}</span>
                      <span className={`font-bold uppercase tracking-wider ${exp.textClass}`}>{exp.duration.split(" · ")[1] || "Internship"}</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== 02 / ELITE ACHIEVEMENTS VERTICAL MATRIX ==================== */}
        <section className="space-y-12">
          <header className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-purple-500/40" />
            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-zinc-500">02 / Advanced Accolades & Achievements Ledger</h2>
          </header>

          <div className="grid grid-cols-1 gap-8">
            
            {/* QUANTUM COMPUTING */}
            <div className="group border border-zinc-900 bg-zinc-900/[0.03] hover:bg-zinc-900/[0.12] rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="md:col-span-3 space-y-5">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase bg-purple-950/20 px-2.5 py-1 border border-purple-900/30 rounded font-bold">
                    Top 0.48% Worldwide Selection
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-200 mt-3 group-hover:text-purple-400 transition-colors duration-300">
                    Advanced Quantum Computing Research Fellow
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1 font-semibold">
                    WISER / Advanced Quantum Training Network
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-zinc-400 font-light text-justify leading-relaxed pt-4 border-t border-zinc-900">
                  <p>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block mb-1 tracking-wider">Competitive Selection Metric:</span>
                    Secured highly competitive, elite selection status into the Advanced Phase II Quantum cohort, emerging as one of only 300 final members out of over 62,000 global applicants enrolled in the structural array framework.
                  </p>
                  <p>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block mb-1 tracking-wider">Advanced Knowledge Arrays:</span>
                    Advanced quantum circuit modeling, complex algorithmic architectures, matrix logic tracking configuration rules, and high-performance hybrid classical-quantum paradigms.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end justify-between h-full font-mono text-right shrink-0 pt-2 md:min-h-[160px] border-t md:border-t-0 md:border-l border-zinc-900/60 pt-4 md:pt-0 md:pl-8">
                <span className="text-xs bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-md text-zinc-400 self-start md:self-auto font-medium">Instance 2026</span>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/30 border border-purple-500/20 px-4 py-2 rounded-xl block mt-4 self-start md:self-auto shadow-xl shadow-purple-500/[0.01]">
                  Phase II Array Elite
                </span>
              </div>
            </div>

            {/* AI KIRAN LEADERSHIP */}
            <div className="group border border-zinc-900 bg-zinc-900/[0.03] hover:bg-zinc-900/[0.12] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <div className="md:col-span-3 space-y-5">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-indigo-400 uppercase bg-indigo-950/20 px-2.5 py-1 border border-indigo-900/30 rounded font-bold">
                    Community Ambassador Distinction
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-200 mt-3 group-hover:text-indigo-400 transition-colors duration-300">
                    Recognized AI KIRAN Community Ambassador
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1 font-semibold">
                    AI KIRAN National Initiative Hub
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-zinc-400 font-light text-justify leading-relaxed pt-4 border-t border-zinc-900">
                  <p>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block mb-1 tracking-wider">Ecosystem Engagement Actions:</span>
                    Recognized as an official AI enthusiast and community core leader under the prestigious national AI KIRAN initiative. Actively orchestrated peer learning loops, technological community engagement programs, and structural algorithmic code workshops.
                  </p>
                  <p>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block mb-1 tracking-wider">Acquired Community Skill Sets:</span>
                    Technical advocacy, ecosystem network scaling rules, open-source repository coordination tracking, collaborative mentorship, and execution models for cutting-edge generative computer methodologies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end justify-between h-full font-mono text-right shrink-0 pt-2 md:min-h-[160px] border-t md:border-t-0 md:border-l border-zinc-900/60 pt-4 md:pt-0 md:pl-8">
                <span className="text-xs bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-md text-zinc-400 self-start md:self-auto font-medium">Active Track</span>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/30 border border-indigo-500/20 px-4 py-2 rounded-xl block mt-4 self-start md:self-auto shadow-xl shadow-indigo-500/[0.01]">
                  AI Specialist Node
                </span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}