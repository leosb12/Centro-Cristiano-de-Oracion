import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Horarios from '../components/Horarios'
import Ministerios from '../components/Ministerios'
import MisionesPreview from '../components/MisionesPreview'
import VersiculoBanner from '../components/VersiculoBanner'
import Media from '../components/Media'
import FAQ from '../components/FAQ'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (!hash) return
    // Wait for render then scroll
    const id = setTimeout(() => {
      const target = document.querySelector(hash)
      if (target) {
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 80)
    return () => clearTimeout(id)
  }, [location.hash])

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Horarios />
        <Ministerios />
        <MisionesPreview />
        <VersiculoBanner />
        <Media />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
