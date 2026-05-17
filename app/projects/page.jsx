"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error reading project data matrix:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const startupVentures = projects.filter(p => p.isStartup);
  const coreProjects = projects.filter(p => !p.isStartup);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-blue-400 font-mono tracking-widest">
        <p className="animate-pulse">INITIALIZING COMPILER STREAM...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 font-sans selection:bg-blue-500 selection:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* PAGE HEADER */}
        <header className="mb-16 border-b border-zinc-900 pb-8">
          <br></br>
          <br></br>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Project Hub
          </h1>
          <p className="mt-2 text-zinc-400 text-sm max-w-2xl">
            An automated compilation of architectural software developments, core AI engines, and ongoing product innovations.
          </p>
        </header>

        {/* SECTION 1: STARTUP VENTURES */}
        {startupVentures.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Active Startup Ecosystems</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {startupVentures.map((project) => (
                <div key={project.id} className="relative overflow-hidden rounded-2xl border border-emerald-900/30 bg-zinc-900/20 backdrop-blur-sm shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Startup Thumbnail Frame */}
                    {project.thumbnailUrl && (
                      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-zinc-900/60">
                        <img src={project.thumbnailUrl} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-zinc-100">{project.title}</h3>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-md whitespace-nowrap">Founder Mode</span>
                      </div>
                      <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 flex gap-4 border-t border-zinc-900 pt-4 text-xs font-semibold">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Source Control ↗</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline transition-colors">Launch App 🚀</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: CORE TECHNICAL PROJECTS */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Software Development Architecture</h2>
          
          {coreProjects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
              <p className="text-zinc-500 text-sm">No regular applications recorded in this data tree segment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreProjects.map((project) => (
                <div key={project.id} className="group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-900/30 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Project Thumbnail Frame */}
                    {project.thumbnailUrl && (
                      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-zinc-900 relative">
                        <img src={project.thumbnailUrl} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-medium bg-zinc-900 border border-zinc-800/40 text-zinc-500 px-2.5 py-0.5 rounded-md">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 flex gap-4 border-t border-zinc-900 pt-4 text-xs font-medium text-zinc-400">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Live Link ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}