import Link from "next/link";

function FortuneSticksSVG() {
  return (
    <svg
      viewBox="0 0 160 240"
      className="w-[120px] sm:w-[160px] h-auto drop-shadow-lg"
      aria-label="Fortune stick container"
    >
      <defs>
        <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a3825" />
          <stop offset="50%" stopColor="#4a2c1a" />
          <stop offset="100%" stopColor="#3a1f12" />
        </linearGradient>
        <linearGradient id="woodRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b4530" />
          <stop offset="100%" stopColor="#3a1f12" />
        </linearGradient>
        <linearGradient id="stickGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a86c" />
          <stop offset="100%" stopColor="#a08050" />
        </linearGradient>
        <linearGradient id="goldStick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d080" />
          <stop offset="40%" stopColor="#d4a84b" />
          <stop offset="100%" stopColor="#b8922f" />
        </linearGradient>
      </defs>

      {/* Container body */}
      <path
        d="M35 100 Q35 90 45 88 L115 88 Q125 90 125 100 L122 210 Q122 225 110 228 L50 228 Q38 225 38 210 Z"
        fill="url(#woodGrad)"
        stroke="#6b4530"
        strokeWidth="1.5"
      />
      {/* Rim */}
      <ellipse cx="80" cy="92" rx="45" ry="10" fill="url(#woodRim)" stroke="#7a5438" strokeWidth="1" />
      {/* Inner shadow */}
      <ellipse cx="80" cy="92" rx="38" ry="7" fill="#1a0f0a" opacity="0.6" />

      {/* Decorative band */}
      <rect x="42" y="140" width="76" height="3" rx="1" fill="#d4a84b" opacity="0.4" />
      <rect x="42" y="170" width="76" height="3" rx="1" fill="#d4a84b" opacity="0.3" />

      {/* Fortune sticks */}
      <line x1="65" y1="30" x2="68" y2="85" stroke="url(#stickGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="35" x2="76" y2="85" stroke="url(#stickGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="85" y1="32" x2="84" y2="85" stroke="url(#stickGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="95" y1="38" x2="90" y2="85" stroke="url(#stickGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="36" x2="62" y2="85" stroke="url(#stickGrad)" strokeWidth="3" strokeLinecap="round" />

      {/* Golden stick - being drawn */}
      <line x1="78" y1="8" x2="80" y2="82" stroke="url(#goldStick)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Gold tip */}
      <circle cx="78" cy="8" r="3" fill="#f0d080" opacity="0.9" />
      {/* Glow on gold stick */}
      <line x1="78" y1="8" x2="80" y2="82" stroke="#d4a84b" strokeWidth="6" strokeLinecap="round" opacity="0.15" />

      {/* Chinese character on container */}
      <text x="80" y="195" textAnchor="middle" fill="#d4a84b" opacity="0.5" fontSize="22" fontFamily="serif">籤</text>
    </svg>
  );
}

function LanternSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 40" className={className} style={style} aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2="8" stroke="#d4a84b" strokeWidth="1" />
      <rect x="8" y="6" width="8" height="2" rx="1" fill="#d4a84b" opacity="0.8" />
      <ellipse cx="12" cy="22" rx="9" ry="14" fill="#8b2c2c" opacity="0.9" />
      <ellipse cx="12" cy="22" rx="9" ry="14" fill="none" stroke="#a33b3b" strokeWidth="0.5" />
      <line x1="12" y1="8" x2="12" y2="36" stroke="#d4a84b" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="12" cy="22" rx="5" ry="10" fill="#a33b3b" opacity="0.3" />
      <rect x="9" y="35" width="6" height="2" rx="1" fill="#d4a84b" opacity="0.6" />
      <line x1="12" y1="37" x2="12" y2="40" stroke="#d4a84b" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function Flourish() {
  return (
    <svg viewBox="0 0 200 12" className="w-48 sm:w-56 h-3 mx-auto mb-4 mt-1" aria-hidden="true">
      <line x1="10" y1="6" x2="90" y2="6" stroke="#d4a84b" strokeWidth="0.5" opacity="0.5" />
      <line x1="110" y1="6" x2="190" y2="6" stroke="#d4a84b" strokeWidth="0.5" opacity="0.5" />
      <polygon points="100,2 104,6 100,10 96,6" fill="#d4a84b" opacity="0.6" />
      <circle cx="20" cy="6" r="1.5" fill="#d4a84b" opacity="0.3" />
      <circle cx="180" cy="6" r="1.5" fill="#d4a84b" opacity="0.3" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center">
      {/* Layer 1: Base gradient + candlelight glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 85%, rgba(212,168,75,0.08) 0%, transparent 70%), linear-gradient(to bottom, #2c1810, #1a0f0a 40%, #1a0f0a)",
        }}
      />

      {/* Layer 2: Chinese lattice pattern */}
      <div className="absolute inset-0 hero-lattice-bg opacity-[0.04]" />

      {/* Layer 3: Mist bands */}
      <div
        className="absolute top-1/4 left-0 right-0 h-32 mist-drift"
        style={{
          background: "linear-gradient(to right, transparent, rgba(245,239,230,0.015), transparent)",
        }}
      />
      <div
        className="absolute top-2/3 left-0 right-0 h-24 mist-drift"
        style={{
          animationDelay: "-12s",
          animationDuration: "30s",
          background: "linear-gradient(to right, transparent, rgba(212,168,75,0.02), transparent)",
        }}
      />

      {/* Layer 4: Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(26,15,10,0.6) 100%)",
        }}
      />

      {/* Floating lanterns */}
      <LanternSVG className="absolute top-16 left-[8%] w-5 sm:w-6 opacity-[0.15] float-lantern" />
      <LanternSVG className="absolute top-24 right-[10%] w-4 sm:w-5 opacity-[0.12] float-lantern hidden sm:block" style={{ animationDelay: "-2s", animationDuration: "7s" }} />
      <LanternSVG className="absolute top-[55%] left-[5%] w-4 opacity-[0.1] float-lantern hidden sm:block" style={{ animationDelay: "-4s", animationDuration: "8s" }} />
      <LanternSVG className="absolute top-[45%] right-[6%] w-5 opacity-[0.13] float-lantern" style={{ animationDelay: "-1s", animationDuration: "7.5s" }} />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center py-16 sm:py-20">
        {/* Fortune stick container with glow */}
        <div
          className="relative inline-block mb-8 fade-in-up"
          style={{ opacity: 0, animationDelay: "0.2s" }}
        >
          {/* Golden halo */}
          <div className="absolute inset-0 -inset-x-12 -inset-y-8 glow-pulse">
            <div
              className="w-full h-full rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(212,168,75,0.2) 0%, rgba(212,168,75,0.05) 50%, transparent 70%)",
              }}
            />
          </div>
          <FortuneSticksSVG />

          {/* Incense smoke trails */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <div
              className="w-[2px] h-10 rounded-full incense-smoke"
              style={{
                background: "linear-gradient(to top, rgba(212,168,75,0.2), transparent)",
              }}
            />
            <div
              className="w-[2px] h-12 rounded-full incense-smoke"
              style={{
                background: "linear-gradient(to top, rgba(212,168,75,0.15), transparent)",
                animationDelay: "-1.5s",
                animationDuration: "5s",
              }}
            />
            <div
              className="w-[2px] h-8 rounded-full incense-smoke"
              style={{
                background: "linear-gradient(to top, rgba(212,168,75,0.18), transparent)",
                animationDelay: "-3s",
                animationDuration: "3.5s",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className="poem-text hero-title-glow text-4xl sm:text-6xl font-bold text-[#d4a84b] mb-2 tracking-wide fade-in-up"
          style={{ opacity: 0, animationDelay: "0.4s" }}
        >
          籤詩 AI 解籤
        </h1>

        {/* Decorative flourish */}
        <div className="fade-in-up" style={{ opacity: 0, animationDelay: "0.5s" }}>
          <Flourish />
        </div>

        {/* Subtitle */}
        <h2
          className="text-lg sm:text-xl text-[#f5efe6]/60 mb-2 tracking-widest uppercase fade-in-up"
          style={{ opacity: 0, animationDelay: "0.6s" }}
        >
          Bless You — AI Fortune Stick Interpreter
        </h2>

        <p
          className="max-w-2xl mx-auto text-[#f5efe6]/50 mb-10 leading-relaxed fade-in-up"
          style={{ opacity: 0, animationDelay: "0.8s" }}
        >
          Experience the ancient art of Chinese temple fortune sticks, powered by
          modern AI. Draw a stick, read the poem, and receive divine
          interpretation through RAG, Knowledge Graph, and LLM technology.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up"
          style={{ opacity: 0, animationDelay: "1.0s" }}
        >
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
        <div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 fade-in-up"
          style={{ opacity: 0, animationDelay: "1.2s" }}
        >
          {[
            { icon: "🎋", title: "1. Draw", titleZh: "抽籤", desc: "Shake the bamboo container and draw a fortune stick" },
            { icon: "📜", title: "2. Read", titleZh: "解詩", desc: "Read the four-line poem and its classical interpretation" },
            { icon: "🔮", title: "3. Interpret", titleZh: "AI 解籤", desc: "Get AI-powered advice through RAG + Knowledge Graph + LLM" },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-[#4a2c1a]/60 bg-[#2c1810]/50 p-6 transition-all hover:border-[#d4a84b]/30 hover:shadow-[inset_0_0_30px_rgba(212,168,75,0.04)]"
            >
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
