import { useEffect, useRef } from 'react'
import { Youtube, ExternalLink, Play } from 'lucide-react'

const plataformas = [
  {
    nombre: 'YouTube',
    usuario: '@centrocristianodeoracion5679',
    url: 'https://youtube.com/@centrocristianodeoracion5679',
    descripcion: 'Mensajes completos, series de predicación y alabanzas para edificar tu fe cada semana desde cualquier lugar del mundo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF0000" width="40" height="40">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    label: 'Suscríbete',
    tag: 'YouTube',
    tagColor: '#FF0000',
  },
  {
    nombre: 'TikTok',
    usuario: '@centrocristianodeoracion',
    url: 'https://tiktok.com/@centrocristianodeoracion',
    descripcion: 'Devocionales cortos, versículos inspiradores y momentos especiales de nuestra comunidad para alimentar tu espíritu cada día.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
      </svg>
    ),
    label: 'Síguenos',
    tag: 'TikTok',
    tagColor: '#111827',
  },
]

export default function Media() {
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
    <section id="media" className="bg-white py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 fade-in">
          <span className="section-label mb-4">Síguenos</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Conéctate con<br />
              <span style={{ color: '#C9A84C' }}>nuestra comunidad</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed md:pb-2">
              Sigue nuestras redes para mantenerte conectado con lo que Dios está haciendo cada semana.
            </p>
          </div>
        </div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {plataformas.map((p, i) => (
            <div
              key={i}
              className="fade-in group flex flex-col bg-gray-50 border border-gray-200 p-10 hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-gray-100 transition-all duration-400"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 border"
                  style={{ color: p.tagColor, borderColor: p.tagColor + '40' }}
                >
                  {p.tag}
                </span>
              </div>
              <p className="text-xs text-[#C9A84C] tracking-widest uppercase font-medium mb-1">{p.nombre}</p>
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {p.usuario}
              </h3>
              <div className="w-8 h-px bg-[#C9A84C] mb-5 group-hover:w-16 transition-all duration-400" />
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-8">
                {p.descripcion}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0f]"
              >
                <ExternalLink size={13} />
                {p.label}
              </a>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="fade-in bg-gray-900 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <Play size={24} className="text-[#0a0a0f]" fill="#0a0a0f" />
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-1">Mensajes en Línea</p>
              <h3
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                ¿No puedes asistir en persona?
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Accede a todos nuestros mensajes desde cualquier lugar del mundo.
              </p>
            </div>
          </div>
          <a
            href="https://youtube.com/@centrocristianodeoracion5679"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0a0a0f] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5"
          >
            Ver en YouTube
            <ExternalLink size={13} />
          </a>
        </div>

      </div>
    </section>
  )
}
