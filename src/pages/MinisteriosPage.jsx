import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
  @keyframes marquee  { from { transform:translateX(0) } to { transform:translateX(-50%) } }
  .mn-marquee { animation: marquee 32s linear infinite; }
  @media(max-width:767px){ .mn-marquee{ animation-duration:14s; } }
`

const ministerios = [
  {
    titulo: 'Adoración',
    subtitulo: 'CCO Worship',
    descripcion: 'Un equipo apasionado que guía a la congregación a la presencia de Dios a través de música y adoración profunda y auténtica. Cada domingo creamos una atmósfera donde cada corazón puede abrirse al Señor.',
    imagen: '/adoracion2.jpg',
    ruta: '/ministerios/adoracion',
    n: '01',
    contactoNombre: 'Jonathan Gil',
    contactoTel: '+12705354510',
    contactoDisplay: '(270) 535-4510',
  },
  {
    titulo: 'Escuela de Niños',
    subtitulo: 'CCO Kids',
    descripcion: 'Enseñando a la próxima generación el amor de Dios a través de historias bíblicas, adoración y actividades creativas llenas de vida. Cada niño es valioso y tiene un destino en Dios.',
    imagen: '/ministerios/Escuela%20de%20ni%C3%B1os.jpg',
    ruta: '/ministerios/escuela-de-ninos',
    n: '02',
    contactoNombre: 'Marlen Gamez',
    contactoTel: '+12396912201',
    contactoDisplay: '(239) 691-2201',
  },
  {
    titulo: 'Hombres con Propósito',
    subtitulo: 'CCO Hombres',
    descripcion: 'Un espacio donde los hombres crecen en fe, carácter y llamado. Forjados para ser pilares en su familia, iglesia y comunidad. Un hombre transformado por el Evangelio transforma todo lo que lo rodea.',
    imagen: '/ministerios/Hombres%20con%20proposito.jpg',
    ruta: '/ministerios/hombres-con-proposito',
    n: '03',
    contactoNombre: 'Hernán Gil',
    contactoTel: '+12705350183',
    contactoDisplay: '(270) 535-0183',
  },
  {
    titulo: 'Mujeres con Propósito',
    subtitulo: 'CCO Mujeres',
    descripcion: 'Empoderando a mujeres de todas las edades a caminar en su identidad, propósito y llamado en Dios con fuerza, gracia y dignidad. Aquí cada mujer encuentra su lugar y su voz.',
    imagen: '/ministerios/Mujeres%20con%20proposito.jpg',
    ruta: '/ministerios/mujeres-con-proposito',
    n: '04',
    contactoNombre: 'Pastora Brenda',
    contactoTel: '+12702025733',
    contactoDisplay: '(270) 202-5733',
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

function GoldLine({ delay = 0, className = '' }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={['overflow-hidden', className].join(' ')}>
      <div style={{ transitionDelay: `${delay}ms`, transitionProperty: 'width', transitionDuration: '800ms', transitionTimingFunction: 'ease-out', width: vis ? '3rem' : '0' }}
        className="h-px bg-[#C9A84C]" />
    </div>
  )
}

function Ticker() {
  const items = ['Adoración', 'Niños', 'Hombres', 'Mujeres', 'Fe', 'Propósito', 'Comunidad', 'Familia', 'Identidad', 'Llamado']
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden bg-[#C9A84C] py-3 select-none">
      <div className="flex whitespace-nowrap mn-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-black text-[11px] tracking-[0.28em] uppercase font-bold">
            {t}<span className="w-[3px] h-[3px] rounded-full bg-black/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MinisteriosPage() {
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
          src="/ministerios/banner.jpg"
          alt="Ministerios CCO"
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
            Nuestros<br /><span className="text-[#C9A84C]">Ministerios</span>
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }}
            className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Adoración · Niños · Hombres · Mujeres
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
          <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">Nuestra familia</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Hay un lugar para cada persona
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-7" />
          <p className="text-gray-500 leading-relaxed text-[15px] max-w-2xl mx-auto">
            El Centro Cristiano de Oración está compuesto por ministerios que atienden cada etapa de la vida. Creemos que cada persona tiene un don, un llamado y un lugar dentro del cuerpo de Cristo.
          </p>
        </R>
      </section>

      {/* MINISTERIOS — alternating split layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-0">
        {ministerios.map((m, i) => {
          const isEven = i % 2 === 0
          return (
            <R key={i} delay={80} className="mb-10 md:mb-0">
              <div className={`grid md:grid-cols-2 gap-0 items-stretch overflow-hidden group`}>

                {/* Image */}
                <div className={`relative min-h-[360px] md:min-h-[480px] overflow-hidden ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                  <img
                    src={m.imagen}
                    alt={m.titulo}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-700" />

                  {/* Number watermark */}
                  <p className="absolute bottom-4 right-6 text-white/[0.07] font-black leading-none select-none"
                    style={{ fontSize: 'clamp(4rem,12vw,8rem)', fontFamily: 'Playfair Display, serif' }}>{m.n}</p>

                  {/* Corner accents on hover */}
                  <div className="absolute inset-4 pointer-events-none">
                    <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                    <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150" />
                    <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                    <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-250" />
                  </div>
                </div>

                {/* Text */}
                <div className={`bg-gray-950 px-10 py-14 md:px-14 md:py-16 flex flex-col justify-center relative overflow-hidden ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                  {/* Decorative vertical line */}
                  <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/35 to-transparent`} />

                  <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-4">{m.subtitulo}</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {m.titulo}
                  </h3>
                  <GoldLine delay={100} className="mb-7" />
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{m.descripcion}</p>

                  {/* Contact */}
                  <a href={`tel:${m.contactoTel}`}
                    className="group/tel inline-flex items-center gap-3 mb-10 self-start border border-white/10 hover:border-[#C9A84C]/60 px-5 py-3 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A84C] flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <div>
                      <p className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase font-bold mb-0.5">{m.contactoNombre}</p>
                      <p className="text-white text-sm font-semibold tracking-wide group-hover/tel:text-[#C9A84C] transition-colors duration-300">{m.contactoDisplay}</p>
                    </div>
                  </a>

                  <Link
                    to={m.ruta}
                    className="group/btn inline-flex items-center gap-4 self-start px-8 py-4 bg-[#C9A84C] text-black text-xs tracking-[0.3em] uppercase font-black hover:bg-white transition-colors duration-300">
                    Conocer más
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

              </div>
            </R>
          )
        })}
      </section>

      {/* CTA */}
      <section className="bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">¿No sabés por dónde empezar?</p></R>
          <R delay={100}>
            <h3 className="text-4xl sm:text-5xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Hablá con nosotros y te ayudamos a encontrar tu lugar
            </h3>
          </R>
          <R delay={220}>
            <Link to="/#contacto"
              className="group inline-flex items-center gap-4 px-10 py-4 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-white transition-colors duration-300">
              Contactanos
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
