import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810] via-[#1a0f0a] to-[#1a0f0a]" />
      {/* Decorative elements */}
      <div className="absolute top-10 left-1/4 w-1 h-1 rounded-full bg-[#d4a84b]/30 smoke-animation" />
      <div className="absolute top-16 right-1/3 w-1 h-1 rounded-full bg-[#d4a84b]/20 smoke-animation" style={{ animationDelay: "1s" }} />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Fortune stick icon */}
        <div className="mb-6 text-6xl sm:text-7xl gold-shimmer">🏮</div>

        <h1 className="poem-text text-3xl sm:text-5xl font-bold text-[#d4a84b] mb-4 tracking-wide">
          籤詩 AI 解籤
        </h1>
        <h2 className="text-xl sm:text-2xl text-[#f5efe6]/70 mb-2">
          Bless You — AI Fortune Stick Interpreter
        </h2>
        <p className="max-w-2xl mx-auto text-[#f5efe6]/50 mb-10 leading-relaxed">
          Experience the ancient art of Chinese temple fortune sticks, powered by
          modern AI. Draw a stick, read the poem, and receive divine
          interpretation through RAG, Knowledge Graph, and LLM technology.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8b2c2c] to-[#a33b3b] px-8 py-3.5 text-lg font-bold text-[#f5efe6] shadow-lg shadow-[#8b2c2c]/30 transition-all hover:shadow-xl hover:shadow-[#8b2c2c]/40 hover:scale-105"
          >
            <span className="text-xl group-hover:shake-animation">🎋</span>
            抽籤 Draw a Stick
          </Link>
          <a
            href="https://github.com/osisdie/fortune-poem-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#4a2c1a] px-8 py-3.5 text-lg text-[#f5efe6]/70 transition-all hover:border-[#d4a84b]/50 hover:text-[#d4a84b]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* How it works */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: "🎋", title: "1. Draw", titleZh: "抽籤", desc: "Shake the bamboo container and draw a fortune stick" },
            { icon: "📜", title: "2. Read", titleZh: "解詩", desc: "Read the four-line poem and its classical interpretation" },
            { icon: "🔮", title: "3. Interpret", titleZh: "AI 解籤", desc: "Get AI-powered advice through RAG + Knowledge Graph + LLM" },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-[#4a2c1a]/60 bg-[#2c1810]/50 p-6 transition-all hover:border-[#d4a84b]/30">
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-[#d4a84b] font-bold text-lg">
                {step.title} <span className="text-[#c9963c]/70">{step.titleZh}</span>
              </h3>
              <p className="mt-2 text-sm text-[#f5efe6]/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
