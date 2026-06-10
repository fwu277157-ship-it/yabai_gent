/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import XiaHouseShowcase from "./components/XiaHouseShowcase";
import YabaiCalculator from "./components/YabaiCalculator";
import KnowledgeLibrary from "./components/KnowledgeLibrary";
import { Compass, FileText, Sparkles, Heart } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"showcase" | "calculator" | "knowledge">("showcase");
  const [theme, setTheme] = useState<"warm" | "mono">("warm");

  // State proxies to wire Calculator directly from case showcases
  const [overrideMm, setOverrideMm] = useState<number | null>(null);
  const [overrideOrient, setOverrideOrient] = useState<"horizontal" | "vertical" | null>(null);

  const isWarm = theme === "warm";

  const handleSendToCalculator = (mm: number, orient: "horizontal" | "vertical") => {
    // We pass this trigger to switch tabs and override values
    setOverrideMm(mm);
    setOverrideOrient(orient);
    setCurrentTab("calculator");

    // Clear overrides shortly after so users can adjust on top as well
    setTimeout(() => {
      // Find element and trigger values safely inside the calculator state
      const rangeInput = document.getElementById("dimension-range-slider") as HTMLInputElement;
      const numInput = document.getElementById("dimension-num-input") as HTMLInputElement;
      if (rangeInput) {
        rangeInput.value = mm.toString();
        rangeInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (numInput) {
        numInput.value = mm.toString();
        numInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      // Orientation Buttons Triggers
      const orientBtn = orient === "horizontal"
        ? document.getElementById("orient-horiz")
        : document.getElementById("orient-vert");
      if (orientBtn) {
        orientBtn.click();
      }
    }, 50);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-sans transition-all duration-500 ease-in-out border-[12px] ${
        isWarm
          ? "bg-art-bg text-art-text border-art-border"
          : "bg-ink-bg text-ink-text border-ink-border"
      }`}
    >
      {/* Top Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Clear any dynamic overrides
          setOverrideMm(null);
          setOverrideOrient(null);
        }}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Container with Sidebar */}
      <div className="flex-grow flex w-full max-w-7xl mx-auto">
        {/* Artistic Sidebar */}
        <aside className={`w-16 border-r flex flex-col items-center py-12 space-y-24 hidden lg:flex ${
          isWarm ? "bg-art-panel/40 border-art-text/15 text-art-text" : "bg-ink-panel/40 border-[#333333] text-zinc-500"
        }`}>
          <div className="writing-mode-vertical text-[10px] tracking-widest uppercase font-mono font-bold opacity-60">Project Index 001</div>
          <div className="writing-mode-vertical text-xl font-serif font-bold tracking-widest py-6 border-y border-current border-opacity-15 select-none">浦东夏氏宅</div>
          <div className="writing-mode-vertical text-[10px] tracking-widest uppercase font-mono font-bold opacity-60">Xia Residence</div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {currentTab === "showcase" && (
                <XiaHouseShowcase
                  theme={theme}
                  onSendToCalculator={handleSendToCalculator}
                />
              )}

              {currentTab === "calculator" && (
                <YabaiCalculator
                  theme={theme}
                />
              )}

              {currentTab === "knowledge" && (
                <KnowledgeLibrary
                  theme={theme}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Footer block */}
      <footer
        className={`border-t py-12 transition-all duration-500 ${
          isWarm
            ? "bg-art-panel border-art-border text-[#5C4D3C]"
            : "bg-ink-panel border-[#222222] text-zinc-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded border flex items-center justify-center ${
              isWarm ? "bg-white border-art-border text-art-accent" : "bg-black border-zinc-800 text-white"
            }`}>
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-serif font-bold">中国非官式古建筑・大木「压白」营造核算工具</p>
              <p className="text-xs opacity-60">基于上海浦东川沙夏家宅测绘实案和传统易化九星尺算逻辑</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-end text-center md:text-right text-xs space-y-1 opacity-75 font-mono">
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>学术研究与数字传承系统</span>
              <FileText className="h-3.5 w-3.5" />
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>大木设计放样 • 工艺科学探索与心理平衡仪式</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
