import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, Heart, Users, ChevronDown, Star, Wind } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STYLES = `
  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
  @keyframes bounce-y  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  @keyframes marquee   { from { transform:translateX(0) } to { transform:translateX(-50%) } }
  @keyframes pulse-gold { 0%,100%{opacity:.15} 50%{opacity:.45} }
  @keyframes spin-slow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .no-bounce  { animation: bounce-y 2s ease-in-out infinite; }
  .no-marquee { animation: marquee 28s linear infinite; }
  .no-pulse   { animation: pulse-gold 3s ease-in-out infinite; }
  .no-spin    { animation: spin-slow 22s linear infinite; }
  @media(max-width:767px){ .no-marquee{ animation-duration:14s; } }
`

function useReveal(t = 0.13) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setVis(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: t })
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, vis]
}

function R({ children, className = '', delay = 0, dir = 'up' }) {
  const [ref, vis] = useReveal()
  const h = dir === 'left' ? 'opacity-0 -translate-x-7' : dir === 'right' ? 'opacity-0 translate-x-7' : 'opacity-0 translate-y-7'
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={['transition-all duration-700 ease-out', vis ? 'opacity-100 translate-x-0 translate-y-0' : h, className].join(' ')}>
      {children}
    </div>
  )
}

function GoldLine({ delay = 0, className = '' }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={['overflow-hidden', className].join(' ')}>
      <div style={{ transitionDelay: `${delay}ms`, transitionProperty: 'width', transitionDuration: '700ms', width: vis ? '3rem' : '0' }}
        className="h-px bg-[#C9A84C]" />
    </div>
  )
}

const TICKER_WORDS = ['Oración', 'Intercesión', 'Fe', 'Presencia', 'Adoración', 'Martes', 'Clamor', 'Cielo', 'Poder', 'Transformación']

