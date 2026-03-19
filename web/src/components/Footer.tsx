import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#4a2c1a]/60 bg-[#1a0f0a]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-[#d4a84b] font-bold mb-3">🏮 Bless You</h3>
            <p className="text-sm text-[#f5efe6]/50 leading-relaxed">
              AI-powered fortune stick interpretation combining RAG, Knowledge
              Graph, and LLM technology with traditional Chinese temple culture.
            </p>
          </div>
          <div>
            <h3 className="text-[#d4a84b] font-bold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/demo" className="text-[#f5efe6]/60 hover:text-[#d4a84b] transition-colors">
                  Fortune Drawing Demo
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#f5efe6]/60 hover:text-[#d4a84b] transition-colors">
                  Poem Gallery
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/osisdie/fortune-poem-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f5efe6]/60 hover:text-[#d4a84b] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#d4a84b] font-bold mb-3">Disclaimer</h3>
            <p className="text-sm text-[#f5efe6]/50 leading-relaxed">
              AI interpretations are for reference only. Fortune stick culture is
              a cherished tradition — please approach with respect and an open heart.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-[#4a2c1a]/40 pt-4 text-center text-xs text-[#f5efe6]/30">
          Built with Next.js, Tailwind CSS, and data from Longshan Temple (龍山寺).
          Licensed under MIT.
        </div>
      </div>
    </footer>
  );
}
