"use client";

import { Home, Users, Building2, TrendingUp, BarChart3, PieChart, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Property Sales",
    description: "Expertly promoting and selling your property to attract qualified buyers with premium marketing strategies.",
    icon: "Home",
  },
  {
    id: 2,
    title: "Buyer Representation",
    description: "Guiding you through the home-buying process, prioritizing your interests and negotiating the best deals.",
    icon: "Users",
  },
  {
    id: 3,
    title: "Rental Management",
    description: "Managing tenant relations, maintenance, and finances to maximize your rental returns hassle-free.",
    icon: "Building2",
  },
  {
    id: 4,
    title: "Investment Consulting",
    description: "Providing strategic advice to help you capitalize on real estate opportunities and build wealth.",
    icon: "TrendingUp",
  },
  {
    id: 5,
    title: "Property Valuation",
    description: "Accurately assessing your property's value for sales, purchases, or investment analysis.",
    icon: "BarChart3",
  },
  {
    id: 6,
    title: "Tailored Solutions",
    description: "Delivering customized real estate services aligned with your specific goals and lifestyle.",
    icon: "PieChart",
  },
];

const iconMap: any = {
  Home: Home,
  Users: Users,
  Building2: Building2,
  TrendingUp: TrendingUp,
  BarChart3: BarChart3,
  PieChart: PieChart,
};

export default function Services() {
  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

 const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

 const hoverCardVariants: Variants = {
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

const hoverIconVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
    },
  },
};


  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white px-4 relative overflow-hidden">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
         <div className="absolute top-[5%] left-[10%] w-64 h-64 md:w-96 md:h-96 bg-gray-100 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
         <div className="absolute bottom-[5%] right-[10%] w-72 h-72 md:w-[30rem] md:h-[30rem] bg-gray-50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto px-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6 shadow-sm"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight text-balance leading-[1.1]"
          >
            EXPLORE OUR RANGE OF <br className="hidden md:block" />
            <span className="text-gray-400">EXPERT SERVICES</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            From property sales to investment consulting, we provide comprehensive solutions tailored to your unique goals.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover="hover"
                className="group relative bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-gray-200/50 hover:border-transparent transition-all duration-300"
              >
                <motion.div variants={hoverCardVariants} className="h-full flex flex-col">
                    
                    {/* Icon Container */}
                    <div className="mb-6 md:mb-8 flex justify-between items-start">
                      <motion.div 
                        variants={hoverIconVariants}
                        className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 group-hover:bg-black rounded-2xl flex items-center justify-center transition-colors duration-300"
                      >
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </motion.div>
                      
                      {/* Hover Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-100 rounded-full p-2">
                         <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-auto">
                      <h3 className="text-xl md:text-2xl font-bold text-black mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}