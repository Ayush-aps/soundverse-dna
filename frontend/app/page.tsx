"use client";

import LeftSidebar from "@/components/largeSidebar";
import MainContent from "@/components/mainContent";
import LoadingSplash from "@/components/LoadingSplash";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLeftPanelOpen, setLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setRightPanelOpen] = useState(true);

  // Load saved panel states from localStorage
  useEffect(() => {
    try {
      const savedLeft = localStorage.getItem("dna-left-panel-open");
      const savedRight = localStorage.getItem("dna-right-panel-open");
      
      if (savedLeft !== null) setLeftPanelOpen(savedLeft === "true");
      if (savedRight !== null) setRightPanelOpen(savedRight === "true");
    } catch (e) {
      console.warn("Failed to load saved panel states:", e);
    }
  }, []);

  // Save panel states to localStorage
  useEffect(() => {
    localStorage.setItem("dna-left-panel-open", isLeftPanelOpen.toString());
  }, [isLeftPanelOpen]);

  useEffect(() => {
    localStorage.setItem("dna-right-panel-open", isRightPanelOpen.toString());
  }, [isRightPanelOpen]);

  return (
    <>
      <AnimatePresence>
        <LoadingSplash />
      </AnimatePresence>
      
      {/* Mobile menu button */}
      <button
        onClick={() => setLeftPanelOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 size-10 sm:size-12 rounded-full border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg flex items-center justify-center text-white shadow-lg transition hover:scale-105 active:scale-95"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
          <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      
      <div className="flex min-h-screen bg-[#050505] relative">
        {/* Mobile overlay when left panel is open */}
        {isLeftPanelOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setLeftPanelOpen(false)}
          />
        )}
        
        <LeftSidebar
          isOpen={isLeftPanelOpen}
          onToggle={() => setLeftPanelOpen((prev) => !prev)}
          onRequestOpenRightPanel={() => setRightPanelOpen(true)}
          isRightPanelOpen={isRightPanelOpen}
        />
        <MainContent
          isVisible={isRightPanelOpen}
          onClose={() => setRightPanelOpen(false)}
          onRequestOpen={() => setRightPanelOpen(true)}
        />
      </div>
    </>
  );
}

