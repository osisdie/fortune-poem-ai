import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Bless You - AI Fortune Stick Interpreter | 籤詩 AI 解籤",
  description:
    "Experience traditional Chinese fortune stick culture with AI-powered interpretation. 100 poems from Longshan Temple with RAG, Knowledge Graph, and LLM technology.",
  keywords: [
    "fortune stick",
    "籤詩",
    "AI",
    "RAG",
    "knowledge graph",
    "Neo4j",
    "Chinese culture",
    "divination",
  ],
  openGraph: {
    title: "Bless You - AI Fortune Stick Interpreter",
    description:
      "Traditional Chinese fortune stick culture meets modern AI. Draw a stick, read your poem, receive divine interpretation.",
    type: "website",
    images: ["/images/webui-app.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bless You - AI Fortune Stick Interpreter",
    description:
      "Traditional Chinese fortune stick culture meets modern AI.",
    images: ["/images/webui-app.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSansTC.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
