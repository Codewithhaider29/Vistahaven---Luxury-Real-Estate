"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Mock Data ---
const AGENTS = [
  {
    id: 1,
    name: "Benjamin Foster",
    role: "Urban Development Advisor",
    image: "/avatar/avatar1.jpg",
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Investment Consultant",
    image: "/avatar/avatar2.jpg",
  },
  {
    id: 3,
    name: "Michael Anderson",
    role: "Vacation Rental Specialist",
    image: "/avatar/avatar3.jpg",
  },
  {
    id: 4,
    name: "Charlotte Morgan",
    role: "High-End Consultant",
    image: "/avatar/avatar4.jpg",
  },
  {
    id: 5,
    name: "Ethan Hughes",
    role: "Green Building Advisor",
    image: "/avatar/avatar1.jpg",
  },
  {
    id: 6,
    name: "Olivia Bennett",
    role: "Sustainable Housing",
    image: "/avatar/avatar2.jpg",
  },
  {
    id: 7,
    name: "Sophia Rivera",
    role: "Housing Consultant",
    image: "/avatar/avatar3.jpg",
  },
  {
    id: 8,
    name: "Liam Carter",
    role: "Commercial Agent",
    image: "/avatar/avatar4.jpg",
  },
];

// --- Animation Variants (TS Strict Compliant) ---
// Using Cubic Bezier arrays instead of strings for 'ease' to fix TS2322
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Agents() {
  // Duplicating for infinite marquee
  const MARQUEE_AGENTS = [...AGENTS, ...AGENTS];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white px-0 md:px-8 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-20 px-4"
        >
          <motion.div variants={fadeUpVariants} className="inline-block">
             <span className="px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full bg-gray-50 inline-block">
              Meet Our Experts
            </span>
          </motion.div>
          
          <motion.h2 
            variants={fadeUpVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight uppercase leading-[1.1]"
          >
            Personalized Guidance, <br className="hidden md:block" />
            <span className="text-gray-400">Proven Expertise</span>
          </motion.h2>
        </motion.div>

        {/* --- Auto-Scrolling Marquee --- */}
        <div className="relative w-full overflow-hidden">
          
          {/* Gradient Masks for Fade Effect */}
          <div className="absolute top-0 left-0 z-10 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 z-10 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-4 md:gap-8 w-max px-4"
            animate={{ x: "-50%" }}
            initial={{ x: "0%" }}
            transition={{
              ease: "linear", // Strings allowed in direct transition prop
              duration: 40, 
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }} 
            style={{ willChange: "transform" }} // Performance optimization
          >
            {MARQUEE_AGENTS.map((agent, index) => (
              <div
                key={`${agent.id}-${index}`}
                className="flex-none w-[240px] md:w-[320px] group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden bg-gray-100 mb-5 border border-gray-100">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Action Button (Optional) */}
                   <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </div>
                   </div>
                </div>

                {/* Text Content */}
                <div className="px-2 transition-transform duration-300 group-hover:translate-x-1">
                  <h3 className="text-lg font-bold text-black mb-1 group-hover:text-gray-600 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {agent.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- View All Button --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <button className="group relative flex items-center gap-4 pl-6 pr-2 py-2.5 border border-gray-200 rounded-full overflow-hidden bg-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-black transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0" />
            <span className="relative z-10 text-black font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
              View All Expert Agents
            </span>
            <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
              <ArrowUpRight className="text-white w-4 h-4 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}