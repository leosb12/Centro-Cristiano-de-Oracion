import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Heart, ExternalLink, MapPin, Users, Home, Gift, Music,
  Hammer, BookOpen, Cross, Sparkles, ZoomIn, X, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FacebookVideo from '../components/FacebookVideo'

const fotosConstuccion = [
  { src: '/chacolejos/construccion/1.jpg', alt: 'Construcción de la iglesia en Chacolejos' },
  { src: '/chacolejos/construccion/2.jpg', alt: 'Equipo trabajando en la obra' },
  { src: '/chacolejos/construccion/3.jpg', alt: 'Avance de la construcción' },
  { src: '/chacolejos/construccion/4.jpg', alt: 'Comunidad participando en la construcción' },
]

// foto 1 = 16:9 | fotos 3–7,9,10 = cuadradas | foto 8 = 5:4
const fotosRegalos = [
  { src: '/regalos/1.jpg',  alt: 'Entrega de regalos a los niños de Chacolejos' },
  { src: '/regalos/3.jpg',  alt: 'Niños recibiendo regalos en Chacolejos' },
  { src: '/regalos/4.jpg',  alt: 'Momentos especiales durante la entrega' },
  { src: '/regalos/5.jpg',  alt: 'Alegría de los niños con sus regalos' },
  { src: '/regalos/6.jpg',  alt: 'Equipo de misiones con los niños' },
  { src: '/regalos/7.jpg',  alt: 'Niños felices en Chacolejos' },
  { src: '/regalos/8.jpg',  alt: 'La iglesia llena de alegría' },
  { src: '/regalos/9.jpg',  alt: 'Cada niño es especial para Dios' },
  { src: '/regalos/10.jpg', alt: 'Amor compartido en la misión' },
]

const stats = [
  { icon: Users, value: '30+', label: 'Niños bendecidos' },
  { icon: Home,  value: '1',   label: 'Iglesia construida' },
  { icon: Heart, value: '2024',label: 'Año de la misión' },
  { icon: MapPin,value: 'Chacolejos', label: 'Comunidad impactada' },
]

