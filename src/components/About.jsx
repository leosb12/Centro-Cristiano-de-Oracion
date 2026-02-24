import { useEffect, useRef } from 'react'

const values = [
  {
    num: '01',
    title: 'Fe Profunda',
    desc: 'Creemos en el poder transformador de Jesucristo como Señor y Salvador de toda la humanidad.',
  },
  {
    num: '02',
    title: 'Oración Continua',
    desc: 'La oración es el fundamento de todo lo que somos. Nos sostenemos en la presencia de Dios.',
  },
  {
    num: '03',
    title: 'Amor Genuino',
    desc: 'Amamos a nuestra comunidad y a cada persona que llega buscando esperanza y transformación.',
  },
  {
    num: '04',
    title: 'Crecimiento Espiritual',
    desc: 'Equipamos a cada creyente para vivir una vida plena en la gracia y el propósito de Dios.',
  },
]

const stats = [
  { value: '15+', label: 'Años de ministerio' },
  { value: '3', label: 'Servicios por semana' },
  { value: '6', label: 'Ministerios activos' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 130)
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
    <section id="nosotros" className="bg-white py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* ── Top label + heading ── */}
        <div className="mb-20 fade-in">
          <span className="section-label mb-4">Sobre Nosotros</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Una comunidad<br />
              <span style={{ color: '#C9A84C' }}>edificada sobre la fe</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed md:pb-2">
              Somos una familia multicultural y multigeneracional en Bowling Green, Kentucky — unidos por el amor de Dios y el compromiso de ver vidas transformadas por el poder del Evangelio.
            </p>
          </div>
        </div>

        {/* ── Image + text split ── */}
        <div className="grid md:grid-cols-2 gap-0 mb-20">
          {/* Image */}
          <div className="fade-in relative overflow-hidden h-[520px]">
            <img
              src="/iglesia.jpg"
              alt="Iglesia Centro Cristiano de Oración"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            {/* Stats overlay bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#C9A84C] px-8 py-5 flex justify-around">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[#0a0a0f] font-bold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>{s.value}</p>
                  <p className="text-[#0a0a0f]/70 text-xs tracking-widest uppercase font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text panel */}
          <div className="fade-in bg-gray-50 p-12 md:p-16 flex flex-col justify-center">
            <p className="text-gray-700 leading-relaxed mb-6 text-base">
              El <strong className="text-gray-900">Centro Cristiano de Oración</strong> nació con el propósito de ver a Bowling Green, Kentucky transformada por el poder del Evangelio. Desde nuestros inicios, hemos creído que la iglesia es mucho más que un edificio — es una familia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10 text-base">
              En nuestras reuniones encontrarás adoración auténtica, enseñanza bíblica profunda y una comunidad que te acompaña en cada etapa de tu vida. Aquí hay un lugar para ti.
            </p>
            <blockquote className="border-l-3 border-[#C9A84C] pl-6 mb-10" style={{ borderLeftWidth: '3px' }}>
              <p
                className="text-gray-800 italic text-lg leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "Porque donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos."
              </p>
              <cite className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mt-3 block">
                — Mateo 18:20
              </cite>
            </blockquote>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="self-start inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0f]"
            >
              Visítanos
              <span className="text-base leading-none">→</span>
            </a>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {values.map((val, i) => (
            <div
              key={i}
              className="fade-in group bg-white p-10 hover:bg-[#C9A84C] transition-colors duration-400"
            >
              <p className="text-[#C9A84C] group-hover:text-[#0a0a0f]/40 text-4xl font-bold mb-6 transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                {val.num}
              </p>
              <h4
                className="text-gray-900 group-hover:text-[#0a0a0f] font-bold text-lg mb-3 transition-colors duration-300"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {val.title}
              </h4>
              <p className="text-gray-500 group-hover:text-[#0a0a0f]/70 text-sm leading-relaxed transition-colors duration-300">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
