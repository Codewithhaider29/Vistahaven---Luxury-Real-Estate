"use client"

import { useState } from "react"
import Image from "next/image"
import { Bed, Bath, Ruler as Ruler2 } from "lucide-react"

interface PropertyCardProps {
  id: number
  title: string
  price: number
  location: string
  beds: number
  baths: number
  sqft: number
  image: string
  type: "For Sale" | "For Rent"
}

export default function PropertyCard({ title, price, location, beds, baths, sqft, image, type }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div
        className="relative h-64 md:h-72 overflow-hidden bg-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
        />
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-full">{type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <p className="text-3xl font-bold text-black">${(price / 1000).toFixed(0)}K</p>
        </div>

        {/* Title & Location */}
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{location}</p>

        {/* Specs */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <Bed size={18} />
            <span className="text-sm font-medium">{beds} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Bath size={18} />
            <span className="text-sm font-medium">{baths} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Ruler2 size={18} />
            <span className="text-sm font-medium">{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  )
}
