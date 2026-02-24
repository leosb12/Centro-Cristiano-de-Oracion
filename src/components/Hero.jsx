import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(40px)'
        setTimeout(() => {
          el.style.transition = 'opacity 1s ease, transform 1s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, 300 + i * 250)
      }
    })
  }, [])

  const scrollDown = () => {
    const next = document.querySelector('#nosotros')
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Banner.jpg')`,
        }}
      />

      {/* Layered overlays for dramatic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />

      {/* Gold particles effect (CSS only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C9A84C]/10"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${6 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Top accent */}
        <div ref={titleRef} className="mb-2">
          <span className="inline-block text-[#C9A84C] text-xs tracking-[0.4em] uppercase font-medium mb-6 border border-[#C9A84C]/40 px-4 py-2">
            Bowling Green, Kentucky
          </span>
        </div>

        {/* Main Heading */}
        <div ref={subtitleRef}>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bienvenidos
          </h1>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-wide"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            a Casa
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Un lugar donde la fe se vive, la esperanza se renueva y el amor de Dios transforma cada vida.
            <span className="block mt-2 text-[#C9A84C]/80 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Con Él, todo es posible."
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#servicios"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group bg-[#C9A84C] text-[#0a0a0f] px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-xl hover:shadow-[#C9A84C]/40 hover:-translate-y-1"
          >
            Ver Horarios
          </a>
          <a
            href="#nosotros"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group border border-white/40 text-white px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C] hover:-translate-y-1"
          >
            Conócenos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  )
}
