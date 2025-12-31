"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";

// --- Mock Data ---
const FAQS = [
  {
    id: 1,
    question: "What Is The Process For Buying A Property?",
    answer: "The process involves selecting the right property, negotiating terms with the agent, signing the contract, and completing the payment. Our professional agents will guide you through every step to ensure a smooth experience.",
  },
  {
    id: 2,
    question: "How Do I Determine How Much I Can Afford?",
    answer: "We recommend speaking with a financial advisor or mortgage broker to assess your borrowing capacity. Generally, you should consider your income, savings, existing debts, and lifestyle expenses.",
  },
  {
    id: 3,
    question: "What Documents Are Required For Renting?",
    answer: "Typically, you'll need proof of identity (ID/Passport), proof of income (payslips/bank statements), and rental references. Some landlords may require a credit check.",
  },
  {
    id: 4,
    question: "Can I Terminate A Lease Agreement Early?",
    answer: "Lease termination depends on the specific terms of your agreement. Usually, there are penalties or notice periods required. We advise reviewing your contract or discussing it with your property manager.",
  },
  {
    id: 5,
    question: "What Are The Risks Of Investing In Real Estate?",
    answer: "Risks include market fluctuations, vacancy periods, and unexpected maintenance costs. However, real estate is generally considered a stable long-term investment.",
  },
  {
    id: 6,
    question: "How Do I Choose The Right Property To Invest In?",
    answer: "Look for locations with high growth potential, good infrastructure, and strong rental demand. Our investment consultants can provide detailed market analysis to help you decide.",
  },
  {
    id: 7,
    question: "Do High-End Properties Support Virtual Tours?",
    answer: "Yes, most of our luxury listings feature high-definition 3D virtual tours, allowing you to explore the property remotely before scheduling an in-person viewing.",
  },
  {
    id: 8,
    question: "How Long Does The Property Transfer Process Take?",
    answer: "The timeline varies by location and complexity but typically takes between 30 to 60 days from the signing of the contract to final settlement.",
  },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for items
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};


export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* --- Left Column: Sticky Header --- */}
          {/* 'self-start' is crucial for sticky to work in a grid item */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start mb-10 lg:mb-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full bg-gray-50">
                Help Center
              </div>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight uppercase leading-[1.1] mb-6"
            >
              FREQUENTLY ASKED <br /> QUESTIONS
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm"
            >
              Can't find the answer you're looking for? Contact our support team directly.
            </motion.p>
          </div>

          {/* --- Right Column: Accordion List --- */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {FAQS.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants} className="group">
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full py-6 md:py-8 flex items-start justify-between text-left focus:outline-none"
                  >
                    <span 
                        className={`text-lg md:text-2xl font-bold transition-colors duration-300 pr-8 ${
                            openId === faq.id ? "text-black" : "text-gray-500 group-hover:text-black"
                        }`}
                    >
                      {faq.question}
                    </span>
                    
                    {/* Animated Icon Circle */}
                    <motion.div 
                        animate={{ 
                            rotate: openId === faq.id ? 45 : 0, // Rotate Plus to make X
                            backgroundColor: openId === faq.id ? "#f3f4f6" : "transparent"
                        }}
                        className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                            openId === faq.id ? "border-gray-300" : "border-gray-200 group-hover:border-black"
                        }`}
                    >
                        <Plus 
                            size={16} 
                            className={`transition-colors duration-300 ${
                                openId === faq.id ? "text-black" : "text-gray-400 group-hover:text-black"
                            }`} 
                        />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Smooth spring-like ease
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed pb-8 max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}