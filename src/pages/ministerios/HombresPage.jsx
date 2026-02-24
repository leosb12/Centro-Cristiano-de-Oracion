import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Users, Target } from 'lucide-react'
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

export default function HombresPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/ministerios/Hombres%20con%20proposito.jpg"
          alt="Hombres con Propósito"
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
            CCO Hombres
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Hombres con Propósito
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
                Hombres forjados para dejar huella
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hombres con Propósito es el ministerio masculino del Centro Cristiano de Oración,
                un espacio donde los hombres son desafiados a crecer en su fe, su carácter y
                su llamado divino.
              </p>
              <p>
                Creemos que un hombre transformado por el Evangelio transforma su familia, su
                comunidad y su generación. Por eso, nos reunimos para ser equipados y rendir
                cuentas mutuamente en el camino de la fe.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Shield,  value: 'Carácter',  label: 'Forjado con la Palabra' },
              { icon: Target,  value: 'Propósito',  label: 'Vivir con dirección y sentido' },
              { icon: Users,   value: 'Comunidad', label: 'Hermanos que se edifican' },
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
                Nos reunimos periódicamente para estudiar la Palabra, compartir experiencias y
                orar juntos. También organizamos actividades, retiros y encuentros especiales
                para profundizar los vínculos entre hermanos.
              </p>
              <p>
                Nuestro corazón es ver a cada hombre de la iglesia convertido en un líder
                servidor en su hogar, en su trabajo y en la congregación.
              </p>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="text-center">
          <h3
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¿Sos hombre y querés crecer?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Este ministerio te espera. Escribinos y te contamos cómo participar.
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
