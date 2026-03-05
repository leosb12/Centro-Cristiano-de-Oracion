import { useEffect, useRef } from 'react'

export default function Pastores() {
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
    <section className="bg-[#0c0c0c] py-28 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <div className="fade-in mb-16 text-center">
          <span className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-bold">
            Liderazgo pastoral
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Foto ── */}
          <div className="fade-in flex justify-center md:justify-end order-2 md:order-1">
            <div className="relative w-full max-w-[420px]">
              {/* Decorative gold border offset */}
              <div className="absolute -top-3 -left-3 w-full h-full border border-[#C9A84C]/30 rounded-sm pointer-events-none z-0" />
              <img
                src="/pastores.jpg"
                alt="Pastores Orlando Gil y Brenda Gil"
                className="relative z-10 w-full object-cover object-top rounded-sm"
                style={{ aspectRatio: '3/4', maxHeight: '560px' }}
              />
              {/* Gold accent line bottom */}
              <div className="absolute -bottom-3 -right-3 w-24 h-px bg-[#C9A84C] z-20" />
            </div>
          </div>

          {/* ── Texto ── */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <div className="fade-in mb-3">
              <div className="w-10 h-px bg-[#C9A84C] mb-6" />
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.05] mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Pastores
              </h2>
              <h3
                className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-[1.1] mb-8"
                style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C' }}
              >
                Orlando &amp; Brenda Gil
              </h3>
            </div>

            <div className="fade-in space-y-5 text-white/60 text-base leading-relaxed max-w-md">
              <p>
                Con más de 15 años sirviendo al Señor, el pastor Orlando y la pastora Brenda Gil
                han dedicado su vida a edificar una congregación fundada en la Palabra, la oración
                y el amor genuino por las personas.
              </p>
              <p>
                Su visión es ver familias transformadas, vidas restauradas y una iglesia que impacte
                la comunidad de Bowling Green y más allá de sus fronteras.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
