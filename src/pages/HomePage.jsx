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
