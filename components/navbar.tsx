"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["Home", "About", "Properties", "Agents", "Blogs"];

  // Animation variants for the mobile menu container
  const menuVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};


  // Animation for individual mobile links
  const mobileLinkVars = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[88px]">
          
          {/* --- 1. LOGO SECTION --- */}
          <div className="flex-shrink-0 cursor-pointer">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-dark.svg"
                  alt="Vistahaven Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-wide text-[#1a1a1a]">
                VISTAHAVEN
              </span>
            </Link>
          </div>

          {/* --- 2. CENTER LINKS (Desktop - Lucky Draw Effect) --- */}
          <div className="hidden lg:flex items-center gap-11">
            {navLinks.map((link) => (
              <FlipLink
                key={link}
                href={link === "Home" ? "/" : "#"}
              >
                {link}
              </FlipLink>
            ))}
          </div>

          {/* --- 3. RIGHT BUTTON (Desktop) --- */}
          <div className="hidden lg:block">
            <Link href="#contact">
              <button className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-black text-white rounded-full transition-all hover:bg-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                <span className="font-medium text-[15px] tracking-wide">
                  Contact Us Now
                </span>
                <div className="bg-white text-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </button>
            </Link>
          </div>

          {/* --- MOBILE TOGGLE BUTTON --- */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              {/* Animated Icon Switching */}
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU CONTENT --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="lg:hidden overflow-hidden bg-white absolute top-[88px] left-0 w-full border-b border-gray-100 shadow-xl origin-top"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <motion.div key={link} variants={mobileLinkVars}>
                    <Link
                      href={link === "Home" ? "/" : "#"}
                      className="block text-xl font-medium text-gray-600 hover:text-black hover:pl-2 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Button */}
                <motion.div variants={mobileLinkVars} className="pt-4">
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                      <span className="w-2 h-2 bg-[#4ADE80] rounded-full"></span>
                      <span className="font-medium text-lg">Contact Us Now</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// --- LUCKY DRAW / VERTICAL SCROLL COMPONENT (Unchanged) ---
const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden text-[17px] font-medium text-gray-800"
      style={{ lineHeight: 1.2 }}
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        className="relative block"
      >
        <motion.span
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="block origin-center"
        >
          {children}
        </motion.span>
        <motion.span
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="absolute inset-0 block origin-center"
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  );
};