"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PolaroidStack from "./components/PolaroidStack";
import EigerLoader from "./components/EigerLoader";
import TacticalNavHub from "./components/TacticalNav";
import * as THREE from "three";
import { gsap } from "gsap";

interface ExperienceNode {
  id: string;
  title?: string;
  organization?: string;
  type?: string;
  duration?: string;
  whatIDid?: string;
  whatILearned?: string;
  perks?: string;
  verifyUrl?: string;
  certImageUrl?: string;
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [profile, setProfile] = useState({
    fullName: "Purnima Sirangu",
    specialization: "Artificial Intelligence & Data Science",
    institution: "Sir C. R. Reddy College of Engineering, Eluru",
    btechPercentage: "9.28",
    profileImageUrl: ""
  });
  const [experiences, setExperiences] = useState<ExperienceNode[]>([]);
  const [loading, setLoading] = useState(true);

  // Canvas and interaction tracking references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const cameraZRef = useRef(6);

  useEffect(() => {
    const unsubProfile = onSnapshot(doc(db, "meta", "profile"), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(prev => ({ ...prev, ...docSnap.data() }));
      }
    });

    const qExp = query(collection(db, "experiences"), orderBy("createdAt", "desc"));
    const unsubExp = onSnapshot(qExp, (snap) => {
      const mappedData = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ExperienceNode[];
      setExperiences(mappedData.filter(exp => exp.type !== "internship_roadmap"));
      setLoading(false);
    });

