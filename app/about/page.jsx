"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import KudosButton from "@/components/KudosButton";
export default function PremiumAboutPage() {
    <div className="mt-12 border-t border-zinc-900 pt-8">
        <KudosButton />
      </div>
  const containerRef = useRef(null);
  const [profile, setProfile] = useState({
    fullName: "Purnima Sirangu",
    specialization: "Artificial Intelligence & Data Science",
    institution: "Sir C. R. Reddy College of Engineering, Eluru",
    graduationYear: "2027",
    btechPercentage: "9.28",
    sem1: "9.41", sem2: "9.36", sem3: "9.10", sem4: "9.43", sem5: "", sem6: "", sem7: "", sem8: "",
    interCollege: "Ch.S.D. St. Theresa's College for Women, Eluru",
    interPercentage: "97.4", interYear: "2023",
    linkedin: "", github: "", resumeUrl: "", profileImageUrl: "" 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "meta", "profile"), (docSnap) => {
      if (docSnap.exists()) setProfile((prev) => ({ ...prev, ...docSnap.data() }));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 font-mono tracking-[0.3em] text-xs"><p className="animate-pulse">LOADING EXPERIENTIAL MATRIX...</p></div>;

  const semesters = [{ label: "01", sgpa: profile.sem1 }, { label: "02", sgpa: profile.sem2 }, { label: "03", sgpa: profile.sem3 }, { label: "04", sgpa: profile.sem4 }].filter(s => s.sgpa);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-400 selection:text-black relative overflow-hidden" style={{ background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34, 211, 238, 0.04), transparent 80%), #050505` }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem] mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%) opacity-60 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 z-10 space-y-32 relative">
        <section className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-start justify-between">
          <div className="space-y-8 max-w-2xl flex-1">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-400 block">System Portfolio — Instance 2026</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 leading-none">{profile.fullName.split(" ")[0]} <br /><span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">{profile.fullName.split(" ")[1]}</span></h1>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-light pt-4 border-t border-zinc-900">Architecting solutions and cognitive pipelines specializing in <span className="text-zinc-200 font-medium">{profile.specialization}</span>.</p>
          </div>
          <div className="w-full md:w-80 shrink-0 aspect-[4/5] rounded-3xl border border-zinc-900 bg-zinc-900/10 p-2 group transition-all duration-500 hover:border-cyan-500/20">
            <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-950 relative">
              {profile.profileImageUrl && <img src={profile.profileImageUrl} alt="Identity Asset" className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />}
            </div>
          </div>
        </section>
        <section className="space-y-12">
          <header className="flex items-center gap-4"><span className="h-[1px] w-12 bg-cyan-500/40" /><h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Academic Architecture Matrix</h2></header>
          <div className="grid grid-cols-1 gap-12 relative before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-zinc-900">
            <div className="relative pl-16 group">
              <div className="absolute left-[19px] top-2 h-2 w-2 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-cyan-400 transition-all duration-500" />
              <div className="border border-zinc-900/80 bg-zinc-900/[0.1] hover:bg-zinc-900/[0.25] rounded-3xl p-8 transition-all duration-500 flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="space-y-4 max-w-2xl">
                  <div><h3 className="text-2xl font-black text-zinc-200 group-hover:text-cyan-400 transition-colors">{profile.institution}</h3><p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">Bachelor of Technology — {profile.specialization}</p></div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {semesters.map((s, idx) => (
                      <div key={idx} className="bg-black/40 border border-zinc-900 rounded-2xl p-4"><span className="text-[9px] font-mono tracking-widest text-zinc-600 block">TERM {s.label}</span><span className="text-lg font-black font-mono text-zinc-400 block mt-1">{s.sgpa}</span></div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span className="text-[10px] font-mono text-zinc-400">2023 — {profile.graduationYear}</span>
                  <span className="text-4xl font-black font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">{profile.btechPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}