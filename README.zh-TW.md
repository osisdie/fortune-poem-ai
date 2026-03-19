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

# 籤詩 AI 解籤 — RAG + 知識圖譜 + LLM 聊天機器人

**[English README](./README.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Gradio](https://img.shields.io/badge/Gradio-4.0+-orange.svg)](https://gradio.app)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-green.svg)](https://neo4j.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)

> **[線上體驗 Demo](https://fortune-poem-ai.vercel.app)** | 傳統籤詩文化結合現代 AI 技術

![Web UI](./images/webui-app.png)

---

## 關於本專案

籤詩文化是華人社會深厚的傳統，透過神諭指引人們面對人生的困惑。本專案將古老的籤詩文化與現代科技結合，利用 **RAG**、**知識圖譜**、**LLM** 與 **BERT 嵌入** 等技術，為[龍山寺](https://www.lungshan.org.tw/) 100 首籤詩打造智慧解籤平台。

> **注意**：AI 解籤結果僅供參考，籤詩文化是珍貴的傳統，請以尊重的心態使用。

---

## 快速開始

### 方式一：Docker（推薦）

```bash
# 複製專案
git clone https://github.com/osisdie/fortune-poem-ai.git
cd fortune-poem-ai

# 設定環境變數
cp .env.example .env
# 編輯 .env 填入 API 金鑰

# 啟動應用 + Neo4j
docker compose up -d
```

開啟 `http://localhost:7860` 使用 Gradio 應用，`http://localhost:7474` 查看 Neo4j 儀表板。

### 方式二：手動安裝

```bash
# 安裝 Python 套件
pip install -r requirements.txt

# 另外啟動 Neo4j（或用 Docker: docker compose up neo4j -d）

# 依序執行前處理 notebook（見下方前處理章節）
# 啟動 Gradio 應用：
jupyter notebook bless_u-chatbot-100.ipynb
```

### 方式三：線上 Demo（無需安裝）

前往 [Next.js 展示網站](https://fortune-poem-ai.vercel.app) 瀏覽 100 首籤詩並體驗抽籤互動 — 不需要 API 金鑰或資料庫。

---

## 架構

![Neo4j 設計](./images/neo4j-design.png)

### 技術棧

| 技術 | 用途 |
|---|---|
| **RAG** | 檢索增強生成，為 LLM 回應提供籤詩上下文 |
| **Neo4j** | 知識圖譜資料庫，儲存籤詩間的關聯 |
| **BERT** (`ckiplab/bert-base-chinese`) | 中文專用嵌入模型，用於相似度搜尋 |
| **LLM** (GPT-4o / Claude 3.5) | 透過 `aisuite` 進行 AI 解籤 |
| **Gradio** | 互動式 Web 介面 |
| **Next.js** | 靜態展示網站，部署於 Vercel |
| **BeautifulSoup** | 網頁爬蟲，收集籤詩資料 |
| **NetworkX** | 知識圖譜視覺化 |

### LLM 整合

系統同時呼叫 **GPT-4o** 和 **Claude 3.5 Sonnet**，並透過 Neo4j 快取層，當相似問題命中時（cosine similarity > 0.75）直接回傳歷史回應，省下 API 費用。

```
使用者提問 → Neo4j 相似度搜尋 → 命中？ → 回傳快取回應（零 API 成本）
                              → 未命中？ → GPT-4o + Claude 3.5 → 存入 Neo4j
```

> 完整 LLM 架構請見 [docs/llm_architecture.md](./docs/llm_architecture.md)

### Graph+RAG：動態圖譜更新

使用者提問時，圖譜會即時更新。新的 `UserPrompt` 節點透過 `HAS_PROMPT` 關係連結至籤詩，並附帶 `purpose_embedding` 和 `answer_embedding`，供 `gds.similarity.cosine` 進行相似度搜尋。

![Neo4j Embedding 範例](./images/neo4j-embedding.png)

---

## 前處理

### 1. 網頁爬蟲
收集 100 首籤詩的文字與圖片資料。
> 實作：[step1-bless_u-crawler](./pre-process/step1-bless_u-crawler.ipynb)

**輸出**：[all_chances.json](./data/all_chances.json) + 知識圖譜視覺化：

| 上籤 (30 首) | 中籤 (50 首) | 下籤 (20 首) |
|---|---|---|
| ![上籤](./images/knowledge_graph_group_good_30.png) | ![中籤](./images/knowledge_graph_group_normal_50.png) | ![下籤](./images/knowledge_graph_group_bad_20.png) |

### 2. LLM 籤詩解讀擴展
利用 LLM 生成額外的 `UserPrompt` 資料。
> 實作：[step2-bless_u-LLM-poem-answers-gen](./pre-process/step2-bless_u-LLM-poem-answers-gen.ipynb)

### 3. 詞嵌入模型
使用 `ckiplab/bert-base-chinese` 進行 Neo4j 中的 cosine similarity 搜尋。
> 實作：[step3-bless_u-model-fine-tuning](./pre-process/step3-bless_u-model-fine-tuning.ipynb) | [BERT.md](./BERT.md)

| 訓練損失 | 驗證損失 |
|---|---|
| ![訓練](./images/training_results_loss.png) | ![驗證](./images/training_results_eval.png) |

### 4. Neo4j 圖譜資料庫
將籤詩與關聯關係匯出至 Neo4j，供相似度搜尋使用。
> 實作：[step4-bless_u-neo4j](./pre-process/step4-bless_u-neo4j.ipynb)

![Neo4j 籤詩範例](./images/neo4j-poem.png)

---

## Web UI

執行 [bless_u-chatbot-100.ipynb](./bless_u-chatbot-100.ipynb) 啟動 Gradio 應用：

| 初始介面 | 互動範例 |
|---|---|
| ![Web UI](./images/webui-app.png) | ![Debug](./images/webui-debug.png) |

---

## 專案結構

```
.
├── bless_u-chatbot-100.ipynb   # 主要 Gradio 應用
├── data/
│   ├── all_chances.json        # 100 首籤詩完整資料
│   ├── all_contexts.json       # 預格式化 RAG 上下文
│   ├── all_divine.json         # 15 項聖意分類 + 範例問題
│   ├── chatgpt_response.json   # GPT-4o 快取回應
│   └── claude_response.json    # Claude 快取回應
├── docs/                       # 技術文件
│   ├── llm_architecture.md     # LLM 架構詳細說明
│   └── vercel_ci.md            # Vercel 部署筆記
├── images/                     # 截圖與圖譜視覺化
├── pre-process/                # 資料收集與前處理 notebook
├── web/                        # Next.js 展示網站（Vercel 部署）
├── Dockerfile                  # Python/Gradio 容器
├── docker-compose.yml          # App + Neo4j 編排
└── requirements.txt            # Python 套件
```

---

## 貢獻

請見 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解開發環境設定、程式風格規範，以及如何新增籤詩或修改圖譜結構。

---

## 授權

本專案使用 [MIT 授權](./LICENSE)。

---

**歡迎使用本平台，期待您的回饋！**
