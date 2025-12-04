"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const tabs = [
  { id: "core", label: "Core Style" },
  { id: "signature", label: "Signature Sound" },
];
const outputOptions = ["Song", "Instrumental", "Singing"];

type LeftSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  onRequestOpenRightPanel: () => void;
  isRightPanelOpen: boolean;
};

export default function LeftSidebar({
  isOpen,
  onToggle,
  onRequestOpenRightPanel,
  isRightPanelOpen,
}: LeftSidebarProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [selectedOutput, setSelectedOutput] = useState(outputOptions[0]);
  const [lyrics, setLyrics] = useState("");

  const charCount = lyrics.length;
  const charLimit = 3000;
  const overflow = charCount >= charLimit;

  const helpText = "Write a euphoric anthem with shimmering leads and emotive vocals.";
  const handleHelp = () => setLyrics(helpText);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("dna-active-tab");
      const savedOutput = localStorage.getItem("dna-selected-output");
      const savedLyrics = localStorage.getItem("dna-lyrics");
      
      if (savedTab) setActiveTab(savedTab);
      if (savedOutput) setSelectedOutput(savedOutput);
      if (savedLyrics) setLyrics(savedLyrics);
    } catch (e) {
      console.warn("Failed to load saved DNA panel state:", e);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("dna-active-tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("dna-selected-output", selectedOutput);
  }, [selectedOutput]);

  useEffect(() => {
    localStorage.setItem("dna-lyrics", lyrics);
  }, [lyrics]);

  const collapsedRail = useMemo(
    () => (
      <div className="inter flex h-full flex-col items-center justify-between py-6 text-xs text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <span className="dna-heading text-sm tracking-[0.3em] text-white/70 rotate-180 [writing-mode:vertical-rl]">
            DNA
          </span>
          <button
            className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            onClick={onToggle}
            aria-label="Expand DNA panel"
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path d="M1 6H13M7 1L13 6L7 11" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-6">
          <CollapsedHint label="Outputs" />
          <CollapsedHint label="Lyrics" />
          <CollapsedHint label="Create" accent />
        </div>
      </div>
    ),
    [onToggle]
  );

  return (
    <motion.aside
      animate={{ 
        width: isOpen ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 320 : 360) : 88,
        x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -400
      }}
      initial={false}
      className="inter h-full border-r border-[#1f1f1f] bg-[#050505] text-white shadow-[20px_0_60px_rgba(0,0,0,0.35)] z-30 lg:relative fixed left-0 top-0 bottom-0"
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inter flex h-full flex-col px-4 sm:px-6 pb-4 sm:pb-6 pt-5 sm:pt-7"
          >
            <div className="flex flex-1 flex-col overflow-y-auto pr-1 sm:pr-2">
              <header className="mb-6 sm:mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#6A6A6A]">Soundverse</p>
                <h1 className="dna-heading text-3xl sm:text-4xl">DNA</h1>
              </div>
              <button
                onClick={onToggle}
                aria-label="Collapse DNA panel"
                className="rounded-full border border-white/10 p-2 text-white/80 transition hover:border-white/30 hover:text-white cursor-pointer"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="mb-4 sm:mb-6 flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wide transition cursor-pointer ${
                    activeTab === tab.id
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/5 text-white/60 hover:border-white/20 hover:text-white/90"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <section className="mb-4 sm:mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Attach Model</span>
                {!isRightPanelOpen && (
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#8FDBFF]">
                    Panel Closed
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onRequestOpenRightPanel}
                className="group relative flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-white/15 bg-linear-to-br from-white/2 to-white/0 text-sm text-white/70 transition hover:border-white/40 hover:from-white/5 cursor-pointer"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 text-3xl text-white/80 transition group-hover:bg-white/10">
                  +
                </div>
                <span className="sr-only">Attach a model</span>
              </button>
            </section>

            <section className="mb-4 sm:mb-6">
              <p className="mb-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">Select the output</p>
              <div className="flex gap-1.5 sm:gap-2">
                {outputOptions.map((option) => {
                  const active = selectedOutput === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedOutput(option)}
                      className={`flex-1 rounded-full border px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium transition cursor-pointer ${
                        active ? "border-white text-white shadow-[0_10px_35px_rgba(105,73,255,0.25)]" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white/90"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex-1 min-h-0">
              <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs flex-wrap">
                <button className="rounded-full bg-white/5 px-3 sm:px-4 py-1 text-white/70 transition hover:bg-white/10 cursor-pointer whitespace-nowrap">
                  Describe your song
                </button>
                <button className="rounded-full bg-white/15 px-3 sm:px-4 py-1 text-white transition hover:bg-white/25 cursor-pointer whitespace-nowrap">
                  Lyrics
                </button>
              </div>
              <div className="relative h-[180px] sm:h-[220px]">
                <textarea
                  value={lyrics}
                  onChange={(event) => setLyrics(event.target.value.slice(0, charLimit))}
                  maxLength={charLimit}
                  placeholder="Enter your own lyrics"
                  className="h-full w-full resize-none rounded-2xl border border-white/10 bg-[#090909]/90 p-3 sm:p-4 text-xs sm:text-sm text-white/90 outline-none transition focus:border-white/30"
                  aria-label="Lyrics input"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 blur-3xl" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-white/50">
                <div className="flex gap-2 sm:gap-3">
                  <button onClick={handleHelp} className="text-white/70 transition hover:text-white cursor-pointer whitespace-nowrap" type="button">
                    Help me write
                  </button>
                  <button onClick={() => setLyrics("")} className="text-white/70 transition hover:text-white cursor-pointer" type="button">
                    Clear
                  </button>
                </div>
                <span className={overflow ? "text-[#ff7b72]" : ""}>
                  {charCount}/{charLimit}
                </span>
              </div>
            </section>
            </div>

            <div className="pt-3 sm:pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center rounded-full bg-linear-to-r from-[#6a5bff] via-[#a855f7] to-[#ff8bd5] px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_20px_45px_rgba(104,91,255,0.4)] transition-all hover:shadow-[0_25px_55px_rgba(104,91,255,0.55)] cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">Create</span>
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-[#7a6bff] via-[#b865ff] to-[#ff9be5] opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inter h-full px-4"
          >
            {collapsedRail}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function CollapsedHint({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-wide ${
        accent ? "border-[#8FDBFF] text-[#8FDBFF]" : "border-white/10 text-white/60"
      }`}
    >
      {label}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2L10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 2L2 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