function Ticker() {
  const doubled = [...TICKER_WORDS, ...TICKER_WORDS]
  return (
    <div className="overflow-hidden bg-[#C9A84C] py-3 select-none">
      <div className="no-marquee flex whitespace-nowrap">
        {doubled.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className="text-[#0c0c0c] text-[10px] tracking-[0.45em] uppercase font-black">{w}</span>
            <span className="text-[#0c0c0c]/30 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function NocheOracionPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const heroRef = useRef(null)
  useEffect(() => {
    const fn = () => { if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)` }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{STYLES}</style>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img ref={heroRef}
          src="/oracion/banner.jpg"
          alt="Noche de Oración CCO"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent" />

        {/* Cruz decorativa animada */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 opacity-[0.06] no-spin hidden md:block pointer-events-none select-none" style={{ width: '340px', height: '340px' }}>
          <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
          <div className="absolute inset-8 border border-[#C9A84C]/60 rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-full bg-[#C9A84C]/60" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-full bg-[#C9A84C]/60" />
          </div>
        </div>

        {/* Volver */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <button onClick={() => { window.location.href = '/' }}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer bg-transparent border-0 outline-none">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }}
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            CCO · Martes 7:00 PM
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Noche de<br />Oración
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }} className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Intercesión · Presencia · Transformación</p>
          </div>
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] no-bounce" size={20} />
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Conocé más</p>
          </div>
        </div>
        <p className="absolute bottom-10 right-[-1rem] md:right-4 text-white/[0.03] font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem,18vw,12rem)', fontFamily: 'Playfair Display, serif' }}>CCO</p>
      </div>

      {/* ── TICKER ────────────────────────────────────────────── */}
      <Ticker />

      {/* ── VERSÍCULO OSCURO ──────────────────────────────────── */}
      <div className="bg-[#0c0c0c] py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="no-pulse absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        <p className="absolute -top-6 left-4 text-white/[0.04] font-black select-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">Por qué oramos juntos</p></R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.6rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "La oración eficaz del justo puede mucho."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">Santiago 5:16</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </div>
      </div>

      {/* ── INTRO + DETALLES ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">El corazón de nuestra semana</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Un martes a la noche puede cambiarlo todo
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>La Noche de Oración es uno de los pilares espirituales del Centro Cristiano de Oración. Cada martes a las 7 PM nos reunimos con un solo propósito: buscar el rostro de Dios.</p>
              <p>Intercedemos por las familias, la iglesia, la ciudad y las naciones. Es un tiempo donde el cielo y la tierra se conectan — y las cosas realmente cambian.</p>
              <p>No necesitás saber orar en voz alta ni tener experiencia. Solo vení con el deseo de estar en su presencia.</p>
            </div>
          </R>
          <R dir="right" delay={150}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C9A84C]/15" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[#C9A84C]/30" />
              <div className="relative bg-[#0c0c0c] p-10 md:p-12">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Información</p>
                <div className="space-y-5">
                  {[
                    { label: 'Día',   value: 'Martes' },
                    { label: 'Hora',  value: '7:00 PM – 8:30 PM' },
                    { label: 'Lugar', value: '824 Parkland Way, Bowling Green, KY' },
                    { label: 'Para',  value: 'Todos los que quieran buscar a Dios' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold w-16 flex-shrink-0 pt-[2px]">{label}</p>
                      <p className="text-white text-sm leading-snug">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── INTERCESIÓN — imagen 16:9 izq + texto der ─────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-20 items-center">
            <R dir="left" className="relative">
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 border border-[#C9A84C]/25 hidden md:block" />
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <img src="/oracion/oracion.jpg" alt="Intercesión en la Noche de Oración"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold bg-black/60 px-3 py-1 backdrop-blur-sm">Intercesión</span>
                </div>
              </div>
            </R>
            <R dir="right" delay={150}>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">01 — Oramos por otros</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-5"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                La intercesión mueve la mano de Dios
              </h3>
              <GoldLine delay={200} className="mb-6" />
              <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
                <p>Cada martes llevamos delante de Dios nombres, familias y situaciones concretas. No oramos por fórmulas — oramos con fe, creyendo que Él escucha y responde.</p>
                <p>La intercesión es uno de los actos de amor más profundos que podés hacer por alguien. Cada oración cuenta.</p>
              </div>
              <R delay={350} className="mt-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A84C]/10 flex items-center justify-center">
                  <Heart size={15} className="text-[#C9A84C]" />
                </div>
                <p className="text-gray-400 text-[13px]">Oramos por nombres y situaciones reales</p>
              </R>
            </R>
          </div>
        </div>
      </section>

      {/* ── PILARES ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-12 md:gap-20 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Lo que vas a experimentar</p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Una noche diferente a cualquier otra
            </h3>
            <GoldLine delay={200} className="mb-6" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>Adoración profunda, oración congregacional, intercesión guiada y momentos íntimos con Dios. Todo en un ambiente donde podés ser completamente auténtico.</p>
              <p>Muchos de los milagros más grandes del CCO nacieron en una Noche de Oración. La tuya puede empezar este martes.</p>
            </div>
            <R delay={350} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: 'Auténtica', label: 'Sin religiosidad' },
                { n: 'Poderosa',  label: 'Con resultados reales' },
              ].map(({ n, label }) => (
                <div key={n} className="border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[#C9A84C] font-black text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                  <p className="text-gray-400 text-xs tracking-wide">{label}</p>
                </div>
              ))}
            </R>
          </R>
          <R dir="right" delay={150} className="grid grid-cols-1 gap-0">
            {[
              { n: '01', icon: Flame,  title: 'Adoración',   desc: 'Abrimos con adoración para entrar en la presencia del Señor y preparar el corazón para orar.' },
              { n: '02', icon: Heart,  title: 'Intercesión', desc: 'Oramos por familias, situaciones específicas, la ciudad y las naciones. La intercesión mueve a Dios.' },
              { n: '03', icon: Users,  title: 'Comunidad',   desc: 'Orar juntos nos une como cuerpo. Crecemos en fe al ver cómo Dios responde semana a semana.' },
              { n: '04', icon: Wind,   title: 'Mover del Espíritu', desc: 'Dejamos espacio para lo espontáneo. El Espíritu Santo dirige cada noche de manera única.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 80}
                className="group flex items-start gap-5 border-b border-gray-100 py-5 last:border-0 hover:translate-x-1 transition-all duration-300">
                <div className="w-10 h-10 bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#C9A84C]/40 text-[9px] tracking-widest font-bold">{n}</span>
                    <h4 className="text-gray-900 font-bold text-[0.95rem]" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </R>
            ))}
          </R>
        </div>
      </section>

      {/* ── FULL BLEED — oracion2.jpg ─────────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: '500px' }}>
        <img src="/oracion/oracion2.jpg" alt="Oración y presencia de Dios"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        {/* Cruz de luz */}
        <div className="absolute top-1/2 right-[12%] md:right-[18%] -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none select-none opacity-20">
          <div className="w-px h-28 bg-[#C9A84C]" />
          <div className="w-16 h-px bg-[#C9A84C] -translate-y-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-36 flex flex-col justify-center">
          <R dir="left" className="max-w-xl">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">02 — Lo que sucede cuando oramos</p>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              El cielo y la tierra se unen cuando la iglesia clama
            </h3>
            <GoldLine delay={200} className="mb-6" />
            <p className="text-white/70 text-[15px] leading-relaxed mb-8">
              No es un evento religioso ni una rutina — es un encuentro real con el Dios vivo. Cada martes vemos respuestas, sanidades, restauraciones y el Espíritu Santo actuando de manera tangible.
            </p>
            <R delay={300} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Star size={15} className="text-[#C9A84C]" />
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed">
                "Si se humillare mi pueblo... y oraren, yo oiré desde los cielos y sanaré su tierra." — 2 Crónicas 7:14
              </p>
            </R>
          </R>
        </div>
      </div>

      {/* ── VERSÍCULO BANNER ──────────────────────────────────── */}
      <div className="bg-[#0c0c0c] py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <R>
            <div className="relative w-10 h-10 mx-auto mb-10">
              <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
              <div className="absolute inset-[6px] bg-[#C9A84C] rotate-45" />
            </div>
          </R>
          <R delay={100}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">Mateo 7:7</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#0c0c0c] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Unite a la oración</p></R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Este martes hay un lugar para que ores junto a nosotros.
            </h3>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#C9A84C]/50" />
            <p className="text-white/40 text-xs tracking-widest uppercase">Martes · 7:00 PM · 824 Parkland Way, Bowling Green KY</p>
            <div className="w-8 h-px bg-[#C9A84C]/50" />
          </R>
          <R delay={340}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No importa si nunca oraste en voz alta o no sabés cómo empezar. Acá te enseñamos y te acompañamos.
            </p>
            <Link to="/#contacto"
              className="group inline-flex items-center gap-4 px-12 py-5 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-white transition-colors duration-300">
              Contactanos
              <span className="w-6 h-px bg-black group-hover:w-10 transition-all duration-400 block" />
            </Link>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
