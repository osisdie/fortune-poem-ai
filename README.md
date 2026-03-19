<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <!-- Background with light sketch texture -->
  <rect width="300" height="300" fill="#f5f5f5"/>
  <!-- Sketchy container/筒 with loose pencil-like strokes -->
  <path d="M100 200 L100 100 Q150 80 200 100 L200 200 Q150 220 100 200"
        fill="none"
        stroke="#3d3d3d"
        stroke-width="3"
        stroke-dasharray="5,5"/>
  <!-- Fortune sticks with varying angles -->
  <line x1="130" y1="120" x2="150" y2="50" stroke="#4a4a4a" stroke-width="2"/>
  <line x1="160" y1="130" x2="180" y2="60" stroke="#4a4a4a" stroke-width="2"/>
  <line x1="140" y1="140" x2="170" y2="70" stroke="#4a4a4a" stroke-width="2"/>
  <!-- Chinese characters with handwritten style -->
  <text x="50" y="250" font-family="SimSun, STSong" font-size="20" fill="#1a1a1a">
    <tspan x="50" dy="0">籤詩</tspan>
    <tspan x="50" dy="30">吉凶禍福</tspan>
    <tspan x="50" dy="30">平安</tspan>
  </text>
</svg>

# Bless You — RAG + Knowledge Graph + LLM Chatbot for Fortune Stick Interpretation

**[中文版 README](./README.zh-TW.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Gradio](https://img.shields.io/badge/Gradio-4.0+-orange.svg)](https://gradio.app)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-green.svg)](https://neo4j.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)

> **[Try the Live Demo](https://fortune-poem-ai.vercel.app)** | Traditional Chinese fortune stick culture meets modern AI

![Web UI](./images/webui-app.png)

---

## About

籤詩文化是華人社會深厚的傳統，透過神諭指引人們面對人生的困惑。本專案將古老的籤詩文化與現代科技結合，利用人工智慧技術，提供更便捷、更深入的解籤體驗。

Fortune stick culture, deeply rooted in Chinese-speaking societies, offers divine guidance to navigate life's uncertainties. This project integrates this ancient tradition with modern technology — combining **RAG**, **Knowledge Graph**, **LLM**, and **BERT embeddings** — to create an intelligent interpretation platform for 100 poems from [Longshan Temple (龍山寺)](https://www.lungshan.org.tw/).

> **Note**: AI interpretations are for reference only. Fortune stick culture is a cherished tradition — please approach with respect.

---

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/osisdie/fortune-poem-ai.git
cd fortune-poem-ai

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Launch app + Neo4j
docker compose up -d
```

Visit `http://localhost:7860` for the Gradio app and `http://localhost:7474` for the Neo4j dashboard.

### Option 2: Manual Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start Neo4j separately (or use Docker: docker compose up neo4j -d)

# Run the preprocessing notebooks (see Preprocessing section below)
# Then launch the Gradio app notebook:
jupyter notebook bless_u-chatbot-100.ipynb
```

### Option 3: Web Demo (No setup required)

Visit the [Next.js showcase site](https://fortune-poem-ai.vercel.app) to browse all 100 poems and try the interactive fortune-drawing demo — no API keys or database required.

---

## Architecture

![Neo4j Design](./images/neo4j-design.png)

### Technology Stack

| Technology | Purpose |
|---|---|
| **RAG** | Retrieval-Augmented Generation for grounding LLM responses |
| **Neo4j** | Knowledge Graph database storing poem relationships |
| **BERT** (`ckiplab/bert-base-chinese`) | Chinese-specific embeddings for similarity search |
| **LLM** (GPT-4o / Claude 3.5) | AI-powered poem interpretation via `aisuite` |
| **Gradio** | Interactive web interface |
| **Next.js** | Static showcase site deployed on Vercel |
| **BeautifulSoup** | Web scraping for poem data collection |
| **NetworkX** | Knowledge graph visualization |

### LLM Integration

The system calls **GPT-4o** and **Claude 3.5 Sonnet** in parallel via `aisuite`, with a Neo4j-based caching layer that skips API calls when a similar question has been asked before (cosine similarity > 0.75).

```
User Question → Neo4j Similarity Search → Hit? → Return cached response
                                        → Miss? → GPT-4o + Claude 3.5 → Store in Neo4j
```

> See [docs/llm_architecture.md](./docs/llm_architecture.md) for full details on the Temple class hierarchy, prompt construction, and caching strategy.

### Graph+RAG: Dynamic Graph Updates

When users ask questions, the graph dynamically updates in real time. New `UserPrompt` nodes are linked to poems via `HAS_PROMPT` relationships, with `purpose_embedding` and `answer_embedding` for similarity-based search using `gds.similarity.cosine`.

![Neo4j Embedding Example](./images/neo4j-embedding.png)

---

## Preprocessing

### 1. Web Crawler
Collect data on 100 poems including text and images.
> Implementation: [step1-bless_u-crawler](./pre-process/step1-bless_u-crawler.ipynb)

**Output**: [all_chances.json](./data/all_chances.json) + knowledge graph visualizations:

| Good Poems (30) | Normal Poems (50) | Bad Poems (20) |
|---|---|---|
| ![Good](./images/knowledge_graph_group_good_30.png) | ![Normal](./images/knowledge_graph_group_normal_50.png) | ![Bad](./images/knowledge_graph_group_bad_20.png) |

### 2. LLM Poem Interpretation Expansion
Generate additional `UserPrompt` data using LLMs.
> Implementation: [step2-bless_u-LLM-poem-answers-gen](./pre-process/step2-bless_u-LLM-poem-answers-gen.ipynb)

### 3. Word Embedding Model
Using `ckiplab/bert-base-chinese` for cosine similarity in Neo4j.
> Implementation: [step3-bless_u-model-fine-tuning](./pre-process/step3-bless_u-model-fine-tuning.ipynb) | [BERT.md](./BERT.md)

| Training Loss | Validation Loss |
|---|---|
| ![Training](./images/training_results_loss.png) | ![Validation](./images/training_results_eval.png) |

### 4. Neo4j Graph Database
Export poems and relationships into Neo4j for similarity search.
> Implementation: [step4-bless_u-neo4j](./pre-process/step4-bless_u-neo4j.ipynb)

![Neo4j Poem Example](./images/neo4j-poem.png)

---

## Web UI

Execute [bless_u-chatbot-100.ipynb](./bless_u-chatbot-100.ipynb) to launch the Gradio app:

| Initial Interface | Interaction Example |
|---|---|
| ![Web UI](./images/webui-app.png) | ![Debug](./images/webui-debug.png) |

---

## Project Structure

```
.
├── bless_u-chatbot-100.ipynb   # Main Gradio app
├── data/
│   ├── all_chances.json        # 100 poems with full metadata
│   ├── all_contexts.json       # Pre-formatted RAG contexts
│   ├── all_divine.json         # 15 divine categories + sample questions
│   ├── chatgpt_response.json   # Cached GPT-4o responses
│   └── claude_response.json    # Cached Claude responses
├── images/                     # Screenshots and graph visualizations
├── pre-process/                # Data collection & preprocessing notebooks
├── web/                        # Next.js showcase site (Vercel deployment)
├── Dockerfile                  # Python/Gradio container
├── docker-compose.yml          # App + Neo4j orchestration
└── requirements.txt            # Python dependencies
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on setting up the development environment, code style, and how to add poems or modify the graph schema.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

**Enjoy the platform, and we look forward to getting your feedback!**
