"use client";

import Image from "next/image";
import { useState } from "react";
import type { Poem } from "@/lib/types";
import { FORTUNE_COLORS, FORTUNE_BG_COLORS } from "@/lib/types";
import { getPoemNumber, getPoemImageUrl } from "@/lib/poems";
import InterpretationDisplay from "./InterpretationDisplay";

interface PoemCardProps {
  poem: Poem;
  expanded?: boolean;
  showImage?: boolean;
}

export default function PoemCard({
  poem,
  expanded = false,
  showImage = false,
}: PoemCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [imgError, setImgError] = useState(false);
  const fortuneColor = FORTUNE_COLORS[poem.吉凶] || "text-gray-300";
  const fortuneBg = FORTUNE_BG_COLORS[poem.吉凶] || "bg-gray-900/40 border-gray-700/50";

  return (
    <div className={`rounded-xl border ${fortuneBg} overflow-hidden transition-all`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#f5efe6]/40">
                #{getPoemNumber(poem).toString().padStart(3, "0")}
              </span>
              <span className={`text-sm font-bold ${fortuneColor}`}>
                【{poem.吉凶}】{poem.詩運}
              </span>
            </div>
            <h3 className="poem-text text-lg font-bold text-[#d4a84b]">
              {poem.籤名}
            </h3>
            <p className="text-sm text-[#c9963c]/70">{poem.詩名}</p>
          </div>
          {showImage && (
            <div className="relative h-16 w-12 flex-shrink-0 rounded overflow-hidden bg-[#2c1810]">
              <Image
                src={imgError ? "/images/fortune_default.png" : getPoemImageUrl(poem)}
                alt={poem.籤名}
                fill
                className="object-cover"
                sizes="48px"
                onError={() => setImgError(true)}
              />
            </div>
          )}
        </div>

        {/* Poem verses */}
        <div className="rounded-lg bg-[#1a0f0a]/60 p-4 mb-3">
          {poem.籤詩.map((line, i) => (
            <p key={i} className="poem-text text-[#f5efe6]/90 text-center text-lg">
              {line}
            </p>
          ))}
        </div>

        {/* Brief interpretation */}
        <p className="text-sm text-[#f5efe6]/60 leading-relaxed mb-3">
          {poem.詩意}
        </p>

        {/* Expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-[#d4a84b]/70 hover:text-[#d4a84b] transition-colors"
        >
          {isExpanded ? "▲ 收合 Collapse" : "▼ 詳細解讀 View Details"}
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-[#4a2c1a]/40 p-5 fade-in-up">
          <InterpretationDisplay poem={poem} />
        </div>
      )}
    </div>
  );
}
