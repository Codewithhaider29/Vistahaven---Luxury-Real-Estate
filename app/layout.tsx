import type React from "react"
import type { Metadata } from "next"
import { Manrope, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// 1. Define the fonts with 'variable' so Tailwind can use them
const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope", // Define CSS variable
  display: "swap",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono", // Define CSS variable
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vistahaven - Luxury Real Estate",
  description: "Discover your perfect home with Vistahaven. Premium luxury residences and properties worldwide.",
  icons: {
    // 2. Updated to use your specific logo file     
    shortcut: "/logo-light.svg",
    apple: "/logo-light.svg", // Keep this if you have a specific apple icon, otherwise point to logo
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* 3. Added font variables to the body class list */}
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}