import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Horarios from './components/Horarios'
import Ministerios from './components/Ministerios'
import VersiculoBanner from './components/VersiculoBanner'
import Media from './components/Media'
import Contacto from './components/Contacto'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Horarios />
        <Ministerios />
        <VersiculoBanner />
        <Media />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
