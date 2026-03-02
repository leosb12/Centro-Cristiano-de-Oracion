import { useEffect, useRef, useState } from 'react'
import { BookOpen, Shield, Cross, Star } from 'lucide-react'

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
  const hidden = dir === 'left'
    ? 'opacity-0 -translate-x-6'
    : dir === 'right'
    ? 'opacity-0 translate-x-6'
    : 'opacity-0 translate-y-6'
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-all duration-700 ease-out',
        vis ? 'opacity-100 translate-x-0 translate-y-0' : hidden,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

const beliefs = [
  {
    icon: BookOpen,
    title: 'La Biblia',
    desc: 'La Biblia es la Palabra inspirada de Dios y nuestra autoridad máxima en fe y conducta.',
  },
  {
    icon: Cross,
    title: 'La Trinidad',
    desc: 'Creemos en un solo Dios en tres personas: Padre, Hijo y Espíritu Santo.',
  },
  {
    icon: Shield,
    title: 'La Salvación',
    desc: 'Jesucristo es el único camino de salvación. La fe personal en Él como Señor y Salvador es el fundamento espiritual.',
  },
  {
    icon: Star,
    title: 'El Espíritu Santo',
    desc: 'Creemos en la obra activa del Espíritu Santo que transforma, guía y capacita al creyente.',
  },
]

export default function Doctrina() {
  return (
    <section id="doctrina" className="bg-[#0c0c0c] py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <R className="mb-16">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-4">
            Lo que creemos
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Nuestra<br />
              <span className="text-[#C9A84C]">Doctrina</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed md:pb-2">
              Somos una iglesia cristiana evangélica. Nuestras convicciones están fundadas en las Escrituras y
              apuntan a una sola verdad: Jesucristo es el Señor.
            </p>
          </div>
          <div className="w-14 h-px bg-[#C9A84C] mt-8" />
        </R>

        {/* Images + beliefs grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-16">

          {/* Left image (4:3) */}
          <R dir="left" className="relative overflow-hidden group">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[#C9A84C]/25 pointer-events-none z-10" />
            <img
              src="/Doctrina/6bb30f51-3d77-4c52-9ad8-b587885f1d73.jpeg"
              alt="Doctrina CCO"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ aspectRatio: '4/3' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </R>

          {/* Right image (4:3) */}
          <R dir="right" delay={120} className="relative overflow-hidden group">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[#C9A84C]/25 pointer-events-none z-10" />
            <img
              src="/Doctrina/8d795968-a19d-4647-b1d6-b18cb83101e5.jpeg"
              alt="Doctrina CCO"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ aspectRatio: '4/3' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </R>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {beliefs.map(({ icon: Icon, title, desc }, i) => (
            <R key={i} delay={i * 90}
              className="group relative border border-white/10 p-8 md:p-10 hover:border-[#C9A84C] transition-all duration-400 cursor-default">
              {/* bottom accent */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              <div className="w-10 h-10 bg-[#C9A84C]/10 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] transition-colors duration-300">
                <Icon className="text-[#C9A84C] group-hover:text-black transition-colors duration-300" size={18} />
              </div>
              <h4
                className="text-base font-bold text-white mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {title}
              </h4>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </R>
          ))}
        </div>

        {/* Verse */}
        <R delay={180} className="mt-16 border-t border-white/10 pt-12 text-center">
          <p
            className="text-2xl md:text-3xl font-bold text-white/80 leading-snug mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Jesús le dijo: Yo soy el camino, la verdad y la vida."
          </p>
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">— Juan 14:6</p>
        </R>

      </div>
    </section>
  )
}
