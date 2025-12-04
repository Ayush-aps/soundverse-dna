"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingSplash() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-8">
        {/* DNA Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="size-24 rounded-full border-4 border-transparent border-t-[#6a5bff] border-r-[#a855f7]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="dna-heading text-3xl text-white">DNA</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Loading Soundverse
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-linear-to-r from-[#6a5bff] via-[#a855f7] to-[#ff8bd5]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