    return () => {
      unsubProfile();
      unsubExp();
    };
  }, []);

  // 🌐 IMMERSIVE MOUSE-REACTIVE THREE.JS DECK ANIMATION AGENT
  useEffect(() => {
    if (loading || !canvasRef.current) return;

    // 1. Scene setup params
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Add structural Igloo style Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 3. System Hardware Lighting
    const light = new THREE.PointLight(0xffffff, 30);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x18181b));

    camera.position.z = cameraZRef.current;

    // 4. Capture Normalized Mouse Coordinates
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 5. Continuous Smooth Physics Loop
    let animationFrameId: number;
    const animate = () => {
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.001;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      camera.position.x = mouseRef.current.x * 2.5;
      camera.position.y = -mouseRef.current.y * 2.5;
      camera.position.z = cameraZRef.current;

      camera.lookAt(mesh.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 6. Trigger intro animations via GSAP when boot sequence loader drops
    if (!showLoader) {
      const tl = gsap.timeline();
      
      tl.to(cameraZRef, {
        current: 1.2,
        duration: 3,
        ease: "expo.inOut"
      });

      tl.to(mesh.scale, {
        x: 3.5,
        y: 3.5,
        z: 3.5,
        duration: 3.5,
        ease: "power2.out"
      }, 0);

      tl.to(mesh.material.color, {
        r: 0.02, 
        g: 0.71, 
        b: 0.83, 
        duration: 2.5
      }, 0.5);
    }

    // Window adjustment anchors
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [loading, showLoader]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-xs text-purple-400 gap-2">
        <div className="w-8 h-8 rounded-full border border-t-purple-500 border-zinc-900 animate-spin" />
        <span>CONNECTING TO MY WORKSPACE ARCHIVE...</span>
      </div>
    );
  }

  return (
    <>
      {/* 1. CHARACTER OVERLAPPING IRIS SHUTTER LOADER */}
      {showLoader && <EigerLoader onComplete={() => setShowLoader(false)} />}

      {/* 🔮 BACKGROUND CANVAS TRACK LAYER */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
      />

      {/* 2. CORE PERFORMANCE INTERFACE */}
      <div 
        style={{
          transform: showLoader ? "scale(0.97)" : "scale(1)",
          filter: showLoader ? "blur(12px)" : "blur(0px)",
          transition: "transform 1200ms cubic-bezier(0.25, 1, 0.5, 1), filter 1000ms ease-out"
        }}
        className="min-h-screen bg-[#030303]/40 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative z-10"
      >
        <div className="absolute top-0 inset-x-0 h-screen bg-[radial-gradient(circle_at_50%_30%,rgba(147,51,234,0.03),transparent_70%)] pointer-events-none" />
        
        {/* ==================== SECTION 01: MY HERO PROFILE ==================== */}
        <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16 border-b border-zinc-900/80">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-32">
            
            {/* HERO LEFT CONTAINER: MY INTRODUCTION */}
            <div className="lg:col-span-8 space-y-10 relative z-10 select-none">
              <div className="inline-flex items-center gap-3 font-mono text-[15px] tracking-[0.4em] text-purple-400 font-black border border-purple-900/40 bg-purple-950/20 px-3 py-1 rounded">
                WELCOME 
              </div>

              <div className="space-y-2">
                <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.8] uppercase">
                  {profile.fullName.split(" ")[0]} <br />
                  <span className="bg-gradient-to-r from-purple-500 via-zinc-100 to-cyan-400 bg-clip-text text-transparent">
                    {profile.fullName.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
                <p className="font-mono text-[50px] md:text-xs text-zinc-10 uppercase tracking-[0.3em] pl-2 pt-2">
                  {profile.specialization}
                </p>
              </div>

              {/* 🛡️ GLASSMORPHIC PROTECTIVE VISOR WRAPPER */}
              <div className="bg-zinc-890/75 border border-zinc-900/60 backdrop-blur-md p-10 rounded-xl max-w-2xl shadow-10xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-purple-500/40" />
                <div className="absolute top-0 left-0 w-[1px] h-2 bg-purple-500/40" />

                <p className="text-sm md:text-base text-zinc-200 leading-relaxed text-justify font-light antialiased">
                  I engineer intelligent systems, predictive models, and performant full-stack applications. This environment showcases my technical projects and academic work compiled during my training at <span className="text-white font-medium">Sir C. R. Reddy College of Engineering, Eluru</span>. As an AI & Data Science undergraduate, I focus on bridging the gap between controlled experimental machine learning models and robust, real-world deployment settings. My expertise includes structuring complex full-stack backend workflows, accelerating real-time computer vision responsiveness, and designing <span className="text-purple-400 font-semibold">resource-aware, privacy-conscious</span> intelligent systems driven by <span className="text-cyan-400 font-semibold">local LLM pipelines</span>.
                </p>
              </div>
            </div>

            {/* HERO RIGHT CONTAINER: COMPASS RADIAL BOUND AVATAR */}
            <div className="lg:col-span-4 flex items-center justify-center relative">
              <div className="absolute w-80 h-80 md:w-96 md:h-96 border border-zinc-900/60 rounded-full animate-[spin_160s_linear_infinite] pointer-events-none opacity-30">
                {[...Array(60)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-0 left-1/2 w-[1px] h-3.5 bg-zinc-700 origin-[0_160px] md:origin-[0_192px]" 
                    style={{ transform: `rotate(${i * 6}deg)` }} 
                  />
                ))}
              </div>

              <div className="w-64 h-64 md:w-76 md:h-76 rounded-full p-2 border border-zinc-800 bg-zinc-950/40 backdrop-blur-md relative overflow-hidden z-10 shadow-2xl group">
                {profile.profileImageUrl ? (
                  /* 🛠️ MODIFIED: Removed grayscale filters to keep the image full-colored permanently */
                  <img src={profile.profileImageUrl} alt="Purnima Sirangu Profile Node" className="w-full h-full rounded-full object-cover filter contrast-[1.05] brightness-100 transition-all duration-700 ease-in-out" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-zinc-700">// LOG_IMAGE_MISSING</div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ==================== SECTION 02: MY SKETCH-MATCHED DIAGONAL SPLIT HUB ==================== */}
        <section className="w-full py-16 px-6 md:px-16 bg-gradient-to-b from-transparent to-zinc-950/20 relative z-20">
          <TacticalNavHub />
        </section>

        {/* ==================== SECTION 03: MY INTERACTIVE VALIDATION CERTIFICATE DECK ==================== */}
        <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-b from-transparent to-[#050508] relative z-20">
          <div className="w-full relative flex items-center justify-center">
            <PolaroidStack items={experiences} />
          </div>
        </section>

      </div>
    </>
  );
}