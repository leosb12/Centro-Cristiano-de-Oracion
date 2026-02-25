import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Heart, Users, BookOpen, Star, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

/* ── Keyframe styles ─────────────────────────────────── */
const STYLES = `
  @keyframes marquee   { from { transform: translateX(0) }  to { transform: translateX(-50%) } }
  @keyframes fadeUp    { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes fadeLeft  { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes bounce-y  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
  .anim-marquee  { animation: marquee  30s linear infinite; }
  @media (max-width: 767px) { .anim-marquee { animation-duration: 16s; } }
  .anim-bounce-y { animation: bounce-y 2s ease-in-out infinite; }
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
  const items = ['Oración', 'Adoración', 'Identidad', 'Sanidad', 'Palabra', 'Fe', 'Comunidad', 'Propósito', 'Mujeres con Propósito']
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

export default function MujeresPage() {
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
          banner.jpg → 16:9 (1024×576)
      ══════════════════════════════════════════ */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img
          ref={heroImgRef}
          src="/ministerios/mujeres/banner.jpg"
          alt="Mujeres con Propósito"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Back */}
        <div className="absolute top-28 left-6 md:left-12 z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }}
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            CCO · Ministerio de Mujeres
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Mujeres con<br />Propósito
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }}
            className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Oración · Adoración · Identidad · Comunidad
            </p>
          </div>
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] anim-bounce-y" size={20} />
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Scrolleá</p>
          </div>
        </div>

        {/* Watermark */}
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
        <p className="absolute -top-6 left-4 md:left-12 text-white/[0.04] font-black select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>
        <R className="max-w-3xl mx-auto text-center relative z-10">
          <R delay={0}>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">Nuestra declaración</p>
          </R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Se reviste de fuerza y dignidad, y afronta segura el porvenir."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">Proverbios 31:25</p>
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
              Un espacio donde las mujeres descubren quiénes son en Dios
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>Mujeres con Propósito es el ministerio femenino del Centro Cristiano de Oración.
                Un lugar de encuentro, crecimiento y sanidad donde cada mujer es valorada,
                escuchada y equipada para vivir su identidad en Cristo.</p>
              <p>Creemos en el poder de las mujeres que conocen quiénes son en Dios. Por eso
                creamos espacios donde puedan compartir, ser ministradas y florecer juntas
                en comunidad.</p>
            </div>
          </R>
          <R dir="right" delay={150}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C9A84C]/15" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[#C9A84C]/30" />
              <div className="relative bg-[#0c0c0c] p-10 md:p-12">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Nuestra convicción</p>
                <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  La mujer que ora transforma su hogar. La que adora lleva la presencia de Dios a donde va. La que camina en comunidad nunca está sola.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-[#C9A84C]" />
                  <p className="text-[#C9A84C]/60 text-[10px] tracking-widest uppercase">CCO Mujeres</p>
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLARS — 4 numbered cards
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
              { n: '01', icon: Heart,    title: 'Identidad',  desc: 'Saber quién eres en Cristo lo cambia todo. Aquí exploramos la identidad que Dios da a cada mujer.' },
              { n: '02', icon: BookOpen, title: 'Palabra',    desc: 'La Escritura no es un libro antiguo — es pan diario. Estudiamos juntas para crecer en conocimiento y fe.' },
              { n: '03', icon: Sparkles, title: 'Adoración',  desc: 'Adorar a Dios en comunidad transforma el corazón. Nos conectamos con Su presencia y somos renovadas.' },
              { n: '04', icon: Users,    title: 'Comunidad',  desc: 'Mujeres que se sostienen, se celebran y caminen juntas. La hermandad es una fortaleza espiritual.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 100}
                className="group relative border border-gray-200 bg-white p-8 md:p-10 hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-400 cursor-default">
                <p className="absolute top-4 right-5 text-gray-100 font-black text-6xl leading-none select-none group-hover:text-[#C9A84C]/10 transition-colors duration-400"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                <div className="w-11 h-11 bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" size={20} />
                </div>
                <h4 className="text-[1.1rem] font-bold text-gray-900 mb-3 relative z-10"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ADORACIÓN SPLIT — 60/40
          Adoracion.jpg → 4:3 (600×450) — imagen izquierda, texto derecha
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-0 items-stretch">
          {/* Image */}
          <R dir="left" className="relative overflow-hidden min-h-[320px] md:min-h-0 order-1">
            <img
              src="/ministerios/mujeres/Adoracion.jpg"
              alt="Adoración CCO Mujeres"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              style={{ display: 'block', minHeight: '320px' }}
            />
            <div className="absolute bottom-0 left-0 bg-[#C9A84C] px-5 py-2">
              <p className="text-black text-[9px] tracking-[0.35em] uppercase font-black">CCO Mujeres · Adoración</p>
            </div>
          </R>
          {/* Text */}
          <R dir="right" delay={150}
            className="bg-[#0c0c0c] p-10 md:p-14 flex flex-col justify-center order-2">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Adorando en comunidad</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Donde las mujeres levantan su voz y Dios desciende
            </h3>
            <div className="w-8 h-px bg-[#C9A84C] mb-7" />
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>La adoración no es solo cantar — es una declaración de identidad. Cuando una mujer adora a Dios con todo su corazón, está diciendo: "Sé quién soy y a quién pertenezco."</p>
              <p>En cada encuentro abrimos con adoración, porque creemos que Su presencia lo transforma todo antes de que hagamos cualquier otra cosa.</p>
            </div>
            <div className="mt-8 border-l-2 border-[#C9A84C]/50 pl-5">
              <p className="text-white/80 text-base italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Aclamad a Dios con alegría, toda la tierra. Cantad la gloria de su nombre."
              </p>
              <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold mt-2">— Salmo 66:1-2</p>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ORACIÓN 2 SPLIT — 60/40
          Oracion 2.jpg → 16:9 (1024×576) — texto izquierda, imagen derecha
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-0 items-stretch">
          {/* Text */}
          <R dir="left"
            className="bg-gray-50 p-10 md:p-14 flex flex-col justify-center order-2 md:order-1">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">La oración que mueve cielos</p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Porque ninguna mujer fue hecha para cargar sola sus batallas
            </h3>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
              <p>Nos reunimos a orar y algo sobrenatural sucede: cargas se alivian, corazones se sanan, fe se activa. La oración compartida multiplica su poder.</p>
              <p>Aprendemos a interceder por nuestras familias, nuestras hermanas, nuestra iglesia. Una mujer que ora es un pilar espiritual inamovible en su hogar.</p>
            </div>
            <div className="mt-8 border-l-2 border-[#C9A84C]/50 pl-5">
              <p className="text-gray-700 text-base italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Confiésense unos a otros sus pecados, y oren unos por otros, para que sean sanados."
              </p>
              <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold mt-2">— Santiago 5:16</p>
            </div>
          </R>
          {/* Image */}
          <R dir="right" delay={150} className="relative overflow-hidden min-h-[320px] md:min-h-0 order-1 md:order-2">
            <img
              src="/ministerios/mujeres/Oracion 2.jpg"
              alt="Oración CCO Mujeres"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              style={{ display: 'block', minHeight: '320px' }}
            />
            <div className="absolute bottom-0 right-0 bg-[#C9A84C] px-5 py-2">
              <p className="text-black text-[9px] tracking-[0.35em] uppercase font-black">CCO Mujeres · Oración</p>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE — what happens each meeting
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <R className="mb-16">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Nuestros momentos</p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}>¿Qué pasa en cada encuentro?</h3>
        </R>
        <div className="space-y-0">
          {[
            { n: '01', icon: Sparkles,  title: 'Adoramos juntas',        desc: 'Abrimos cada encuentro con adoración. Levantamos nuestra voz en unidad y entramos a la presencia del Señor. Eso cambia el ambiente — y nos cambia a nosotras.' },
            { n: '02', icon: Heart,     title: 'Oramos y nos ministramos',desc: 'Intercedemos las unas por las otras. Compartimos cargas, creemos juntas por lo imposible y nos ministramos desde el amor y la Palabra. Aquí nadie carga sola.' },
            { n: '03', icon: BookOpen,  title: 'Estudiamos la Palabra',   desc: 'Nos nutrimos con enseñanza bíblica profunda pero accesible. Buscamos no solo información, sino transformación real: que la Palabra habite en nosotras y nos forme.' },
            { n: '04', icon: Users,     title: 'Compartimos en comunidad',desc: 'Después de todo lo anterior, la mesa, la charla y la risa también son sagradas. La comunidad real se construye en esos momentos donde bajan las guardias y florece la hermandad.' },
          ].map(({ n, icon: Icon, title, desc }, i) => (
            <R key={i} delay={i * 90}
              className="group grid md:grid-cols-[80px_1fr] gap-0 border-t border-gray-100 hover:border-[#C9A84C] transition-colors duration-300 py-10 items-start">
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-0">
                <p className="text-4xl font-black text-gray-100 group-hover:text-[#C9A84C]/20 transition-colors duration-400 leading-none"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
              </div>
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
          PHOTO GALLERY — 3 images asymmetric
          Comida.jpg   ~2.17:1 (1507×696) — wide, spans full width row
          Oracion.jpg  4:3   (1024×768) — portrait side
          Comida 2.jpg ~2:1  (1122×561) — wide side
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <R className="mb-10">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Momentos reales</p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}>La vida de Mujeres con Propósito</h3>
        </R>
        {/* Row 1: Comida.jpg wide */}
        <R delay={0} className="w-full overflow-hidden mb-3">
          <img
            src="/ministerios/mujeres/Comida.jpg"
            alt="Comunión CCO Mujeres"
            className="w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            style={{ height: 'clamp(220px,30vw,400px)' }}
          />
        </R>
        {/* Row 2: Oracion.jpg (4:3) + Comida 2.jpg (~2:1) */}
        <div className="grid grid-cols-[1fr_1.6fr] gap-3">
          <R delay={80} className="overflow-hidden">
            <img
              src="/ministerios/mujeres/Oracion.jpg"
              alt="Oración CCO Mujeres"
              className="w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ height: 'clamp(180px,22vw,320px)' }}
            />
          </R>
          <R delay={160} className="overflow-hidden">
            <img
              src="/ministerios/mujeres/Comida 2.jpg"
              alt="Comunión CCO Mujeres"
              className="w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ height: 'clamp(180px,22vw,320px)' }}
            />
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK VERSE BANNER
      ══════════════════════════════════════════ */}
      <div className="bg-[#0c0c0c] py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <R className="max-w-3xl mx-auto text-center relative z-10">
          <div className="relative w-10 h-10 mx-auto mb-10">
            <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
            <div className="absolute inset-[6px] bg-[#C9A84C] rotate-45" />
          </div>
          <R delay={100}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Donde quiera que vayas, yo iré; y donde tú mueras, moriré yo. Tu pueblo será mi pueblo y tu Dios será mi Dios."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">Rut 1:16</p>
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
            { value: 'Fe',        label: 'Como ancla del alma' },
            { value: 'Identidad', label: 'Quiénes somos en Cristo' },
            { value: 'Sanidad',   label: 'Un espacio para restaurarse' },
            { value: 'Legado',    label: 'Para las próximas generaciones' },
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
          CTA — full dark
      ══════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Hay un lugar para vos</p>
          </R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              ¿Lista para caminar con mujeres que van en serio con Dios?
            </h3>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4 mb-10">
            <div className="w-8 h-px bg-[#C9A84C]/50" />
            <p className="text-white/40 text-xs tracking-widest uppercase">Centro Cristiano de Oración</p>
            <div className="w-8 h-px bg-[#C9A84C]/50" />
          </R>
          <R delay={340}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No necesitás llegar perfecta. Solo necesitás querer crecer. Este ministerio está hecho para vos.
            </p>
            <Link to="/#contacto"
              className="group inline-flex items-center gap-4 px-12 py-5 bg-[#C9A84C] text-black text-xs tracking-[0.35em] uppercase font-black hover:bg-white transition-colors duration-300">
              Quiero sumarme
              <span className="w-6 h-px bg-black group-hover:w-10 transition-all duration-400 block" />
            </Link>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
