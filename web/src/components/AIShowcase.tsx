"use client";

import { useEffect, useState } from "react";
import type { LLMResponse } from "@/lib/types";
import {
  loadGPTResponses,
  loadClaudeResponses,
  SHOWCASE_POEM_NUMBER,
  SHOWCASE_PROMPT,
} from "@/lib/llm-responses";

type ModelTab = "gpt" | "claude";

export default function AIShowcase() {
  const [gptResponses, setGptResponses] = useState<LLMResponse[]>([]);
  const [claudeResponses, setClaudeResponses] = useState<LLMResponse[]>([]);
  const [activeTab, setActiveTab] = useState<ModelTab>("gpt");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([loadGPTResponses(), loadClaudeResponses()]).then(
      ([gpt, claude]) => {
        setGptResponses(gpt);
        setClaudeResponses(claude);
        setLoading(false);
      }
    );
  }, []);

  const responses = activeTab === "gpt" ? gptResponses : claudeResponses;
  const current = responses[selectedIdx];

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="text-2xl mb-3 gold-shimmer">🤖</div>
        <p className="text-[#f5efe6]/40">Loading AI responses...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#4a2c1a]/60 bg-[#2c1810]/40 overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#4a2c1a]/40 px-5 py-4">
        <h3 className="text-lg font-bold text-[#d4a84b] mb-1">
          🤖 AI Response Showcase
        </h3>
        <p className="text-sm text-[#f5efe6]/50">
          Pre-cached LLM responses for Poem #{SHOWCASE_POEM_NUMBER} —
          第五十八首 羅隱歸咎越王
        </p>
        <div className="mt-2 rounded-lg bg-[#1a0f0a]/60 px-3 py-2">
          <span className="text-xs text-[#c9963c]/60">User Prompt: </span>
          <span className="text-sm text-[#f5efe6]/80">
            「{SHOWCASE_PROMPT}」
          </span>
        </div>
      </div>

      {/* Model tabs */}
      <div className="flex border-b border-[#4a2c1a]/40">
        {(
          [
            { key: "gpt" as ModelTab, label: "GPT-4o", icon: "🟢", count: gptResponses.length },
            { key: "claude" as ModelTab, label: "Claude 3.5", icon: "🟠", count: claudeResponses.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedIdx(0);
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[#4a2c1a]/40 text-[#d4a84b] border-b-2 border-[#d4a84b]"
                : "text-[#f5efe6]/40 hover:text-[#f5efe6]/60"
            }`}
          >
            {tab.icon} {tab.label}
            <span className="ml-1 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Temperature selector */}
      {responses.length > 1 && (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#4a2c1a]/30 overflow-x-auto">
          <span className="text-xs text-[#f5efe6]/40 shrink-0">Temperature:</span>
          {responses.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i)}
              className={`shrink-0 rounded-md px-2.5 py-1 text-xs transition-all ${
                selectedIdx === i
                  ? "bg-[#d4a84b] text-[#1a0f0a] font-bold"
                  : "border border-[#4a2c1a] text-[#f5efe6]/50 hover:border-[#d4a84b]/50"
              }`}
            >
              {r.temperature}
            </button>
          ))}
        </div>
      )}

      {/* Response content */}
      {current && (
        <div className="p-5">
          {/* Metadata */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs text-[#f5efe6]/40">
            <span className="rounded bg-[#1a0f0a]/60 px-2 py-1">
              Model: {current.model}
            </span>
            <span className="rounded bg-[#1a0f0a]/60 px-2 py-1">
              Temp: {current.temperature}
            </span>
            {current.max_tokens && (
              <span className="rounded bg-[#1a0f0a]/60 px-2 py-1">
                Max Tokens: {current.max_tokens}
              </span>
            )}
            <span className="rounded bg-[#1a0f0a]/60 px-2 py-1">
              Time: {current.execution_time}
            </span>
          </div>

          {/* Response text */}
          <div className="rounded-lg bg-[#1a0f0a]/60 p-4 max-h-[500px] overflow-y-auto">
            {current.response_text.split("\n").map((line, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${
                  line.startsWith("您抽到的籤是") || line.startsWith("籤詩:")
                    ? "poem-text text-[#d4a84b] font-bold"
                    : line.startsWith("籤詩解讀") || line.startsWith("小廟公建議")
                      ? "text-[#c9963c] font-medium mt-3"
                      : line.startsWith("-") || line.match(/^\d+\./)
                        ? "text-[#f5efe6]/70 pl-4"
                        : "text-[#f5efe6]/60"
                } ${line.trim() === "" ? "h-3" : ""}`}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="border-t border-[#4a2c1a]/30 px-5 py-3">
        <p className="text-xs text-[#f5efe6]/30 text-center">
          These are pre-cached responses generated during development — no live
          API calls are made on this demo site.
          <br />
          For live AI interpretation, run the{" "}
          <a
            href="https://github.com/osisdie/fortune-poem-ai"
            className="text-[#d4a84b]/50 hover:text-[#d4a84b]"
          >
            Gradio app
          </a>{" "}
          with your own API keys.
        </p>
      </div>
    </div>
  );
}
