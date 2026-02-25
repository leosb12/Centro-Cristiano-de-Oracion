import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star, Heart, Users, Mic2, Sparkles, Shield } from 'lucide-react'
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
          src="/ministerios/niños/banner.jpg"
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

        <FadeSection>
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              CCO Kids en acción
            </p>
            <h3
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Me quiero montar en el tren
            </h3>
            <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Una obra presentada íntegramente por los niños de CCO Kids, basada en la canción
              <span className="font-semibold text-gray-700"> "Me quiero montar en el tren"</span> de Crio-Yo,
              una de las canciones favoritas del ministerio.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Mic2,
                title: 'Ellos eligieron su rol',
                desc: 'Cada niño eligió libremente el personaje que quería interpretar. Desde el maquinista hasta los pasajeros, todos participaron con entusiasmo y compromiso.',
              },
              {
                icon: Sparkles,
                title: 'Creatividad y expresión',
                desc: 'La obra es un trabajo colectivo donde los niños pusieron en juego su creatividad, su voz y su carácter para dar vida a cada escena con alegría.',
              },
              {
                icon: Shield,
                title: 'Valores en cada escena',
                desc: 'A través del juego y la actuación, los niños vivencian valores como el respeto, la cooperación, la fe y el amor al prójimo, sembrando el Reino desde pequeños.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 p-8 hover:border-[#C9A84C] hover:shadow-sm transition-all duration-300"
              >
                <Icon className="text-[#C9A84C] mb-4" size={26} />
                <h4 className="font-bold text-gray-900 mb-2 text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* About the song */}
          <div className="border-l-4 border-[#C9A84C] bg-amber-50/60 px-8 py-6 mb-10">
            <p className="text-xs tracking-widest uppercase text-[#C9A84C] font-semibold mb-2">Sobre la canción</p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">"Me quiero montar en el tren"</span> es una canción del ministerio
              infantil <span className="font-semibold">Crio-Yo</span> que invita a los niños a subirse al tren del
              Señor con fe y alegría. Su mensaje central es que Jesús nos llama, y que querer estar con Él es
              siempre la mejor decisión. En CCO Kids la cantamos, la vivimos y la representamos, porque queremos
              que cada niño entienda que hay un lugar reservado para ellos en el tren de Dios.
            </p>
          </div>

          {/* Video with decorative frame */}
          <div className="relative mb-6">
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#C9A84C] z-10" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#C9A84C] z-10" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#C9A84C] z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#C9A84C] z-10" />
            {/* Video */}
            <div className="relative w-full shadow-2xl ring-4 ring-[#C9A84C]/20 outline outline-1 outline-[#C9A84C]/40" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/IwyRY4aFN9A"
                title="Me quiero montar en el tren – CCO Kids"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-6 tracking-widest uppercase">
            Obra presentada por los niños de CCO Kids · Centro Cristiano de Oración
          </p>
        </FadeSection>

        {/* More works / join us */}
        <FadeSection>
          <div className="bg-gray-50 border border-gray-100 p-10 md:p-14">
            <div className="max-w-3xl mx-auto">
              <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                Esto es solo el comienzo
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Esta es una de las tantas obras que los niños realizan a lo largo del año
              </h3>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  En CCO Kids las obras teatrales, las coreografías y las presentaciones musicales
                  son una parte central de nuestra metodología. No son espectáculos aislados, son el
                  resultado de semanas de trabajo, ensayos, aprendizaje y mucha fe compartida entre
                  los niños y sus maestros.
                </p>
                <p>
                  Cada obra tiene un mensaje bíblico detrás, y cada niño que participa no solo actúa,
                  sino que <span className="font-semibold text-gray-800">internaliza valores, desarrolla confianza en sí mismo y crece en su relación con Dios</span>.
                  Enseñamos que el talento es un regalo que se siembra para el Reino.
                </p>
                <p>
                  Si tenés un hijo, sobrino, vecino o amigo que quiera sumarse,{' '}
                  <span className="font-semibold text-gray-800">siempre hay un lugar para un niño más en CCO Kids</span>.
                  No importa si nunca actuó, cantó o bailó — acá descubrimos los dones juntos.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                {[
                  { value: 'Obras', label: 'Teatrales' },
                  { value: 'Danza', label: 'y coreografías' },
                  { value: 'Música', label: 'y adoración' },
                  { value: 'Valores', label: 'y Palabra de Dios' },
                ].map(({ value, label }, i) => (
                  <div key={i} className="text-center border-t-2 border-[#C9A84C] pt-4">
                    <p className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {value}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
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
