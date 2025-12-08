"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useAudio } from "./AudioPlayer";

function formatTime(time: number) {
  if (!time || Number.isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function GlobalPlayer() {
  const ctx = useAudio();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Calculate completion percentage for visual progress
  const completion = useMemo(() => {
    if (!ctx.duration) return 0;
    const currentValue = isSeeking ? seekValue : ctx.currentTime;
    return Math.min(100, (currentValue / ctx.duration) * 100);
  }, [ctx.currentTime, ctx.duration, isSeeking, seekValue]);

  const sliderValue = isSeeking ? seekValue : ctx.currentTime;

  const handleSeek = (value: number) => {
    if (!ctx.duration) {
      setIsSeeking(false);
      return;
    }
    setSeekValue(value);
    ctx.seekTo(value);
    setIsSeeking(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          ctx.togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          ctx.seekTo(Math.max(0, ctx.currentTime - 5));
          break;
        case "ArrowRight":
          e.preventDefault();
          ctx.seekTo(Math.min(ctx.duration, ctx.currentTime + 5));
          break;
        case "ArrowUp":
          e.preventDefault();
          ctx.setVolume(Math.min(1, ctx.volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          ctx.setVolume(Math.max(0, ctx.volume - 0.1));
          break;
        case "m":
        case "M":
          e.preventDefault();
          ctx.toggleMute();
          break;
        case "n":
        case "N":
          e.preventDefault();
          ctx.nextTrack();
          break;
        case "p":
        case "P":
          e.preventDefault();
          ctx.prevTrack();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [ctx]);

  // Only show player if there's a current track
  if (!ctx.current) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="player"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-[#050505]/95 backdrop-blur-lg pb-safe"
      >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-1.5 px-4 md:px-6 py-2 text-white">
            <div className="flex items-center gap-2 md:w-64 md:flex-shrink-0">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg flex-shrink-0">
                <Image src={ctx.current.cover || "/music/coldplay-cover.png"} alt={ctx.current.title} fill sizes="(max-width: 640px) 40px, 48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold leading-tight">{ctx.current.title}</p>
                <p className="truncate text-[10px] text-white/60">{ctx.current.artist}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                <button
                  onClick={ctx.prevTrack}
                  disabled={!ctx.queue.length || ctx.queue.findIndex(t => t.id === ctx.current?.id) === 0}
                  className="group flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous track"
                  title="Previous (P)"
                >
                  <PrevIcon />
                </button>
                <button
                  onClick={ctx.togglePlay}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-white/40 hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  aria-label={ctx.playing ? "Pause" : "Play"}
                  title={ctx.playing ? "Pause (Space)" : "Play (Space)"}
                >
                  {ctx.playing ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={ctx.nextTrack}
                  disabled={!ctx.queue.length || ctx.queue.findIndex(t => t.id === ctx.current?.id) === ctx.queue.length - 1}
                  className="group flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next track"
                  title="Next (N)"
                >
                  <NextIcon />
                </button>
                <div className="relative ml-1 sm:ml-2 hidden sm:block">
                  <button 
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                    onClick={ctx.toggleMute} 
                    className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition hover:text-white hover:border-white/30 cursor-pointer" 
                    aria-pressed={ctx.muted} 
                    aria-label={ctx.muted ? "Unmute audio" : "Mute audio"}
                    title="Mute (M)"
                  >
                    {ctx.muted ? "🔇" : "🔊"}
                  </button>
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0a0a0a]/95 backdrop-blur-lg border border-white/10 rounded-2xl p-3 shadow-2xl"
                      >
                        <div className="flex flex-col items-center gap-2 h-24">
                          <span className="text-[10px] text-white/60">{Math.round(ctx.volume * 100)}%</span>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={ctx.volume}
                            onChange={(e) => ctx.setVolume(parseFloat(e.target.value))}
                            className="range-input-vertical h-16"
                            style={{ writingMode: 'vertical-rl' as const, WebkitAppearance: 'slider-vertical' as any }}
                            aria-label="Volume"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/60">
                <span className="w-9 text-right text-[9px]">{formatTime(ctx.currentTime)}</span>
                <div className="relative flex-1 h-5 flex items-center">
                  {/* Background track */}
                  <div className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-white/10" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                  {/* Progress bar */}
                  <div 
                    className="pointer-events-none absolute left-0 h-1 rounded-full bg-linear-to-r from-[#6a5bff] via-[#a855f7] to-[#ff8bd5]" 
                    style={{ 
                      width: `${completion}%`, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      transition: isSeeking ? 'none' : 'width 0.1s linear'
                    }} 
                  />
                  {/* Progress dot - moves in real-time with music */}
                  <div 
                    className="pointer-events-none absolute w-3 h-3 rounded-full bg-white border-2 border-[#8f78ff] shadow-[0_0_12px_rgba(143,120,255,0.6)]"
                    style={{ 
                      left: `${completion}%`, 
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: isSeeking ? 'none' : 'left 0.1s linear'
                    }} 
                  />
                  {/* Invisible input for interaction - larger hit area on mobile */}
                  <input
                    type="range"
                    min={0}
                    max={ctx.duration || 0}
                    value={sliderValue}
                    onChange={(event) => {
                      setIsSeeking(true);
                      setSeekValue(Number(event.target.value));
                    }}
                    onPointerUp={(event) => handleSeek(Number((event.target as HTMLInputElement).value))}
                    onTouchEnd={(event) => handleSeek(Number((event.target as HTMLInputElement).value))}
                    className="range-input relative z-10 w-full bg-transparent opacity-0 cursor-pointer touch-none"
                    style={{ height: '24px' }}
                    aria-label="Seek audio"
                  />
                </div>
                <span className="w-9 text-[9px]">{formatTime(ctx.duration)}</span>
              </div>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M2 1.5V14.5L12 8L2 1.5Z" fill="white" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M3 1.5H6V14.5H3V1.5Z" fill="white" />
      <path d="M8 1.5H11V14.5H8V1.5Z" fill="white" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:scale-110 transition">
      <path d="M2 2L10 7L2 12V2Z" fill="white" />
      <path d="M11 2V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:scale-110 transition">
      <path d="M12 2L4 7L12 12V2Z" fill="white" />
      <path d="M3 2V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
