"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, Leaf, Palmtree } from "lucide-react";

// Mock Data
const features = [
  {
    id: 0,
    number: "01",
    title: "Luxury Residences",
    subtitle: "Premium Living",
    description:
      "Experience unparalleled elegance in our luxury residences, featuring exquisite design, premium amenities, and prime locations for the most discerning tastes.",
    image: "/luxury-home.jpg", // Ensure these images exist in your public folder
    icon: Home,
  },
  {
    id: 1,
    number: "02",
    title: "Eco Green Buildings",
    subtitle: "Sustainable Future",
    description:
      "Sustainable living meets modern luxury. Our eco-friendly designs prioritize energy efficiency and environmental harmony without compromising on comfort.",
    image: "/eco-home.jpg",
    icon: Leaf,
  },
  {
    id: 2,
    number: "03",
    title: "Unique Vacation Homes",
    subtitle: "Global Escapes",
    description:
      "Discover escapes that inspire. From mountain retreats to seaside villas, our vacation portfolio offers unique experiences in breathtaking locations.",
    image: "/vacation-home.jpg",
    icon: Palmtree,
  },
];

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextTab();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeTab]); // Added activeTab dependency for closure freshness

  const nextTab = useCallback(() => {
    setDirection(1);
    setActiveTab((prev) => (prev + 1) % features.length);
  }, []);

  const prevTab = useCallback(() => {
    setDirection(-1);
    setActiveTab((prev) => (prev - 1 + features.length) % features.length);
  }, []);

  const handleManualChange = (newIndex: number) => {
    setIsAutoPlaying(false);
    setDirection(newIndex > activeTab ? 1 : -1);
    setActiveTab(newIndex);
  };

  // Swipe Logic
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setIsAutoPlaying(false);
      nextTab();
    } else if (info.offset.x > swipeThreshold) {
      setIsAutoPlaying(false);
      prevTab();
    }
  };

  // --- Animation Variants ---
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

  const imageVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
      zIndex: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-20%" : "20%", // Parallax exit feel
      opacity: 0,
      scale: 0.95,
      zIndex: 1,
      transition: { duration: 0.4 },
    }),
  };

  // Inverted Border Radius Class
  const curveClass = "absolute w-[40px] h-[40px] bg-[radial-gradient(circle_at_0_0,transparent_40px,white_40.5px)] pointer-events-none";

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-white px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1300px] relative mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase mb-4 block border border-gray-200 rounded-full px-4 py-1.5 w-fit"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tighter leading-[0.95]"
            >
              Comprehensive <br className="hidden md:block" /> Real Estate Solutions
            </motion.h2>
          </div>
          
          {/* Desktop Navigation Arrows */}
          <div className="flex gap-4 self-start md:self-end">
             <button 
               onClick={() => { setIsAutoPlaying(false); prevTab(); }} 
               className="group p-3 md:p-4 border border-gray-200 rounded-full hover:bg-black hover:border-black transition-all duration-300 active:scale-95"
               aria-label="Previous Slide"
             >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:text-white transition-colors" />
             </button>
             <button 
               onClick={() => { setIsAutoPlaying(false); nextTab(); }} 
               className="group p-3 md:p-4 border border-gray-200 rounded-full hover:bg-black hover:border-black transition-all duration-300 active:scale-95"
               aria-label="Next Slide"
             >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:text-white transition-colors" />
             </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="lg:col-span-4 flex flex-col justify-center relative min-h-[350px] md:min-h-[400px] order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={textContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col justify-center relative z-10"
                >
                    {/* Giant Background Number */}
                    <motion.span 
                        className="text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold text-gray-50 leading-none absolute -top-16 -left-4 md:-left-10 -z-10 select-none pointer-events-none"
                    >
                        {features[activeTab].number}
                    </motion.span>

                    {/* Icon */}
                    <motion.div variants={textItemVariants} className="mb-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                             {(() => {
                                const Icon = features[activeTab].icon;
                                return <Icon className="w-7 h-7 md:w-8 md:h-8 text-black" strokeWidth={1.5} />;
                             })()}
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.span variants={textItemVariants} className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {features[activeTab].subtitle}
                    </motion.span>

                    {/* Title */}
                    <motion.h3 variants={textItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 tracking-tight leading-none">
                        {features[activeTab].title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p variants={textItemVariants} className="text-gray-500 leading-relaxed text-base md:text-lg max-w-md">
                        {features[activeTab].description}
                    </motion.p>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Image & Vertical Nav */}
          <div className="lg:col-span-8 relative flex h-[400px] md:h-[550px] lg:h-[650px] order-1 lg:order-2">
            
            {/* Main Image Card (Swipe Enabled) */}
            <div className="relative flex-grow h-full rounded-[30px] md:rounded-[40px] overflow-hidden bg-gray-100 z-10 shadow-xl">
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={features[activeTab].image}
                    alt={features[activeTab].title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                    draggable={false} // Prevent default browser drag
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* White Box Overlay (Corner Cutout) */}
              <div className="absolute bottom-0 right-0 z-30">
                 {/* Inverse Curves */}
                 <div className={`${curveClass} -top-[40px] right-0`} />
                 <div className={`${curveClass} bottom-0 -left-[40px]`} />
                 
                 {/* Box Content */}
                 <div className="bg-white pt-6 pb-5 pl-8 pr-8 md:pt-8 md:pb-6 md:pl-8 md:pr-10 rounded-tl-[40px] min-w-[160px] md:min-w-[240px]">
                    <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Slide No.
                        </span>
                        <div className="flex items-baseline gap-2 md:gap-3 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.span 
                                    key={features[activeTab].number}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-4xl md:text-6xl font-bold text-black tracking-tighter block"
                                >
                                    {features[activeTab].number}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-sm md:text-lg text-gray-400 font-light">
                                / 0{features.length}
                            </span>
                        </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Vertical Sidebar Navigation (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-center ml-6 py-12 h-full min-w-[60px]">
                <div className="flex flex-col gap-6 items-center h-full justify-center">
                    {features.map((feature, index) => (
                        <button
                            key={feature.id}
                            onClick={() => handleManualChange(index)}
                            className="group relative flex items-center justify-center w-8 h-full max-h-[100px]"
                        >
                            {/* Line */}
                            <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full transition-all duration-500 ease-in-out ${
                                activeTab === index ? "h-full bg-black" : "h-2 bg-gray-200 group-hover:h-1/2"
                            }`} 
                            />
                            {/* Number Bubble */}
                            <span className={`absolute text-xs font-bold transition-all duration-300 z-10 bg-white py-2 px-1 rounded-md ${
                                activeTab === index ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                            }`}>
                                {feature.number}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}