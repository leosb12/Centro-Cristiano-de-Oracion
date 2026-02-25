import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, BookOpen, Heart, ChevronDown, Music, Tv, Radio, ExternalLink } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STYLES = `
  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
  @keyframes bounce-y  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  @keyframes marquee   { from { transform:translateX(0) } to { transform:translateX(-50%) } }
  @keyframes pulse-gold { 0%,100%{opacity:.15} 50%{opacity:.45} }
  @keyframes glow-in    { from{opacity:0;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
  .sp-bounce    { animation: bounce-y 2s ease-in-out infinite; }
  .sp-marquee   { animation: marquee 28s linear infinite; }
  .sp-pulse     { animation: pulse-gold 3s ease-in-out infinite; }
  @media(max-width:767px){ .sp-marquee{ animation-duration:14s; } }
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

const TICKER_WORDS = ['Adoración', 'Palabra', 'Comunidad', 'Domingo', 'Fe', 'Presencia', 'Cristo', 'Familia', 'Oración', 'Esperanza']

function Ticker() {
  const doubled = [...TICKER_WORDS, ...TICKER_WORDS]
  return (
    <div className="overflow-hidden bg-[#C9A84C] py-3 select-none">
      <div className="sp-marquee flex whitespace-nowrap">
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

export default function ServicioPrincipalPage() {
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
          src="/domingo/banner.jpg"
          alt="Servicio Principal CCO"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

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
            CCO · Domingo 11:30 AM
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Servicio<br />Principal
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }} className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Adoración · Predicación · Cristo al Centro</p>
          </div>
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] sp-bounce" size={20} />
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
        <div className="sp-pulse absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        <p className="absolute -top-6 left-4 text-white/[0.04] font-black select-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">Por qué nos reunimos</p></R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.6rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "No dejando de congregarnos, como algunos tienen por costumbre, sino exhortándonos."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">Hebreos 10:25</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </div>
      </div>

      {/* ── INTRO + DETALLES ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">El corazón de nuestra iglesia</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Cada domingo es un encuentro, no solo una reunión
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>Cada domingo a las 11:30 AM abrimos las puertas para toda la familia. No importa si es tu primera vez o llevás años con nosotros — acá siempre hay un lugar para vos.</p>
              <p>Es un tiempo de adoración genuina, de escuchar la Palabra de Dios con profundidad, y de conectarte con una comunidad que te va a recibir con los brazos abiertos.</p>
              <p>Vengas solo, en pareja, con tus hijos o con toda la familia — el Servicio Principal del CCO es para absolutamente todos.</p>
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
                    { label: 'Día',    value: 'Domingo' },
                    { label: 'Hora',   value: '11:30 AM – 1:30 PM' },
                    { label: 'Lugar',  value: '824 Parkland Way, Bowling Green, KY' },
                    { label: 'Para',   value: 'Toda la familia — niños bienvenidos' },
                    { label: 'Pastor', value: 'Orlando' },
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

      {/* ── ADORACIÓN — imagen 3:2 izq + texto der ────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-20 items-center">
            <R dir="left" className="relative">
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 border border-[#C9A84C]/25 hidden md:block" />
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '66.66%' }}>
                <img src="/domingo/adoracion.jpg" alt="Adoración en el Servicio Principal"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold bg-black/60 px-3 py-1 backdrop-blur-sm">Adoración</span>
                </div>
              </div>
            </R>
            <R dir="right" delay={150}>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">01 — Antes de todo, adoramos</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-5"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                La adoración abre el cielo y nos prepara para recibir
              </h3>
              <GoldLine delay={200} className="mb-6" />
              <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
                <p>Cada servicio comienza con adoración — música en vivo, canto congregacional y un ambiente que te invita a soltar todo lo que traés de la semana y ponerte delante de Dios.</p>
                <p>No necesitás saber canciones ni tener experiencia religiosa. Solo vení con el corazón abierto. El Espíritu hace el resto.</p>
              </div>
              <R delay={350} className="mt-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A84C]/10 flex items-center justify-center">
                  <Music size={15} className="text-[#C9A84C]" />
                </div>
                <p className="text-gray-400 text-[13px]">Música en vivo cada domingo</p>
              </R>
            </R>
          </div>
        </div>
      </section>

      {/* ── PASTOR ORLANDO — texto izq + imagen 3:2 der ──────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-12 md:gap-20 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">02 — La Palabra que transforma</p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              El Pastor Orlando predica con unción cada domingo
            </h3>
            <GoldLine delay={200} className="mb-6" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>La predicación del Pastor Orlando es profunda, clara y práctica. Cada mensaje está diseñado para darte dirección, esperanza y las herramientas que necesitás para vivir de lunes a sábado.</p>
              <p>No son sermones para hacerte sentir culpable — son palabras ungidas por Dios para que salgas diferente de como entraste. La Biblia tiene respuestas para los problemas reales de hoy.</p>
              <p>Cada semana es algo nuevo. Una verdad fresca que se queda con vos.</p>
            </div>
            <R delay={350} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: 'Profunda', label: 'Enseñanza bíblica' },
                { n: 'Práctica', label: 'Aplicación real' },
              ].map(({ n, label }) => (
                <div key={n} className="border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[#C9A84C] font-black text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                  <p className="text-gray-400 text-xs tracking-wide">{label}</p>
                </div>
              ))}
            </R>
          </R>
          <R dir="right" delay={150} className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 border border-[#C9A84C]/25 hidden md:block" />
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '66.66%' }}>
              <img src="/domingo/predicacion.jpg" alt="Pastor Orlando predicando"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold bg-black/60 px-3 py-1 backdrop-blur-sm">Pastor Orlando</span>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── PILARES ───────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <R className="mb-16">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">¿Qué vas a encontrar?</p>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Lo que pasa cada domingo
            </h3>
          </R>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { n: '01', icon: Music,    title: 'Adoración',   desc: 'Música en vivo y canto congregacional que abren el corazón para recibir la Palabra de Dios.' },
              { n: '02', icon: BookOpen, title: 'Predicación', desc: 'El Pastor Orlando abre la Escritura con profundidad y aplicación práctica para el día a día.' },
              { n: '03', icon: Users,    title: 'Comunidad',   desc: 'Un espacio para conocer personas, hacer amigos reales y crecer como familia en Cristo.' },
              { n: '04', icon: Heart,    title: 'CCO Kids',    desc: 'Los niños tienen su propio espacio especial diseñado para que encuentren a Jesús desde pequeños.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 100}
                className="group relative border border-gray-200 bg-white p-8 md:p-10 hover:border-[#C9A84C] hover:-translate-y-2 hover:shadow-xl transition-all duration-400 cursor-default">
                <p className="absolute top-4 right-5 text-gray-100 font-black text-6xl leading-none select-none group-hover:text-[#C9A84C]/10 transition-colors duration-400"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{n}</p>
                <div className="w-11 h-11 bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-all duration-300 group-hover:rotate-12">
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

      {/* ── ORACIÓN — full bleed rezo.jpg ─────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: '520px' }}>
        <img src="/domingo/rezo.jpg" alt="Tiempo de oración"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        {/* Cruz de luz */}
        <div className="absolute top-1/2 right-[12%] md:right-[18%] -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none select-none opacity-20">
          <div className="w-px h-28 bg-[#C9A84C]" />
          <div className="w-16 h-px bg-[#C9A84C] -translate-y-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-36 flex flex-col justify-center">
          <R dir="left" className="max-w-xl">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">03 — Al final del servicio</p>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Un altar abierto para encontrarte personalmente con Dios
            </h3>
            <GoldLine delay={200} className="mb-6" />
            <p className="text-white/70 text-[15px] leading-relaxed mb-8">
              Después de la predicación abrimos el altar. Si querés recibir oración personal, entregarle tu vida a Cristo, o simplemente estar en su presencia — este es tu momento.
            </p>
            <R delay={300} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Heart size={15} className="text-[#C9A84C]" />
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed">
                "La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones." — Filipenses 4:7
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
              "Porque donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">Mateo 18:20</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </div>
      </div>

      {/* ── FACEBOOK EN VIVO ──────────────────────────────────── */}
      <section className="bg-[#111118] py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
            <R dir="left">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1877F2]/15 border border-[#1877F2]/30 flex items-center justify-center mx-auto md:mx-0 flex-shrink-0">
                <Tv size={36} className="text-[#1877F2]" />
              </div>
            </R>
            <R dir="right" delay={150}>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">¿No podés estar presente?</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-[1.1] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Cada domingo transmitimos el servicio en vivo por Facebook
              </h3>
              <p className="text-white/50 text-[14px] leading-relaxed mb-7">
                Si estás lejos, si no podés viajar o simplemente querés conectarte desde casa — el servicio llega hasta donde estás. Seguinos en Facebook y no te perdés nada.
              </p>
              <a href="https://www.facebook.com/profile.php?id=100064736918636"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1877F2] text-white text-xs tracking-[0.3em] uppercase font-black hover:bg-[#1464d2] transition-colors duration-300">
                <Radio size={14} className="group-hover:animate-pulse" />
                Ver transmisiones en vivo
                <ExternalLink size={13} className="opacity-60" />
              </a>
            </R>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#0c0c0c] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Te esperamos este domingo</p></R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Este domingo hay un lugar reservado para vos en el CCO.
            </h3>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#C9A84C]/50" />
            <p className="text-white/40 text-xs tracking-widest uppercase">Domingo · 11:30 AM · 824 Parkland Way, Bowling Green KY</p>
            <div className="w-8 h-px bg-[#C9A84C]/50" />
          </R>
          <R delay={340}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No necesitás saber nada, traer nada, ni conocer a nadie. Solo vení. Te recibimos con los brazos abiertos.
            </p>
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
