"use client";

import { useState } from "react";
import type { Poem, ShengYi } from "@/lib/types";
import { SHENG_YI_LABELS } from "@/lib/types";

interface InterpretationDisplayProps {
  poem: Poem;
}

export default function InterpretationDisplay({ poem }: InterpretationDisplayProps) {
  const [openSection, setOpenSection] = useState<string | null>("解曰");

  const sections = [
    { key: "解曰", label: "解曰 Explanation", content: poem.解曰 },
    { key: "淺釋", label: "淺釋 Brief Interpretation", content: poem.淺釋 },
    { key: "靈籤", label: "靈籤 Spiritual Reading", content: poem.靈籤 },
    { key: "詳解", label: "詳解 Detailed Analysis", content: poem.詳解 },
  ];

  return (
    <div className="space-y-4">
      {/* Accordion sections */}
      {sections.map((section) => (
        <div key={section.key} className="rounded-lg border border-[#4a2c1a]/40 overflow-hidden">
          <button
            onClick={() =>
              setOpenSection(openSection === section.key ? null : section.key)
            }
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[#d4a84b] hover:bg-[#2c1810]/50 transition-colors"
          >
            {section.label}
            <span className="text-[#f5efe6]/30">
              {openSection === section.key ? "−" : "+"}
            </span>
          </button>
          {openSection === section.key && (
            <div className="px-4 pb-4 fade-in-up">
              <p className="poem-text text-sm text-[#f5efe6]/70 leading-relaxed">
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* 聖意 Grid */}
      <div className="rounded-lg border border-[#4a2c1a]/40 p-4">
        <h4 className="text-sm font-bold text-[#d4a84b] mb-3">
          聖意 Divine Guidance — 15 Categories
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {(Object.entries(poem.聖意) as [keyof ShengYi, string][]).map(
            ([key, value]) => (
              <div
                key={key}
                className="rounded-lg bg-[#1a0f0a]/60 px-3 py-2 text-center"
              >
                <div className="text-xs text-[#c9963c]/60 mb-0.5">
                  {key}
                </div>
                <div className="text-sm font-medium text-[#f5efe6]/80">
                  {value}
                </div>
                <div className="text-[10px] text-[#f5efe6]/30">
                  {SHENG_YI_LABELS[key]}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Poem metadata */}
      <div className="flex flex-wrap gap-2 text-xs text-[#f5efe6]/40">
        <span className="rounded bg-[#1a0f0a]/60 px-2 py-1">
          宮位: {poem.宮位}
        </span>
        {poem.url1 && (
          <a
            href={poem.url1}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#1a0f0a]/60 px-2 py-1 hover:text-[#d4a84b] transition-colors"
          >
            龍山寺 Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
