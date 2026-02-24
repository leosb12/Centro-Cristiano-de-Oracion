import { useState, useEffect } from 'react'
import { Menu, X, Cross } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ministerios', href: '#ministerios' },
  { label: 'En Vivo', href: '#envivo', live: true },
  { label: 'Media', href: '#media' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="flex items-center gap-3 group">
          <img
            src="/android-chrome-192x192.png"
            alt="Logo Centro Cristiano de Oración"
            className="w-10 h-10 rounded-full object-cover border border-[#C9A84C]/50 group-hover:border-[#C9A84C] transition-all duration-300"
          />
          <div className="leading-tight">
            <p className={`font-bold text-sm tracking-widest uppercase ${scrolled ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Centro Cristiano
            </p>
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-light">
              de Oración
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group inline-flex items-center gap-1.5 ${scrolled ? 'text-gray-700 hover:text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.live && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
              )}
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="bg-[#C9A84C] text-[#0a0a0f] px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-lg hover:shadow-[#C9A84C]/30"
          >
            Únete
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-gray-700 hover:text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-gray-200`}
      >
        <div className="px-5 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-700 hover:text-[#C9A84C] text-sm tracking-widest uppercase font-medium transition-colors duration-300 py-2 border-b border-gray-100 flex items-center gap-2"
            >
              {link.live && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
              )}
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="mt-2 bg-[#C9A84C] text-[#0a0a0f] px-6 py-3 text-xs font-bold tracking-widest uppercase text-center transition-all duration-300 hover:bg-[#E8C96A]"
          >
            Únete a Nosotros
          </a>
        </div>
      </div>
    </header>
  )
}
