import { useEffect, useRef, useState } from 'react'
import { Radio, ExternalLink } from 'lucide-react'

const PAGE_URL = 'https://www.facebook.com/profile.php?id=100064736918636'

export default function EnVivo() {
  const sectionRef = useRef(null)
  const pluginRef = useRef(null)
  const [pluginState, setPluginState] = useState('loading') // 'loading' | 'ready' | 'failed'

  useEffect(() => {
    // Insert fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.prepend(fbRoot)
    }

    // Timeout: if SDK doesn't load in 7s, show fallback
    const timeout = setTimeout(() => {
      setPluginState((s) => (s === 'loading' ? 'failed' : s))
    }, 7000)

    if (document.getElementById('facebook-jssdk')) {
      if (window.FB) {
        window.FB.XFBML.parse(pluginRef.current, () => setPluginState('ready'))
      }
      clearTimeout(timeout)
      return
    }

    window.fbAsyncInit = function () {
      window.FB.init({ xfbml: true, version: 'v19.0' })
      window.FB.XFBML.parse(pluginRef.current, () => setPluginState('ready'))
      clearTimeout(timeout)
    }

    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.src = 'https://connect.facebook.net/es_LA/sdk.js'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.onerror = () => { setPluginState('failed'); clearTimeout(timeout) }
    document.head.appendChild(script)

    return () => clearTimeout(timeout)
  }, [])

  // Intersection observer for fade-in
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

  return (
    <section id="envivo" className="bg-white py-28 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 fade-in">
          <span className="section-label mb-4">Facebook · En Vivo</span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Síguenos en{' '}
              <span style={{ color: '#C9A84C' }}>Facebook</span>
            </h2>
            <div className="md:pb-2">
              <p className="text-gray-500 text-base leading-relaxed mb-4">
                Cuando la iglesia transmita en vivo, el video aparecerá aquí automáticamente. También puedes ver publicaciones y servicios anteriores.
              </p>
              <a
                href={PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#166fe5] hover:shadow-lg hover:shadow-[#1877F2]/30"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Ver página en Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Live dot */}
        <div className="fade-in flex items-center gap-3 mb-6 px-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <p className="text-gray-500 text-xs tracking-widest uppercase font-semibold">
            Cuando estén en vivo, el video aparecerá automáticamente aquí abajo
          </p>
        </div>

        {/* Plugin container */}
        <div className="fade-in w-full overflow-hidden border border-gray-200 bg-gray-50" style={{ minHeight: '500px' }}>

          {/* Facebook Page Plugin — always in DOM so SDK can render it */}
          <div
            ref={pluginRef}
            style={{ display: pluginState === 'failed' ? 'none' : 'block' }}
          >
            <div
              className="fb-page"
              data-href={PAGE_URL}
              data-tabs="timeline"
              data-width="auto"
              data-height="500"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="false"
            />
          </div>

          {/* Loading state */}
          {pluginState === 'loading' && (
            <div className="flex flex-col items-center justify-center h-[500px] text-center gap-4">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Cargando feed de Facebook…</p>
            </div>
          )}

          {/* Failed / blocked state */}
          {pluginState === 'failed' && (
            <div className="flex flex-col items-center justify-center h-[500px] text-center gap-5 px-6">
              <div className="w-16 h-16 bg-[#1877F2]/10 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="#1877F2" width="32" height="32">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  El contenido de Facebook no pudo cargar
                </h4>
                <p className="text-gray-500 text-sm max-w-md">
                  Esto puede ocurrir en <strong>localhost</strong> o si tu navegador bloquea contenido de terceros. En producción (dominio real) funcionará correctamente.
                </p>
              </div>
              <a
                href={PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#166fe5]"
              >
                <ExternalLink size={13} />
                Ver página directamente en Facebook
              </a>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}