function FadeSection({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // fallback: si no soporta IntersectionObserver, mostramos igual
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
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
        className
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function PhotoGrid({ photos, count = 4 }) {
  const [lightbox, setLightbox] = useState(null)

  if (photos.length === 0) {
    return (
      <div className="space-y-3">
        <div className="w-full aspect-[3/2] bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-300 border border-dashed border-gray-200">
          <BookOpen size={28} />
          <span className="text-xs opacity-60">Foto principal</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(count - 1)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-300 border border-dashed border-gray-200">
              <BookOpen size={18} />
              <span className="text-xs opacity-60">{i + 2}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/92 flex flex-col items-center justify-center p-4 gap-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 z-10 bg-[#0a0a0f] border border-white/20 text-white/80 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all rounded-full p-1.5 shadow-xl"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[82vh] max-w-[92vw] object-contain shadow-2xl rounded-sm"
            />
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === lightbox ? 'bg-[#C9A84C] w-6' : 'bg-white/40 w-2 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {/* Foto 1: formato 3:2 ancho completo */}
        <div
          className="w-full aspect-[3/2] overflow-hidden bg-gray-100 relative group cursor-pointer"
          onClick={() => setLightbox(0)}
        >
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
            <div className="bg-[#C9A84C] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              <ZoomIn size={20} className="text-[#0a0a0f]" />
            </div>
          </div>
        </div>

        {/* Fotos 2-4: cuadradas */}
        {photos.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {photos.slice(1).map((p, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden bg-gray-100 relative group cursor-pointer"
                onClick={() => setLightbox(i + 1)}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-[#C9A84C] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={14} className="text-[#0a0a0f]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function RegalosGallery({ photos }) {
  const [lightbox, setLightbox] = useState(null)

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-200">
        <Gift size={40} className="mb-4 opacity-30" />
        <p className="text-sm opacity-50">Las fotos aparecerán aquí</p>
      </div>
    )
  }

  const Card = ({ p, idx, aspectClass = 'aspect-square' }) => (
    <div
      className={`${aspectClass} overflow-hidden relative group cursor-pointer bg-gray-100`}
      onClick={() => setLightbox(idx)}
    >
      <img
        src={p.src}
        alt={p.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <div className="bg-[#C9A84C] rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
          <ZoomIn size={16} className="text-[#0a0a0f]" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/92 flex flex-col items-center justify-center p-4 gap-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 z-10 bg-[#0a0a0f] border border-white/20 text-white/80 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all rounded-full p-1.5 shadow-xl"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[82vh] max-w-[92vw] object-contain shadow-2xl rounded-sm"
            />
          </div>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === lightbox ? 'bg-[#C9A84C] w-6' : 'bg-white/40 w-2 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Foto 1: Hero 16:9 full-width */}
        <div
          className="relative w-full aspect-[16/9] overflow-hidden group cursor-pointer"
          onClick={() => setLightbox(0)}
        >
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/65 via-[#0a0a0f]/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
            <div className="bg-[#C9A84C] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl">
              <ZoomIn size={22} className="text-[#0a0a0f]" />
            </div>
          </div>
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <Heart size={13} className="text-[#C9A84C] shrink-0" />
              <span
                className="text-white/90 text-xs tracking-[0.2em] uppercase font-semibold"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
              >
                Entrega de regalos · Chacolejos
              </span>
            </div>
            <Gift size={16} className="text-[#C9A84C] opacity-70" />
          </div>
        </div>

        {/* Fotos 2–5 */}
        {photos.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.slice(1, 5).map((p, i) => (
              <Card key={i} p={p} idx={i + 1} aspectClass="aspect-square" />
            ))}
          </div>
        )}

        {/* Fotos 6–9 (foto índice 6 = 5:4) */}
        {photos.length > 5 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.slice(5).map((p, i) => {
              const realIdx = i + 5
              return (
                <Card
                  key={i}
                  p={p}
                  idx={realIdx}
                  aspectClass={realIdx === 6 ? 'aspect-[5/4]' : 'aspect-square'}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

function CrossDivider({ dark = false }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className={`flex-1 h-px ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
      <div className="flex items-center gap-2">
        <Star size={6} className="text-[#C9A84C] fill-[#C9A84C]" />
        <Cross size={14} className="text-[#C9A84C]" />
        <Star size={6} className="text-[#C9A84C] fill-[#C9A84C]" />
      </div>
      <div className={`flex-1 h-px ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
    </div>
  )
}

export default function MisionesPage() {
  useEffect(() => {
    // ✅ behavior "instant" no existe. Usar "auto" o "smooth"
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden w-full bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative text-white pt-36 pb-28 overflow-hidden min-h-[70vh] flex items-end">
        <img
          src="/chacolejos/banner.jpg"
          alt="Misión en Chacolejos"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a0a0f]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/80" />

        <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10 w-full pb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-10 hover:opacity-75 transition-opacity">
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-medium mb-3" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
            Impacto Internacional
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-none" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 3px 14px rgba(0,0,0,1)' }}>
            Misión en<br />
            <span className="text-[#C9A84C]">Chacolejos</span>
          </h1>
          <p className="text-gray-100 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ textShadow: '0 1px 10px rgba(0,0,0,1)' }}>
            Con fe, trabajo y amor, construimos una iglesia para las niñas y niños de la comunidad de Chacolejos.
            Una obra que Dios puso en nuestros corazones y que hoy transforma vidas.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#C9A84C] py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#0a0a0f]">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon size={20} className="mb-2 opacity-60" />
              <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</span>
              <span className="text-xs tracking-widest uppercase font-medium mt-1 opacity-70">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO EMPEZÓ TODO */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <div className="flex items-center gap-3 mb-4">
              <Hammer size={18} className="text-[#C9A84C]" />
              <p className="text-xs tracking-widest uppercase font-medium text-gray-500">Cómo empezó todo</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Un sueño que nació en oración
            </h2>
            <CrossDivider />
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-14 items-start mt-10">
            <FadeSection>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Todo comenzó con una palabra de parte de Dios y un corazón dispuesto a obedecer.
                  El pastor y un pequeño equipo de nuestra iglesia en Bowling Green, KY, sintieron
                  el llamado de llevar el evangelio a la comunidad de Chacolejos, un lugar humilde
                  donde los niños necesitaban más que solo un mensaje: necesitaban un hogar espiritual.
                </p>
                <p>
                  Se reunieron fondos, se juntaron materiales y, sobre todo, se elevaron muchas oraciones.
                  Con herramientas en mano y fe en el corazón, el equipo viajó hasta Chacolejos
                  dispuesto a hacer lo que fuera necesario para que esa iglesia se levantara.
                </p>
                <p>
                  Los días fueron largos y el trabajo fue duro, pero cada bloque que se ponía era
                  una promesa cumplida. La comunidad local se unió al trabajo, y juntos
                  levantaron desde cero una iglesia para las niñas y niños de Chacolejos.
                </p>
              </div>

              <blockquote className="border-l-4 border-[#C9A84C] pl-6 py-2 mt-8">
                <p className="text-lg text-gray-700 italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                  "Por tanto, id, y haced discípulos a todas las naciones..."
                </p>
                <cite className="block text-xs text-[#C9A84C] tracking-widest uppercase mt-3 not-italic font-semibold">
                  — Mateo 28:19
                </cite>
              </blockquote>
            </FadeSection>

            <FadeSection>
              <PhotoGrid photos={fotosConstuccion} count={6} />
              <p className="text-xs text-gray-300 mt-4 text-center">
                Fotos de la construcción: <code className="bg-gray-50 px-1 rounded text-gray-400">public/chacolejos/construccion/</code>
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* LO QUE SE LOGRO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Hammer, num: '01', title: 'Del terreno a la iglesia', desc: 'Construimos el edificio desde cero: cimientos, paredes, techo y puertas. Un espacio digno para que los niños encuentren a Dios.' },
                { icon: BookOpen, num: '02', title: 'Equipados para adorar', desc: 'Instalamos sillas, biblias, materiales de enseñanza y todo lo necesario para que los cultos semanales fueran posibles.' },
                { icon: Users, num: '03', title: 'Una comunidad plantada', desc: 'Capacitamos a líderes locales para continuar la obra. La iglesia hoy funciona cada semana con más de 30 niños.' },
              ].map(({ icon: Icon, num, title, desc }) => (
                <div key={num} className="bg-white p-8 border-t-2 border-[#C9A84C] hover:shadow-lg hover:shadow-[#C9A84C]/10 transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[#C9A84C]" />
                    </div>
                    <span className="text-2xl font-bold text-[#C9A84C]/30" style={{ fontFamily: 'Playfair Display, serif' }}>{num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ENTREGA DE REGALOS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <div className="flex items-center gap-3 mb-4">
              <Gift size={18} className="text-[#C9A84C]" />
              <p className="text-xs tracking-widest uppercase font-medium text-gray-500">Entrega de regalos</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Amor en cada regalo
            </h2>
            <CrossDivider />
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-12">
              Porque cada niño merece sentirse especial y amado.
              El equipo de la misión preparó regalos para los niños de Chacolejos, no solo cosas materiales
              sino el regalo más grande: saber que son vistos, conocidos y amados por Dios y por su iglesia.
            </p>
          </FadeSection>

          <FadeSection>
            <RegalosGallery photos={fotosRegalos} />
          </FadeSection>

          <FadeSection className="mt-12">
            <blockquote className="bg-[#0a0a0f] text-white p-10 text-center">
              <p className="text-xl md:text-2xl italic leading-relaxed mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Dejad a los niños venir a mí, y no se lo impidáis;<br />
                porque de los tales es el reino de Dios."
              </p>
              <cite className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold not-italic">
                Mateo 19:14
              </cite>
            </blockquote>
          </FadeSection>
        </div>
      </section>

      {/* ALABANZA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <div className="flex items-center gap-3 mb-4">
              <Music size={18} className="text-[#C9A84C]" />
              <p className="text-xs tracking-widest uppercase font-medium text-gray-500">Alabanza</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nuestros niños alaban a Dios
            </h2>
            <CrossDivider />
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-12">
              Hay pocas cosas más hermosas que escuchar las voces de los niños elevarse en alabanza.
              Este es uno de los momentos más especiales de nuestra misión en Chacolejos,
              los niños cantando con todo el corazón para glorificar a Dios.
            </p>
          </FadeSection>

          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <FacebookVideo
                href="https://www.facebook.com/reel/3640897462861251"
                title="Alabanza de los niños de Chacolejos"
              />

              <div className="space-y-5">
                <p className="text-gray-600 leading-relaxed">
                  Los niños de Chacolejos son la razón de esta misión. Verlos cantar con alegría,
                  levantar sus manos y adorar a Dios con la inocencia que solo un niño puede tener
                  es el recordatorio más poderoso de por qué vale la pena servirle.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Cada semana, esta iglesia abre sus puertas y esas mismas voces vuelven a llenar
                  el espacio que construimos juntos. La obra continúa, y Dios es fiel.
                </p>
                <div className="flex items-start gap-3 pt-2">
                  <Heart size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#C9A84C] font-medium italic">
                    "De la boca de los niños... perfeccionaste la alabanza" — Mateo 21:16
                  </p>
                </div>
                <a
                  href="https://www.facebook.com/profile.php?id=100066496965035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  <ExternalLink size={13} />
                  Ver más en Facebook
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* INAUGURACIÓN */}
      <section className="py-24 bg-[#0a0a0f] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={18} className="text-[#C9A84C]" />
              <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">Inauguración</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              El día que la iglesia<br />
              <span className="text-[#C9A84C]">abrió sus puertas</span>
            </h2>

            <div className="flex items-center gap-4 py-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Star size={6} className="text-[#C9A84C] fill-[#C9A84C]" />
                <Cross size={14} className="text-[#C9A84C]" />
                <Star size={6} className="text-[#C9A84C] fill-[#C9A84C]" />
              </div>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-12">
              Después de tanto trabajo, oración y fe, llegó el momento más esperado:
              la inauguración de la iglesia en Chacolejos, Bolivia.
              Un día histórico lleno de alegría, lágrimas y gratitud a Dios.
            </p>
          </FadeSection>

          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <FacebookVideo
                href="https://www.facebook.com/reel/985058709296939"
                title="Inauguración de la iglesia en Chacolejos Bolivia"
              />

              <div className="space-y-5">
                <p className="text-gray-300 leading-relaxed">
                  Después de semanas de trabajo duro, el equipo misionero y la comunidad de Chacolejos
                  se reunieron para celebrar juntos lo que Dios había hecho. Las puertas se abrieron
                  por primera vez y los niños entraron a su nuevo hogar espiritual.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Fue un momento de adoración, de gratitud y de promesa. La obra que comenzó
                  con una visión y una oración, ahora es una realidad que impacta vidas cada semana.
                </p>
                <div className="flex items-start gap-3 pt-2">
                  <Heart size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#C9A84C] font-medium italic">
                    "Si el Señor no edifica la casa, en vano trabajan los que la edifican" — Sal 127:1
                  </p>
                </div>
                <a
                  href="https://www.facebook.com/reel/985058709296939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  <ExternalLink size={13} />
                  Ver en Facebook
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FACEBOOK CTA */}
      <section className="py-20 bg-[#0a0a0f] text-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="flex justify-center mb-5">
            <Cross size={28} className="text-[#C9A84C] opacity-60" />
          </div>
          <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-4">Síguenos</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            Toda la misión en Facebook
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Fotos, videos y testimonios de todo lo que Dios hizo en Chacolejos.
            Cada imagen cuenta una historia de fe, esperanza y amor.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=100066496965035"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] text-[#0a0a0f] px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-xl hover:shadow-[#C9A84C]/30"
          >
            <ExternalLink size={16} />
            Ver página de la misión
          </a>
        </div>
      </section>

      {/* UNETE CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles size={18} className="text-[#C9A84C] opacity-70" />
            <Cross size={22} className="text-[#C9A84C] opacity-60" />
            <Sparkles size={18} className="text-[#C9A84C] opacity-70" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            ¿Sientes el llamado de servir?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Dios siempre está preparando la siguiente gran obra.
            Si hay algo en tu corazón que dice "quiero ir", escríbenos.
            Nos encantaría que formaras parte de nuestro equipo misionero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contacto"
              className="bg-[#C9A84C] text-[#0a0a0f] px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A]"
            >
              Contáctanos
            </Link>
            <Link
              to="/"
              className="border border-gray-300 text-gray-700 px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}