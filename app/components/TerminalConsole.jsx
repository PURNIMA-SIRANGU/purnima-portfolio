"use client";

import React, { useState, useEffect, useRef } from "react";

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { text: "SYSTEM: INITIALIZING CORE KERNELS...", type: "system" },
    { text: "TYPE 'help' TO REVEAL OPERATIONAL COMMAND MATRIX.", type: "prompt" }
  ]);
  const [input, setInput] = useState("");
  const [terminalMode, setTerminalMode] = useState("normal"); // normal | matrix | quantum
  const terminalEndRef = useRef(null);

  // 🔊 SYSTEM HAPTIC AUDIO ENGINE (NATIVE WEB AUDIO OSCILLATOR)
  const playClickSound = (frequency = 800, duration = 0.015) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Subtle volume hum
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback for untriggered browser contexts
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // GAMIFIED COMMAND PROCESSING LOGIC
  const handleCommandExecute = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    playClickSound(600, 0.03); // Deeper execution confirm chime
    
    let response = [];
    response.push({ text: `purnima-sif://core$ ${input}`, type: "user" });

    switch (cmd) {
      case "help":
        response.push(
          { text: "— AVAILABLE ECOSYSTEM COMMANDS —", type: "system" },
          { text: "clear      - Purge structural tracking terminal logs", type: "info" },
          { text: "about      - Output technical engineer persona summary", type: "info" },
          { text: "matrix     - Overclock layout into falling rain grid matrix", type: "info" },
          { text: "quantum    - Shift environment tracking grids to sub-atomic teal alpha", type: "info" },
          { text: "reset      - Clear system visual mod configurations back to default", type: "info" }
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "about":
        response.push({ 
          text: "Purnima Sirangu // B.Tech Specialist in AI & Data Science. Bridging full-stack interfaces, cognitive automation pipelines, and advanced quantum compute frameworks.", 
          type: "system" 
        });
        break;
      case "matrix":
        setTerminalMode("matrix");
        response.push({ text: "SYSTEM OVERCLOCK: CRITICAL FALLING RADIAL MATRIX GRID LOADED.", type: "warning" });
        playClickSound(1200, 0.1);
        break;
      case "quantum":
        setTerminalMode("quantum");
        response.push({ text: "SYSTEM VECTOR: HYBRID SCHRODINGER COMPUTE STATE LOCK ACTIVATED.", type: "warning" });
        playClickSound(1500, 0.08);
        break;
      case "reset":
        setTerminalMode("normal");
        response.push({ text: "SYSTEM CLEANSE: RE-ALIGNED TERMINAL MATRIX BACK TO BASELINE INITIALIZATION.", type: "system" });
        break;
      default:
        response.push({ text: `COMMAND FAULT: '${cmd}' unrecognized. Vector tracking unassigned. Type 'help'.`, type: "error" });
    }

    setHistory((prev) => [...prev, ...response]);
    setInput("");
  };

  // Dynamic status theme coloring overrides based on gamified console states
  const getThemeStyles = () => {
    if (terminalMode === "matrix") return "border-green-900/60 bg-green-950/5 shadow-green-500/5 text-green-400 font-mono";
    if (terminalMode === "quantum") return "border-cyan-900/60 bg-cyan-950/5 shadow-cyan-500/5 text-cyan-400 font-mono";
    return "border-zinc-900 bg-zinc-950/80 shadow-black/80 text-zinc-300 font-sans";
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 select-none">
      {/* TERMINAL CASING LAYER */}
      <div className={`border rounded-2xl backdrop-blur-md p-6 h-[400px] flex flex-col justify-between transition-all duration-700 shadow-2xl relative overflow-hidden ${getThemeStyles()}`}>
        
        {/* INTERACTIVE BACKGROUND DECORATORS */}
        {terminalMode === "matrix" && (
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none animate-pulse" />
        )}
        {terminalMode === "quantum" && (
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)] pointer-events-none" />
        )}

        {/* TERMINAL CARD BAR HEADER */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            <span className="ml-2">Console System Node // Mode: {terminalMode}</span>
          </div>
          <span>v2.0.26</span>
        </div>

        {/* STREAMING RESPONSE CHANNELS BOX */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 font-mono text-xs md:text-sm scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
          {history.map((log, index) => (
            <div 
              key={index} 
              className={`leading-relaxed tracking-wide text-justify ${
                log.type === "user" ? "text-white font-bold" :
                log.type === "system" ? "text-cyan-400" :
                log.type === "warning" ? "text-amber-400 animate-pulse" :
                log.type === "error" ? "text-rose-400 font-bold" : "text-zinc-400"
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* LIVE KEY INPUT CAPTURE FORUM ROW */}
        <form onSubmit={handleCommandExecute} className="mt-4 pt-3 border-t border-zinc-900/60 flex gap-2 items-center font-mono text-xs md:text-sm">
          <span className="text-cyan-500 font-bold tracking-tight">purnima-sif://core$</span>
          <input 
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              playClickSound(900, 0.008); // Real-time continuous mechanical keyboard haptic keypress ticks
            }}
            placeholder="Type 'help' to initialize matrix commands..."
            className="flex-1 bg-transparent border-none text-white outline-none focus:ring-0 p-0 tracking-wide placeholder-zinc-700 select-text"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}