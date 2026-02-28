import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Calendar, MapPin, ArrowRight } from 'lucide-react'

const servicios = [
  {
    dia: 'Domingo',
    titulo: 'Servicio Principal',
    horario: '11:30 AM',
    rango: '11:30 AM – 1:30 PM',
    descripcion: 'Nuestro culto principal de adoración y predicación de la Palabra. Toda la familia es bienvenida.',
    icon: <Calendar size={28} />,
    highlight: true,
    ruta: '/servicios/servicio-principal',
  },
  {
    dia: 'Martes',
    titulo: 'Noche de Oración',
    horario: '7:00 PM',
    rango: '7:00 PM – 8:30 PM',
    descripcion: 'Un tiempo especial de oración intercesora donde nos unimos ante la presencia de Dios.',
    icon: <Clock size={28} />,
    highlight: false,
    ruta: '/servicios/noche-de-oracion',
  },
  {
    dia: 'Jueves',
    titulo: 'Estudio Bíblico',
    horario: '7:00 PM',
    rango: '7:00 PM – 8:30 PM',
    descripcion: 'Profundizamos juntos en la Palabra de Dios para crecer en fe, conocimiento y propósito.',
    icon: <Calendar size={28} />,
    highlight: false,
    ruta: '/servicios/estudio-biblico',
  },
  {
    dia: 'Sábado',
    titulo: 'Oración y Ayuno',
    horario: '8:30 AM',
    rango: '8:30 AM – 10:30 AM',
    descripcion: 'Un tiempo poderoso de ayuno, intercesión y búsqueda del rostro de Dios en comunidad.',
    icon: <Clock size={28} />,
    highlight: false,
    ruta: '/servicios/oracion-y-ayuno',
  },
]

export default function Horarios() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 180)
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
    <section
      id="servicios"
      className="relative py-28 px-6 overflow-hidden"
      ref={sectionRef}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1490127452271-1b574d5f3423?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a0a0f]/92" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-widest uppercase font-semibold">Únete a Nosotros</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-black">Horarios de</span><br />
              <span style={{ color: '#C9A84C' }}>Servicios</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed md:pb-2">
              Cada servicio es una oportunidad para encontrarte con Dios y crecer junto a nuestra familia.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {servicios.map((s, i) => (
            <Link
              key={i}
              to={s.ruta}
              className={`fade-in group relative overflow-hidden p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.97] select-none ${
                s.highlight
                  ? 'bg-[#C9A84C] text-[#0a0a0f]'
                  : 'bg-[#111118] border border-white/8 hover:border-[#C9A84C]/40 text-white'
              }`}
            >
              {s.highlight && (
                <div className="absolute top-4 right-4 bg-[#0a0a0f]/20 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                  Principal
                </div>
              )}
              <div
                className={`mb-5 ${s.highlight ? 'text-[#0a0a0f]' : 'text-[#C9A84C]'} group-hover:scale-110 transition-transform duration-300 inline-block`}
              >
                {s.icon}
              </div>
              <p
                className={`text-xs tracking-[0.3em] uppercase font-medium mb-2 ${
                  s.highlight ? 'text-[#0a0a0f]/70' : 'text-[#C9A84C]'
                }`}
              >
                {s.dia}
              </p>
              <h3
                className={`text-2xl font-bold mb-2 ${s.highlight ? 'text-[#0a0a0f]' : 'text-white'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {s.titulo}
              </h3>
              <p
                className={`text-2xl font-bold mb-1 ${s.highlight ? 'text-[#0a0a0f]' : 'text-[#C9A84C]'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {s.horario}
              </p>
              <p
                className={`text-xs tracking-wider mb-4 ${s.highlight ? 'text-[#0a0a0f]/60' : 'text-gray-500'}`}
              >
                {s.rango}
              </p>
              <div className={`w-10 h-px mb-5 ${s.highlight ? 'bg-[#0a0a0f]/40' : 'bg-[#C9A84C]/40'}`} />
              <p
                className={`text-sm leading-relaxed flex-1 ${s.highlight ? 'text-[#0a0a0f]/80' : 'text-gray-500'}`}
              >
                {s.descripcion}
              </p>
              {/* Always-visible CTA — especially important on mobile */}
              <div className={`mt-6 flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase ${
                s.highlight ? 'text-[#0a0a0f]' : 'text-[#C9A84C]'
              }`}>
                <span>Ver más</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              {/* Bottom gold bar on non-highlight cards */}
              {!s.highlight && (
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Location reminder */}
        <div className="fade-in flex flex-col md:flex-row items-center justify-center gap-3 text-gray-400 bg-[#111118] border border-white/8 p-5 max-w-xl mx-auto">
          <MapPin size={18} className="text-[#C9A84C] flex-shrink-0" />
          <p className="text-sm text-center">
            <span className="text-white font-medium">824 Parkland Way</span>
            {' · '}Bowling Green, KY, United States
          </p>
        </div>
      </div>
    </section>
  )
}
