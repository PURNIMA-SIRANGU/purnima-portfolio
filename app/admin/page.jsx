"use client";

import React, { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

const ALLOWED_ADMIN_EMAIL = "sirangupurnima@gmail.com"; 

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dsa");

  // Live Database Collection Trackers
  const [liveProjects, setLiveProjects] = useState([]);
  const [liveBlogs, setLiveBlogs] = useState([]);
  const [liveExperiences, setLiveExperiences] = useState([]);

  // Loaders & Transaction Utilities
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingExpId, setEditingExpId] = useState(null);
  const [editingRoadmapId, setEditingRoadmapId] = useState(null); // Added tracking for roadmap

  // Core Form Group States
  const [dsaForm, setDsaForm] = useState({ title: "", problemUrl: "", solutionCode: "", learnings: "", tags: "" });
  const [projectForm, setProjectForm] = useState({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", isStartup: false, existingThumbnail: "" });
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", tags: "", frameImageUrl: "" });
  
  // Profile Meta Data Form State
  const [profileForm, setProfileForm] = useState({
    fullName: "Purnima Sirangu",
    specialization: "Artificial Intelligence & Data Science",
    institution: "Sir C. R. Reddy College of Engineering, Eluru",
    graduationYear: "2027",
    btechPercentage: "9.28",
    sem1: "9.41", sem2: "9.36", sem3: "9.10", sem4: "9.43", sem5: "", sem6: "", sem7: "", sem8: "",
    interCollege: "Ch.S.D. St. Theresa's College for Women, Eluru",
    interPercentage: "97.4", interYear: "2023",
    linkedin: "https://www.linkedin.com/in/purnima-sirangu",
    github: "https://github.com/PURNIMA-SIF",
    resumeUrl: "", profileImageUrl: ""
  });

 const [expForm, setExpForm] = useState({
  title: "", 
  organization: "", 
  type: "internship", 
  duration: "", 
  projectScope: "",     // New distinct field
  coreKnowledge: "",    // New distinct field
  accolades: "",        // New distinct field
  verifyUrl: "",        // Your Live Verification Link field
  certImageUrl: ""
});

  const [roadmapForm, setRoadmapForm] = useState({
    title: "", organization: "", duration: "", location: "Remote", scope: "", vectors: ""
  });

  // 📍 NEW DYNAMIC NAVIGATION FORMS STATE
  const [selectedSlot, setSelectedSlot] = useState("academic");
  const [navForm, setNavForm] = useState({
    title: "Academic Details",
    meta: "MY_ACADEMICS",
    summary: "Review my continuous educational trackers, structural specialization parameters, and my complete semester-by-semester CGPA aggregate logs.",
    bgImg: "/nav/academic.jpg"
  });

  // Default hardcoded structural mappings for reset values
  const defaultNavs = {
    academic: { title: "Academic Details", meta: "MY_ACADEMICS", summary: "Review my continuous educational trackers, structural specialization parameters, and my complete semester-by-semester CGPA aggregate logs.", bgImg: "/nav/academic.jpg" },
    experience: { title: "Experience", meta: "MY_TIMELINE", summary: "Explore my technical engineering timeline, where I list my professional AI/ML and full-stack industry internship milestones.", bgImg: "/nav/experience.jpg" },
    projects: { title: "Projects", meta: "MY_BUILDS", summary: "Examine my deployed code architecture vaults, including my local speech-to-speech LLM assistant ('pArI') and my smart management systems.", bgImg: "/nav/projects.jpg" },
    blog: { title: "Blog", meta: "MY_CHRONICLES", summary: "Read through my custom-designed technical comic blogs where I deconstruct complex microprocessors and cryptographic network protocols.", bgImg: "/nav/blog.jpg" },
    dsa: { title: "DSA", meta: "MY_STREAM", summary: "Track my daily data structures compilation path, algorithmic complexity proofs, and my continuous program optimization streams.", bgImg: "/nav/dsa.jpg" },
    art: { title: "Art", meta: "MY_CREATIVITY", summary: "Step inside my graphic gallery layout to inspect my manual charcoal sketches, digital compositions, and official design blueprints.", bgImg: "/nav/art.jpg" }
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    // 🛠️ 1. Check if the user matches any of your whitelisted emails
    const isAllowedAdmin = currentUser && (
      currentUser.email === ALLOWED_ADMIN_EMAIL || 
      currentUser.email === "maladipavanteja@gmail.com" || 
      currentUser.email === "your-third-email@gmail.com"
    );

    if (isAllowedAdmin) {
      setUser(currentUser);
      setError("");
    } else if (currentUser) {
      // 🛠️ 2. This now only runs if the email is truly a stranger!
      setError("Access Denied: Unauthorized account configuration detected.");
      signOut(auth);
      setUser(null);
    } else {
      setUser(null);
    }
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  useEffect(() => {
    if (!user) return;

    onSnapshot(query(collection(db, "projects"), orderBy("createdAt", "desc")), snap => setLiveProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    onSnapshot(query(collection(db, "blogs"), orderBy("createdAt", "desc")), snap => setLiveBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    onSnapshot(query(collection(db, "experiences"), orderBy("createdAt", "desc")), snap => setLiveExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    onSnapshot(doc(db, "meta", "profile"), (docSnap) => {
      if (docSnap.exists()) setProfileForm(prev => ({ ...prev, ...docSnap.data() }));
    });

    // Load active navigation parameters from live document map
    onSnapshot(doc(db, "meta", "navigation"), (docSnap) => {
      if (docSnap.exists() && docSnap.data()[selectedSlot]) {
        setNavForm(docSnap.data()[selectedSlot]);
      } else {
        setNavForm(defaultNavs[selectedSlot]);
      }
    });
  }, [user, selectedSlot]);

  const handleNavSlotChange = (slot) => {
    setSelectedSlot(slot);
  };

  // 🗑️ GLOBAL DELETE HANDLER
  const handleDeleteNode = async (collectionPath, docId) => {
    if (window.confirm("Are you sure you want to permanently delete this database node?")) {
      try {
        await deleteDoc(doc(db, collectionPath, docId));
        setFormSuccess("Node deleted successfully.");
      } catch (err) {
        setError("Failed to delete the selected node.");
      }
    }
  };

  const handleNavSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    const file = e.target.navFile?.files[0];
    try {
      let currentBgImg = navForm.bgImg;
      if (file) {
        const formData = new FormData(); formData.append("file", file); formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json(); currentBgImg = data.secure_url;
      }
      
      await setDoc(doc(db, "meta", "navigation"), {
        [selectedSlot]: { ...navForm, bgImg: currentBgImg, updatedAt: new Date().toISOString() }
      }, { merge: true });

      setFormSuccess(`Navigation parameters locked for slot [${selectedSlot.toUpperCase()}]!`);
    } catch { setError("Failed to compile navigation ledger matrix data."); } finally { setFormLoading(false); }
  };

  const handleLogin = async () => {
    setError(""); try { await signInWithPopup(auth, googleProvider); } catch { setError("Authentication failed."); }
  };

  const handleDsaSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    try {
      const tagsArray = dsaForm.tags.split(",").map(t => t.trim().toLowerCase()).filter(t => t !== "");
      await addDoc(collection(db, "codingLogs"), { ...dsaForm, tags: tagsArray, createdAt: serverTimestamp() });
      setFormSuccess("DSA stream node pushed successfully!");
      setDsaForm({ title: "", problemUrl: "", solutionCode: "", learnings: "", tags: "" });
    } catch { setError("Database routing fault."); } finally { setFormLoading(false); }
  };

  const handleArtSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    const file = e.target.artFile.files[0]; if (!file) return;
    try {
      const formData = new FormData(); formData.append("file", file); formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await res.json();
      await addDoc(collection(db, "artworks"), { title: e.target.artTitle.value, category: e.target.artCategory.value, description: e.target.artDescription.value, imageUrl: data.secure_url, createdAt: serverTimestamp() });
      setFormSuccess("Art canvas asset synchronized!"); e.target.reset();
    } catch { setError("CDN processing crash."); } finally { setFormLoading(false); }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    const file = e.target.projectFile.files[0];
    try {
      let currentThumbnailUrl = projectForm.existingThumbnail || projectForm.thumbnailUrl;
      if (file) {
        const formData = new FormData(); formData.append("file", file); formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json(); currentThumbnailUrl = data.secure_url;
      }
      // Added support for string arrays during edit
      const techArray = typeof projectForm.techStack === "string" 
        ? projectForm.techStack.split(",").map(item => item.trim()).filter(item => item !== "")
        : projectForm.techStack;
        
      const payload = { title: projectForm.title, description: projectForm.description, techStack: techArray, githubUrl: projectForm.githubUrl, liveUrl: projectForm.liveUrl, isStartup: projectForm.isStartup, thumbnailUrl: currentThumbnailUrl, updatedAt: serverTimestamp() };
      
      if (editingProjectId) { await updateDoc(doc(db, "projects", editingProjectId), payload); setEditingProjectId(null); }
      else { await addDoc(collection(db, "projects"), { ...payload, createdAt: serverTimestamp() }); }
      
      setProjectForm({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", isStartup: false, existingThumbnail: "" }); e.target.reset();
      setFormSuccess("Project blueprint saved!");
    } catch { setError("Data transmission fault."); } finally { setFormLoading(false); }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    try { await setDoc(doc(db, "meta", "profile"), { ...profileForm, updatedAt: serverTimestamp() }); setFormSuccess("Global identity ledger compiled!"); }
    catch { setError("Sync operation failed."); } finally { setFormLoading(false); }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    const file = e.target.blogFile.files[0];
    try {
      let finalImageUrl = blogForm.frameImageUrl;
      if (file) {
        const formData = new FormData(); formData.append("file", file); formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json(); finalImageUrl = data.secure_url;
      }
      
      const tagsArray = typeof blogForm.tags === "string" 
        ? blogForm.tags.split(",").map(t => t.trim().toLowerCase()).filter(t => t !== "")
        : blogForm.tags;

      const payload = { title: blogForm.title, excerpt: blogForm.excerpt, content: blogForm.content, tags: tagsArray, frameImageUrl: finalImageUrl, imageUrl: finalImageUrl, updatedAt: serverTimestamp() };
      
      if (editingBlogId) { await updateDoc(doc(db, "blogs", editingBlogId), payload); setEditingBlogId(null); }
      else { await addDoc(collection(db, "blogs"), { ...payload, createdAt: serverTimestamp() }); }
      
      setBlogForm({ title: "", excerpt: "", content: "", tags: "", frameImageUrl: "" }); e.target.reset();
      setFormSuccess("Comic frame ledger synchronized!");
    } catch { setError("Blog transaction process down."); } finally { setFormLoading(false); }
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    const file = e.target.expFile.files[0];
    try {
      let currentCertUrl = expForm.certImageUrl;
      if (file) {
        const formData = new FormData(); formData.append("file", file); formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json(); currentCertUrl = data.secure_url;
      }

      const payload = {
        title: expForm.title,
        organization: expForm.organization,
        type: expForm.type,
        duration: expForm.duration,
        verifyUrl: expForm.verifyUrl, 
        certImageUrl: currentCertUrl,
        updatedAt: serverTimestamp(),
        whatIDid: `Project Implementation & Scope:\n${expForm.projectScope}\n\nCore Knowledge Acquired:\n${expForm.coreKnowledge}\n\nValidation Accolades & Badges:\n${expForm.accolades}`
      };
      if (editingExpId) { await updateDoc(doc(db, "experiences", editingExpId), payload); setEditingExpId(null); }
      else { await addDoc(collection(db, "experiences"), { ...payload, createdAt: serverTimestamp() }); }
      // ✅ Update the reset state line inside handleExpSubmit to this:
setExpForm({ title: "", organization: "", type: "internship", duration: "", projectScope: "", coreKnowledge: "", accolades: "", verifyUrl: "", certImageUrl: "" }); e.target.reset();
      setFormSuccess("Credential credential locked!");
    } catch { setError("Database writing fault."); } finally { setFormLoading(false); }
  };

  // 🛠️ Modified to support Editing & Updating
  const handleRoadmapSubmit = async (e) => {
    e.preventDefault(); setFormLoading(true); setFormSuccess(""); setError("");
    try {
      const payload = { ...roadmapForm, type: "internship_roadmap", updatedAt: serverTimestamp() };
      if (editingRoadmapId) {
        await updateDoc(doc(db, "experiences", editingRoadmapId), payload);
        setEditingRoadmapId(null);
      } else {
        await addDoc(collection(db, "experiences"), { ...payload, createdAt: serverTimestamp() });
      }
      setFormSuccess("Roadmap vector saved!");
      setRoadmapForm({ title: "", organization: "", duration: "", location: "Remote", scope: "", vectors: "" });
    } catch { setError("Database mapping crash."); } finally { setFormLoading(false); }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {!user ? (
        <div className="flex h-screen items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-purple-900/40 bg-zinc-900/60 p-8 text-center shadow-2xl">
            <h2 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-3xl font-extrabold tracking-tight">Control Center</h2>
            <button onClick={handleLogin} className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-3 font-semibold text-white">Sign In with Google</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-900/30 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-8"><h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Ecosystem Admin</h2></div>
              <nav className="space-y-2 text-xs uppercase font-bold tracking-wider">
                <button onClick={() => { setActiveTab("dsa"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "dsa" ? "bg-purple-600/20 border border-purple-500/40 text-purple-300" : "text-zinc-400 hover:bg-zinc-900"}`}>💻 Daily DSA Logs</button>
                <button onClick={() => { setActiveTab("art"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "art" ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-300" : "text-zinc-400 hover:bg-zinc-900"}`}>🎨 Art Gallery</button>
                <button onClick={() => { setActiveTab("projects"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "projects" ? "bg-blue-600/20 border border-blue-500/40 text-blue-300" : "text-zinc-400 hover:bg-zinc-900"}`}>🚀 Project Vault</button>
                <button onClick={() => { setActiveTab("profile_blog"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "profile_blog" ? "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300" : "text-zinc-400 hover:bg-zinc-900"}`}>📝 Personal & Profile</button>
                <button onClick={() => { setActiveTab("experiences"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "experiences" ? "bg-amber-600/20 border border-amber-500/40 text-amber-300" : "text-zinc-400 hover:bg-zinc-900"}`}>🎓 Credentials Vault</button>
                <button onClick={() => { setActiveTab("roadmap"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "roadmap" ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"}`}>📍 Experience Roadmap</button>
                <button onClick={() => { setActiveTab("navigation"); setFormSuccess(""); setError(""); }} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === "navigation" ? "bg-red-600/20 border border-red-500/40 text-red-400" : "text-zinc-400 hover:bg-zinc-900"}`}>📐 Triangular Nav Grid</button>
              </nav>
            </div>
            <button onClick={() => signOut(auth)} className="mt-8 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs text-zinc-400 hover:text-red-400">Disconnect</button>
          </aside>

          <main className="flex-1 p-6 md:p-12 max-w-4xl">
            {formSuccess && <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">{formSuccess}</div>}
            {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}

            {activeTab === "dsa" && (
              <form onSubmit={handleDsaSubmit} className="space-y-6">
                <div><h3 className="text-2xl font-bold">Daily Program Stream</h3></div>
                <input type="text" required placeholder="Problem Title" value={dsaForm.title} onChange={e => setDsaForm({...dsaForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <input type="url" placeholder="LeetCode link..." value={dsaForm.problemUrl} onChange={e => setDsaForm({...dsaForm, problemUrl: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <textarea required rows={6} placeholder="Execution block code..." value={dsaForm.solutionCode} onChange={e => setDsaForm({...dsaForm, solutionCode: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 font-mono text-xs focus:outline-none" />
                <textarea required rows={3} placeholder="Key concept learning breakdowns..." value={dsaForm.learnings} onChange={e => setDsaForm({...dsaForm, learnings: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <input type="text" placeholder="arrays, binarysearch" value={dsaForm.tags} onChange={e => setDsaForm({...dsaForm, tags: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <button type="submit" className="w-full bg-purple-600 py-3 rounded-xl font-semibold text-sm">PUBLISH PACKET</button>
              </form>
            )}

            {activeTab === "art" && (
              <form onSubmit={handleArtSubmit} className="space-y-6">
                <div><h3 className="text-2xl font-bold">Art Gallery Asset Manager</h3></div>
                <input type="text" name="artTitle" required placeholder="Artwork Title" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <select name="artCategory" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none">
                  <option value="sketches">Manual Sketch / Drawing</option>
                  <option value="digital">Digital Art & Design</option>
                  <option value="posters">Official Poster Layout</option>
                  <option value="spiritual">Spiritual Aesthetics</option>
                </select>
                <textarea name="artDescription" rows={3} placeholder="Medium mechanics parameter specifications..." className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                <input type="file" name="artFile" required accept="image/*" className="w-full text-sm text-zinc-500" />
                <button type="submit" className="w-full bg-cyan-600 py-3 rounded-xl font-semibold text-sm">PUBLISH ART ASSET</button>
              </form>
            )}

            {activeTab === "projects" && (
              <>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div><h3 className="text-2xl font-bold">{editingProjectId ? "⚙️ Edit Project Matrix" : "🚀 Project Deployment Engine"}</h3></div>
                  <input type="text" required placeholder="Project Name" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                  <textarea required rows={4} placeholder="Architectural behavioral descriptions..." value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                  <input type="text" required placeholder="Tech stack identifiers (comma separated)" value={projectForm.techStack} onChange={e => setProjectForm({...projectForm, techStack: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="url" placeholder="GitHub link" value={projectForm.githubUrl} onChange={e => setProjectForm({...projectForm, githubUrl: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                    <input type="url" placeholder="Live demo link" value={projectForm.liveUrl} onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  </div>
                  <input type="file" name="projectFile" accept="image/*" className="w-full text-sm text-zinc-500" />
                  <div className="flex items-center gap-2"><input type="checkbox" id="pStart" checked={projectForm.isStartup} onChange={e => setProjectForm({...projectForm, isStartup: e.target.checked})} /> <label htmlFor="pStart">Active Founder Startup Entry Module</label></div>
                  <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-semibold text-sm">
                    {editingProjectId ? "UPDATE PROJECT NODE" : "DEPLOY TECH METRIC"}
                  </button>
                  {editingProjectId && (
                    <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", isStartup: false, existingThumbnail: "" }); }} className="w-full bg-zinc-800 py-2 rounded-xl text-xs mt-2">CANCEL EDIT</button>
                  )}
                </form>

                {/* 📋 ADDED PROJECTS LIST VIEW */}
                <div className="mt-16 space-y-4">
                  <h4 className="text-xl font-bold text-blue-400 border-b border-zinc-800 pb-3">Manage Deployed Projects</h4>
                  {liveProjects.map(proj => (
                    <div key={proj.id} className="flex justify-between items-center bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <div className="font-bold text-zinc-200">{proj.title}</div>
                        <div className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">{proj.description}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { 
                          setProjectForm({ ...proj, techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack }); 
                          setEditingProjectId(proj.id); 
                          window.scrollTo({top: 0, behavior: 'smooth'}); 
                        }} className="px-3 py-1.5 bg-zinc-800 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-xs font-bold transition-colors">Edit</button>
                        <button onClick={() => handleDeleteNode("projects", proj.id)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "profile_blog" && (
              <div className="space-y-12">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div><h3 className="text-2xl font-bold">Global Identity Ledger</h3></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={profileForm.fullName} onChange={e => setProfileForm({...profileForm, fullName: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                    <input type="text" value={profileForm.specialization} onChange={e => setProfileForm({...profileForm, specialization: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  </div>
                  <input type="text" value={profileForm.institution} onChange={e => setProfileForm({...profileForm, institution: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={profileForm.graduationYear} onChange={e => setProfileForm({...profileForm, graduationYear: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                    <input type="text" value={profileForm.btechPercentage} onChange={e => setProfileForm({...profileForm, btechPercentage: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 py-3 rounded-xl font-bold text-xs uppercase">SYNC IDENTITY LEDGER</button>
                </form>

                <form onSubmit={handleBlogSubmit} className="space-y-6 pt-8 border-t border-zinc-900">
                  <div><h3 className="text-2xl font-bold text-purple-400">{editingBlogId ? "⚙️ Edit Comic Panel" : "✍️ Technical Comic Novel Writer"}</h3></div>
                  <input type="text" required placeholder="Article / Frame Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <input type="text" required placeholder="Panel Excerpt Hook Text..." value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <textarea required rows={6} placeholder="Markdown narrative or dialog strings..." value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-xs font-mono" />
                  <input type="text" placeholder="tags (comma separated)" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <input type="file" name="blogFile" accept="image/*" className="w-full text-xs text-zinc-500" />
                  <button type="submit" className="w-full bg-purple-600 py-3 rounded-xl font-bold text-xs uppercase">
                    {editingBlogId ? "UPDATE COMIC PANEL" : "BROADCAST COMIC PANEL"}
                  </button>
                  {editingBlogId && (
                    <button type="button" onClick={() => { setEditingBlogId(null); setBlogForm({ title: "", excerpt: "", content: "", tags: "", frameImageUrl: "" }); }} className="w-full bg-zinc-800 py-2 rounded-xl text-xs mt-2">CANCEL EDIT</button>
                  )}
                </form>

                {/* 📋 ADDED BLOGS LIST VIEW */}
                <div className="mt-12 space-y-4">
                  <h4 className="text-xl font-bold text-purple-400 border-b border-zinc-800 pb-3">Manage Active Comic Blogs</h4>
                  {liveBlogs.map(blog => (
                    <div key={blog.id} className="flex justify-between items-center bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <div className="font-bold text-zinc-200">{blog.title}</div>
                        <div className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">{blog.excerpt}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { 
                          setBlogForm({ ...blog, tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags }); 
                          setEditingBlogId(blog.id); 
                          window.scrollTo({top: 0, behavior: 'smooth'}); 
                        }} className="px-3 py-1.5 bg-zinc-800 hover:bg-purple-500/20 hover:text-purple-400 rounded-lg text-xs font-bold transition-colors">Edit</button>
                        <button onClick={() => handleDeleteNode("blogs", blog.id)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "experiences" && (
              <>
                <form onSubmit={handleExpSubmit} className="space-y-6">
                  <div><h3 className="text-2xl font-bold">{editingExpId ? "⚙️ Edit Credential Node" : "💼 Experience & Certification Console"}</h3></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Role Title" value={expForm.title} onChange={e => setExpForm({...expForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                    <input type="text" required placeholder="Organization" value={expForm.organization} onChange={e => setExpForm({...expForm, organization: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  </div>
                  // ✅ PASTE THESE 4 INPUT BOXES DIRECTLY INTO THAT GAP:
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-purple-400 mb-2">Project Implementation & Scope:</label>
                      <textarea required rows={3} placeholder="• Bullet points detailing the project scope parameters..." value={expForm.projectScope} onChange={e => setExpForm({...expForm, projectScope: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none focus:border-purple-500" />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-purple-400 mb-2">Core Knowledge Acquired:</label>
                      <textarea required rows={3} placeholder="• Core architectural or design principles mastered..." value={expForm.coreKnowledge} onChange={e => setExpForm({...expForm, coreKnowledge: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none focus:border-purple-500" />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-purple-400 mb-2">Validation Accolades & Badges:</label>
                      <textarea required rows={2} placeholder="• Achievements, rank arrays, or specific medal badges..." value={expForm.accolades} onChange={e => setExpForm({...expForm, accolades: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none focus:border-purple-500" />
                    </div>

                    // ✅ CHANGE IT TO THIS:
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-cyan-400 mb-2">Live Verification Link</label>
                      <input type="url" required placeholder="https://verification-authority.com/cert/id" value={expForm.verifyUrl} onChange={e => setExpForm({...expForm, verifyUrl: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>

                  {/* 🖼️ IMAGE VALIDATION UPLOAD FIELD RE-ADDED */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400">Upload Certificate / Credential Asset</label>
                    <input type="file" name="expFile" accept="image/*" className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-amber-600/10 file:text-amber-400" />
                  </div>

                  <button type="submit" className="w-full bg-amber-600 py-3 rounded-xl font-bold text-xs uppercase">
                    {editingExpId ? "UPDATE CREDENTIAL NODE" : "DEPLOY VALIDATION NODE"}
                  </button>
                  {editingExpId && (
                    <button type="button" onClick={() => { setEditingExpId(null); // ✅ Update the reset state line inside handleExpSubmit to this:
setExpForm({ title: "", organization: "", type: "internship", duration: "", projectScope: "", coreKnowledge: "", accolades: "", verifyUrl: "", certImageUrl: "" }); }} className="w-full bg-zinc-800 py-2 rounded-xl text-xs mt-2">CANCEL EDIT</button>
                  )}
                </form>

                {/* 📋 ADDED CREDENTIALS/EXPERIENCES LIST VIEW */}
                <div className="mt-16 space-y-4">
                  <h4 className="text-xl font-bold text-amber-500 border-b border-zinc-800 pb-3">Active Credentials & Experiences</h4>
                  {liveExperiences.filter(exp => exp.type !== "internship_roadmap").map(exp => (
                    <div key={exp.id} className="flex justify-between items-center bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <div className="font-bold text-zinc-200">{exp.title}</div>
                        <div className="text-xs text-zinc-500">{exp.organization} • {exp.type}</div>
                      </div>
                      <div className="flex gap-2">
                        // ✅ REPLACE WITH THIS COMPILING CONTROLLER:
<button onClick={() => { 
  const rawContent = exp.whatIDid || "";
  const lines = rawContent.split('\n\n');
  
  setExpForm({
    title: exp.title || "",
    organization: exp.organization || "",
    type: exp.type || "internship",
    duration: exp.duration || "",
    verifyUrl: exp.verifyUrl || "",
    certImageUrl: exp.certImageUrl || "",
    projectScope: lines[0]?.replace('Project Implementation & Scope:\n', '') || '',
    coreKnowledge: lines[1]?.replace('Core Knowledge Acquired:\n', '') || '',
    accolades: lines[2]?.replace('Validation Accolades & Badges:\n', '') || ''
  }); 

  setEditingExpId(exp.id); 
  window.scrollTo({top: 0, behavior: 'smooth'}); 
}} className="px-3 py-1.5 bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-400 rounded-lg text-xs font-bold transition-colors">Edit</button>
                        <button onClick={() => handleDeleteNode("experiences", exp.id)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "roadmap" && (
              <>
                <form onSubmit={handleRoadmapSubmit} className="space-y-6">
                  <div><h3 className="text-2xl font-bold text-cyan-400">{editingRoadmapId ? "⚙️ Edit Roadmap Matrix" : "📍 Experience Roadmap Stream"}</h3></div>
                  <input type="text" required placeholder="Role" value={roadmapForm.title} onChange={e => setRoadmapForm({...roadmapForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <input type="text" required placeholder="Org" value={roadmapForm.organization} onChange={e => setRoadmapForm({...roadmapForm, organization: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <textarea required rows={3} placeholder="Execution Scope Summary..." value={roadmapForm.scope} onChange={e => setRoadmapForm({...roadmapForm, scope: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm" />
                  <button type="submit" className="w-full bg-cyan-500 text-black py-3 rounded-xl font-bold text-xs uppercase">
                    {editingRoadmapId ? "UPDATE ROADMAP MATRIX" : "DEPLOY ROADMAP MATRIX"}
                  </button>
                  {editingRoadmapId && (
                    <button type="button" onClick={() => { setEditingRoadmapId(null); setRoadmapForm({ title: "", organization: "", duration: "", location: "Remote", scope: "", vectors: "" }); }} className="w-full bg-zinc-800 py-2 rounded-xl text-xs mt-2 text-white">CANCEL EDIT</button>
                  )}
                </form>

                {/* 📋 ADDED ROADMAP LIST VIEW */}
                <div className="mt-16 space-y-4">
                  <h4 className="text-xl font-bold text-cyan-500 border-b border-zinc-800 pb-3">Active Roadmap Timelines</h4>
                  {liveExperiences.filter(exp => exp.type === "internship_roadmap").map(exp => (
                    <div key={exp.id} className="flex justify-between items-center bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <div className="font-bold text-zinc-200">{exp.title}</div>
                        <div className="text-xs text-zinc-500">{exp.organization}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { 
                          setRoadmapForm(exp); 
                          setEditingRoadmapId(exp.id); 
                          window.scrollTo({top: 0, behavior: 'smooth'}); 
                        }} className="px-3 py-1.5 bg-zinc-800 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-lg text-xs font-bold transition-colors">Edit</button>
                        <button onClick={() => handleDeleteNode("experiences", exp.id)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 📍 BRAND NEW SECTION LAYER: TRIANGULAR NAVIGATION LEDGER EDITOR */}
            {activeTab === "navigation" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-red-400">📐 Triangular Split Navigation Link Controller</h3>
                  <p className="text-xs text-zinc-400 mt-1">Select any of your 6 triangular sub-slots to rewrite the first-person summary text or override background graphics live.</p>
                </div>

                {/* SLOT CONTROLLER TOGGLE SELECTOR GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] font-bold">
                  {Object.keys(defaultNavs).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleNavSlotChange(slot)}
                      className={`px-4 py-3 rounded-xl border text-center uppercase tracking-wider transition-all ${
                        selectedSlot === slot 
                          ? "bg-red-500/10 border-red-500 text-red-400 font-black shadow-lg shadow-red-500/5" 
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {slot === "academic" ? "📐 Academic" : slot === "experience" ? "💼 Experience" : slot === "projects" ? "🚀 Projects" : slot === "blog" ? "📝 Blog" : slot === "dsa" ? "💻 DSA" : "🎨 Art"}
                    </button>
                  ))}
                </div>

                {/* COMPILATION FORM HUB */}
                <form onSubmit={handleNavSubmit} className="space-y-6 bg-zinc-900/20 border border-zinc-900 p-6 rounded-3xl pt-6">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3 font-mono text-[10px] tracking-widest text-zinc-500">
                    <span>EDIT PATH SEC MODULE:</span>
                    <span className="text-red-400 font-bold bg-red-950/20 border border-red-900/40 px-2 py-0.5 rounded">[{selectedSlot.toUpperCase()}]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 font-mono">Button Hex Title Text</label>
                      <input type="text" required value={navForm.title} onChange={e => setNavForm({...navForm, title: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-sm text-zinc-100 focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 font-mono">System Meta Tag Code</label>
                      <input type="text" required value={navForm.meta} onChange={e => setNavForm({...navForm, meta: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-sm text-zinc-100 focus:outline-none focus:border-red-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 font-mono">First-Person Overview Summary Narrative Block</label>
                    <textarea required rows={4} value={navForm.summary} onChange={e => setNavForm({...navForm, summary: e.target.value})} className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-sm text-zinc-100 focus:outline-none focus:border-red-500 resize-none leading-relaxed" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 font-mono">Override Backdrop Graphic Vector Asset</label>
                    <div className="space-y-3">
                      <input type="file" name="navFile" accept="image/*" className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-red-600/10 file:text-red-400" />
                      <div className="text-[10px] font-mono text-zinc-500 truncate bg-zinc-950/40 border border-zinc-900 p-2 rounded-xl">
                        <span className="text-zinc-600 font-bold mr-1">ACTIVE URL:</span> {navForm.bgImg}
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={formLoading} className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors">
                    {formLoading ? "COMPILING LEDGER VALUES..." : `LOCK LINK PARAMS FOR [${selectedSlot.toUpperCase()}] ⚙️`}
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}