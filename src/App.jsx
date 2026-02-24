import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Horarios from './components/Horarios'
import Ministerios from './components/Ministerios'
import VersiculoBanner from './components/VersiculoBanner'
import EnVivo from './components/EnVivo'
import Media from './components/Media'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Horarios />
        <Ministerios />
        <VersiculoBanner />
        <EnVivo />
        <Media />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
