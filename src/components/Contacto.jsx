import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Youtube, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: <MapPin size={20} />,
    titulo: 'Ubicación',
    lineas: ['824 Parkland Way', 'Bowling Green, KY'],
    link: 'https://maps.google.com/?q=824+Parkland+Way,+Bowling+Green,+KY',
    linkLabel: 'Ver en Google Maps',
  },
  {
    icon: <Phone size={20} />,
    titulo: 'Teléfono',
    lineas: ['(270) 202-0459'],
    link: 'tel:+12702020459',
    linkLabel: 'Llamar ahora',
  },
  {
    icon: <Clock size={20} />,
    titulo: 'Horarios',
    lineas: ['Domingo: 11:30 AM – 1:30 PM', 'Martes: 7:00 – 8:30 PM', 'Jueves: 7:00 – 8:30 PM', 'Sábado: 8:30 – 10:30 AM'],
    link: '#servicios',
    linkLabel: 'Ver todos los servicios',
  },
  {
    icon: <Youtube size={20} />,
    titulo: 'YouTube',
    lineas: ['@centrocristianodeoracion5679'],
    link: 'https://youtube.com/@centrocristianodeoracion5679',
    linkLabel: 'Ver canal',
  },
]

export default function Contacto() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

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
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setFormData({ nombre: '', email: '', mensaje: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contacto" className="bg-gray-50 py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 fade-in">
          <span className="section-label mb-4">Estamos Aquí</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Contáctanos
            </h2>
            <p className="text-gray-500 text-base leading-relaxed md:pb-2">
              Nos encantaría conocerte. Escríbenos o visítanos en persona. Siempre hay un lugar para ti en nuestra familia.
            </p>
          </div>
        </div>

        {/* Info strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mb-12 fade-in">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              className="bg-white p-8 group hover:bg-[#C9A84C] transition-colors duration-300"
            >
              <div className="text-[#C9A84C] group-hover:text-[#0a0a0f] mb-4 transition-colors duration-300">
                {info.icon}
              </div>
              <p className="text-xs tracking-widest uppercase font-semibold text-gray-400 group-hover:text-[#0a0a0f]/50 mb-3 transition-colors duration-300">
                {info.titulo}
              </p>
              {info.lineas.map((l, j) => (
                <p key={j} className="text-gray-900 group-hover:text-[#0a0a0f] font-medium text-sm leading-relaxed transition-colors duration-300">{l}</p>
              ))}
              <a
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[#C9A84C] group-hover:text-[#0a0a0f] text-xs tracking-wider mt-3 inline-flex items-center gap-1 transition-colors duration-300 font-medium underline underline-offset-2"
                onClick={info.link.startsWith('#') ? (e) => {
                  e.preventDefault()
                  document.querySelector(info.link)?.scrollIntoView({ behavior: 'smooth' })
                } : undefined}
              >
                {info.linkLabel} →
              </a>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="fade-in">
            <div className="bg-white border border-gray-200 p-10 relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#C9A84C]" />
              <h3
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Envíanos un Mensaje
              </h3>
              <p className="text-gray-400 text-sm mb-8">Responderemos lo antes posible. ¡Dios te bendiga!</p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={52} className="text-[#C9A84C] mb-5" />
                  <h4 className="text-gray-900 font-bold text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ¡Mensaje Enviado!
                  </h4>
                  <p className="text-gray-500 text-sm">Gracias por escribirnos. Te contactaremos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-gray-500 text-xs tracking-widest uppercase font-semibold block mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs tracking-widest uppercase font-semibold block mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs tracking-widest uppercase font-semibold block mb-2">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="¿Cómo podemos servirte?"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C9A84C] text-[#0a0a0f] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Google Map */}
          <div className="fade-in flex flex-col">
            <div className="flex-1 overflow-hidden border border-gray-200 min-h-[400px]">
              <iframe
                title="Centro Cristiano de Oración - Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.5!2d-86.4!3d36.997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864718b9d67bad1%3A0x0!2s824+Parkland+Way%2C+Bowling+Green%2C+KY!5e0!3m2!1ses!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="bg-gray-900 px-8 py-6 flex items-center gap-4">
              <MapPin size={18} className="text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">824 Parkland Way</p>
                <p className="text-gray-400 text-xs">Bowling Green, KY — United States</p>
              </div>
              <a
                href="https://maps.google.com/?q=824+Parkland+Way,+Bowling+Green,+KY"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[#C9A84C] text-xs tracking-widest uppercase font-bold hover:text-[#E8C96A] transition-colors duration-300"
              >
                Cómo llegar →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
