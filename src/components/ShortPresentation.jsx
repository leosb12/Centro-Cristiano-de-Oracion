import { useEffect, useRef } from 'react'

export default function ShortPresentation() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white py-28 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Texto ── */}
          <div className="fade-in flex flex-col justify-center">
            <span className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold mb-6">
              Mirá lo que Dios está haciendo
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-gray-900 leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              La obra no<br />
              <span style={{ color: '#C9A84C' }}>para de crecer</span>
            </h2>
            <div className="w-10 h-px bg-[#C9A84C] mb-6" />
            <p className="text-gray-500 text-base leading-relaxed max-w-md mb-4">
              Cada semana Dios mueve en nuestra congregación. Vidas restauradas, familias transformadas y una comunidad que crece en fe y propósito.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Esto es lo que pasa cuando una iglesia se pone de acuerdo en oración y en la Palabra.
            </p>
          </div>

          {/* ── Video vertical (Short 9:16) ── */}
          <div className="fade-in flex justify-center md:justify-start">
            <div className="relative w-full max-w-[320px]">
              {/* Decorative gold border */}
              <div className="absolute -top-3 -right-3 w-full h-full border border-[#C9A84C]/30 rounded-xl pointer-events-none z-0" />
              <div
                className="relative z-10 overflow-hidden rounded-xl shadow-2xl bg-black"
                style={{ aspectRatio: '9/16' }}
              >
                <iframe
                  src="https://www.youtube.com/embed/Zxd0Xloodpk?rel=0&modestbranding=1"
                  title="Centro Cristiano de Oración — Presentación"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
              {/* Gold accent */}
              <div className="absolute -bottom-3 -left-3 w-16 h-px bg-[#C9A84C] z-20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
