# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-03-19

### Added
- **Next.js showcase site** (`web/`) with temple-themed UI deployed on Vercel
  - Landing page with hero, tech stack cards, and knowledge graph gallery
  - Interactive fortune-drawing demo with animated stick reveal
  - Gallery page browsing all 100 poems with category filters (上籤/中籤/下籤)
  - PoemCard with expandable interpretation (解曰/淺釋/靈籤/詳解/聖意)
  - AI Response Showcase displaying pre-cached GPT-4o and Claude 3.5 Sonnet outputs
- **GitHub hygiene files**: MIT LICENSE, `.env.example`, `requirements.txt`, `CONTRIBUTING.md`
- **Docker support**: `Dockerfile` + `docker-compose.yml` (app + Neo4j 5.x)
- **CI pipelines**: GitHub Actions (`.github/workflows/ci.yml`) + GitLab CI (`.gitlab-ci.yml`)
- **Pre-push reviewer agent** (`.claude/agents/pre-push-reviewer.md`)
- **Documentation**:
  - `README.zh-TW.md` — full Chinese README
  - `docs/llm_architecture.md` — Temple class hierarchy, request flow, Neo4j caching
  - `docs/vercel_ci.md` — Vercel deployment notes and lessons learned

### Changed
- Rewrote `README.md` with badges, Quick Start guide, architecture overview, and LLM summary
- Updated `.gitignore` for Node.js/Next.js/Vercel/Claude Code entries
- Repo renamed from `bless-you-RAG-Graph-LLM-Chatbot` to `fortune-poem-ai`

## [0.1.0] - 2024

### Added
- Initial project with 100 fortune poems from Longshan Temple (龍山寺)
- Web crawler for poem data collection (`pre-process/step1`)
- LLM poem interpretation expansion with GPT-4o and Claude 3.5 (`pre-process/step2`)
- BERT fine-tuning experiments with `ckiplab/bert-base-chinese` (`pre-process/step3`)
- Neo4j graph database design with poem relationships (`pre-process/step4`)
- Gradio chatbot app (`bless_u-chatbot-100.ipynb`) with:
  - Multi-model LLM support via `aisuite` (OpenAI + Anthropic)
  - Neo4j similarity-based caching (cosine > 0.75)
  - Dynamic graph updates on user interaction
- Pre-processed data: `all_chances.json`, `all_contexts.json`, `all_divine.json`
- Cached LLM responses: `chatgpt_response.json`, `claude_response.json`
- Knowledge graph visualizations with NetworkX
