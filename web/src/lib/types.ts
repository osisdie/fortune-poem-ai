export interface ShengYi {
  家宅: string;
  自身: string;
  求財: string;
  交易: string;
  婚姻: string;
  六甲: string;
  行人: string;
  田蠶: string;
  六畜: string;
  尋人: string;
  公訟: string;
  移徙: string;
  失物: string;
  疾病: string;
  山墳: string;
}

export interface Poem {
  id: number;
  籤名: string;
  詩名: string;
  詩運: string;
  籤詩: string[];
  吉凶: string;
  宮位: string;
  詩意: string;
  解曰: string;
  聖意: ShengYi;
  淺釋: string;
  靈籤: string;
  詳解: string;
  img_url: string;
  img_fname: string;
  url1: string;
  url2: string;
  url3: string;
  url4: string;
}

export interface LLMResponse {
  model: string;
  temperature: number;
  max_tokens: number | null;
  response_text: string;
  execution_time: string;
}

export type FortuneCategory = "上籤" | "中籤" | "下籤" | "all";

export const SHENG_YI_LABELS: Record<keyof ShengYi, string> = {
  家宅: "Home",
  自身: "Self",
  求財: "Wealth",
  交易: "Trade",
  婚姻: "Marriage",
  六甲: "Pregnancy",
  行人: "Traveler",
  田蠶: "Farming",
  六畜: "Livestock",
  尋人: "Missing Person",
  公訟: "Lawsuit",
  移徙: "Moving",
  失物: "Lost Item",
  疾病: "Illness",
  山墳: "Grave",
};

export const FORTUNE_COLORS: Record<string, string> = {
  上籤: "text-amber-300",
  中籤: "text-blue-300",
  下籤: "text-red-400",
};

export const FORTUNE_BG_COLORS: Record<string, string> = {
  上籤: "bg-amber-900/40 border-amber-700/50",
  中籤: "bg-blue-900/40 border-blue-700/50",
  下籤: "bg-red-900/40 border-red-700/50",
};
