"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // 📍 NEW: Lightbox Modal State for Ultra-Clear High-Resolution Previews
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const q = query(collection(db, "artworks"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedArt = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtworks(fetchedArt);
      } catch (error) {
        console.error("Error fetching artwork data stream:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Filter artworks by category selection
  const filteredArtworks = selectedFilter === "all" 
    ? artworks 
    : artworks.filter(art => art.category === selectedFilter);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-cyan-400 font-mono tracking-widest">
        <p className="animate-pulse">LOADING CREATIVE ASSETS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 font-sans selection:bg-cyan-500 selection:text-black relative">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12 text-center md:text-left border-b border-zinc-900 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Art Gallery
            </h1>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              A dynamic digital canvas showcasing my sketches, digital layout designs, posters, and creative exploration.
            </p>
          </div>

          {/* FILTER CONTROLS */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["all", "sketches", "digital", "posters", "spiritual"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase border transition-all ${
                  selectedFilter === cat
                    ? "bg-cyan-600/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/5"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* GALLERY MASONRY-STYLE RESPONSIVE GRID */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/10">
            <p className="text-zinc-500 text-sm">No creative assets found in this category stream.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => (
              <article 
                key={art.id} 
                className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/20 transition-all duration-300 hover:border-zinc-800 hover:shadow-2xl hover:shadow-cyan-500/[0.01]"
              >
                {/* 📍 MODIFIED: Added onClick and cursor-zoom-in to trigger Lightbox */}
                <div 
                  className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative cursor-zoom-in"
                  onClick={() => setLightboxImage(art.imageUrl)}
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-md">
                    {art.category}
                  </div>
                  
                  {/* Subtle expand icon overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-md">
                      🔍 Expand Asset
                    </span>
                  </div>
                </div>

                {/* Info Overlay / Description Content */}
                <div className="p-5 border-t border-zinc-900 bg-zinc-900/40 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors duration-300">
                    {art.title}
                  </h3>
                  {art.description && (
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {art.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* 📍 NEW: ULTRA-LARGE CINEMATIC LIGHTBOX VIEWPORT MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Top Control Bar */}
          <div className="w-full max-w-7xl flex justify-between items-center mb-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-2">
            <span>High-Resolution Asset Viewer</span>
            <button className="text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider cursor-pointer">
              Close [ESC]
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="w-full max-w-7xl max-h-[85vh] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 p-2 shadow-2xl flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={lightboxImage} 
              alt="Expanded Artwork Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none image-render-crisp"
            />
          </div>
        </div>
      )}
    </div>
  );
}