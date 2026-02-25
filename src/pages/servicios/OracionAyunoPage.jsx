import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, Heart, Star, ChevronDown, Wind, Zap } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

/* ── Keyframe styles ─────────────────────────────────── */
const STYLES = `
  @keyframes marquee   { from { transform: translateX(0) }  to { transform: translateX(-50%) } }
  @keyframes fadeUp    { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes fadeLeft  { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes pulse-gold { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }
  @keyframes bounce-y  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
  .anim-marquee   { animation: marquee   30s linear infinite; }
  @media (max-width: 768px) { .anim-marquee { animation-duration: 14s; } }
  .anim-bounce-y  { animation: bounce-y  2s ease-in-out infinite; }
  .anim-pulse-gold { animation: pulse-gold 3s ease-in-out infinite; }
`

/* ── Reveal hook ─────────────────────────────────────── */
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

/* ── Animated reveal wrapper ─────────────────────────── */
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

/* ── Animated gold line ─────────────────────────────── */
function GoldLine({ delay = 0, className = '' }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={['overflow-hidden', className].join(' ')}>
      <div style={{ transitionDelay: `${delay}ms`, transitionProperty: 'width', transitionDuration: '800ms', transitionTimingFunction: 'ease-out', width: vis ? '3rem' : '0' }}
        className="h-px bg-[#C9A84C]" />
    </div>
  )
}

