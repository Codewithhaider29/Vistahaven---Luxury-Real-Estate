import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import FeatureTabs from "@/components/feature-tabs"
import Services from "@/components/services"
import FeaturedProperties from "@/components/featured-properties"
import VisionStats from "@/components/vision-stats"
import Agents from "@/components/agents"
import Testimonials from "@/components/testimonials"
import Blog from "@/components/blog"
import FAQ from "@/components/faq"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureTabs />
      <Services />
      <FeaturedProperties />
      <VisionStats />
      <Agents />
      <Testimonials />
      <Blog />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  )
}
