"use client";

import { useState, useCallback } from "react";
import type { Poem } from "@/lib/types";
import { getRandomPoem, getPoemNumber } from "@/lib/poems";
import PoemCard from "./PoemCard";

interface FortuneDrawerProps {
  poems: Poem[];
}

type DrawState = "idle" | "shaking" | "revealing" | "done";

export default function FortuneDrawer({ poems }: FortuneDrawerProps) {
  const [state, setState] = useState<DrawState>("idle");
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  const drawStick = useCallback(() => {
    setState("shaking");
    setSelectedPoem(null);

    setTimeout(() => {
      const poem = getRandomPoem(poems);
      setSelectedPoem(poem);
      setState("revealing");

      setTimeout(() => {
        setState("done");
      }, 600);
    }, 1200);
  }, [poems]);

  const reset = useCallback(() => {
    setState("idle");
    setSelectedPoem(null);
  }, []);

  return (
    <div className="space-y-8">
      {/* Draw button area */}
      <div className="text-center">
        {state === "idle" && (
          <div className="fade-in-up">
            <p className="text-[#f5efe6]/50 mb-6">
              Close your eyes, focus on your question, then draw a fortune stick.
              <br />
              <span className="text-[#c9963c]/60">
                閉上眼睛，心中默念問題，然後抽籤。
              </span>
            </p>
            <button
              onClick={drawStick}
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8b2c2c] to-[#a33b3b] px-10 py-5 text-xl font-bold text-[#f5efe6] shadow-xl shadow-[#8b2c2c]/30 transition-all hover:shadow-2xl hover:shadow-[#8b2c2c]/40 hover:scale-105 active:scale-95"
            >
              <span className="text-3xl">🎋</span>
              抽籤 Draw a Stick
            </button>
          </div>
        )}

        {state === "shaking" && (
          <div className="py-10">
            <div className="text-8xl shake-animation mb-6">🎋</div>
            <p className="poem-text text-xl text-[#d4a84b] gold-shimmer">
              搖動竹筒中...
            </p>
            <p className="text-sm text-[#f5efe6]/40 mt-2">
              Shaking the bamboo container...
            </p>
          </div>
        )}

        {state === "revealing" && selectedPoem && (
          <div className="py-10 fade-in-up">
            <div className="text-6xl mb-4">✨</div>
            <p className="poem-text text-2xl text-[#d4a84b] mb-2">
              第{getPoemNumber(selectedPoem)}籤
            </p>
            <p className="text-[#f5efe6]/50">
              Fortune Stick #{getPoemNumber(selectedPoem)}
            </p>
          </div>
        )}

        {state === "done" && (
          <button
            onClick={reset}
            className="rounded-xl border border-[#4a2c1a] px-6 py-2.5 text-[#f5efe6]/60 hover:border-[#d4a84b]/50 hover:text-[#d4a84b] transition-all"
          >
            🔄 再抽一次 Draw Again
          </button>
        )}
      </div>

      {/* Result */}
      {state === "done" && selectedPoem && (
        <div className="fade-in-up">
          <PoemCard poem={selectedPoem} expanded showImage />
        </div>
      )}

      {/* Disclaimer */}
      {state === "done" && (
        <p className="text-center text-xs text-[#f5efe6]/30 max-w-md mx-auto leading-relaxed">
          This demo uses pre-cached poem data from Longshan Temple. For the full
          AI-powered experience with personalized LLM interpretation, run the{" "}
          <a
            href="https://github.com/osisdie/bless-you-RAG-Graph-LLM-Chatbot"
            className="text-[#d4a84b]/50 hover:text-[#d4a84b]"
          >
            Gradio app
          </a>
          .
        </p>
      )}
    </div>
  );
}
