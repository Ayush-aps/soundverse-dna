"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + ? (which is Shift+/ on most keyboards)
      if ((e.key === "?" || e.key === "/") && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Also support Ctrl/Cmd + / without shift
      if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const shortcuts = [
    { keys: ["Space", "K"], action: "Play/Pause" },
    { keys: ["←"], action: "Seek backward 5s" },
    { keys: ["→"], action: "Seek forward 5s" },
    { keys: ["↑"], action: "Volume up" },
    { keys: ["↓"], action: "Volume down" },
    { keys: ["M"], action: "Mute/Unmute" },
    { keys: ["N"], action: "Next track" },
    { keys: ["P"], action: "Previous track" },
    { keys: ["Ctrl/⌘", "?"], action: "Show shortcuts" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex size-10 sm:size-12 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg text-white/60 transition hover:border-white/30 hover:text-white hover:scale-105"
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (Ctrl/⌘ + ?)"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 17H9V15H11V17ZM13 11.17C12.41 11.76 12 12.1 12 13H10V12.5C10 11.4 10.59 10.59 11.17 10C11.76 9.41 12 9.1 12 8.5C12 7.67 11.33 7 10.5 7C9.67 7 9 7.67 9 8.5H7C7 6.57 8.57 5 10.5 5C12.43 5 14 6.57 14 8.5C14 9.88 13.24 10.62 13 11.17Z" fill="currentColor"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] sm:w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#0a0a0a]/98 backdrop-blur-xl p-5 sm:p-8 shadow-2xl"
            >
              <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <h2 className="dna-heading text-xl sm:text-2xl text-white">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 p-1.5 sm:p-2 text-white/60 transition hover:border-white/30 hover:text-white"
                  aria-label="Close"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                    <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-3 py-2 sm:px-4 sm:py-3"
                  >
                    <span className="text-xs sm:text-sm text-white/80 mr-2">{shortcut.action}</span>
                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      {shortcut.keys.map((key, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/20 bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono text-white shadow-inner whitespace-nowrap"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-white/40">
                Press <kbd className="rounded bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs">Esc</kbd> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
