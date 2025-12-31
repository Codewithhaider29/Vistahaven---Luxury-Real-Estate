"use client";

import Image from "next/image";
import { motion, Variants  } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

// --- Mock Data ---
const BLOGS = [
  {
    id: 1,
    title: "The Ultimate Checklist for Selling Your Home Faster",
    date: "April 11, 2025",
    readTime: "6 min read",
    image: "/blog/blog1.jpg", 
  },
  {
    id: 2,
    title: "Short-Term Rentals vs. Long-Term Leases: Which One's Right for You?",
    date: "April 11, 2025",
    readTime: "6 min read",
    image: "/blog/blog2.jpg", 
  },
  {
    id: 3,
    title: "Luxury Living Trends in 2025: What Buyers Really Want",
    date: "April 11, 2025",
    readTime: "7 min read",
    image: "/blog/blog3.jpg", 
  },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};


const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT, // ✅ cubic-bezier tuple
    },
  },
};


const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};


export default function Blog() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- Header Section --- */}
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full bg-gray-50"
          >
            Real Estate Insights
          </motion.div>
          
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight uppercase leading-[1.1] max-w-4xl"
          >
            EXPLORE THE MARKET. <br className="hidden md:block"/> LEARN FROM EXPERTS.
          </motion.h2>
        </div>

        {/* --- Blog Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20"
        >
          {BLOGS.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Date Badge (Optional) */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full md:hidden">
                    <span className="text-xs font-bold text-black">{blog.date}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4 leading-tight group-hover:text-gray-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <div className="mt-auto flex items-center gap-6 text-gray-400 text-xs md:text-sm font-medium border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-black" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-black" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- View All Button --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button className="group relative flex items-center gap-4 pl-6 pr-2 py-2.5 border border-gray-200 rounded-full overflow-hidden bg-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-md">
            {/* Sliding background */}
            <div className="absolute inset-0 bg-black transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0" />
            
            {/* Text */}
            <span className="relative z-10 text-black font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
              View All Articles
            </span>
            
            {/* Icon Container */}
            <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
              <ArrowUpRight className="text-white w-4 h-4 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}