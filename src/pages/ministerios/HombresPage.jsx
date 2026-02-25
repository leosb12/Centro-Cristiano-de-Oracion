import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, BookOpen, HeartHandshake, Target, Users, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

/* ── Keyframe styles ─────────────────────────────────── */
const STYLES = `
  @keyframes marquee   { from { transform: translateX(0) }  to { transform: translateX(-50%) } }
  @keyframes fadeUp    { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes fadeLeft  { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes fadeRight { from { opacity: 0; transform: translateX(28px) }  to { opacity: 1; transform: translateX(0) } }
  @keyframes growW     { from { width: 0 }  to { width: 100% } }
  @keyframes bounce-y  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
  .anim-marquee   { animation: marquee   28s linear infinite; }
  .anim-bounce-y  { animation: bounce-y  2s ease-in-out infinite; }
`

/* ── Reveal hook ─────────────────────────────────────── */
function useReveal(threshold = 0.13) {
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
      <div style={{ transitionDelay: `${delay}ms`, transitionProperty: 'width', transitionDuration: '700ms', transitionTimingFunction: 'ease-out', width: vis ? '3rem' : '0' }}
        className="h-px bg-[#C9A84C]" />
    </div>
  )
}

/* ── Gold marquee ticker ─────────────────────────────── */
function Ticker() {
  const items = ['Oración', 'Adoración', 'Confraternización', 'Propósito', 'Palabra', 'Fe', 'Carácter', 'Legado', 'Hombres con Propósito']
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

export default function HombresPage() {
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
          HERO — parallax + animated text
      ══════════════════════════════════════════ */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img
          ref={heroImgRef}
          src="/ministerios/banner.jpg"
          alt="Hombres con Propósito"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        {/* layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Back */}
        <div className="absolute top-28 left-6 md:left-12 z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </Link>
        </div>

        {/* Hero text — staggered */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }}
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            CCO · Ministerio de Hombres
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Hombres<br />con Propósito
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }}
            className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Oración · Adoración · Confraternización
            </p>
          </div>
          {/* scroll cue */}
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] anim-bounce-y" size={20} />
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Scrolleá</p>
          </div>
        </div>

        {/* Big watermark text */}
        <p className="absolute bottom-10 right-[-1rem] md:right-4 text-white/[0.03] font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem,18vw,12rem)', fontFamily: 'Playfair Display, serif' }}>
          CCO
        </p>
      </div>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════════════════════
          OPENING VERSE — dark
      ══════════════════════════════════════════ */}
      <div className="bg-[#0c0c0c] py-20 md:py-28 px-6 relative overflow-hidden">
        {/* decorative large quote */}
        <p className="absolute -top-6 left-4 md:left-12 text-white/[0.04] font-black select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>

        <R className="max-w-3xl mx-auto text-center relative z-10">
          <R delay={0}>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">
              Nuestra declaración
            </p>
          </R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.6rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Esfuérzate y sé valiente; no temas ni te acobardes, porque el Señor tu Dios estará contigo dondequiera que vayas."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">Josué 1:9</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* ══════════════════════════════════════════
          INTRO — asymmetric split
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Quiénes somos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Un espacio donde los hombres se forjan en fe
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>Hombres con Propósito es el ministerio masculino del Centro Cristiano de Oración.
                Un lugar donde no se juzga el pasado, sino que se construye el futuro —
                con la Biblia como brújula y la oración como combustible.</p>
              <p>Creemos que un hombre transformado por el Evangelio transforma todo lo que lo rodea:
                su familia, su trabajo, su iglesia y su generación.</p>
            </div>
          </R>
          <R dir="right" delay={150}>
            {/* Card with layered offset frame */}
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C9A84C]/15" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[#C9A84C]/30" />
              <div className="relative bg-[#0c0c0c] p-10 md:p-12">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Nuestra convicción</p>
                <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  El hombre que ora mueve montañas.<br className="hidden md:block" /> El que adora atrae la presencia de Dios.<br className="hidden md:block" /> El que confraterniza nunca camina solo.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-[#C9A84C]" />
                  <p className="text-[#C9A84C]/60 text-[10px] tracking-widest uppercase">CCO Hombres</p>
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLARS — tall numbered cards
      ══════════════════════════════════════════ */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <R className="mb-16">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Los cuatro pilares</p>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: 'Playfair Display, serif' }}>Sobre qué nos paramos</h3>
          </R>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { n: '01', icon: Flame,          title: 'Oración',          desc: 'La base de todo. Nos arrodillamos juntos y buscamos el rostro de Dios sin parar.' },
              { n: '02', icon: BookOpen,        title: 'Palabra',          desc: 'Estudiamos las Escrituras con profundidad para conocer al Dios que servimos.' },
              { n: '03', icon: HeartHandshake,  title: 'Confraternización',desc: 'Vínculos reales, sin máscaras. Hermanos que se miran a los ojos y se sostienen.' },
              { n: '04', icon: Target,          title: 'Propósito',        desc: 'Vivir con misión clara: servir a Dios en el hogar, la iglesia y el mundo.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 100} className="group relative border border-gray-200 bg-white p-8 md:p-10 hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-400 cursor-default">
                {/* Big number watermark */}
                <p className="absolute top-4 right-5 text-gray-100 font-black text-6xl leading-none select-none group-hover:text-[#C9A84C]/10 transition-colors duration-400"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                <div className="w-11 h-11 bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" size={20} />
                </div>
                <h4 className="text-[1.1rem] font-bold text-gray-900 mb-3 relative z-10"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
                {/* bottom gold accent on hover */}
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONFRATERNIZACIÓN — 60/40 split contained
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-0 items-stretch">
          {/* Image side */}
          <R dir="left" className="relative overflow-hidden min-h-[320px] md:min-h-0">
            <img
              src="/ministerios/Confraternizacion.jpg"
              alt="Confraternización CCO Hombres"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              style={{ aspectRatio: '16/9', display: 'block' }}
            />
            {/* gold tag */}
            <div className="absolute bottom-0 left-0 bg-[#C9A84C] px-5 py-2">
              <p className="text-black text-[9px] tracking-[0.35em] uppercase font-black">CCO Hombres · Confraternización</p>
            </div>
          </R>
          {/* Text side */}
          <R dir="right" delay={150}
            className="bg-[#0c0c0c] p-10 md:p-14 flex flex-col justify-center">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">El hierro afila al hierro</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Porque ningún hombre fue diseñado para caminar solo
            </h3>
            <div className="w-8 h-px bg-[#C9A84C] mb-7" />
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>Nos juntamos, nos miramos a los ojos y nos preguntamos cómo estamos de verdad. Sin máscaras. Sin aparentar. La confraternización no es un evento social — es un acto de guerra espiritual: el enemigo no puede con hombres unidos.</p>
              <p>Cada encuentro es sostener al hermano que flaquea, celebrar al que venció y desafiar al que se quedó quieto.</p>
            </div>
            <div className="mt-8 border-l-2 border-[#C9A84C]/50 pl-5">
              <p className="text-white/80 text-base italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Como el hierro se afila con hierro, así el hombre aguza el rostro de su amigo."
              </p>
              <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold mt-2">— Proverbios 27:17</p>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MESA COMMUNION — split image (3:4) / text
      ══════════════════════════════════════════ */}
      <section className="bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Text */}
            <R dir="left" className="p-10 md:p-16 lg:p-20 flex flex-col justify-center order-2 md:order-1">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Lo que hacemos</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-5"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                La mesa como espacio sagrado
              </h3>
              <GoldLine delay={200} className="mb-7" />
              <div className="space-y-4 text-gray-500 text-[15px] leading-relaxed">
                <p>En CCO Hombres, compartir la mesa no es un detalle — es comunión. Así como Jesús se sentó a comer con sus discípulos, encontramos en cada comida compartida un momento para bajar las guardias.</p>
                <p>Son los momentos donde surgen las conversaciones más honestas, donde nace la confianza, donde un hermano puede decir "no estoy bien" y encontrar brazos que lo sostienen.</p>
                <p>Adoramos, oramos, estudiamos — y también comemos juntos. La vida en comunidad es completa, no fragmentada.</p>
              </div>
            </R>
            {/* Image */}
            <R dir="right" delay={150} className="relative overflow-hidden min-h-[420px] md:min-h-0 order-1 md:order-2">
              <img
                src="/ministerios/Comida.jpg"
                alt="La mesa — CCO Hombres"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </R>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE — what happens each meeting
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <R className="mb-16">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Nuestros momentos</p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}>¿Qué pasa en cada encuentro?</h3>
        </R>
        <div className="space-y-0">
          {[
            { n: '01', icon: Flame,         title: 'Adoramos a Dios',       desc: 'Cada encuentro abre con adoración. Entramos en la presencia del Señor cantando, declarando y postrándonos ante Él. El hombre que adora está anclado en lo eterno y no se tambalea ante nada.' },
            { n: '02', icon: BookOpen,       title: 'Oramos juntos',         desc: 'Intercedemos por nuestras familias, la iglesia y las naciones. Aprendemos a orar con fe, con autoridad y con persistencia, como enseñó Jesús en el Padrenuestro.' },
            { n: '03', icon: HeartHandshake, title: 'Confraternizamos',      desc: 'Sin máscaras ni actuaciones. Compartimos lo que vivimos, lo que creemos y lo que necesitamos. La transparencia entre hombres es una de las fortalezas más sólidas.' },
            { n: '04', icon: Users,          title: 'Nos desafiamos',        desc: 'Nos rendimos cuentas. Un hermano te pregunta cómo vas, no para juzgarte, sino para empujarte. Así es como el carácter se forja y el propósito se sostiene en el tiempo.' },
          ].map(({ n, icon: Icon, title, desc }, i) => (
            <R key={i} delay={i * 90}
              className="group grid md:grid-cols-[80px_1fr] gap-0 border-t border-gray-100 hover:border-[#C9A84C] transition-colors duration-300 py-10 items-start">
              {/* Number col */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-0">
                <p className="text-4xl font-black text-gray-100 group-hover:text-[#C9A84C]/20 transition-colors duration-400 leading-none"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
              </div>
              {/* Content */}
              <div className="md:pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors duration-300">
                    <Icon className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" size={16} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h4>
                </div>
                <p className="text-gray-400 leading-relaxed text-[15px] max-w-2xl">{desc}</p>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK VERSE BANNER
      ══════════════════════════════════════════ */}
      <div className="bg-[#0c0c0c] py-24 md:py-32 px-6 relative overflow-hidden">
        {/* decorative diagonal lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

        <R className="max-w-3xl mx-auto text-center relative z-10">
          {/* diamond icon */}
          <div className="relative w-10 h-10 mx-auto mb-10">
            <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
            <div className="absolute inset-[6px] bg-[#C9A84C] rotate-45" />
          </div>
          <R delay={100}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Como el hierro se afila con hierro, así el hombre aguza el rostro de su amigo."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">Proverbios 27:17</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* ══════════════════════════════════════════
          VALUES ROW
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { value: 'Fe',          label: 'Como ancla del alma' },
            { value: 'Carácter',    label: 'Forjado en la Palabra' },
            { value: 'Fraternidad', label: 'Verdadera y duradera' },
            { value: 'Legado',      label: 'Para las próximas generaciones' },
          ].map(({ value, label }, i) => (
            <R key={i} delay={i * 80}
              className="group border border-gray-100 p-10 text-center hover:border-[#C9A84C] hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
              <p className="text-gray-400 text-xs leading-snug">{label}</p>
            </R>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — full dark, bold
      ══════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] relative overflow-hidden">
        {/* diagonal bg pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Hay un lugar para vos</p>
          </R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ¿Listo para caminar con hombres que van en serio con Dios?
            </h3>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4 mb-10">
            <div className="w-8 h-px bg-[#C9A84C]/50" />
            <p className="text-white/40 text-xs tracking-widest uppercase">Centro Cristiano de Oración</p>
            <div className="w-8 h-px bg-[#C9A84C]/50" />
          </R>
          <R delay={340}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No necesitás tener todo resuelto para llegar. Solo necesitás querer crecer. Este ministerio está hecho para vos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/#contacto"
                className="group inline-flex items-center gap-4 px-12 py-5 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-white transition-colors duration-300">
                Quiero sumarme
                <span className="w-6 h-px bg-black group-hover:w-10 transition-all duration-400 block" />
              </Link>
              <a href="tel:+12705350183"
                className="inline-flex items-center gap-2 text-white/60 hover:text-[#C9A84C] transition-colors duration-300 text-sm tracking-widest font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span><span className="block text-[10px] tracking-widest uppercase text-[#C9A84C] font-bold leading-none mb-0.5">Hernán Gil</span>(270) 535-0183</span>
              </a>
            </div>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
