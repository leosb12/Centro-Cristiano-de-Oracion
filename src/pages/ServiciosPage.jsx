import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, BookOpen, Flame, ArrowRight, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
  @keyframes marquee  { from { transform:translateX(0) } to { transform:translateX(-50%) } }
  @keyframes bounce-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  .sv-marquee { animation: marquee 32s linear infinite; }
  .sv-bounce  { animation: bounce-y 2s ease-in-out infinite; }
  @media(max-width:767px){ .sv-marquee{ animation-duration:14s; } }
`

const servicios = [
  {
    dia: 'Domingo',
    titulo: 'Servicio Principal',
    horario: '11:30 AM',
    rango: '11:30 AM – 1:30 PM',
    descripcion: 'Nuestro culto principal de adoración y predicación de la Palabra. Un tiempo donde toda la familia se reúne para encontrarse con Dios, crecer en fe y ser equipados para la semana.',
    imagen: '/domingo/banner.jpg',
    icon: Calendar,
    ruta: '/servicios/servicio-principal',
    highlight: true,
    tag: 'Servicio Principal',
  },
  {
    dia: 'Martes',
    titulo: 'Noche de Oración',
    horario: '7:00 PM',
    rango: '7:00 PM – 8:30 PM',
    descripcion: 'Un tiempo especial de oración intercesora donde nos unimos ante la presencia de Dios. Oramos por la iglesia, la ciudad y las naciones con fe y autoridad espiritual.',
    imagen: '/domingo/rezo.jpg',
    icon: Clock,
    ruta: '/servicios/noche-de-oracion',
    highlight: false,
    tag: 'Oración',
  },
  {
    dia: 'Jueves',
    titulo: 'Estudio Bíblico',
    horario: '7:00 PM',
    rango: '7:00 PM – 8:30 PM',
    descripcion: 'Profundizamos juntos en la Palabra de Dios. Cada semana exploramos las Escrituras en profundidad para crecer en fe, conocimiento y propósito. Toda persona es bienvenida.',
    imagen: '/domingo/predicacion.jpg',
    icon: BookOpen,
    ruta: '/servicios/estudio-biblico',
    highlight: false,
    tag: 'Palabra',
  },
  {
    dia: 'Sábado',
    titulo: 'Oración y Ayuno',
    horario: '8:30 AM',
    rango: '8:30 AM – 10:30 AM',
    descripcion: 'Un tiempo poderoso de ayuno e intercesión colectiva. El servicio más espiritual de la semana — un momento de rendición total y búsqueda del rostro de Dios en comunidad.',
    imagen: '/ministerios/oracion%20y%20ayuno/banner.jpg',
    icon: Flame,
    ruta: '/servicios/oracion-y-ayuno',
    highlight: false,
    tag: 'Ayuno',
  },
]

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setVis(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, vis]
}

function R({ children, className = '', delay = 0, dir = 'up' }) {
  const [ref, vis] = useReveal()
  const hidden = dir === 'left' ? 'opacity-0 -translate-x-7' : dir === 'right' ? 'opacity-0 translate-x-7' : 'opacity-0 translate-y-7'
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={['transition-all duration-700 ease-out', vis ? 'opacity-100 translate-x-0 translate-y-0' : hidden, className].join(' ')}>
      {children}
    </div>
  )
}

function Ticker() {
  const items = ['Domingo', 'Martes', 'Jueves', 'Sábado', 'Adoración', 'Oración', 'Palabra', 'Ayuno', 'Fe', 'Comunidad']
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden bg-[#C9A84C] py-3 select-none">
      <div className="flex whitespace-nowrap sv-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-black text-[11px] tracking-[0.28em] uppercase font-bold">
            {t}<span className="w-[3px] h-[3px] rounded-full bg-black/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServiciosPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const heroRef = useRef(null)
  useEffect(() => {
    const fn = () => { if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)` }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{STYLES}</style>
      <Navbar />

      {/* HERO */}
      <div className="relative h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden">
        <img
          ref={heroRef}
          src="/domingo/banner.jpg"
          alt="Servicios CCO"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        <div className="absolute top-28 left-6 md:left-12 z-20">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </Link>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }}
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            Centro Cristiano de Oración
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Nuestros<br /><span className="text-[#C9A84C]">Servicios</span>
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }}
            className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Domingo · Martes · Jueves · Sábado
            </p>
          </div>
        </div>

        <p className="absolute bottom-10 right-[-1rem] md:right-4 text-white/[0.03] font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem,18vw,12rem)', fontFamily: 'Playfair Display, serif' }}>CCO</p>
      </div>

      <Ticker />

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <R>
          <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">Únete a nosotros</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Cada servicio es una puerta a Su presencia
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-7" />
          <p className="text-gray-500 leading-relaxed text-[15px] max-w-2xl mx-auto">
            En el Centro Cristiano de Oración tenemos servicios durante toda la semana. Sin importar tu momento espiritual, siempre hay un espacio donde podés encontrarte con Dios y crecer junto a nuestra familia.
          </p>
        </R>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-[#0c0c0c] py-20 md:py-28 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-0">
            {servicios.map((s, i) => {
              const Icon = s.icon
              return (
                <R key={i} delay={i * 100}>
                  <Link
                    to={s.ruta}
                    className="group relative flex flex-col overflow-hidden border border-white/8 hover:border-[#C9A84C]/60 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={s.imagen}
                        alt={s.titulo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                      {/* Day badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] tracking-[0.3em] uppercase font-bold px-3 py-1 ${s.highlight ? 'bg-[#C9A84C] text-black' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}`}>
                          {s.dia}
                        </span>
                      </div>
                      {/* Time overlay */}
                      <div className="absolute bottom-4 left-4">
                        <p className="text-[#C9A84C] text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{s.horario}</p>
                        <p className="text-white/50 text-[11px] tracking-wider">{s.rango}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-7 bg-[#111118] group-hover:bg-[#141420] transition-colors duration-500 relative">
                      <div className="absolute top-0 left-0 h-[2px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors duration-300 flex-shrink-0">
                          <Icon className="text-[#C9A84C] group-hover:text-black transition-colors duration-300" size={16} />
                        </div>
                        <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold">{s.tag}</p>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {s.titulo}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{s.descripcion}</p>

                      <div className="flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-bold">
                        Ver servicio
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </R>
              )
            })}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-gray-50 py-20 md:py-24 px-6">
        <R className="max-w-2xl mx-auto text-center">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-4">Dónde encontrarnos</p>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Siempre hay un lugar para vos
          </h3>
          <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-8" />
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 px-6 py-4 shadow-sm mb-10">
            <MapPin className="text-[#C9A84C] flex-shrink-0" size={18} />
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-gray-900">824 Parkland Way</span>
              {' · '}Bowling Green, KY
            </p>
          </div>
          <br />
          <Link to="/#contacto"
            className="group inline-flex items-center gap-4 px-10 py-4 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-gray-900 hover:text-white transition-colors duration-300">
            Contactanos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </R>
      </section>

      <Footer />
    </div>
  )
}
