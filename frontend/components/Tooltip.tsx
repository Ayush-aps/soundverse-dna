"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 whitespace-nowrap rounded-lg bg-[#1a1a1a]/95 backdrop-blur-sm px-3 py-1.5 text-xs text-white shadow-xl border border-white/10 ${positionClasses[position]}`}
          >
            {content}
            <div
              className={`absolute size-2 rotate-45 bg-[#1a1a1a] border-white/10 ${
                position === "top"
                  ? "bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b"
                  : position === "bottom"
                  ? "top-[-4px] left-1/2 -translate-x-1/2 border-l border-t"
                  : position === "left"
                  ? "right-[-4px] top-1/2 -translate-y-1/2 border-t border-r"
                  : "left-[-4px] top-1/2 -translate-y-1/2 border-b border-l"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
