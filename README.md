# 🏡 Vistahaven - Luxury Real Estate Platform

Vistahaven is a modern, high-performance real estate website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. It features a luxury design aesthetic, smooth animations, and a fully responsive layout.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Font:** Manrope & Geist Mono

## 📂 Project Structure

Here is how you should organize the components we created:

```bash
vistahaven/
├── app/
│   ├── globals.css          # Global styles & Scrollbar CSS
│   ├── layout.tsx           # Root Layout (Fonts & ScrollProgress)
│   ├── loading.tsx          # Custom Loading Screen
│   ├── page.tsx             # Homepage (combines all sections)
│   └── icon.svg             # Favicon
├── components/
│   ├── Navbar.tsx           # Responsive Navbar
│   ├── Hero.tsx             # Hero Section with Parallax
│   ├── FeatureTabs.tsx      # Interactive Features Section
│   ├── Services.tsx         # Services Grid
│   ├── FeaturedProperties.tsx # Property Listing with Filters
│   ├── VisionStats.tsx      # Stats & Infinite Partner Marquee
│   ├── Agents.tsx           # Infinite Agents Marquee
│   ├── Testimonials.tsx     # Staggered Testimonials Grid
│   ├── Blog.tsx             # Blog Grid
│   ├── FAQ.tsx              # Accordion FAQ
│   ├── ContactForm.tsx      # Contact Form with Validation
│   ├── Footer.tsx           # Animated Footer
│   └── ScrollProgress.tsx   # Side Scroll Bar Indicator
└── public/
    ├── logo-light.svg
    ├── logo-dark.svg
    ├── sky-bg.jpg
    ├── luxury-home.jpg
    └── ... (other images)
🛠️ Installation & Setup
Clone the repository:

Bash

git clone [https://github.com/Codewithhaider29/Vistahaven---Luxury-Real-Estate.git]
(https://github.com/Codewithhaider29/Vistahaven---Luxury-Real-Estate.git)
cd Vistahaven---Luxury-Real-Estate
Install dependencies:

Bash

npm install framer-motion lucide-react clsx tailwind-merge
Run the development server:

Bash

npm run dev
Open locally: Visit http://localhost:3000 in your browser.

✨ Features
Smooth Scroll Progress: Custom side scrollbar and progress indicator.

Infinite Marquees: Auto-scrolling agents and partners section.

Interactive Filters: Filter properties by Location, Type, and Status.

Animations: Staggered fade-ins, hover effects, and parallax backgrounds.

Responsive: Optimized for Mobile, Tablet, and Desktop.

🎨 Customization
Changing Colors
Go to tailwind.config.ts or app/globals.css to update the primary colors. Currently set to a Black & White luxury theme.

Scrollbar
To modify the custom browser scrollbar, edit the CSS in app/globals.css.

Built with ❤️ by [Codewithhaider](https://github.com/Codewithhaider29).