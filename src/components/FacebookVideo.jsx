import { ExternalLink } from 'lucide-react'

export default function FacebookVideo({
  href,
  title = 'Video de Facebook',
}) {
  if (!href) return null

  const encoded = encodeURIComponent(href)
  const src = `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=1200&height=675`

  return (
    <div className="w-full">
      <div className="border border-gray-200 bg-[#0a0a0f] overflow-hidden shadow-sm rounded-md">

        {/* 16:9 horizontal container */}
        <div className="relative w-full aspect-video">
          <iframe
            title={title}
            src={src}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer link */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <span className="text-xs text-gray-400 truncate pr-3">{title}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-[#C9A84C] transition-colors"
          >
            <ExternalLink size={12} />
            Ver
          </a>
        </div>
      </div>
    </div>
  )
}
