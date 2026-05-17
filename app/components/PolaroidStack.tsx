"use client";

import React, { useState, useEffect, useRef } from "react";

interface ExperienceNode {
  id: string;
  title?: string;
  organization?: string;
  type?: string;
  duration?: string;
  certImageUrl?: string;
}

interface PolaroidStackProps {
  items: ExperienceNode[];
}

export default function PolaroidStack({ items }: PolaroidStackProps) {
  const [orderedItems, setOrderedItems] = useState<ExperienceNode[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Live Verified Metrics Extracted from User Dashboard Sync
  const codingMetrics = {
    leetcode: { 
      solved: "124 Solved", 
      breakdown: "31E | 65M | 28H", 
      url: "https://leetcode.com/u/gJJRK8Xvpq/" 
    },
    codechef: { 
      badge: "Silver Solver", 
      streak: "100 Day Diamond", 
      url: "https://www.codechef.com/users/sirangupurnima" 
    },
    hackerrank: { 
      badges: "4 Certifications", 
      milestone: "30 Days of Code", 
      url: "https://www.hackerrank.com/profile/sirangupurnima" 
    },
    github: { 
      repos: "8 Repositories", 
      contributions: "55 Commits", 
      url: "https://github.com/PURNIMA-SIRANGU" 
    },
    linkedin: { 
      followers: "388 Followers", 
      impressions: "23.4K Impressions", 
      url: "https://linkedin.com/in/purnima-sirangu-034017351" 
    }
  };

  const skillCategories = [
    {
      title: "AI / ML & Intelligent Systems",
      skills: [
        { name: "Python", iconUrl: "https://unpkg.com/simple-icons@v11/icons/python.svg", color: "hover:border-yellow-600/40 hover:shadow-[0_0_15px_rgba(55,118,171,0.2)] text-[#3776AB]" },
        { name: "Large Language Models", iconUrl: "https://unpkg.com/simple-icons@v11/icons/openai.svg", color: "hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,163,127,0.2)] text-[#10A37F]" },
        { name: "OpenCV", iconUrl: "https://unpkg.com/simple-icons@v11/icons/opencv.svg", color: "hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] text-[#FF0000]" },
        { name: "MediaPipe", iconUrl: "https://unpkg.com/simple-icons@v11/icons/google.svg", color: "hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(66,133,244,0.2)] text-[#4285F4]" },
        { name: "Scikit-Learn", iconUrl: "https://unpkg.com/simple-icons@v11/icons/scikitlearn.svg", color: "hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(242,159,38,0.2)] text-[#F29F26]" },
        { name: "XGBoost", iconUrl: "https://unpkg.com/simple-icons@v11/icons/xgboost.svg", color: "hover:border-teal-500/40 hover:shadow-[0_0_15px_rgba(0,181,226,0.2)] text-[#00B5E2]" }
      ]
    },
    {
      title: "Core Frameworks & Full Stack",
      skills: [
        { name: "JavaScript", iconUrl: "https://unpkg.com/simple-icons@v11/icons/javascript.svg", color: "hover:border-yellow-500/40 hover:shadow-[0_0_15px_rgba(247,223,30,0.2)] text-[#F7DF1E]" },
        { name: "React.js", iconUrl: "https://unpkg.com/simple-icons@v11/icons/react.svg", color: "hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(97,218,251,0.2)] text-[#61DAFB]" },
        { name: "Node.js", iconUrl: "https://unpkg.com/simple-icons@v11/icons/nodedotjs.svg", color: "hover:border-green-500/40 hover:shadow-[0_0_15px_rgba(51,153,51,0.2)] text-[#339933]" },
        { name: "Flask", iconUrl: "https://unpkg.com/simple-icons@v11/icons/flask.svg", color: "hover:border-zinc-400/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] text-[#FFFFFF]" },
        { name: "Tailwind CSS", iconUrl: "https://unpkg.com/simple-icons@v11/icons/tailwindcss.svg", color: "hover:border-teal-400/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] text-[#38BDF8]" },
        { name: "HTML5 / CSS3", iconUrl: "https://unpkg.com/simple-icons@v11/icons/html5.svg", color: "hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(241,101,41,0.2)] text-[#F16529]" }
      ]
    },
    {
      title: "Languages & System Infrastructure",
      skills: [
        { name: "C++", iconUrl: "https://unpkg.com/simple-icons@v11/icons/cplusplus.svg", color: "hover:border-blue-600/40 hover:shadow-[0_0_15px_rgba(0,89,156,0.2)] text-[#00599C]" },
        { name: "C Language", iconUrl: "https://unpkg.com/simple-icons@v11/icons/c.svg", color: "hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(16,180,224,0.2)] text-[#A8B4E0]" },
        { name: "Java", iconUrl: "https://unpkg.com/simple-icons@v11/icons/openjdk.svg", color: "hover:border-red-600/40 hover:shadow-[0_0_15px_rgba(234,45,46,0.2)] text-[#EA2D2E]" },
        { name: "SQL & MySQL", iconUrl: "https://unpkg.com/simple-icons@v11/icons/mysql.svg", color: "hover:border-orange-400/40 hover:shadow-[0_0_15px_rgba(68,121,161,0.2)] text-[#4479A1]" },
        { name: "SQLite", iconUrl: "https://unpkg.com/simple-icons@v11/icons/sqlite.svg", color: "hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(0,59,143,0.2)] text-[#003B8F]" },
        { name: "GitHub / Git", iconUrl: "https://unpkg.com/simple-icons@v11/icons/github.svg", color: "hover:border-zinc-400/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] text-[#FFFFFF]" }
      ]
    }
  ];

  useEffect(() => {
    if (items && items.length > 0) {
      setOrderedItems(items);
    }
  }, [items]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const bringToFront = (id: string) => {
    setOrderedItems((prev) => {
      const target = prev.find((item) => item.id === id);
      const rest = prev.filter((item) => item.id !== id);
      if (!target) return prev;
      return [...rest, target];
    });
  };

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-12 relative">
      
      {/* ==================== 🛠️ SPACE-BLACK SKILLS GRID PANEL ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full max-w-5xl mx-auto">
        {skillCategories.map((category) => (
          <div 
            key={category.title} 
            className="bg-[#070709]/60 border border-zinc-900/80 p-6 rounded-xl font-mono relative overflow-hidden group hover:border-zinc-800 transition-all duration-300 shadow-2xl backdrop-blur-md"
          >
            <div className="absolute top-0 left-0 w-2 h-[1px] bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
            <div className="absolute top-0 left-0 w-[1px] h-2 bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
            
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-zinc-900/60 pb-3">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              {category.title}
            </h4>
            
            <div className="flex flex-col gap-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4 group/item cursor-default">
                  <div className={`w-10 h-10 rounded-full bg-[#020203] border border-zinc-900 flex items-center justify-center transition-all duration-300 group-hover/item:scale-105 shadow-[0_0_10px_rgba(0,0,0,0.9)] relative overflow-hidden p-2.5 ${skill.color}`}>
                    <img 
                      src={skill.iconUrl} 
                      alt={`${skill.name} icon`}
                      className="w-full h-full object-contain filter invert brightness-200 opacity-60 group-hover/item:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium tracking-wide transition-colors duration-300 group-hover/item:text-zinc-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ==================== 🎴 DECK CONTAINER + INTERACTIVE SIDEBARS ==================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        
        {/* 📉 LEFT SIDEBAR: METRICS ENGINE PANEL */}
        <div 
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(-30px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)"
          }}
          className="lg:col-span-3 space-y-4 font-mono z-20"
        >
          {/* 🛠️ RENAMED & TIED CLOSER: Shifted namespace to unique core metric tracking token */}
          <div className="text-[10px] text-zinc-500 font-bold tracking-normal mb-2 text-left">// METRICS_VAULT_INDEX</div>
          
          {/* LeetCode Card */}
          <a 
            href={codingMetrics.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950/70 border border-zinc-900 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10 p-2"><img src="https://unpkg.com/simple-icons@v11/icons/leetcode.svg" className="filter invert w-full h-full object-contain" /></div>
            <div className="text-xs font-bold text-zinc-400 group-hover:text-amber-500 transition-colors mb-1">LeetCode</div>
            <div className="text-xl font-black text-amber-500 tracking-tight">{codingMetrics.leetcode.solved}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Matrix Structure: <span className="text-zinc-300">{codingMetrics.leetcode.breakdown}</span></div>
          </a>

          {/* CodeChef Card */}
          <a 
            href={codingMetrics.codechef.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950/70 border border-zinc-900 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-orange-600/40 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10 p-2"><img src="https://unpkg.com/simple-icons@v11/icons/codechef.svg" className="filter invert w-full h-full object-contain" /></div>
            <div className="text-xs font-bold text-zinc-400 group-hover:text-orange-500 transition-colors mb-1">CodeChef</div>
            <div className="text-xl font-black text-orange-500 tracking-tight">{codingMetrics.codechef.badge}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Activity Node: <span className="text-zinc-300">{codingMetrics.codechef.streak}</span></div>
          </a>

          {/* HackerRank Card */}
          <a 
            href={codingMetrics.hackerrank.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950/70 border border-zinc-900 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10 p-2"><img src="https://unpkg.com/simple-icons@v11/icons/hackerrank.svg" className="filter invert w-full h-full object-contain" /></div>
            <div className="text-xs font-bold text-zinc-400 group-hover:text-emerald-400 transition-colors mb-1">HackerRank</div>
            <div className="text-xl font-black text-emerald-400 tracking-tight">{codingMetrics.hackerrank.badges}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Milestone Track: <span className="text-zinc-300">{codingMetrics.hackerrank.milestone}</span></div>
          </a>
        </div>

        {/* 🎴 CENTER PILLAR: INTERACTIVE CERTIFICATE DECK */}
        <div className="lg:col-span-6 flex items-center justify-center min-h-[520px] relative overflow-hidden transform-gpu">
          <div className="absolute w-[450px] h-[450px] border border-zinc-900/20 rounded-full pointer-events-none opacity-30" />
          <div className="absolute w-[300px] h-[300px] border border-dashed border-zinc-900/10 rounded-full pointer-events-none opacity-20" />

          <div className="relative w-64 md:w-72 h-full flex items-center justify-center z-10">
            {orderedItems.length === 0 ? (
              <div className="font-mono text-xs text-zinc-600 uppercase border border-dashed border-zinc-900 px-6 py-20 rounded-xl text-center w-full bg-[#040405]/40 backdrop-blur-sm">
                // AWAITING_VERIFICATION_PACKETS...
              </div>
            ) : (
              orderedItems.map((card, index) => {
                const rotationAngle = (index % 3 === 0 ? -4 : index % 3 === 1 ? 5 : -2) * (index * 0.4 + 1);
                const horizontalShift = (index % 2 === 0 ? -10 : 10) * (index * 0.3);
                const verticalShift = index * -6;

                return (
                  <div
                    key={card.id || index}
                    onClick={() => bringToFront(card.id || "")}
                    style={{
                      transform: `rotate(${rotationAngle}deg) translate(${horizontalShift}px, ${verticalShift}px)`,
                      zIndex: index,
                    }}
                    className="absolute w-64 md:w-72 bg-[#fafafa] text-zinc-900 p-4 pb-6 rounded-sm border border-zinc-200/50 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 hover:-translate-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.85)] group"
                  >
                    <div className="w-full h-44 md:h-48 bg-zinc-950 overflow-hidden relative border border-zinc-200/60 rounded-sm">
                      {card.certImageUrl ? (
                        <img
                          src={card.certImageUrl}
                          alt={card.title || "Certificate"}
                          className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] antialiased pointer-events-none image-render-crisp"
                          style={{ imageRendering: "auto", backfaceVisibility: "hidden" }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-zinc-600">
                          // LINKING_IMAGE_NODE_EMPTY
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                    </div>

                    <div className="mt-4 space-y-1 pl-0.5 select-none text-left">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-purple-600 font-bold block">
                        {card.organization || "Corporate Verification"}
                      </span>
                      <h3 className="text-sm font-bold tracking-tight text-zinc-800 font-sans uppercase line-clamp-1">
                        {card.title || "Untitled Assignment"}
                      </h3>
                      <p className="font-mono text-[9px] text-zinc-400 font-medium">
                        ⏱️ {card.duration || "Verified System Node"}
                      </p>
                    </div>

                    <div className="absolute bottom-1 right-2 font-mono text-[6px] text-zinc-300 tracking-widest font-black uppercase">
                      // SYS_CERT_STK
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 📈 RIGHT SIDEBAR: OPEN PRODUCTION SIGNALS PANEL */}
        <div 
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(30px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)"
          }}
          className="lg:col-span-3 space-y-4 font-mono z-20 text-left"
        >
          {/* 🛠️ RENAMED & TIED CLOSER: Removed terminal duplicate, set descriptive tracking tag */}
          <div className="text-[10px] text-zinc-500 font-bold tracking-normal mb-2">// PRODUCTION_METRICS_INDEX</div>

          {/* GitHub Card */}
          <a 
            href={codingMetrics.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950/70 border border-zinc-900 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10 p-2"><img src="https://unpkg.com/simple-icons@v11/icons/github.svg" className="filter invert w-full h-full object-contain" /></div>
            <div className="text-xs font-bold text-zinc-400 group-hover:text-purple-400 transition-colors mb-1">GitHub</div>
            <div className="text-xl font-black text-purple-400 tracking-tight">{codingMetrics.github.repos}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Activity Code: <span className="text-zinc-300">{codingMetrics.github.contributions}</span></div>
          </a>

          {/* LinkedIn Card */}
          <a 
            href={codingMetrics.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950/70 border border-zinc-900 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10 p-2"><img src="https://unpkg.com/simple-icons@v11/icons/linkedin.svg" className="filter invert w-full h-full object-contain" /></div>
            <div className="text-xs font-bold text-zinc-400 group-hover:text-blue-400 transition-colors mb-1">LinkedIn</div>
            <div className="text-xl font-black text-blue-400 tracking-tight">{codingMetrics.linkedin.impressions}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Network Base: <span className="text-zinc-300">{codingMetrics.linkedin.followers}</span></div>
          </a>
        </div>

      </div>
    </div>
  );
}