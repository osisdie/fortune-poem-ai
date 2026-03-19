# LLM Architecture

## Overview

本專案透過 **Temple 類別階層** 整合多個 LLM，並利用 Neo4j 快取機制減少 API 呼叫成本。

The project integrates multiple LLMs through a **Temple class hierarchy**, with a Neo4j caching layer to minimize API costs.

---

## Temple Class Hierarchy

```
TempleBase (ABC)
├── TempleOpenAI      → OpenAI GPT-4o
├── TempleAnthropic   → Claude 3.5 Sonnet
├── TempleSuite       → aisuite (multi-model unified interface)
└── TempleNeo4j       → Neo4j cache + OpenAI + Anthropic fallback
```

### TempleBase

抽象基底類別，定義 `pray()` 和 `_send_request()` 介面。

| Method | Purpose |
|---|---|
| `pray(df, lot_idx, prompt, temperature)` | 主要入口：解籤 |
| `_send_request(messages, max_tokens, temperature, model)` | 發送 API 請求 |
| `resolve_messages(df, lot_idx, prompt)` | 組合 system prompt + context + user question |

### TempleOpenAI

| Item | Value |
|---|---|
| SDK | `openai` (官方 Python SDK) |
| Model | `gpt-4o` |
| API Key | `OPENAI_API_KEY` (環境變數) |
| Temperature | 0.75 (default) |
| Max Tokens | 2048 |

### TempleAnthropic

| Item | Value |
|---|---|
| SDK | `anthropic` (官方 Python SDK) |
| Model | `claude-3-5-sonnet-20241022` |
| API Key | `ANTHROPIC_API_KEY` (環境變數) |
| Temperature | 0.75 (default) |
| Max Tokens | 2048 |

### TempleSuite

使用 [aisuite](https://github.com/andrewyng/aisuite)（Andrew Ng 的多模型統一 SDK），用同一個 `client.chat.completions.create()` 呼叫不同 LLM。

| Item | Value |
|---|---|
| SDK | `aisuite` |
| Models | `openai:gpt-4o`, `anthropic:claude-3-5-sonnet-20240620` |
| API Keys | 需要 `OPENAI_API_KEY` + `ANTHROPIC_API_KEY` |

### TempleNeo4j (Production — 主要使用)

**核心策略：先查快取，未命中才呼叫 LLM。**

內部組合 `TempleOpenAI` + `TempleAnthropic`，外加 Neo4j similarity search。

---

## Request Flow

```
使用者提問 (e.g., "最近身體欠佳, 請給予指示")
    │
    ▼
┌─────────────────────────────┐
│  TempleNeo4j.pray()         │
│                             │
│  1. BERT Embedding          │
│     使用者問題 → 768-dim vector │
│     (ckiplab/bert-base-chinese) │
│                             │
│  2. Neo4j Similarity Search │
│     MATCH (p:Poem)-[:HAS_PROMPT]->(up:UserPrompt) │
│     gds.similarity.cosine(  │
│       up.purpose_embedding, │
│       $new_embedding        │
│     ) > 0.75                │
│     LIMIT 3                 │
│                             │
│  ┌─── Hit? ─────────────┐   │
│  │ 直接回傳歷史 LLM 回應 │   │
│  │ (零 API 成本)         │   │
│  └───────────────────────┘   │
│                             │
│  ┌─── Miss? ────────────┐   │
│  │ 3. TempleOpenAI      │   │
│  │    → GPT-4o 回應      │   │
│  │ 4. TempleAnthropic   │   │
│  │    → Claude 3.5 回應  │   │
│  │ 5. 存入 Neo4j        │   │
│  │    (embedding + 回應)  │   │
│  └───────────────────────┘   │
└─────────────────────────────┘
    │
    ▼
  Gradio UI 顯示回應
```

---

## Prompt Construction

每次呼叫 LLM 時，`resolve_messages()` 組合以下 context：

```
[System Prompt]
  You are an assistant specialized in interpreting divination results.
  Use the following [Context] to provide insights and advice...

  [Response Format]
    您抽到的籤是: [籤名]
    籤詩: [四句詩]
    籤詩解讀:
    小廟公建議:

  [Context]
    籤名: 【中籤】中中 第五十八首-羅隱歸咎越王
    ~籤詩~ ...
    詳解: ...
    聖意: 家宅/自身/求財/交易/婚姻/... (15 categories)
    地支指示: 丑 → 東北 / 牛 / 土 / ...

[User Message]
  最近身體欠佳, 請給予指示
```

Context 來源於 `all_contexts.json`（預先格式化的 RAG context），包含：
- 籤詩全文 + 詳解
- 聖意 15 項（家宅、自身、求財...）
- 地支對應（方位、時辰、生肖、五行）

---

## Neo4j Caching — Cypher Queries

### 寫入新回應

```cypher
MATCH (p:Poem {number: $poem_number})
CREATE (up:UserPrompt {
  text: $user_question,
  llm_response: $response,
  purpose_embedding: $question_embedding,
  llm_response_embedding: $response_embedding
})
-[:GENERATED_BY]->(l:LLM {
  model: $model,
  temperature: $temperature,
  max_tokens: $max_tokens
})
CREATE (p)-[:HAS_PROMPT]->(up)
```

### 相似度搜尋

```cypher
MATCH (p:Poem {number: $poem_number})-[:HAS_PROMPT]->(up:UserPrompt)
OPTIONAL MATCH (up)-[:GENERATED_BY]->(llm:LLM)
WITH up, llm,
     gds.similarity.cosine(up.purpose_embedding, $new_embedding) AS similarity
WHERE similarity > 0.75
RETURN similarity, up.llm_response, llm.model
ORDER BY similarity DESC
LIMIT 3
```

---

## Default Parameters

| Parameter | Value | Notes |
|---|---|---|
| `TEMPERATURE` | 0.75 | 平衡創意與一致性 |
| `DEFAULT_TOKENS` | 2048 | 足夠完整的解籤回應 |
| Similarity Threshold | 0.75 | cosine similarity 門檻 |
| Similarity Limit | 3 | 最多回傳 3 筆相似結果 |
| Embedding Model | `ckiplab/bert-base-chinese` | 768-dim, 中文專用 |
| Embedding Dimension | 768 | BERT base hidden size |

---

## Cost Optimization

Neo4j 快取機制的效益：

1. **首次問答**：呼叫 GPT-4o + Claude 3.5（兩個 API call）
2. **後續相似問題**：直接從 Neo4j 回傳（零 API call）
3. **同一首籤的不同問題**：只要 cosine > 0.75 就命中快取

隨著使用者增加，快取命中率會持續提升，API 成本趨近於零。

---

## Files Reference

| File | Purpose |
|---|---|
| `bless_u-chatbot-100.ipynb` (Cell 49) | `TempleBase` — 抽象基底 |
| `bless_u-chatbot-100.ipynb` (Cell 51) | `TempleOpenAI` — OpenAI 整合 |
| `bless_u-chatbot-100.ipynb` (Cell 53) | `TempleAnthropic` — Anthropic 整合 |
| `bless_u-chatbot-100.ipynb` (Cell 55) | `TempleSuite` — aisuite 多模型 |
| `bless_u-chatbot-100.ipynb` (Cell 57) | `TempleNeo4j` — 快取 + LLM 組合 |
| `data/chatgpt_response.json` | GPT-4o 預快取回應（poem #58） |
| `data/claude_response.json` | Claude 3.5 預快取回應（poem #58） |
| `data/all_contexts.json` | 預格式化 RAG context（100 首） |
