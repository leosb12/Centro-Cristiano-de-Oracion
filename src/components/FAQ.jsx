import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    pregunta: '¿Necesito ser cristiano para visitar la iglesia?',
    respuesta:
      'No. En el Centro Cristiano de Oración todas las personas son bienvenidas sin importar su historia, religión o trasfondo. Nuestras puertas están abiertas a quienes buscan a Dios, tienen preguntas de fe, o simplemente quieren conocer más sobre Jesucristo. Vengas como vengas, serás recibido con amor.',
  },
  {
    pregunta: '¿Qué pasa durante un servicio? ¿Qué puedo esperar?',
    respuesta:
      'Nuestros servicios incluyen un tiempo de adoración con música contemporánea cristiana, oración congregacional y un mensaje bíblico práctico y aplicable a la vida diaria. El ambiente es cálido, informal y familiar. No hay códigos de vestimenta — ven como te sientas cómodo.',
  },
  {
    pregunta: '¿En qué idioma son los servicios?',
    respuesta:
      'Nuestros servicios son principalmente en español, pensados para la comunidad hispana de Bowling Green, KY. Todos son bienvenidos independientemente del idioma.',
  },
  {
    pregunta: '¿Qué creen como iglesia? ¿Cuál es su doctrina?',
    respuesta:
      'Somos una iglesia cristiana. Creemos que la Biblia es la Palabra inspirada de Dios y nuestra autoridad máxima. Creemos en la Trinidad — Padre, Hijo y Espíritu Santo — y que Jesucristo es el único camino de salvación. La fe personal en Cristo como Señor y Salvador es el fundamento de nuestra vida espiritual.',
  },
  {
    pregunta: '¿Cómo puedo ser salvo o entregar mi vida a Cristo?',
    respuesta:
      'La salvación es un regalo gratuito de Dios. La Biblia enseña en Romanos 10:9 que si confiesas con tu boca que Jesús es el Señor y crees en tu corazón que Dios lo resucitó de los muertos, serás salvo. Si deseas tomar esa decisión, puedes hablar con uno de nuestros pastores o líderes — será un honor acompañarte en ese paso.',
  },
  {
    pregunta: '¿Practican el bautismo? ¿Qué significa?',
    respuesta:
      'Sí. El bautismo en agua es un acto de obediencia y un testimonio público de que has entregado tu vida a Jesucristo. No salva, pero declara públicamente que has muerto al pecado y resucitado a una nueva vida en Cristo (Romanos 6:4). Hablamos con cada persona antes del bautismo para asegurarnos de que sea una decisión consciente y de fe.',
  },
  {
    pregunta: '¿Hay programas para niños y jóvenes durante el servicio?',
    respuesta:
      'Sí. Tenemos CCO Kids para los más pequeños, con maestros capacitados que enseñan la Biblia de forma divertida y apropiada para su edad. Los jóvenes también tienen su propio espacio — CCO Jóvenes — donde pueden crecer en fe junto a otros de su generación.',
  },
  {
    pregunta: '¿Cómo puedo ser miembro de la iglesia?',
    respuesta:
      'Si ya visitas la iglesia y deseas comprometerte formalmente como miembro, puedes hablar con uno de nuestros pastores. La membresía implica compartir nuestra declaración de fe, ser bautizado y comprometerse a participar activamente en la vida de la congregación.',
  },
  {
    pregunta: '¿Se pide dinero o diezmo en los servicios?',
    respuesta:
      'La ofrenda y el diezmo son actos voluntarios de adoración que los miembros practican por fe y gratitud a Dios (Malaquías 3:10, 2 Corintios 9:7). Nunca se presiona ni se condiciona la participación al dar. Los visitantes no están obligados a dar — ven, descansa y sé bendecido.',
  },
  {
    pregunta: '¿Cómo puedo servir o involucrarme en la iglesia?',
    respuesta:
      '¡Con gusto! Hay múltiples formas de servir: adoración, ministerio de niños, jóvenes, tecnología, hospitalidad, misiones, y más. Si tienes un don o habilidad y quieres usarlo para Dios, habla con nosotros. Cada miembro del cuerpo de Cristo tiene un lugar y un propósito (1 Corintios 12).',
  },
]

export default function FAQ() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="bg-white py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 fade-in">
          <span className="section-label mb-4">Preguntas Frecuentes</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Respuestas que<br />
              <span style={{ color: '#C9A84C' }}>buscas</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed md:pb-2">
              Si tienes más preguntas, no dudes en escribirnos o visitarnos. Siempre hay alguien dispuesto a ayudarte.
            </p>
          </div>
        </div>

        {/* Two-column accordion */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {[faqs.slice(0, 5), faqs.slice(5)].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {col.map((faq, idx) => {
                const i = colIdx === 0 ? idx : idx + 5
                const isOpen = openIndex === i
                return (
                  <div
                    key={i}
                    className="fade-in border-b border-gray-200"
                  >
                    <button
                      className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-gray-900 font-semibold text-base leading-snug group-hover:text-[#C9A84C] transition-colors duration-300"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {faq.pregunta}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 mt-0.5 text-[#C9A84C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-in-out"
                      style={{ maxHeight: isOpen ? '400px' : '0px' }}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pb-6 pr-8">
                        {faq.respuesta}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fade-in mt-16 bg-gray-50 border border-gray-200 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[#C9A84C] tracking-widest uppercase font-semibold mb-1">¿Tienes más preguntas?</p>
            <h4
              className="text-gray-900 font-bold text-xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Estamos aquí para ayudarte
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Escríbenos o visítanos — ninguna pregunta es pequeña.
            </p>
          </div>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0f]"
          >
            Contáctanos
            <span className="text-base leading-none">→</span>
          </a>
        </div>

      </div>
    </section>
  )
}
