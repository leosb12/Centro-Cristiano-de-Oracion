import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star, Heart } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function FadeSection({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } }) },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export default function EscuelaNinosPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/ministerios/Escuela%20de%20ni%C3%B1os.jpg"
          alt="Escuela de Niños"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

        <div className="absolute top-28 left-6 md:left-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-14">
          <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            CCO Kids
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Escuela de Niños
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-20">

        <FadeSection>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Formando corazones desde la infancia
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La Escuela de Niños del Centro Cristiano de Oración es un espacio diseñado con amor
                para que los más pequeños de la iglesia conozcan a Jesús de una manera divertida,
                segura y llena de vida.
              </p>
              <p>
                A través de historias bíblicas, adoración infantil, juegos y manualidades,
                sembramos en ellos los valores del Reino y los principios eternos de la Palabra de Dios.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, value: 'Biblia',       label: 'Como base de cada clase' },
              { icon: Star,    value: 'Creatividad',   label: 'En cada actividad' },
              { icon: Heart,   value: 'Amor',          label: 'El ambiente que cultivamos' },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="border border-gray-100 p-8 text-center hover:border-[#C9A84C] transition-colors duration-300">
                <Icon className="mx-auto mb-4 text-[#C9A84C]" size={28} />
                <p className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {value}
                </p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        <FadeSection>
          <div className="bg-gray-50 p-10 md:p-16">
            <h3
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ¿Qué hacemos?
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl">
              <p>
                Cada domingo durante el servicio principal, los niños participan de su propia
                experiencia adaptada a su edad, con maestros capacitados y comprometidos con su
                formación espiritual y emocional.
              </p>
              <p>
                También realizamos actividades especiales durante el año para celebrar y bendecir
                a los niños y sus familias.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="text-center">
          <h3
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¿Querés sumarte al equipo?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Si tenés corazón para los niños y querés servir en este ministerio, escribinos.
          </p>
          <Link
            to="/#contacto"
            className="inline-block px-8 py-4 bg-[#C9A84C] text-white text-sm tracking-widest uppercase font-medium hover:bg-[#b8933d] transition-colors duration-300"
          >
            Contactanos
          </Link>
        </FadeSection>

      </main>

      <Footer />
    </div>
  )
}
