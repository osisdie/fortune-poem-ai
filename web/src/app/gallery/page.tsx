"use client";

import { useEffect, useState } from "react";
import type { Poem, FortuneCategory } from "@/lib/types";
import { loadPoems, filterPoems } from "@/lib/poems";
import PoemCard from "@/components/PoemCard";

const FILTERS: { label: string; value: FortuneCategory }[] = [
  { label: "All 全部 (100)", value: "all" },
  { label: "上籤 Good (30)", value: "上籤" },
  { label: "中籤 Normal (50)", value: "中籤" },
  { label: "下籤 Bad (20)", value: "下籤" },
];

export default function GalleryPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filter, setFilter] = useState<FortuneCategory>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoems().then((data) => {
      setPoems(data);
      setLoading(false);
    });
  }, []);

  const displayed = filterPoems(poems, filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="poem-text text-3xl sm:text-4xl font-bold text-[#d4a84b] mb-3">
          百首籤詩 Poem Gallery
        </h1>
        <p className="text-[#f5efe6]/50">
          Browse all 100 fortune poems from Longshan Temple (龍山寺)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-lg px-4 py-2 text-sm transition-all ${
              filter === f.value
                ? "bg-[#d4a84b] text-[#1a0f0a] font-bold"
                : "border border-[#4a2c1a] text-[#f5efe6]/60 hover:border-[#d4a84b]/50 hover:text-[#d4a84b]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-[#f5efe6]/30 mb-6">
        Showing {displayed.length} poems
      </p>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 gold-shimmer">🏮</div>
          <p className="text-[#f5efe6]/40">Loading poems...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayed.map((poem) => (
            <PoemCard key={poem.id} poem={poem} showImage />
          ))}
        </div>
      )}
    </div>
  );
}
