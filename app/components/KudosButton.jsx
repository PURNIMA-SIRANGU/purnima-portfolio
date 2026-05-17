"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function KudosButton() {
  const [kudosCount, setKudosCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isActivating, setIsActivating] = useState(false);
  const nextIdRef = useRef(0);

  // Synchronize dynamic counter values live from Firebase cloud infrastructure
  useEffect(() => {
    const docRef = doc(db, "meta", "kudos");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setKudosCount(docSnap.data().count || 0);
      } else {
        // Safe check initialization fallback tracking logic
        setDoc(docRef, { count: 0 });
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔊 SYNTHESIZE RETRO ARCADE PITCH-SLIDE AUDIO PIPELINE
  const playArcadeChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "triangle"; // Gives a beautiful retro 8-bit game console texture
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      // Smooth frequency pitch-up ramp over 0.25 seconds
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.25);

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      // Audio stream error suppressor layout parameters
    }
  };

  // GENERATIVE SPATIAL PHYSICS CONTEXT: GENERATE PARTICLE ARRAY ON CLICK
  const handleTriggerKudos = async (e) => {
    e.preventDefault();
    if (isActivating) return;

    setIsActivating(true);
    playArcadeChime();

    // Fetch click coordinates relative to the button element layout
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Code symbols to spawn into the graphical canvas vector loop
    const glyphPool = ["1", "0", "++", "ψ", "⟨⟩", "λ", "AI"];
    const generatedParticles = [];

    // Spawn 12 individual moving code symbols exploding outwards 360 degrees
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 * Math.PI) / 180; // Space angles uniformly around layout
      const velocity = 2 + Math.random() * 4; // Randomized acceleration parameters
      
      generatedParticles.push({
        id: nextIdRef.current++,
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        char: glyphPool[Math.floor(Math.random() * glyphPool.length)],
        color: indexToColor(i),
        scale: 0.6 + Math.random() * 0.8
      });
    }

    setParticles((prev) => [...prev, ...generatedParticles]);

    // Push calculation step straight to the network live array channel
    try {
      const docRef = doc(db, "meta", "kudos");
      await updateDoc(docRef, { count: increment(1) });
    } catch (err) {
      console.error("Cloud counter error:", err);
    }

    setTimeout(() => setIsActivating(false), 150);
  };

  // Loops through a clean technical cyberpunk spectrum palette
  const indexToColor = (i) => {
    const colors = ["#22d3ee", "#a855f7", "#3b82f6", "#ec4899", "#10b981", "#f59e0b"];
    return colors[i % colors.length];
  };

  // Real-time animation ticks drawing gravity vectors on the canvas symbols
  useEffect(() => {
    if (particles.length === 0) return;

    const frameId = requestAnimationFrame(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy + 0.15, // Smooth gravity pull drag effect downward
            vx: p.vx * 0.96,       // Atmospheric friction resistance values
            vy: p.vy * 0.96,
            scale: p.scale - 0.02  // Dynamic decay fade out matrix rules
          }))
          .filter((p) => p.scale > 0) // Delete code particles that have vanished completely
      );
    });

    return () => cancelAnimationFrame(frameId);
  }, [particles]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 select-none">
      <div className="relative">
        
        {/* INTERACTIVE FLOATING ENGINE CANVAS GLYPHS */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute pointer-events-none font-mono text-xs font-black tracking-tight z-50 transition-opacity duration-300"
            style={{
              left: p.x,
              top: p.y,
              color: p.color,
              transform: `translate(-50%, -50%) scale(${p.scale})`,
              textShadow: `0 0 8px ${p.color}`
            }}
          >
            {p.char}
          </span>
        ))}

        {/* HIGH-END GAMIFIED ACTION BUTTON CONTAINER */}
        <button
          onClick={handleTriggerKudos}
          className={`relative px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center gap-4 group overflow-hidden transition-all duration-300 focus:outline-none focus:ring-0 active:scale-95 ${
            isActivating ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "hover:border-zinc-700"
          }`}
        >
          {/* BACKGROUND MATTE PULSE GLOW GLIMMER ENGINE */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* ARCADE SYMBOL MATRIX ACCENT ICON */}
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-sm text-cyan-400 font-black group-hover:text-purple-400 group-hover:border-purple-900/60 transition-colors duration-300">
            {isActivating ? "✦" : "⚡"}
          </div>

          <div className="text-left font-sans">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-0.5">Ecosystem Validation Echo</span>
            <span className="text-sm font-bold text-zinc-200 group-hover:text-white tracking-tight">Transmit Kudos Node</span>
          </div>

          {/* SEPARATE LIVE DIGITAL REGISTER TALLY BOARD */}
          <div className="ml-4 border-l border-zinc-900 pl-4 py-1 font-mono text-sm md:text-base font-black tracking-wider bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {kudosCount.toLocaleString()}
          </div>
        </button>
      </div>
    </div>
  );
}