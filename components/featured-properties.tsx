"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Bed, Bath, Move, ChevronDown, Heart, ArrowUpRight } from "lucide-react";

// --- Mock Data ---
const PROPERTIES = [
  {
    id: 1,
    title: "Billionaire Mansion",
    price: "$5,500,000",
    location: "River Oaks, Houston, Texas",
    type: "Mansion",
    status: "For Sale",
    beds: 5,
    baths: 6,
    sqft: "8,500",
    image: "/luxury-home.jpg", 
  },
  {
    id: 2,
    title: "Palazzo di Amore",
    price: "$12,000/mo",
    location: "Brooklyn Heights, New York",
    type: "Villa",
    status: "For Rent",
    beds: 4,
    baths: 3,
    sqft: "4,200",
    image: "/eco-home.jpg",
  },
  {
    id: 3,
    title: "The One Bel Air",
    price: "$8,900,000",
    location: "Bel Air, Los Angeles, California",
    type: "Modern",
    status: "For Sale",
    beds: 7,
    baths: 9,
    sqft: "12,000",
    image: "/vacation-home.jpg",
  },
  {
    id: 4,
    title: "Seaside Retreat",
    price: "$2,500,000",
    location: "Malibu, California",
    type: "Villa",
    status: "For Sale",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    image: "/luxury-home.jpg",
  },
  {
    id: 5,
    title: "Downtown Penthouse",
    price: "$8,500/mo",
    location: "Manhattan, New York",
    type: "Apartment",
    status: "For Rent",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    image: "/eco-home.jpg",
  },
  {
    id: 6,
    title: "Aspen Ski Lodge",
    price: "$4,200,000",
    location: "Aspen, Colorado",
    type: "Cabin",
    status: "For Sale",
    beds: 5,
    baths: 4,
    sqft: "3,500",
    image: "/vacation-home.jpg",
  },
];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      // ease removed (TS safe)
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};



// --- Sub-Component: Custom Dropdown ---
function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-md border border-gray-100 hover:border-gray-200 text-black font-medium py-3.5 px-5 rounded-xl transition-all duration-300"
      >
        <span className="truncate text-sm md:text-base">{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                    value === option 
                      ? "bg-gray-50 font-bold text-black border-l-4 border-black" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-black border-l-4 border-transparent"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Component: Property Card ---
function PropertyCard({ property }: { property: typeof PROPERTIES[0] }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-[250px] sm:h-[280px] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-black">
            {property.status}
          </span>
        </div>

        {/* Like Button */}
        <button className="absolute top-4 right-4 p-2.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all duration-300 group-hover:scale-110">
           <Heart className="w-4 h-4" />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
           <p className="text-white text-xl md:text-2xl font-bold tracking-tight shadow-sm drop-shadow-md">
             {property.price}
           </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-bold text-black mb-1 line-clamp-1 group-hover:text-gray-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-gray-500">
          <div className="flex items-center gap-1.5" title={`${property.beds} Bedrooms`}>
            <Bed className="w-4 h-4 stroke-[1.5]" />
            <span className="text-xs md:text-sm font-medium">{property.beds}</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex items-center gap-1.5" title={`${property.baths} Bathrooms`}>
            <Bath className="w-4 h-4 stroke-[1.5]" />
            <span className="text-xs md:text-sm font-medium">{property.baths}</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex items-center gap-1.5" title={`${property.sqft} Square Feet`}>
            <Move className="w-4 h-4 stroke-[1.5]" />
            <span className="text-xs md:text-sm font-medium">{property.sqft}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function FeaturedProperties() {
  const [filters, setFilters] = useState({
    location: "All",
    type: "All",
    status: "All",
  });

  const locations = useMemo(() => {
    const locs = new Set(PROPERTIES.map((p) => p.location.split(",").pop()?.trim() || p.location));
    return ["All", ...Array.from(locs)];
  }, []);

  const types = useMemo(() => {
    const typs = new Set(PROPERTIES.map((p) => p.type));
    return ["All", ...Array.from(typs)];
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      const locationMatch = filters.location === "All" || prop.location.includes(filters.location);
      const typeMatch = filters.type === "All" || prop.type === filters.type;
      const statusMatch =
        filters.status === "All" ||
        (filters.status === "For Sale" && prop.status === "For Sale") ||
        (filters.status === "For Rent" && prop.status === "For Rent");

      return locationMatch && typeMatch && statusMatch;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-20 md:py-32 bg-white px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Featured Properties</span>
              </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.1]"
            >
              Discover Homes Tailored <br className="hidden md:block"/> to Your Lifestyle.
            </motion.h2>
          </div>

          {/* Status Toggle (Scrollable on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-100 p-1.5 rounded-full flex overflow-x-auto no-scrollbar max-w-full lg:w-auto"
          >
            {["All", "For Sale", "For Rent"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange("status", status)}
                className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  filters.status === status
                    ? "bg-white text-black shadow-md"
                    : "text-gray-500 hover:text-black hover:bg-gray-200/50"
                }`}
              >
                {status}
              </button>
            ))}
          </motion.div>
        </div>

        {/* --- Filters Bar --- */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="bg-white mb-12"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-2xl">
                <CustomDropdown 
                    label="Location"
                    value={filters.location}
                    options={locations}
                    onChange={(val) => handleFilterChange("location", val)}
                />
                <CustomDropdown 
                    label="Property Type"
                    value={filters.type}
                    options={types}
                    onChange={(val) => handleFilterChange("type", val)}
                />
            </div>
        </motion.div>

        {/* --- Properties Grid --- */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="col-span-full py-24 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Move className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">No properties found</h3>
                <p className="text-gray-500 max-w-xs mx-auto mb-8">
                  We couldn't find any properties matching your current filters.
                </p>
                <button 
                    onClick={() => setFilters({ location: "All", type: "All", status: "All" })}
                    className="text-sm font-bold text-black underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors"
                >
                    Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- View All Button --- */}
        {filteredProperties.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 flex justify-center"
          >
            <button className="group relative flex items-center gap-4 pl-8 pr-2 py-3 border border-gray-200 rounded-full overflow-hidden bg-white hover:border-black transition-colors duration-300 shadow-sm hover:shadow-lg">
              {/* Sliding background */}
              <div className="absolute inset-0 bg-black transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0" />

              {/* Text */}
              <span className="relative z-10 text-black font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                View All Properties
              </span>

              {/* Icon Container */}
              <div className="relative z-10 w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                <ArrowUpRight className="text-white w-5 h-5 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
              </div>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}