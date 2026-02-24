export default function VersiculoBanner() {
  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a0a0f]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Large quotation mark */}
        <div
          className="text-[120px] leading-none text-[#C9A84C]/20 font-bold mb-0 -mb-8"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          "
        </div>

        <blockquote className="mb-8">
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.
          </p>
          <p
            className="text-xl md:text-2xl"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Te fortaleceré y te ayudaré; te sostendré con mi diestra victoriosa.
          </p>
        </blockquote>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-[#C9A84C]/50" />
          <cite className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase font-medium not-italic">
            Isaías 41:10
          </cite>
          <div className="h-px w-12 bg-[#C9A84C]/50" />
        </div>

        <a
          href="#servicios"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-block bg-[#C9A84C] text-[#0a0a0f] px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C96A] hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-1"
        >
          Visítanos Este Domingo
        </a>
      </div>
    </section>
  )
}
