/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, BookOpen, Calculator, Home, Moon, Sun } from "lucide-react";

interface HeaderProps {
  currentTab: "showcase" | "calculator" | "knowledge";
  setCurrentTab: (tab: "showcase" | "calculator" | "knowledge") => void;
  theme: "warm" | "mono";
  setTheme: (theme: "warm" | "mono") => void;
}

export default function Header({ currentTab, setCurrentTab, theme, setTheme }: HeaderProps) {
  const isWarm = theme === "warm";

  return (
    <header
      id="app-header"
      className={`border-b transition-all duration-300 ${
        isWarm
          ? "bg-art-bg/95 border-art-border text-art-text"
          : "bg-ink-bg/95 border-ink-border text-ink-text"
      } sticky top-0 z-50 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab("showcase")}>
            <div
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                isWarm
                  ? "bg-art-accent text-[#fdfaf5] border-art-accent shadow-sm shadow-art-accent/15"
                  : "bg-[#F3F3F3] text-[#0A0A0A] border-white"
              }`}
            >
              <Compass className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight flex items-center">
                <span>压白尺 · 营造智鉴</span>
              </h1>
              <p className={`text-xs ${isWarm ? "text-art-text/60" : "text-zinc-500"} font-mono`}>
                Shanghai Pudong Folk Architecture Yabai Study v1.2
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            <button
              id="tab-btn-showcase"
              onClick={() => setCurrentTab("showcase")}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                currentTab === "showcase"
                  ? isWarm
                    ? "bg-art-accent text-[#fdfaf5] shadow-sm shadow-art-accent/15"
                    : "bg-white text-black"
                  : isWarm
                  ? "text-art-text/80 hover:bg-art-panel hover:text-art-text"
                  : "text-zinc-400 hover:bg-ink-panel hover:text-white"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">夏氏宅展示</span>
            </button>

            <button
              id="tab-btn-calculator"
              onClick={() => setCurrentTab("calculator")}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                currentTab === "calculator"
                  ? isWarm
                    ? "bg-art-accent text-[#fdfaf5] shadow-sm shadow-art-accent/15"
                    : "bg-white text-black"
                  : isWarm
                  ? "text-art-text/80 hover:bg-art-panel hover:text-art-text"
                  : "text-zinc-400 hover:bg-ink-panel hover:text-white"
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>压白测算</span>
            </button>

            <button
              id="tab-btn-knowledge"
              onClick={() => setCurrentTab("knowledge")}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                currentTab === "knowledge"
                  ? isWarm
                    ? "bg-art-accent text-[#fdfaf5] shadow-sm shadow-art-accent/15"
                    : "bg-white text-black"
                  : isWarm
                  ? "text-art-text/80 hover:bg-art-panel hover:text-art-text"
                  : "text-zinc-400 hover:bg-ink-panel hover:text-white"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>知识常识库</span>
            </button>

            <div className="w-px h-6 mx-2 bg-current opacity-20 hidden xs:block"></div>

            {/* Aesthetic Selector Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(isWarm ? "mono" : "warm")}
              className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer ${
                isWarm
                  ? "border-art-border text-art-accent hover:bg-art-panel"
                  : "border-zinc-805 text-zinc-300 hover:bg-zinc-900"
              }`}
              title={isWarm ? "切换为 建筑冷峻黑白" : "切换为 中式温润木调"}
            >
              {isWarm ? (
                <div className="flex items-center space-x-1 px-1">
                  <Moon className="h-4 w-4" />
                  <span className="text-[10px] font-mono hidden md:inline">冷水墨</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-1">
                  <Sun className="h-4 w-4 text-orange-400" />
                  <span className="text-[10px] font-mono hidden md:inline text-orange-400">暖木调</span>
                </div>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
