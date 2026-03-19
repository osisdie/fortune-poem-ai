# Contributing to Bless You - RAG Graph LLM Chatbot

Thank you for your interest in contributing! This project combines traditional Chinese fortune stick culture with modern AI technology.

## Getting Started

### Prerequisites
- Python 3.10+
- Neo4j 5.x (or use Docker Compose)
- Node.js 18+ (for the web showcase)
- API keys for OpenAI and/or Anthropic

### Setup

1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/<your-username>/fortune-poem-ai.git
   cd fortune-poem-ai
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and Neo4j credentials
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start Neo4j** (via Docker)
   ```bash
   docker compose up neo4j -d
   ```

5. **Run the notebooks** in order:
   - `pre-process/step1-bless_u-crawler.ipynb` — Data collection
   - `pre-process/step4-bless_u-neo4j.ipynb` — Graph database setup
   - `bless_u-chatbot-100.ipynb` — Launch the Gradio app

## Code Style

This project uses:
- **flake8** for Python linting (see `.flake8`)
- **pre-commit** hooks for automated checks

Install pre-commit hooks:
```bash
pip install pre-commit
pre-commit install
```

## How to Contribute

### Adding New Poems
1. Add poem data to `data/all_chances.json` following the existing schema
2. Include all required fields: `籤名`, `詩名`, `籤詩`, `吉凶`, `聖意`, etc.
3. Run the Neo4j import notebook to update the graph

### Modifying the Graph Schema
1. Review the current schema in `pre-process/step4-bless_u-neo4j.ipynb`
2. Document any new node types or relationships
3. Ensure backward compatibility with existing queries

### Web Showcase (Next.js)
```bash
cd web
npm install
npm run dev
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Ensure pre-commit hooks pass
4. Submit a PR with a description of your changes

## Questions?

Open an issue for bugs, feature requests, or questions about the project.
