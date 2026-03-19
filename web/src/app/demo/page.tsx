"use client";

import { useEffect, useState } from "react";
import type { Poem } from "@/lib/types";
import { loadPoems } from "@/lib/poems";
import FortuneDrawer from "@/components/FortuneDrawer";

export default function DemoPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoems().then((data) => {
      setPoems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="poem-text text-3xl sm:text-4xl font-bold text-[#d4a84b] mb-3">
          抽籤 Fortune Drawing
        </h1>
        <p className="text-[#f5efe6]/50">
          Draw a fortune stick and receive your poem interpretation
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 gold-shimmer">🏮</div>
          <p className="text-[#f5efe6]/40">Loading poems...</p>
        </div>
      ) : (
        <FortuneDrawer poems={poems} />
      )}
    </div>
  );
}
