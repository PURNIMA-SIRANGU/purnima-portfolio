"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PremiumAboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [profile, setProfile] = useState({
    fullName: "Purnima Sirangu",
    specialization: "Artificial Intelligence & Data Science",
    institution: "Sir C. R. Reddy College of Engineering, Eluru",
    graduationYear: "2027",
    btechPercentage: "9.28",
    sem1: "9.41", sem2: "9.36", sem3: "9.10", sem4: "9.43", sem5: "", sem6: "", sem7: "", sem8: "",
    interCollege: "Ch.S.D. St. Theresa's College for Women, Eluru",
    interPercentage: "97.4", 
    interYear: "2023",
    linkedin: "",
    github: "",
    resumeUrl: "",
    profileImageUrl: "" 
  });
  const [loading, setLoading] = useState(true);

  // Real-time Cloud Synchronization
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "meta", "profile"), (docSnap) => {
      if (docSnap.exists()) {
        const dbData = docSnap.data();
        setProfile((prev) => ({
          ...prev,
          fullName: dbData.fullName || prev.fullName,
          specialization: dbData.specialization || prev.specialization,
          institution: dbData.institution || prev.institution,
          graduationYear: dbData.graduationYear || prev.graduationYear,
          btechPercentage: dbData.btechPercentage || prev.btechPercentage,
          sem1: dbData.sem1 || prev.sem1,
          sem2: dbData.sem2 || prev.sem2,
          sem3: dbData.sem3 || prev.sem3,
          sem4: dbData.sem4 || prev.sem4,
          interCollege: dbData.interCollege || prev.interCollege,
          interPercentage: dbData.interPercentage || prev.interPercentage,
          interYear: dbData.interYear || prev.interYear,
          linkedin: dbData.linkedin || prev.linkedin,
          github: dbData.github || prev.github,
          resumeUrl: dbData.resumeUrl || prev.resumeUrl,
          profileImageUrl: dbData.profileImageUrl || prev.profileImageUrl
        }));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Spatial Cursor Coordinate Tracking Engine
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
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 font-mono tracking-[0.3em] text-xs">
        <p className="animate-pulse">LOADING EXPERIENTIAL MATRIX...</p>
      </div>
    );
  }

  const semesters = [
    { label: "01", sgpa: profile.sem1 },
    { label: "02", sgpa: profile.sem2 },
    { label: "03", sgpa: profile.sem3 },
    { label: "04", sgpa: profile.sem4 },
  ].filter(s => s.sgpa);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-400 selection:text-black relative overflow-hidden transition-colors duration-500"
      style={{
        background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34, 211, 238, 0.04), transparent 80%), #050505`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 relative z-10 space-y-32">
        
        {/* HERO SECTION: SPLIT LAYOUT WITH INTERACTIVE AVATAR FRAME */}
        <section className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-start justify-between">
          <div className="space-y-8 max-w-2xl flex-1">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-400 block">
                System Portfolio — Instance 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 leading-none cursor-default select-none">
                {profile.fullName.split(" ")[0]} <br />
                <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  {profile.fullName.split(" ")[1]}
                </span>
              </h1>
            </div>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light pt-4 border-t border-zinc-900">
              Architecting cloud solutions, cognitive pipelines, and intelligent human-AI interfaces. Specializing in <span className="text-zinc-200 font-medium">{profile.specialization}</span> with foundational research branches anchored inside hybrid classical-quantum modeling array tracks.
            </p>

            <div className="flex flex-wrap gap-3">
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group px-4 py-2.5 bg-zinc-900/30 border border-zinc-900 rounded-xl text-[11px] font-black tracking-widest uppercase text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300">LinkedIn <span className="inline-block group-hover:translate-x-0.5 transition-transform">↗</span></a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="group px-4 py-2.5 bg-zinc-900/30 border border-zinc-900 rounded-xl text-[11px] font-black tracking-widest uppercase text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300">GitHub <span className="inline-block group-hover:translate-x-0.5 transition-transform">↗</span></a>}
              {profile.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 bg-cyan-400/5 border border-cyan-400/20 rounded-xl text-[11px] font-black tracking-widest uppercase text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-400/[0.01]">View Resume 📄</a>}
            </div>
          </div>

          {/* DYNAMIC RETRO-CYBER PHOTO FRAME */}
          <div className="w-full md:w-80 shrink-0 aspect-[4/5] relative rounded-3xl border border-zinc-900 bg-zinc-900/10 p-2 group transition-all duration-500 hover:border-cyan-500/20 hover:shadow-[0_0_50px_rgba(34,211,238,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
            <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-950 relative">
              {profile.profileImageUrl ? (
                <img 
                  src={profile.profileImageUrl} 
                  alt={profile.fullName} 
                  className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
              ) : (
                /* Premium Tech Blueprint Frame if URL is empty */
                <div className="h-full w-full bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-[size:16px_16px] flex flex-col items-center justify-center p-6 text-center select-none group-hover:border-zinc-800 transition-all">
                  <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 text-xl group-hover:border-cyan-500/30 group-hover:text-cyan-400/60 transition-all duration-500">
                    👤
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-600 mt-4 block group-hover:text-zinc-400 transition-colors">Core Identity Node</span>
                  <div className="w-12 h-[1px] bg-zinc-900 mt-2 group-hover:bg-cyan-500/10" />
                </div>
              )}
              <span className="absolute top-3 left-3 font-mono text-[9px] text-zinc-500/50 uppercase tracking-widest group-hover:text-cyan-400/40 transition-colors">SYS.IMG // P_01</span>
              <div className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-zinc-800 group-hover:bg-cyan-400 transition-colors animate-pulse" />
            </div>
          </div>
        </section>

        {/* ACADEMIC EXPERIENTIAL CHRONICLES */}
        <section className="space-y-12">
          <header className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-cyan-500/40" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Academic Architecture Matrix</h2>
          </header>

          <div className="grid grid-cols-1 gap-12 relative before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-zinc-900">
            
            {/* B.TECH CARD */}
            <div className="relative pl-16 group">
              <div className="absolute left-[19px] top-2 h-2 w-2 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-cyan-400/50" />
              <div className="border border-zinc-900/80 bg-zinc-900/[0.1] hover:bg-zinc-900/[0.25] rounded-3xl p-8 transition-all duration-500 hover:border-zinc-800 flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <span className="font-mono text-xs text-zinc-600 block tracking-widest uppercase">01 / Higher Institutional Ledger</span>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-200 mt-1 group-hover:text-cyan-400 transition-colors">{profile.institution}</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">Bachelor of Technology — {profile.specialization}</p>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    Currently tracking an overall cumulative engineering performance metric evaluating to an active standing profile rank within the <span className="text-cyan-400 font-medium">Top 20% of the branch division</span> based on verified data registry packages.
                  </p>

                  {/* HIGH-END SEMESTER METRIC TILES */}
                  {semesters.length > 0 && (
                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {semesters.map((s, idx) => (
                        <div key={idx} className="bg-black/40 border border-zinc-900 rounded-2xl p-4 transition-all duration-300 hover:border-cyan-500/20 hover:bg-zinc-950/40 cursor-default group/chip">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-600 uppercase block group-hover/chip:text-zinc-500 transition-colors">TERM {s.label}</span>
                          <span className="text-lg font-black font-mono text-zinc-400 group-hover/chip:text-cyan-400 block mt-1 transition-colors">
                            {s.sgpa} <span className="text-[9px] text-zinc-600 font-normal">SGPA</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span className="text-[10px] font-mono bg-zinc-900/60 border border-zinc-800/80 px-3 py-1 rounded-md text-zinc-400">2023 — {profile.graduationYear}</span>
                  <span className="text-4xl font-black font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                    {profile.btechPercentage || "9.28"} <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 bg-clip-text bg-none text-zinc-600 ml-1">CGPA</span>
                  </span>
                </div>
              </div>
            </div>

            {/* INTERMEDIATE CARD */}
            {profile.interCollege && (
              <div className="relative pl-16 group">
                <div className="absolute left-[19px] top-2 h-2 w-2 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-blue-400/50" />
                <div className="border border-zinc-900/80 bg-zinc-900/[0.1] hover:bg-zinc-900/[0.25] rounded-3xl p-8 transition-all duration-500 hover:border-zinc-800 flex flex-col md:flex-row gap-8 justify-between items-start">
                  <div className="space-y-3 max-w-2xl">
                    <div>
                      <span className="font-mono text-xs text-zinc-600 block tracking-widest uppercase">02 / Higher Secondary Division</span>
                      <h3 className="text-2xl font-bold tracking-tight text-zinc-200 mt-1 group-hover:text-blue-400 transition-colors">{profile.interCollege}</h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">Mathematics, Physics & Chemistry Track</p>
                    </div>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      Secured absolute distinction across engineering prerequisites, featuring an elite performance scorecard with maximum points attained in core analytical components.
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                    <span className="text-[10px] font-mono bg-zinc-900/60 border border-zinc-800/80 px-3 py-1 rounded-md text-zinc-400">Class of {profile.interYear}</span>
                    <span className="text-4xl font-black font-mono bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mt-2 filter drop-shadow-[0_0_15px_rgba(96,165,250,0.15)] whitespace-nowrap">
                      {profile.interPercentage}% <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 ml-0.5">Final</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 mt-1 font-semibold">974 / 1000 Marks</span>
                  </div>
                </div>
              </div>
            )}

            {/* SSC CARD */}
            <div className="relative pl-16 group">
              <div className="absolute left-[19px] top-2 h-2 w-2 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-purple-400/50" />
              <div className="border border-zinc-900/80 bg-zinc-900/[0.1] hover:bg-zinc-900/[0.25] rounded-3xl p-8 transition-all duration-500 hover:border-zinc-800 flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="space-y-2 max-w-2xl">
                  <div>
                    <span className="font-mono text-xs text-zinc-600 block tracking-widest uppercase">03 / Secondary Credentials Baseline</span>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-200 mt-1 group-hover:text-purple-400 transition-colors">Secondary School Certificate (SSC)</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">General Sciences & Mathematical Core Foundation</p>
                  </div>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    Maintained high distinction honor status across foundational mathematics and logical reasoning prerequisites, concluding with an entry valuation of **583 out of 600 total points**.
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span className="text-[10px] font-mono bg-zinc-900/60 border border-zinc-800/80 px-3 py-1 rounded-md text-zinc-400">Class of 2021</span>
                  <span className="text-4xl font-black font-mono bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-2 filter drop-shadow-[0_0_15px_rgba(192,132,252,0.15)] whitespace-nowrap">
                    97.16% <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 ml-0.5">Total</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600 mt-1 font-semibold">583 / 600 Marks</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}