"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


  // Animation Variants
  const containerVariants: Variants = {
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT }, // ✅ TS-safe
  },


  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 md:px-8 overflow-hidden" id="contact">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <Image 
            src="/sky-bg.jpg" // Replace with actual path
            alt="Background"
            fill
            className="object-cover object-center "
            priority
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/20 to-white/60" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
            >
                <span className="px-5 py-2 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-600 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm inline-block">
                    Get In Touch
                </span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
                Let's Make Your Property <br className="hidden md:block" /> Journey Effortless
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
                Have questions or ready to take the next step? Whether you're looking to buy, rent, or invest, our team is here to guide you.
            </motion.p>
        </div>

        {/* --- Form Card --- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
        >
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-16"
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">We'll be in touch shortly.</p>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-8 md:space-y-10"
                    >
                        
                        {/* Name Row */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            {['firstName', 'lastName'].map((field) => (
                                <motion.div key={field} variants={itemVariants} className="relative group">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                                        {field === 'firstName' ? 'First Name' : 'Last Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={(formData as any)[field]}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField(field)}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className="w-full bg-transparent border-b border-gray-300 py-3 px-1 text-gray-900 text-lg font-medium focus:outline-none placeholder-transparent"
                                    />
                                    {/* Animated Underline */}
                                    <motion.span 
                                        className="absolute bottom-0 left-0 h-[2px] bg-black"
                                        initial={{ width: "0%" }}
                                        animate={{ width: focusedField === field ? "100%" : "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Row */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                             {['email', 'phone'].map((field) => (
                                <motion.div key={field} variants={itemVariants} className="relative group">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                                        {field === 'email' ? 'Email Address' : 'Phone Number'}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : 'tel'}
                                        name={field}
                                        value={(formData as any)[field]}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField(field)}
                                        onBlur={() => setFocusedField(null)}
                                        required={field === 'email'}
                                        className="w-full bg-transparent border-b border-gray-300 py-3 px-1 text-gray-900 text-lg font-medium focus:outline-none placeholder-transparent"
                                    />
                                    <motion.span 
                                        className="absolute bottom-0 left-0 h-[2px] bg-black"
                                        initial={{ width: "0%" }}
                                        animate={{ width: focusedField === field ? "100%" : "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Message Area */}
                        <motion.div variants={itemVariants} className="relative group">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                                What can we help you with?
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                rows={3}
                                className="w-full bg-transparent border-b border-gray-300 py-3 px-1 text-gray-900 text-lg font-medium focus:outline-none resize-none"
                            />
                            <motion.span 
                                className="absolute bottom-[6px] left-0 h-[2px] bg-black"
                                initial={{ width: "0%" }}
                                animate={{ width: focusedField === 'message' ? "100%" : "0%" }}
                                transition={{ duration: 0.3 }}
                            />
                            {/* Decorative Pen Icon */}
                            <div className="absolute bottom-4 right-0 pointer-events-none text-gray-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                className="w-full mt-4 px-8 py-5 bg-black text-white font-bold rounded-full hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-xl hover:shadow-2xl text-lg uppercase tracking-wider flex items-center justify-center gap-3 group"
                            >
                                <span>Send Message</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </motion.div>

                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}