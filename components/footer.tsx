"use client";

import Image from "next/image";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import { motion, Variants, TargetAndTransition } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


  // --- Animation Variants ---
 const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

  const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT }, // ✅ TS-safe
  },
};

  const socialHover: TargetAndTransition = {
  scale: 1.1,
  rotate: 5,
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-8 px-4 md:px-8 overflow-hidden">
      <motion.div 
        className="max-w-[1400px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* --- Main Content (Centered) --- */}
        <div className="flex flex-col items-center text-center gap-10 md:gap-12 mb-16 md:mb-20">
          
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image 
                  src="/logo-light.svg" 
                  alt="Vistahaven Logo" 
                  fill 
                  className="object-contain" 
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
              Vistahaven
            </span>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 text-gray-400 text-sm md:text-base max-w-lg px-4">
            <p className="leading-relaxed">
              123 Serenity Boulevard, Greenwood Heights, NY 11222, United States
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <a href="tel:+18005551234" className="hover:text-white transition-colors duration-300">
                    +1-800-555-1234
                </a>
                <span className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></span>
                <a href="mailto:info@vistahaven.com" className="hover:text-white transition-colors duration-300">
                    info@vistahaven.com
                </a>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Youtube, href: "#" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={socialHover}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <Icon size={20} fill="currentColor" className="stroke-none" />
                </motion.a>
              );
            })}
          </motion.div>

        </div>

        {/* --- Bottom Section: Copyright --- */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-500 text-center md:text-left"
        >
          <p>
            © Copyright {currentYear}. All Rights Reserved by{' '}
            <a href="#" className="text-white underline decoration-gray-600 underline-offset-4 hover:decoration-white transition-all">
              Codewithhaider
            </a>
          </p>
          <p>
            Powered by{' '}
            <a href="#" className="text-white underline decoration-gray-600 underline-offset-4 hover:decoration-white transition-all">
              Codewithhaider
            </a>
          </p>
        </motion.div>

      </motion.div>
    </footer>
  );
}