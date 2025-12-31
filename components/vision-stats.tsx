"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, Variants } from "framer-motion";
import { Target, Users, Handshake } from "lucide-react";

// --- Mock Data ---
const STATS = [
  { value: 200, suffix: "+", label: "Projects Complete" },
  { value: 70, suffix: "+", label: "Happy Clients" },
  { value: 10, prefix: "$", suffix: "M+", label: "Project Value" },
  { value: 90, suffix: "%", label: "Client Retention" },
];

const FEATURES = [
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To be a leader in the real estate market, offering unparalleled services in luxury, sustainability, and vacation properties.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our team comprises seasoned professionals with extensive experience in luxury real estate, sustainable housing, and vacation rentals.",
  },
  {
    icon: Handshake,
    title: "Tailored Solutions",
    description:
      "We offer customized real estate services that align with your specific lifestyle and investment goals, ensuring a seamless experience.",
  },
];

// --- Sub-Component: Animated Counter ---
function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(0)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className="tabular-nums" />;
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1], // easeOut equivalent
    },
  },
};

export default function VisionStats() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* --- Left Column: Text & Stats --- */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-1">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.05] mb-6">
                REDEFINING EXCELLENCE IN <br className="hidden md:block" /> REAL ESTATE
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-gray-500 text-lg leading-relaxed"
            >
              <p>
                Founded with a passion for exceptional living spaces, we
                specialize in luxury properties, green and sustainable homes, and
                vacation rentals.
              </p>
              <p>
                Our journey is defined by a commitment to quality, innovation, and
                client satisfaction. We believe that luxury is more than just
                aesthetics; it's about finding a home that resonates with your
                lifestyle.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-y-10 gap-x-8 mt-6 border-t border-gray-100 pt-8"
            >
              {STATS.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <p className="text-4xl md:text-5xl font-bold text-black mb-1">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- Middle Column: Image --- */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 h-full order-3 lg:order-2"
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <Image
                src="/team-meeting.jpg" // Ensure this path is correct
                alt="Our Expert Team"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* --- Right Column: Features List --- */}
          <div className="lg:col-span-3 flex flex-col gap-8 lg:pl-6 order-2 lg:order-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col gap-3 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gray-50 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-base pl-[4.5rem] -mt-2">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* --- Bottom Section: Infinite Marquee Partners --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 md:mt-32 pt-12 border-t border-gray-100"
        >
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Trusted by Industry Leaders
            </span>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative w-full overflow-hidden mask-gradient">
            {/* We create a flex container with 2 sets of logos.
                We animate x from 0% to -50% to create a seamless loop.
             */}
            <motion.div
              className="flex items-center gap-16 md:gap-24 w-max"
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40, // Adjust speed here (higher = slower)
              }}
            >
              {/* Set 1 */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`a-${i}`}
                  className="relative w-32 h-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
                >
                  {/* Using a placeholder SVG or images if you have them */}
                  <Image
                     src={`/logo/logo-${(i % 5) + 1}.svg`} // Cycling through 5 mock logos
                     alt="Partner Logo"
                     fill
                     className="object-contain"
                  />
                </div>
              ))}
              {/* Set 2 (Duplicate for seamless loop) */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`b-${i}`}
                  className="relative w-32 h-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
                >
                  <Image
                     src={`/logo/logo-${(i % 5) + 1}.svg`}
                     alt="Partner Logo"
                     fill
                     className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
            
            {/* Fade Edges for Marquee */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}