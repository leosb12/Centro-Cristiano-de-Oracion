import { useEffect, useRef } from 'react'

const ministerios = [
  {
    titulo: 'Niños',
    subtitulo: 'CCO Kids',
    descripcion: 'Enseñando a la próxima generación el amor de Dios a través de historias bíblicas, adoración y actividades creativas llenas de vida.',
    imagen: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&q=80',
  },
  {
    titulo: 'Jóvenes',
    subtitulo: 'CCO Jóvenes',
    descripcion: 'Un espacio seguro y vibrante donde los jóvenes descubren su identidad en Cristo, forjan amistades genuinas y son equipados para impactar su generación.',
    imagen: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    titulo: 'Parejas',
    subtitulo: 'CCO Familias',
    descripcion: 'Edificando matrimonios, familias y hogares sobre la roca sólida de la Palabra de Dios, con principios bíblicos para una vida en amor y unidad.',
    imagen: 'https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?w=600&q=80',
  },
  {
    titulo: 'Adoración',
    subtitulo: 'CCO Worship',
    descripcion: 'Un equipo apasionado que guía a la congregación a la presencia de Dios a través de música y adoración profunda y auténtica.',
    imagen: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  },
  {
    titulo: 'Misiones',
    subtitulo: 'CCO Misiones',
    descripcion: 'Llevando el Evangelio más allá de nuestras fronteras, sirviendo a las comunidades locales e internacionales con amor práctico y compasión.',
    imagen: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
  },
  {
    titulo: 'Mujeres',
    subtitulo: 'CCO Mujeres',
    descripcion: 'Empoderando a mujeres de todas las edades a caminar en su identidad, propósito y llamado en Dios con fuerza, gracia y dignidad.',
    imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
]

export default function Ministerios() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="ministerios" className="bg-gray-50 py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 fade-in">
          <span className="section-label mb-4">Nuestra Familia</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ministerios
            </h2>
            <p className="text-gray-500 text-base leading-relaxed md:pb-2">
              En el Centro Cristiano de Oración hay un lugar para cada persona. Descubre dónde puedes crecer, servir y florecer.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministerios.map((m, i) => (
            <div
              key={i}
              className="fade-in group relative overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={m.imagen}
                  alt={m.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-1">
                  {m.subtitulo}
                </p>
                <h3
                  className="text-2xl font-bold text-white mb-0 group-hover:mb-3 transition-all duration-400"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {m.titulo}
                </h3>
                <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-in-out">
                  <p className="text-gray-300 text-sm leading-relaxed pt-1">
                    {m.descripcion}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-5 h-px bg-[#C9A84C] group-hover:w-10 transition-all duration-500" />
                  <span className="text-[#C9A84C] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Saber más
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
