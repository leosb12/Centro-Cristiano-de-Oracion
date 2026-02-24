import { Youtube, Phone, MapPin, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ministerios', href: '#ministerios' },
  { label: 'Media', href: '#media' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#070709] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/android-chrome-192x192.png"
                alt="Logo Centro Cristiano de Oración"
                className="w-10 h-10 rounded-full object-cover border border-[#C9A84C]/50"
              />
              <div className="leading-tight">
                <p className="text-white font-bold text-sm tracking-widest uppercase">
                  Centro Cristiano
                </p>
                <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light">
                  de Oración
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Una iglesia que cree en Jesús, que ama a Dios y a las personas. Unidos en fe, oración y amor en Bowling Green, Kentucky.
            </p>
            {/* Verse */}
            <blockquote className="border-l-2 border-[#C9A84C]/40 pl-4">
              <p className="text-[#C9A84C]/70 italic text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                "La oración es la llave de la mañana y el cerrojo de la noche."
              </p>
            </blockquote>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.3em] uppercase mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-500 hover:text-[#C9A84C] text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#C9A84C] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.3em] uppercase mb-6">
              Contacto
            </h4>
            <div className="space-y-4 mb-8">
              <a
                href="https://maps.google.com/?q=824+Parkland+Way,+Bowling+Green,+KY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-500 hover:text-white transition-colors duration-300 group"
              >
                <MapPin size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">824 Parkland Way, Bowling Green, KY</span>
              </a>
              <a
                href="tel:+12702020459"
                className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
                <span className="text-xs">(270) 202-0459</span>
              </a>
            </div>

            {/* Social Icons */}
            <h4 className="text-white font-bold text-xs tracking-[0.3em] uppercase mb-4">
              Redes Sociales
            </h4>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@centrocristianodeoracion5679"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-[#FF0000]/50 hover:text-[#FF0000] transition-all duration-300 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://tiktok.com/@centrocristianodeoracion"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-white/40 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wider text-center">
            © {new Date().getFullYear()} Centro Cristiano de Oración · Bowling Green, KY · Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 hover:text-[#C9A84C] text-xs tracking-widest uppercase transition-colors duration-300 group"
          >
            Volver arriba
            <span className="w-6 h-6 border border-current flex items-center justify-center group-hover:border-[#C9A84C] transition-colors duration-300">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