/* ── Gold ticker ─────────────────────────────────────── */
function Ticker() {
  const items = ['Oración', 'Ayuno', 'Intercesión', 'Búsqueda', 'Fe', 'Guerra Espiritual', 'Rendición', 'Milagros', 'Presencia de Dios']
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden bg-[#C9A84C] py-3 select-none">
      <div className="flex whitespace-nowrap anim-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-black text-[11px] tracking-[0.28em] uppercase font-bold">
            {t}<span className="w-[3px] h-[3px] rounded-full bg-black/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function OracionAyunoPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* Parallax hero */
  const heroImgRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{STYLES}</style>
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — banner.jpg 1920×1080
      ══════════════════════════════════════════ */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img
          ref={heroImgRef}
          src="/ministerios/oracion%20y%20ayuno/banner.jpg"
          alt="Oración y Ayuno"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        {/* layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        {/* Back */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </Link>
        </div>

        {/* Diamond decoration */}
        <div className="absolute top-28 right-10 md:right-16 z-10 anim-pulse-gold">
          <div className="relative w-8 h-8 opacity-70">
            <div className="absolute inset-0 border border-[#C9A84C] rotate-45" />
            <div className="absolute inset-[6px] bg-[#C9A84C]/40 rotate-45" />
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }}
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            CCO · Sábado 8:30 AM
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Oración<br /><span className="text-[#C9A84C]">y Ayuno</span>
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }}
            className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Ayuno · Intercesión · Búsqueda · Guerra Espiritual
            </p>
          </div>
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] anim-bounce-y" size={20} />
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Scrolleá</p>
          </div>
        </div>

        {/* Big watermark */}
        <p className="absolute bottom-10 right-[-1rem] md:right-4 text-white/[0.03] font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem,18vw,12rem)', fontFamily: 'Playfair Display, serif' }}>CCO</p>
      </div>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════════════════════
          OPENING VERSE — dark
      ══════════════════════════════════════════ */}
      <div className="bg-[#0c0c0c] py-20 md:py-28 px-6 relative overflow-hidden">
        <p className="absolute -top-6 left-4 md:left-12 text-white/[0.04] font-black select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>
        <R className="max-w-3xl mx-auto text-center relative z-10">
          <R delay={0}>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">Nuestra declaración</p>
          </R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Este género no sale sino<br />por oración y ayuno."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">Mateo 17:21</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* ══════════════════════════════════════════
          INTRO — iglesia.jpg 2048×1536 (landscape photo)
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-20 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Sobre el servicio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              El arma espiritual más poderosa que existe
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>Cada sábado de 8:30 AM a 10:30 AM nos reunimos para ayunar y orar juntos. Es el servicio más espiritual de la semana — un tiempo de rendición, de búsqueda y de guerra espiritual.</p>
              <p>El ayuno no es solo dejar de comer. Es apartar tiempo de todo lo material para poner toda la atención en Dios. Cuando ayunamos juntos, el poder de la oración se multiplica.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: 'Día', value: 'Sábado' },
                { label: 'Hora', value: '8:30 – 10:30 AM' },
                { label: 'Para', value: 'Todo creyente' },
                { label: 'Lugar', value: '824 Parkland Way, Bowling Green, KY' },
              ].map(({ label, value }) => (
                <div key={label} className="border-l-2 border-[#C9A84C]/40 pl-4">
                  <p className="text-[#C9A84C] text-[9px] tracking-widest uppercase font-bold mb-1">{label}</p>
                  <p className="text-gray-900 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </R>

          {/* iglesia.jpg — landscape, shown as stacked frame */}
          <R dir="right" delay={150}>
            <div className="relative group">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C9A84C]/15 rounded-none" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[#C9A84C]/30" />
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src="/ministerios/oracion%20y%20ayuno/iglesia.jpg"
                  alt="Congregación en oración"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
                {/* corner accents */}
                <div className="absolute inset-4 pointer-events-none">
                  <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                  <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150" />
                  <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                  <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-250" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold">Cada sábado</p>
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLARS — 3 cards
      ══════════════════════════════════════════ */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <R className="mb-16">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">¿Qué vas a encontrar?</p>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Lo que pasa cada sábado
            </h3>
          </R>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { n: '01', icon: Flame, title: 'Ayuno',         desc: 'Nos preparamos en oración personal y entramos al servicio habiendo apartado tiempo de lo cotidiano para Dios.' },
              { n: '02', icon: Heart, title: 'Intercesión',   desc: 'Oramos con autoridad espiritual por personas, familias, situaciones y naciones. El ayuno potencia la oración.' },
              { n: '03', icon: Star,  title: 'Manifestación', desc: 'Creemos y esperamos ver a Dios actuar. Testimonios de sanidades, restauración y milagros son parte de este tiempo.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 120} className="group relative border border-gray-200 bg-white p-8 md:p-10 hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-400 cursor-default">
                <p className="absolute top-4 right-5 text-gray-100 font-black text-6xl leading-none select-none group-hover:text-[#C9A84C]/10 transition-colors duration-400"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                <div className="w-11 h-11 bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" size={20} />
                </div>
                <h4 className="text-[1.1rem] font-bold text-gray-900 mb-3 relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PASTOR SPLIT — pastor predicando.jpg 1392×2088 (portrait)
          + pareja escuchando.jpg 1366×1366 (square)
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        {/* top/bottom gold lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50" />

        <div className="grid md:grid-cols-2 gap-0">
          {/* Portrait photo — pastor predicando (tall 1392×2088) */}
          <div className="relative h-[500px] md:h-auto min-h-[560px] overflow-hidden group">
            <img
              src="/ministerios/oracion%20y%20ayuno/pastor%20predicando.jpg"
              alt="Pastor predicando"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
            {/* floating label */}
            <div className="absolute bottom-10 left-8 right-8">
              <p className="text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold mb-2">La Palabra</p>
              <p className="text-white text-lg font-bold leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                Predicación que desafía y transforma
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="px-10 py-16 md:px-14 md:py-20 flex flex-col justify-center relative">
            {/* subtle left border */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent" />

            <R dir="right">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Cómo funciona</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Un servicio diferente<br /><span className="text-[#C9A84C]">a todo lo demás</span>
              </h3>
            </R>
            <GoldLine delay={150} className="mb-8" />
            <R dir="right" delay={100}>
              <ul className="space-y-5 text-gray-300 text-sm leading-relaxed">
                {[
                  { icon: Flame, text: 'Llegamos habiendo orado — el servicio empieza antes de entrar al edificio.' },
                  { icon: Wind, text: 'Worshipeamos, declaramos y entramos en intercesión colectiva por la ciudad y las naciones.' },
                  { icon: Heart, text: 'La Palabra es predicada con unción y autoridad para equipar a cada creyente.' },
                  { icon: Zap, text: 'Terminamos creyendo que lo que pedimos en ayuno será concedido.' },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="text-[#C9A84C]" size={14} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </R>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY PHOTO — pareja escuchando.jpg 1366×1366 (square)
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-0 items-stretch overflow-hidden">

          {/* Text side first on desktop */}
          <div className="bg-gray-950 px-10 py-14 md:px-14 flex flex-col justify-center relative overflow-hidden order-2 md:order-1">
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent" />
            <R dir="left">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Comunidad</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                No se ayuna<br /><span className="text-[#C9A84C]">en soledad</span>
              </h3>
            </R>
            <GoldLine delay={100} className="mb-8" />
            <R dir="left" delay={150}>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Hay algo poderoso en unir el ayuno con la comunidad. Cuando dos o más se ponen de acuerdo, el cielo responde de una manera diferente.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                Este servicio no está reservado para los "espirituales" — es para cualquier persona que quiera profundizar su vida de oración y experimentar a Dios de una forma más real.
              </p>
              <div className="border-l-2 border-[#C9A84C] pl-6">
                <p className="text-white text-base italic leading-relaxed">
                  "Otra vez os digo, que si dos de vosotros se pusieren de acuerdo en la tierra acerca de cualquiera cosa que pidieren, les será hecho."
                </p>
                <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold mt-3">Mateo 18:19</p>
              </div>
            </R>
          </div>

          {/* Square photo — pareja escuchando */}
          <div className="relative group min-h-[420px] overflow-hidden order-1 md:order-2">
            <img
              src="/ministerios/oracion%20y%20ayuno/pareja%20escuchando.jpg"
              alt="Pareja escuchando la Palabra"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-700" />
            {/* corner frame on hover */}
            <div className="absolute inset-4 pointer-events-none">
              <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
              <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150" />
              <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
              <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-250" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold">Juntos en fe</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK VERSE BANNER
      ══════════════════════════════════════════ */}
      <div className="bg-[#0c0c0c] py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

        <R className="max-w-3xl mx-auto text-center relative z-10">
          {/* diamond icon */}
          <div className="relative w-10 h-10 mx-auto mb-10">
            <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
            <div className="absolute inset-[6px] bg-[#C9A84C] rotate-45" />
          </div>
          <R delay={100}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Mas tú, cuando ores, entra en tu aposento, y cerrada la puerta, ora a tu Padre que está en secreto."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">Mateo 6:6</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Te desafiamos</p></R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ¿Querés experimentar el poder del ayuno y la oración en comunidad?
            </h3>
          </R>
          <R delay={240}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No hace falta que hayas ayunado antes. Este sábado podés empezar. Escribinos y te acompañamos.
            </p>
          </R>
          <R delay={360}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/#contacto"
                className="group inline-flex items-center gap-4 px-12 py-5 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-white transition-colors duration-300">
                Contactanos
                <span className="w-6 h-px bg-black group-hover:w-10 transition-all duration-400 block" />
              </Link>
              <a href="tel:+12702024590"
                className="inline-flex items-center gap-2 text-white/60 hover:text-[#C9A84C] transition-colors duration-300 text-sm tracking-widest font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                (270) 202-4590
              </a>
            </div>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
