import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Heart, ExternalLink } from 'lucide-react'

export default function MisionesPreview() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section id="misiones" className="bg-[#0a0a0f] text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Impacto Internacional
            </p>
            <h2 className="text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Misiones
            </h2>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed">
            Llevando el evangelio más allá de las fronteras. Fe en acción, amor que construye.
          </p>
        </div>

        {/* Main card */}
        <div ref={ref} className="fade-in grid md:grid-cols-2 gap-0 border border-white/10 overflow-hidden">

          {/* Image */}
          <div className="relative min-h-72 md:min-h-96 overflow-hidden">
            <img
              src="/chacolejos/Presentacion.jpg"
              alt="Misión en Chaco Lejos"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay so text is legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-[#0a0a0f]/30 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full min-h-72 md:min-h-96 p-10">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium">Chaco Lejos · Beni, Bolivia</span>
              </div>
              <p className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Una iglesia<br />
                <span className="text-[#C9A84C]">para los niños</span>
              </p>
            </div>

            {/* Gold bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C9A84C]" />
          </div>

          {/* Text content */}
          <div className="bg-white/5 p-10 flex flex-col justify-between gap-8">
            <div>
              <p className="text-gray-300 leading-relaxed text-base mb-6">
                Con fe, trabajo y mucho amor, un equipo de nuestra iglesia viajó hasta la comunidad 
                de Chaco Lejos y construyó desde cero una iglesia para las niñas y niños de esa comunidad. 
                Una obra que Dios puso en nuestros corazones y que hoy impacta vidas cada semana.
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  '30+ niños con un lugar de fe y esperanza',
                  'Iglesia construida completamente',
                  'Líderes locales capacitados para continuar la obra',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/misiones"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0a0a0f] px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-lg hover:shadow-[#C9A84C]/30"
              >
                Ver toda la historia
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=100066496965035"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                <ExternalLink size={14} />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom verse */}
        <div className="mt-12 flex items-center gap-6">
          <div className="flex-1 h-px bg-white/10" />
          <div className="flex items-center gap-3 text-gray-500">
            <Heart size={14} className="text-[#C9A84C]" />
            <span className="text-xs tracking-widest uppercase italic">"Id y haced discípulos a todas las naciones" — Mt 28:19</span>
            <Heart size={14} className="text-[#C9A84C]" />
          </div>
          <div className="flex-1 h-px bg-white/10" />
        </div>

      </div>
    </section>
  )
}
