"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  // Fake progress counter for visual effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment to make it look "real"
        return Math.min(prev + Math.floor(Math.random() * 10) + 5, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-black overflow-hidden">
      
      {/* --- Container --- */}
      <div className="w-full max-w-[300px] px-6 flex flex-col gap-6 items-center">
        
        {/* 1. Logo Text Animation */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2"
        >
             {/* Optional: Add your SVG Logo here if you want */}
             {/* <div className="w-6 h-6 bg-black rounded-sm" /> */}
             
             <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase">
                Vistahaven
             </h1>
        </motion.div>

        {/* 2. Progress Bar Container */}
        <div className="w-full h-[2px] bg-gray-100 relative overflow-hidden rounded-full">
            {/* The Moving Bar */}
            <motion.div 
                className="absolute top-0 left-0 h-full bg-black"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
            />
        </div>

        {/* 3. Percentage Text */}
        <div className="flex justify-between w-full text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Loading Experience</span>
            <motion.span
                key={progress} // Key change triggers animation
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {progress}%
            </motion.span>
        </div>

      </div>
    </div>
  );
}