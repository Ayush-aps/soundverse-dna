"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAudio } from "./AudioPlayer";
import { useEffect, useMemo, useState } from "react";
import type { StylePreset } from "@/data/styles";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onRequestOpen: () => void;
};

type ApiResponse = { data: StylePreset[] };

const heroGenres = ["House", "Dance Pop", "Pop", "EDM"];

export default function MainContent({ isVisible, onClose, onRequestOpen }: Props) {
  const audio = useAudio();
  const [presets, setPresets] = useState<StylePreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"core" | "signature">("core");

  useEffect(() => {
    const controller = new AbortController();
    async function loadPresets() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/styles", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load DNA styles.");
        const json = (await response.json()) as ApiResponse;
        setPresets(json.data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadPresets();
    return () => controller.abort();
  }, []);

  const filteredPresets = useMemo(
    () => presets.filter((preset) => preset.category === activeTab),
    [presets, activeTab]
  );

  const content = (
    <motion.section
      key="panel"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inter flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-32 pt-8 sm:pt-12 text-white xl:px-16"
    >
      <header className="mb-8 md:mb-10 flex flex-col sm:flex-row flex-wrap items-center gap-6 sm:gap-8">
        <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 overflow-hidden rounded-full border border-white/10 bg-linear-to-br from-[#151515] to-[#050505]">
          <Image src="/music/coldplay-cover.png" alt="Coldplay artwork" fill sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px" className="rounded-full object-cover" priority />
          <WaveformBadge />
        </div>
        <div className="flex-1 min-w-0 w-full sm:min-w-[280px]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.55em] text-white/40">Current Artist</p>
              <h1 className="dna-heading text-4xl sm:text-5xl md:text-6xl lg:text-[84px] leading-none tracking-[0.12em] text-white truncate">COLDPLAY</h1>
            </div>
            <button
              onClick={onClose}
              aria-label="Close style panel"
              className="flex-shrink-0 rounded-full border border-white/10 p-2 sm:p-3 text-white/70 transition hover:border-white/40 hover:text-white cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="inter mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm text-white/70">
            EDM visionary known for hit remixes and artist management. 6 Core Styles and 30 Signature Sounds.
            Built for genre-fluid experimentation with precise control.
          </p>
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40">
            {heroGenres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <LayoutGroup id="dna-tabs">
        <div className="mb-8 md:mb-10 flex justify-start">
          <div className="inline-flex flex-wrap items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/60">
            {["core", "signature"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "core" | "signature")}
                className={`relative min-w-[130px] rounded-full px-6 py-2 text-[11px] font-semibold transition cursor-pointer ${
                  activeTab === tab ? "text-white" : "text-white/60 hover:text-white/80"
                }`}
              >
                {activeTab === tab && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white/15 shadow-[0_8px_25px_rgba(255,255,255,0.2)]" />}
                <span className="relative z-10">{tab === "core" ? "Core Style" : "Signature Sound"}</span>
              </button>
            ))}
          </div>
        </div>
      </LayoutGroup>

      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <div className="rounded-2xl border border-[#ff7b72]/30 bg-[#2b0b0b]/40 p-6 text-sm text-[#ff7b72]">
          {error}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredPresets.map((preset) => (
            <StyleCard key={preset.id} preset={preset} onPlay={() => audio.playTrack({ id: preset.id, title: preset.title, artist: "Coldplay", src: preset.audioUrl, cover: preset.imageUrl })} />
          ))}
        </div>
      )}
    </motion.section>
  );

  const placeholder = (
    <motion.div
      key="placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="inter flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center text-white/60"
    >
      <p className="text-lg font-medium text-white">Panel hidden</p>
      <p className="max-w-sm text-sm">Your style grid is hidden. Use the plus control in the DNA panel to bring it back and continue designing.</p>
      <button
        onClick={onRequestOpen}
        className="rounded-full border border-white/20 px-6 py-2 text-sm text-white transition hover:border-white/60 cursor-pointer"
      >
        Reopen panel
      </button>
    </motion.div>
  );

  return (
    <div className="flex-1 bg-[#050505]">
      <AnimatePresence initial={false}>{isVisible ? content : placeholder}</AnimatePresence>
    </div>
  );
}

function StyleCard({ preset, onPlay }: { preset: StylePreset; onPlay: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      type="button"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onPlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0b0b0b]/70 text-left shadow-[0_35px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_45px_80px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FDBFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] cursor-pointer"
      style={{
        boxShadow: isHovered ? `0 45px 80px rgba(0,0,0,0.6), 0 0 40px ${preset.accent}20` : undefined
      }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image 
          src={preset.imageUrl} 
          alt={`${preset.title} artwork`} 
          fill 
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/60 via-black/30 to-transparent"
        >
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white ring-2 ring-white/40"
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M3 2L17 11L3 20V2Z" fill="white" />
            </svg>
          </motion.span>
        </motion.div>
        {/* Gradient overlay on top */}
        <div 
          className="absolute inset-0 bg-linear-to-t from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${preset.accent}15 0%, transparent 100%)`
          }}
        />
      </div>
      <div className="space-y-2 px-5 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">{preset.title}</h3>
          <span 
            className="text-[10px] uppercase tracking-[0.3em] transition-colors"
            style={{ color: isHovered ? preset.accent : 'rgba(255, 255, 255, 0.4)' }}
          >
            {preset.category === "core" ? "Core" : "Sig"}
          </span>
        </div>
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{preset.description}</p>
        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{preset.mood}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {preset.tags.map((tag) => (
            <span 
              key={tag} 
              className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60 transition-all group-hover:border-white/30 group-hover:text-white/80 group-hover:bg-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${preset.accent}, transparent)`
        }}
      />
    </motion.button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="rounded-3xl border border-white/5 bg-white/5 pb-5 overflow-hidden"
        >
          <div className="aspect-square w-full bg-white/10 relative">
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="space-y-3 px-5 pt-5">
            <div className="h-4 rounded-full bg-white/15 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              />
            </div>
            <div className="h-3 w-3/4 rounded-full bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
              />
            </div>
            <div className="h-3 w-1/2 rounded-full bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WaveformBadge() {
  return (
    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1 items-end">
      {[8, 16, 10, 20, 12, 18].map((baseHeight, index) => (
        <motion.span
          key={index}
          initial={{ height: baseHeight }}
          animate={{
            height: [baseHeight, baseHeight * 1.5, baseHeight],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
          className="w-1 rounded-full bg-linear-to-t from-[#6a5bff] via-[#a855f7] to-[#ff8bd5] shadow-[0_0_10px_rgba(106,91,255,0.5)]"
        />
      ))}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 3L11 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 3L3 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
