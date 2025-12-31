"use client";

import { ArrowUpRight, Star, PlayCircle } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  // --- Animation Variants ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  return (
    <section className="w-full px-4 py-6 md:px-8 lg:px-12">
      <div className="relative w-full max-w-[1400px] h-[500px] md:h-[650px] mx-auto rounded-t-[3rem] rounded-bl-[3rem] overflow-hidden bg-gray-900 shadow-2xl">
        
        {/* --- Background Image with Parallax Scale --- */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/luxury-home1.jpg" 
            alt="Modern Luxury Home"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Advanced Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* --- Main Content --- */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16 lg:p-20">
          
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mt-8"
          >
            {/* Pill Label */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">New Listings Live</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.95] mb-6"
            >
              Find Your <br />
              <span className="text-white/50">Perfect Home</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 font-light max-w-lg mb-10 leading-relaxed border-l-2 border-white/30 pl-6"
            >
              We provide tailored real estate solutions, guiding you through every step with personalized experiences that meet your unique needs.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              <button className="group relative flex items-center gap-4 pl-8 pr-2 py-2.5 bg-white rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 text-black font-bold tracking-wide text-sm uppercase">
                  Explore Properties
                </span>
                <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="text-white w-5 h-5" />
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-12 md:gap-24 items-end mt-auto"
          >
            {[
              { number: "200+", text: "Projects Complete" },
              { number: "$10M+", text: "Market Value" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <p className="text-4xl md:text-5xl font-light text-white mb-1 tracking-tight">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Floating Agent Card (Cutout Effect) --- */}
        <motion.div
          className="absolute bottom-0 right-0 z-20 hidden md:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            {/* 1. The SVG Connector (The liquid curve) */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -left-[39px] bottom-0"
            >
                {/* This path draws the inverted curve shape filled with white */}
                <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" fill="white" />
            </svg>

            {/* 2. The White Card Content */}
            <div className="bg-white h-[140px] pl-6 pr-12 rounded-tl-[40px] flex items-center gap-6 shadow-[-20px_-20px_60px_rgba(0,0,0,0.3)]">
              {/* Avatar Stack */}
              <div className="flex -space-x-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-14 h-14 rounded-full border-[3px] border-white overflow-hidden shadow-sm"
                  >
                    <Image
                      src={`/avatar/avatar${i}.jpg`}
                      alt={`Agent ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <p className="text-black font-bold text-base">10+ Featured Agents</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">4.8/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}