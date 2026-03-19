"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#4a2c1a]/60 bg-[#1a0f0a]/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🏮</span>
          <span className="text-lg font-bold text-[#d4a84b] group-hover:text-[#e8c36a] transition-colors">
            Bless You
          </span>
          <span className="hidden sm:inline text-sm text-[#c9963c]/70">
            籤詩 AI 解籤
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/demo"
            className="text-[#f5efe6]/80 hover:text-[#d4a84b] transition-colors"
          >
            抽籤 Demo
          </Link>
          <Link
            href="/gallery"
            className="text-[#f5efe6]/80 hover:text-[#d4a84b] transition-colors"
          >
            百首籤詩 Gallery
          </Link>
          <a
            href="https://github.com/osisdie/fortune-poem-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[#4a2c1a] px-3 py-1.5 text-sm text-[#f5efe6]/70 hover:border-[#d4a84b]/50 hover:text-[#d4a84b] transition-all"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#f5efe6]/70"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#4a2c1a]/60 bg-[#1a0f0a]/98 px-4 py-3 space-y-3">
          <Link
            href="/demo"
            className="block text-[#f5efe6]/80 hover:text-[#d4a84b]"
            onClick={() => setMenuOpen(false)}
          >
            抽籤 Demo
          </Link>
          <Link
            href="/gallery"
            className="block text-[#f5efe6]/80 hover:text-[#d4a84b]"
            onClick={() => setMenuOpen(false)}
          >
            百首籤詩 Gallery
          </Link>
          <a
            href="https://github.com/osisdie/fortune-poem-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#f5efe6]/70 hover:text-[#d4a84b]"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
