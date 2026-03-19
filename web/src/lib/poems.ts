import type { Poem, FortuneCategory } from "./types";

let cachedPoems: Poem[] | null = null;

export async function loadPoems(): Promise<Poem[]> {
  if (cachedPoems) return cachedPoems;
  const res = await fetch("/data/all_chances.json");
  cachedPoems = await res.json();
  return cachedPoems!;
}

export function filterPoems(
  poems: Poem[],
  category: FortuneCategory
): Poem[] {
  if (category === "all") return poems;
  return poems.filter((p) => p.吉凶 === category);
}

export function getRandomPoem(poems: Poem[]): Poem {
  return poems[Math.floor(Math.random() * poems.length)];
}

export function getPoemImageUrl(poem: Poem): string {
  return poem.img_url || "/images/fortune_default.png";
}

export function getPoemNumber(poem: Poem): number {
  return poem.id + 1;
}

export function getFortuneEmoji(fortune: string): string {
  switch (fortune) {
    case "上籤":
      return "🌟";
    case "中籤":
      return "☯";
    case "下籤":
      return "⚠";
    default:
      return "🔮";
  }
}
