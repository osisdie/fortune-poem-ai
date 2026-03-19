import Image from "next/image";

const TECH_CARDS = [
  {
    icon: "🔍",
    title: "RAG",
    subtitle: "Retrieval-Augmented Generation",
    desc: "Retrieves relevant poem context, interpretations, and divine guidance to ground LLM responses in authentic temple knowledge.",
    color: "border-blue-700/40 hover:border-blue-500/60",
  },
  {
    icon: "🕸️",
    title: "Knowledge Graph",
    subtitle: "Neo4j Graph Database",
    desc: "100 poems interconnected through Earthly Branches, Five Elements, Zodiac signs, and divine categories in a rich graph structure.",
    color: "border-green-700/40 hover:border-green-500/60",
  },
  {
    icon: "🤖",
    title: "LLM",
    subtitle: "GPT-4o & Claude 3.5",
    desc: "Multi-model AI interpretation using aisuite, with cached responses and similarity-based retrieval for repeated questions.",
    color: "border-purple-700/40 hover:border-purple-500/60",
  },
  {
    icon: "🧠",
    title: "BERT Embeddings",
    subtitle: "ckiplab/bert-base-chinese",
    desc: "Chinese-specific BERT model for semantic similarity search, enabling cosine-based matching of user questions within Neo4j.",
    color: "border-amber-700/40 hover:border-amber-500/60",
  },
];

const GRAPH_IMAGES = [
  { src: "/images/knowledge_graph_group_good_30.png", label: "Good Poems (上籤) — 30 poems", alt: "Knowledge graph of good fortune poems" },
  { src: "/images/knowledge_graph_group_normal_50.png", label: "Normal Poems (中籤) — 50 poems", alt: "Knowledge graph of normal fortune poems" },
  { src: "/images/knowledge_graph_group_bad_20.png", label: "Bad Poems (下籤) — 20 poems", alt: "Knowledge graph of bad fortune poems" },
  { src: "/images/neo4j-design.png", label: "Neo4j Schema Design", alt: "Neo4j graph database schema" },
  { src: "/images/neo4j-poem.png", label: "Poem #15 in Neo4j", alt: "Neo4j poem example" },
  { src: "/images/neo4j_graph.png", label: "Neo4j Full Graph", alt: "Neo4j full graph view" },
];

export default function TechStack() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Tech cards */}
        <h2 className="poem-text text-2xl sm:text-3xl font-bold text-[#d4a84b] text-center mb-3">
          Technology Stack
        </h2>
        <p className="text-center text-[#f5efe6]/50 mb-10">
          How ancient wisdom meets modern AI architecture
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {TECH_CARDS.map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border bg-[#2c1810]/40 p-5 transition-all ${card.color}`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-[#d4a84b] font-bold text-lg">{card.title}</h3>
              <p className="text-xs text-[#c9963c]/60 mb-2">{card.subtitle}</p>
              <p className="text-sm text-[#f5efe6]/50 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Knowledge Graph Gallery */}
        <h2 className="poem-text text-2xl sm:text-3xl font-bold text-[#d4a84b] text-center mb-3">
          Knowledge Graph Gallery
        </h2>
        <p className="text-center text-[#f5efe6]/50 mb-10">
          Visualizing the interconnected world of 100 fortune poems
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {GRAPH_IMAGES.map((img) => (
            <div
              key={img.src}
              className="group rounded-xl border border-[#4a2c1a]/60 bg-[#2c1810]/40 overflow-hidden transition-all hover:border-[#d4a84b]/30"
            >
              <div className="relative aspect-[4/3] bg-white/5">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-2 transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-[#f5efe6]/60 text-center">
                {img.label}
              </p>
            </div>
          ))}
        </div>

        {/* App screenshots */}
        <h2 className="poem-text text-2xl sm:text-3xl font-bold text-[#d4a84b] text-center mb-3">
          Gradio Web UI
        </h2>
        <p className="text-center text-[#f5efe6]/50 mb-10">
          The full interactive experience with AI-powered interpretation
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { src: "/images/webui-app.png", label: "Initial Interface", alt: "Gradio web UI" },
            { src: "/images/webui-debug.png", label: "AI Interaction Example", alt: "Gradio interaction example" },
          ].map((img) => (
            <div
              key={img.src}
              className="group rounded-xl border border-[#4a2c1a]/60 bg-[#2c1810]/40 overflow-hidden"
            >
              <div className="relative aspect-[16/10] bg-white/5">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-[#f5efe6]/60 text-center">
                {img.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
