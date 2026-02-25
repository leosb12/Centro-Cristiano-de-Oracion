import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star, Users, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
  @keyframes bounce-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  .eb-bounce { animation: bounce-y 2s ease-in-out infinite; }
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

export default function EstudioBiblicoPage() {
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

      {/* HERO */}
      <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img ref={heroRef}
          src="/Banner.jpg"
          alt="Estudio Bíblico"
          className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform -top-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute top-28 left-6 md:left-12 z-20">
          <button onClick={() => { window.location.href = '/' }} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer bg-transparent border-0 outline-none">
            <ArrowLeft size={15} /><span>Volver al inicio</span>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 z-10">
          <p style={{ animation: 'fadeUp .7s .1s both' }} className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-5">
            CCO · Jueves 7:00 PM
          </p>
          <h1 style={{ animation: 'fadeUp .8s .25s both', fontFamily: 'Playfair Display, serif' }}
            className="text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight">
            Estudio<br />Bíblico
          </h1>
          <div style={{ animation: 'fadeLeft .7s .45s both' }} className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Palabra · Conocimiento · Crecimiento</p>
          </div>
          <div style={{ animation: 'fadeUp .6s .8s both' }} className="flex items-center gap-3">
            <ChevronDown className="text-[#C9A84C] eb-bounce" size={20} />
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Scrolleá</p>
          </div>
        </div>
        <p className="absolute bottom-10 right-[-1rem] md:right-4 text-white/[0.03] font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem,18vw,12rem)', fontFamily: 'Playfair Display, serif' }}>CCO</p>
      </div>

      {/* VERSE */}
      <div className="bg-[#0c0c0c] py-20 md:py-28 px-6 relative overflow-hidden">
        <p className="absolute -top-6 left-4 text-white/[0.04] font-black select-none leading-none"
          style={{ fontSize: 'clamp(8rem,20vw,16rem)', fontFamily: 'Georgia, serif' }}>"</p>
        <R className="max-w-3xl mx-auto text-center relative z-10">
          <R delay={0}><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-7">Nuestra declaración</p></R>
          <R delay={120}>
            <blockquote className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold text-white leading-snug mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              "Toda la Escritura es inspirada por Dios y útil para enseñar, para redargüir, para corregir, para instruir en justicia."
            </blockquote>
          </R>
          <R delay={240} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold">2 Timoteo 3:16</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">
          <R dir="left">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Sobre el servicio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Crecer en la Palabra cambia todo lo demás
            </h2>
            <GoldLine delay={200} className="mb-7" />
            <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
              <p>El Estudio Bíblico de los jueves es un tiempo de profundización en la Escritura. No venimos solo a escuchar — venimos a entender, a cuestionar, a aplicar.</p>
              <p>Cada semana abrimos un texto bíblico y lo recorremos juntos. La enseñanza es práctica, accesible y transformadora.</p>
            </div>
          </R>
          <R dir="right" delay={150}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C9A84C]/15" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[#C9A84C]/30" />
              <div className="relative bg-[#0c0c0c] p-10 md:p-12">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Detalles</p>
                <div className="space-y-5">
                  {[
                    { label: 'Día',   value: 'Jueves' },
                    { label: 'Hora',  value: '7:00 PM – 8:30 PM' },
                    { label: 'Lugar', value: '824 Parkland Way, Bowling Green, KY' },
                    { label: 'Para',  value: 'Todos — de principiantes a avanzados' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold w-14 flex-shrink-0 pt-[2px]">{label}</p>
                      <p className="text-white text-sm leading-snug">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <R className="mb-16">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">¿Qué vas a encontrar?</p>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Lo que pasa cada jueves
            </h3>
          </R>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { n: '01', icon: BookOpen, title: 'Enseñanza',    desc: 'Estudio serio y accesible de la Escritura. Cada semana un texto, un tema, una aplicación concreta a la vida.' },
              { n: '02', icon: Star,     title: 'Preguntas',    desc: 'Espacio para preguntar, dudar y profundizar. Aquí la fe se construye también desde la honestidad intelectual.' },
              { n: '03', icon: Users,    title: 'Discusión',    desc: 'Aprendemos más cuando pensamos juntos. La dinámica grupal enriquece la comprensión de la Palabra.' },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <R key={i} delay={i * 100} className="group relative border border-gray-200 bg-white p-8 md:p-10 hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-400 cursor-default">
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

      {/* DARK BANNER */}
      <div className="bg-[#0c0c0c] py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <R className="max-w-3xl mx-auto text-center relative z-10">
          <div className="relative w-10 h-10 mx-auto mb-10">
            <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45" />
            <div className="absolute inset-[6px] bg-[#C9A84C] rotate-45" />
          </div>
          <R delay={100}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Estudia para presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse."
            </p>
          </R>
          <R delay={220} className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#C9A84C]/60" />
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">2 Timoteo 2:15</p>
            <div className="w-8 h-px bg-[#C9A84C]/60" />
          </R>
        </R>
      </div>

      {/* CTA */}
      <section className="bg-[#0c0c0c] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60%)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <R><p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">Unite al estudio</p></R>
          <R delay={120}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Este jueves podés empezar a conocer la Palabra de una forma diferente.
            </h3>
          </R>
          <R delay={340}>
            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md mx-auto">
              No necesitás experiencia previa. Solo traé tu Biblia y las ganas de aprender.
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
