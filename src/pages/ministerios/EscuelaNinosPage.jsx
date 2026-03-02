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

      {/* Hero — 169.jpeg (1920×1080) */}
      <div className="relative h-[75vh] min-h-[520px] overflow-hidden">
        <img
          src="/niños2/169.jpeg"
          alt="Escuela de Niños CCO"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        <div className="absolute top-28 left-6 md:left-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16">
          <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            CCO Kids
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Escuela de Niños
          </h1>
          <p className="text-white/65 mt-4 text-base md:text-lg max-w-lg">
            Formando corazones desde la infancia con amor, Biblia y alegría.
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-16">

        <FadeSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Formando corazones desde la infancia
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
              <p className="text-gray-600 leading-relaxed">
                Un espacio donde los más pequeños conocen a Jesús de manera divertida y segura.
                Cada domingo viven su propia experiencia con maestros comprometidos, historias bíblicas,
                juegos y manualidades que siembran valores eternos.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: BookOpen, value: 'Biblia',     label: 'La base de cada clase' },
                { icon: Star,    value: 'Creatividad', label: 'En cada actividad' },
                { icon: Heart,   value: 'Amor',        label: 'El ambiente que cultivamos' },
              ].map(({ icon: Icon, value, label }, i) => (
                <div key={i} className="flex items-center gap-5 border border-gray-100 p-5 hover:border-[#C9A84C] transition-colors duration-300">
                  <Icon className="text-[#C9A84C] shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
                    <p className="text-gray-500 text-sm">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

      </main>

      {/* ── Square photo gallery ── */}
      <FadeSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {[
            '/niños2/IMG_8828.jpeg',
            '/niños2/IMG_8829.jpeg',
            '/niños2/IMG_8830.jpeg',
            '/niños2/IMG_8831.jpeg',
            '/niños2/IMG_8832.jpeg',
            '/niños2/IMG_8834.jpeg',
          ].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={src}
                alt={`CCO Kids ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── Immersive full-bleed activities photo ── */}
      <FadeSection>
        {/*
          min-h-[460px] ensures enough height on narrow phones.
          On md+ the 56.25% padding-bottom takes over (16:9 ratio).
        */}
        <div
          className="relative w-full overflow-hidden min-h-[460px] md:min-h-0"
          style={{ paddingBottom: '56.25%' }}
        >
          {/* Photo */}
          <img
            src="/ministerios/niños/cada semilla.jpeg"
            alt="Actividades CCO Kids"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Mobile: heavy full-screen overlay so text is always readable */}
          <div className="absolute inset-0 bg-black/60 md:hidden" />
          {/* Desktop: directional gradients */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Gold corner accents — smaller on mobile */}
          <div className="absolute top-4 left-4 w-6 h-6 md:top-6 md:left-6 md:w-10 md:h-10 border-t-2 border-l-2 border-[#C9A84C]" />
          <div className="absolute top-4 right-4 w-6 h-6 md:top-6 md:right-6 md:w-10 md:h-10 border-t-2 border-r-2 border-[#C9A84C]" />
          <div className="absolute bottom-4 left-4 w-6 h-6 md:bottom-6 md:left-6 md:w-10 md:h-10 border-b-2 border-l-2 border-[#C9A84C]" />
          <div className="absolute bottom-4 right-4 w-6 h-6 md:bottom-6 md:right-6 md:w-10 md:h-10 border-b-2 border-r-2 border-[#C9A84C]" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 max-w-2xl">
            <p className="text-[#C9A84C] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold mb-2 md:mb-4">
              CCO Kids · Actividades
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Cada actividad<br />es una semilla<br />de eternidad
            </h2>
            <div className="w-8 md:w-10 h-px bg-[#C9A84C] mb-3 md:mb-5" />
            {/* Subtitle hidden on the smallest screens to avoid overflow */}
            <p className="hidden sm:block text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
              Manualidades, juegos, historias bíblicas y mucho amor — así es como los niños de CCO aprenden que Dios los ve, los conoce y los ama.
            </p>
          </div>

          {/* Bottom caption bar */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-3 md:pb-5 flex items-center">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1 h-5 md:h-6 bg-[#C9A84C]" />
              <span className="text-white/50 text-[10px] md:text-xs tracking-widest uppercase">Centro Cristiano de Oración</span>
            </div>
          </div>
        </div>
      </FadeSection>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-16">

        {/* ── Me quiero montar en el tren ── */}
        <FadeSection>
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              CCO Kids en acción
            </p>
            <h3
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Me quiero montar en el tren
            </h3>
            <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-5" />
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              Una obra presentada íntegramente por los niños de CCO Kids. Cada uno eligió su rol,
              ensayó con dedicación y llevó el mensaje de Crio-Yo al escenario: en el tren de Dios
              siempre hay un lugar para ellos.
            </p>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#C9A84C] z-10" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#C9A84C] z-10" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#C9A84C] z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#C9A84C] z-10" />
            <div className="relative w-full shadow-2xl ring-4 ring-[#C9A84C]/20" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/IwyRY4aFN9A"
                title="Me quiero montar en el tren – CCO Kids"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-8 tracking-widest uppercase">
            Obra presentada por los niños de CCO Kids · Centro Cristiano de Oración
          </p>
        </FadeSection>

        {/* What we do — pill stats */}
        <FadeSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-gray-100 pt-12">
            {[
              { value: 'Obras',    label: 'Teatrales' },
              { value: 'Danza',    label: 'y coreografías' },
              { value: 'Música',   label: 'y adoración' },
              { value: 'Valores',  label: 'y Palabra de Dios' },
            ].map(({ value, label }, i) => (
              <div key={i} className="text-center border-t-2 border-[#C9A84C] pt-4">
                <p className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
                <p className="text-gray-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* CTA */}
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/#contacto"
              className="inline-block px-8 py-4 bg-[#C9A84C] text-white text-sm tracking-widest uppercase font-medium hover:bg-[#b8933d] transition-colors duration-300"
            >
              Contactanos
            </Link>
            <a href="tel:+12396912201"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C9A84C] transition-colors duration-300 text-sm tracking-widest font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span><span className="block text-[10px] tracking-widest uppercase text-[#C9A84C] font-bold leading-none mb-0.5">Marlen Gamez</span>(239) 691-2201</span>
            </a>
          </div>
        </FadeSection>

      </main>

      <Footer />
    </div>
  )
}
