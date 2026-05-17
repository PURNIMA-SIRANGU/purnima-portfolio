"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "codingLogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedLogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(fetchedLogs);
      } catch (error) {
        console.error("Error reading data packet stream:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-purple-400 font-mono tracking-widest">
        <p className="animate-pulse">FETCHING PUBLIC REPOSITORIES...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 font-sans selection:bg-purple-500 selection:text-black">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-12 border-b border-zinc-900 pb-8">
          <br></br>
          <br></br>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Daily Coding Log
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            An automated, live stream tracking my daily progress through data structures, algorithms, and technical optimizations.
          </p>
        </header>

        {/* FEED RENDERING LOOP */}
        {logs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <p className="text-zinc-500 text-sm">No log entries have been streamed to this instance yet.</p>
          </div>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 md:before:left-6 before:w-[1px] before:bg-zinc-900">
            {logs.map((log) => (
              <article key={log.id} className="relative pl-10 md:pl-16 group">
                {/* Timeline Node Icon */}
                <div className="absolute left-[11px] md:left-[19px] top-1.5 h-3 w-3 rounded-full bg-zinc-800 border border-zinc-700 group-hover:bg-purple-500 group-hover:border-purple-400 transition-colors duration-300" />
                
                <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/50 hover:shadow-xl hover:shadow-purple-500/[0.02]">
                  {/* Title & Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h2 className="text-xl font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">
                      {log.title}
                    </h2>
                    {log.problemUrl && (
                      <a 
                        href={log.problemUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs font-medium text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Challenge Link ↗
                      </a>
                    )}
                  </div>

                  {/* Tags */}
                  {log.tags && log.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {log.tags.map((tag, i) => (
                        <span key={i} className="rounded-md bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-zinc-500 tracking-wide border border-zinc-800/40">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Logic Description */}
                  <div className="text-zinc-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                    {log.learnings}
                  </div>

                  {/* Code Snippet Blocks */}
                  {log.solutionCode && (
                    <div className="relative rounded-xl bg-black/60 p-4 border border-zinc-900/80 font-mono text-xs overflow-x-auto text-zinc-200 max-h-64 shadow-inner">
                      <pre><code>{log.solutionCode}</code></pre>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}