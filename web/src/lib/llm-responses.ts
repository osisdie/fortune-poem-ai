import type { LLMResponse } from "./types";

interface RawLLMEntry {
  model: string;
  temperature: number;
  max_tokens: number | null;
  response_text: string;
  execution_time: string;
}

let cachedGPT: LLMResponse[] | null = null;
let cachedClaude: LLMResponse[] | null = null;

export async function loadGPTResponses(): Promise<LLMResponse[]> {
  if (cachedGPT) return cachedGPT;
  const res = await fetch("/data/chatgpt_response.json");
  const data: RawLLMEntry[] = await res.json();
  cachedGPT = data.map((d) => ({
    model: d.model,
    temperature: d.temperature,
    max_tokens: d.max_tokens,
    response_text: d.response_text,
    execution_time: d.execution_time,
  }));
  return cachedGPT;
}

export async function loadClaudeResponses(): Promise<LLMResponse[]> {
  if (cachedClaude) return cachedClaude;
  const res = await fetch("/data/claude_response.json");
  const data: RawLLMEntry[] = await res.json();
  cachedClaude = data.map((d) => ({
    model: d.model,
    temperature: d.temperature,
    max_tokens: d.max_tokens,
    response_text: d.response_text,
    execution_time: d.execution_time,
  }));
  return cachedClaude;
}

export const SHOWCASE_POEM_NUMBER = 58;
export const SHOWCASE_PROMPT = "最近身體欠佳, 請給予指示";
