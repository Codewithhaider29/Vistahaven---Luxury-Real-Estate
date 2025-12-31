"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

// --- Mock Data ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Olivia Wilson",
    role: "Corporate Attorney",
    image: "/avatar/avatar1.jpg",
    content: "The professionalism and deep understanding of luxury properties gave me complete confidence throughout the process.",
    rating: 5,
  },
  {
    id: 2,
    name: "Liam Scott",
    role: "Marketing Strategist",
    image: "/avatar/avatar2.jpg",
    content: "Liam helped me secure an excellent deal on a luxury home. His negotiation skills were remarkable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Charlotte Evans",
    role: "Interior Designer",
    image: "/avatar/avatar3.jpg",
    content: "The architectural insights and design advice made choosing my dream home an inspiring journey.",
    rating: 5,
  },
  {
    id: 4,
    name: "Amelia Cooper",
    role: "Graphic Designer",
    image: "/avatar/avatar4.jpg",
    content: "Sophia's passion for sustainable housing helped me find a beautiful and eco-friendly home that I absolutely love.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lily Ross",
    role: "Eco-Lifestyle Blogger",
    image: "/avatar/avatar1.jpg",
    content: "Emma's expertise in sustainable housing exceeded my expectations. She found me the perfect green home for my family.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sebastian Turner",
    role: "Hospitality Manager",
    image: "/avatar/avatar2.jpg",
    content: "Ethan's creativity and expertise in short-term rentals gave me the confidence to invest in my first vacation property.",
    rating: 5,
  },
  {
    id: 7,
    name: "Harper Gray",
    role: "Freelance Writer",
    image: "/avatar/avatar3.jpg",
    content: "Charlotte's dedication and efficiency turned my dream of owning a luxury villa into reality much faster than I expected.",
    rating: 5,
  },
  {
    id: 8,
    name: "Aurora James",
    role: "Fashion Consultant",
    image: "/avatar/avatar4.jpg",
    content: "Emily made buying my luxury home effortless. Her warm and professional demeanor was truly appreciated.",
    rating: 5,
  },
   {
    id: 9,
    name: "William Parker",
    role: "Tech Entrepreneur",
    image: "/avatar/avatar1.jpg",
    content: "Outstanding service from start to finish. The team truly understands the needs of modern investors.",
    rating: 5,
  },
];

// Split data for columns
const col1 = TESTIMONIALS.slice(0, 3);
const col2 = TESTIMONIALS.slice(3, 6);
const col3 = TESTIMONIALS.slice(6, 9);
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Animation Variants ---
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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


// --- Sub-Component: Testimonial Card ---
function TestimonialCard({ item }: { item: typeof TESTIMONIALS[0] }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 mb-6 w-full break-inside-avoid transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
    >
      <div className="flex gap-1 mb-4 text-yellow-400">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" className="stroke-none" />
        ))}
      </div>
      
      <p className="text-gray-600 leading-relaxed font-medium mb-6 text-sm md:text-base">
        "{item.content}"
      </p>

      <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-black leading-none mb-1">{item.name}</h4>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Sub-Component: Marquee Column ---
function MarqueeColumn({ items, duration = 30, reverse = false }: { items: typeof TESTIMONIALS, duration?: number, reverse?: boolean }) {
  // Duplicate items for seamless loop (quadrupled for smoother mobile scroll)
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative h-[500px] md:h-[650px] overflow-hidden group">
        <motion.div
            initial={{ y: reverse ? "-50%" : "0%" }}
            animate={{ y: reverse ? "0%" : "-50%" }}
            transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
            }}
            className="flex flex-col"
        >
            {duplicatedItems.map((item, idx) => (
                <TestimonialCard key={`${item.id}-${idx}`} item={item} />
            ))}
        </motion.div>
        
        {/* Gradient Fade Top/Bottom for smooth scroll exit/entry */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* --- Left Content (Sticky) --- */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start mb-12 lg:mb-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
             <div className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full bg-gray-50">
               Client Stories
             </div>
          </motion.div>
          
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.05] mb-6"
          >
            TRUSTED BY MANY, <br className="hidden md:block"/> 
            <span className="text-gray-400">LOVED BY ALL</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md"
          >
            Our clients' success stories reflect our commitment to excellence. See how we've helped them find their dream homes, sustainable investments, and perfect getaways.
          </motion.p>
          
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeUpVariants}
             transition={{ delay: 0.3 }}
             className="mt-8 flex items-center gap-4"
          >
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 relative overflow-hidden">
                        <Image src={`/avatar/avatar${i}.jpg`} alt="User" fill className="object-cover"/>
                     </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-bold">
                    +2k
                 </div>
              </div>
              <div className="text-sm font-medium">
                 <p className="text-black font-bold">4.9/5 Rating</p>
                 <p className="text-gray-400">Based on 2,450 reviews</p>
              </div>
          </motion.div>
        </div>

        {/* --- Right Content (Scrolling Columns) --- */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
             {/* Column 1 - All screens */}
             <MarqueeColumn items={col1} duration={45} />
             
             {/* Column 2 - Hidden on mobile, visible on tablet+ */}
             <div className="hidden md:block pt-12"> 
                 <MarqueeColumn items={col2} duration={55} reverse />
             </div>

             {/* Column 3 - Hidden on tablet, visible on desktop */}
             <div className="hidden lg:block">
                 <MarqueeColumn items={col3} duration={50} />
             </div>
        </div>

      </div>
    </section>
  );
}