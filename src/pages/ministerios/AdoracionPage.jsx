import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Music, Heart, Users, Play } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const localThumbs = {
  YxrQjn0DVXU: '/ministerios/adoracion/Inexplicable.png',
  '3gCl348oy4o': '/ministerios/adoracion/Esta Cayendo.png',
  '2ed1pMI2BLQ': '/ministerios/adoracion/Mi pasion.png',
}

function ClickToPlay({ id, title, tagline }) {
  const [active, setActive] = useState(false)
  const thumb = localThumbs[id] || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[9/16] overflow-hidden group cursor-pointer" onClick={() => setActive(true)}>
        {active ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <>
            <img src={thumb} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                <Play size={26} className="text-white fill-white ml-1" />
              </div>
            </div>
            {/* title overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</p>
            </div>
          </>
        )}
      </div>
      {/* tagline below card */}
      <p className="text-gray-400 text-sm leading-relaxed text-center px-2">{tagline}</p>
    </div>
  )
}

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

export default function AdoracionPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/ministerios/adoracion/bannera.jpg"
          alt="Ministerio de Adoración"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

        {/* Back link */}
        <div className="absolute top-28 left-6 md:left-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-14">
          <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            CCO Worship
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Adoración
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-20">

        {/* Intro */}
        <FadeSection>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Llevar a la iglesia a la presencia de Dios
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-6" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                El ministerio de Adoración del Centro Cristiano de Oración es mucho más que música —
                es un equipo de hombres y mujeres apasionados por ver a la congregación encontrarse
                genuinamente con Dios cada semana.
              </p>
              <p>
                Creemos que la adoración es el idioma del cielo, y nuestro llamado es crear una
                atmósfera donde cada corazón pueda abrirse al Señor con libertad y autenticidad.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* Stats */}
        <FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Music,  value: 'Cada domingo', label: 'Elevamos la adoración' },
              { icon: Heart,  value: 'Pasión',        label: 'Por la presencia de Dios' },
              { icon: Users,  value: 'Equipo',        label: 'Comprometido y ungido' },
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

        {/* Torre Fuerte */}
        <FadeSection>
          <div className="relative bg-gray-950 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Text side */}
              <div className="px-10 py-16 md:px-16 md:py-20 flex flex-col justify-center">
                <h3
                  className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Torre Fuerte
                </h3>
                <div className="w-12 h-px bg-[#C9A84C] mb-8" />

                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  Una canción que nació de una convicción profunda: el nombre de Dios es
                  el lugar más seguro al que podemos correr.
                </p>

                <div className="border-l-2 border-[#C9A84C] pl-6 mb-8">
                  <p className="text-white text-lg italic leading-relaxed">
                    "Torre fuerte es el nombre de Jehová;<br />
                    a él corre el justo y está seguro."
                  </p>
                  <p className="text-[#C9A84C] text-sm mt-3 tracking-widest uppercase">
                    Proverbios 18:10
                  </p>
                </div>

                <p className="text-gray-400 text-base leading-relaxed">
                  Cuando la cantamos, no es solo música — es una declaración. Que Él nos sostiene,
                  que no estamos solos, que hay victoria en su nombre.
                </p>
              </div>

              {/* Video side — vertical 9:16 */}
              <div className="flex items-center justify-center py-12 md:py-16 px-8 md:px-12 bg-black/30">
                <div className="w-full max-w-[280px] aspect-[9/16] relative shadow-2xl shadow-black/60 ring-1 ring-[#C9A84C]/30">
                  <iframe
                    src="https://www.youtube.com/embed/fCNnWyCI2kk?rel=0&modestbranding=1"
                    title="Torre Fuerte — CCO Worship"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Más canciones */}
        <FadeSection>
          <div className="relative bg-gray-950 px-10 py-16 md:px-16 md:py-20 overflow-hidden">
            {/* fondo decorativo */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-40" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-40" />

            {/* header */}
            <div className="mb-12 relative z-10">
              <h3
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                La adoración<br />
                <span className="text-[#C9A84C]">que vivimos</span>
              </h3>
              <p className="text-gray-400 mt-4 max-w-md text-sm leading-relaxed">
                Cada canción es una historia. Tocá play y dejate llevar.
              </p>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              <ClickToPlay
                id="YxrQjn0DVXU"
                title="Inexplicable"
                tagline="Hay cosas del amor de Dios que ninguna palabra alcanza a describir."
              />
              <ClickToPlay
                id="3gCl348oy4o"
                title="Está Cayendo"
                tagline="Cuando su presencia llega, todo lo demás sobra."
              />
              <ClickToPlay
                id="2ed1pMI2BLQ"
                title="Mi Pasión"
                tagline="Una declaración de todo corazón: Él es lo que más queremos."
              />
            </div>
          </div>
        </FadeSection>

        {/* Qué hacemos */}
        <FadeSection>
          <div className="grid md:grid-cols-2 gap-0 items-stretch overflow-hidden">

            {/* Foto con marco interactivo */}
            <div className="relative group min-h-[420px] overflow-hidden">
              <img
                src="/ministerios/adoracion/cantando2.jpg"
                alt="Equipo de adoración"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* overlay base */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

              {/* marco dorado animado */}
              <div className="absolute inset-4 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/70 transition-all duration-700" />
              <div className="absolute inset-4">
                {/* esquinas */}
                <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150" />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-250" />
              </div>

              {/* caption flotante */}
              <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">Cada domingo</p>
              </div>
            </div>

            {/* Texto */}
            <div className="bg-gray-950 px-10 py-14 md:px-14 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent" />

              <h3
                className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Lo que hacemos<br />
                <span className="text-[#C9A84C]">cada semana</span>
              </h3>
              <div className="w-10 h-px bg-[#C9A84C] mb-8" />

              <ul className="space-y-5 text-gray-300 text-sm leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-[#C9A84C] text-lg leading-none mt-0.5">✦</span>
                  <span>Nos reunimos a ensayar y orar juntos antes de cada servicio.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#C9A84C] text-lg leading-none mt-0.5">✦</span>
                  <span>Preparamos una atmósfera donde la congregación pueda encontrarse con Dios de verdad.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#C9A84C] text-lg leading-none mt-0.5">✦</span>
                  <span>Cultivamos la excelencia sin perder la devoción: lo que ofrecemos al Señor vale la pena hacerlo bien.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#C9A84C] text-lg leading-none mt-0.5">✦</span>
                  <span>Si sentís el llamado — como músico, cantante o en sonido — hay un lugar para vos en este equipo.</span>
                </li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* CTA */}
        <FadeSection className="text-center">
          <h3
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¿Querés ser parte?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Hablá con nosotros para conocer cómo unirte al equipo de adoración.
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
