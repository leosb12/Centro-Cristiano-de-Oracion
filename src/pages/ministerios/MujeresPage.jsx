import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Heart, Users } from 'lucide-react'
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

export default function MujeresPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/ministerios/Mujeres%20con%20proposito.jpg"
          alt="Mujeres con Propósito"
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
            CCO Mujeres
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Mujeres con Propósito
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
                Mujeres que caminan en su llamado
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Mujeres con Propósito es el ministerio femenino del Centro Cristiano de Oración,
                un lugar de encuentro, crecimiento y sanidad donde cada mujer es valorada y
                equipada para vivir su identidad en Cristo.
              </p>
              <p>
                Creemos en el poder de las mujeres que conocen quiénes son en Dios. Por eso
                creamos espacios para que puedan compartir, ser ministradas y crecer juntas
                en comunidad.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, value: 'Identidad',   label: 'Descubrir quiénes son en Dios' },
              { icon: Heart,    value: 'Sanidad',      label: 'Un espacio seguro y restaurador' },
              { icon: Users,    value: 'Comunidad',   label: 'Mujeres que se sostienen' },
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
                Nos reunimos para estudiar la Palabra, compartir en oración y edificarnos las
                unas a las otras. Organizamos encuentros, retiros y eventos especiales a lo
                largo del año para profundizar nuestra fe y nuestros lazos como hermanas.
              </p>
              <p>
                Cada mujer que llega a este ministerio encuentra un lugar donde puede ser
                auténtica, crecer y florecer en su llamado único.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="text-center">
          <h3
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¿Sos mujer y querés ser parte?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Te esperamos con los brazos abiertos. Escribinos y te contamos más.
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
