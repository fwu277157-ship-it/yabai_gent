/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { KNOWLEDGE_TERMS, STEP_GUIDES, FENGSHUI_DOGMAS } from "../data/knowledgeData";
import { Search, Info, HelpCircle, GraduationCap, ChevronRight, Hash } from "lucide-react";

interface KnowledgeLibraryProps {
  theme: "warm" | "mono";
}

export default function KnowledgeLibrary({ theme }: KnowledgeLibraryProps) {
  const isWarm = theme === "warm";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  // Get unique categories
  const categories = useMemo(() => {
    const list = new Set(KNOWLEDGE_TERMS.map((t) => t.category));
    return ["全部", ...Array.from(list)];
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return KNOWLEDGE_TERMS.filter((t) => {
      const matchQuery =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.detail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "全部" || t.category === selectedCategory;
      return matchQuery && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Intro Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
          isWarm ? "bg-[#B22222]/5 text-[#B22222] border-[#B22222]/20" : "bg-white/5 text-white border-white/20"
        }`}>
          <GraduationCap className="h-3.5 w-3.5" />
          <span>中国传统大木营造·法式与压白规范精讲</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
          法制与仪轨：民间营造风水常识库
        </h2>
        <p className={`text-sm sm:text-base ${isWarm ? "text-[#5C4D3C]" : "text-[#888888]"} max-w-2xl mx-auto font-sans leading-relaxed`}>
          压白测算不是单纯的术数，而是古代匠师在满足工程抗弯抗压物理极限之余，对人居心理安全感和空间伦理学进行的创造性空间平衡仪轨。
        </p>
      </div>

      {/* Grid: Timeline Guide & Famous Dogmas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Flow (Step_Guides) - 7 cols */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-current opacity-25">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${
              isWarm ? "bg-[#8B5A2B]/10 text-[#8B5A2B]" : "bg-white/10 text-white"
            }`}>01</span>
            <h3 className="font-serif text-lg font-bold">压白算法演练步序</h3>
          </div>

          <div className="space-y-6 relative pl-4 border-l border-current border-opacity-10 ml-3">
            {STEP_GUIDES.map((guide, idx) => (
              <motion.div
                key={guide.step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`relative p-5 rounded-lg border transition-all duration-300 ${
                  isWarm
                    ? "bg-[#FAF8F5] border-[#E8DFD0] hover:border-[#8B5A2B]/40 hover:shadow-md hover:shadow-[#8B5A2B]/5 text-[#2C1E14]"
                    : "bg-[#111111] border-[#222222] hover:border-white/30 hover:shadow-lg text-[#F3F3F3]"
                }`}
              >
                {/* Step Marker Badge */}
                <span className={`absolute -left-[29px] top-6 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ring-4 ${
                  isWarm
                    ? "bg-[#8B5A2B] text-white ring-[#FAF8F5]"
                    : "bg-white text-black ring-[#111111]"
                }`}>
                  {guide.step}
                </span>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-base flex items-center justify-between">
                    <span>{guide.title}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isWarm ? "bg-[#8B5A2B]/5 text-[#8B5A2B]" : "bg-white/5 text-[#888888]"
                    }`}>
                      步骤 {guide.step}
                    </span>
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isWarm ? "text-[#5C4D3C]" : "text-[#AAAAAA]"}`}>
                    {guide.description}
                  </p>

                  <div className={`mt-3 p-3 rounded text-xs font-mono flex flex-col space-y-1.5 ${
                    isWarm ? "bg-[#F3EFE9] text-[#704822]" : "bg-white/5 text-[#AAAAAA]"
                  }`}>
                    <div className="flex items-start space-x-1.5">
                      <span className="opacity-70 font-semibold shrink-0">推演公式:</span>
                      <span className="break-all">{guide.formula}</span>
                    </div>
                    <div className="flex items-start space-x-1.5">
                      <span className="opacity-70 font-semibold shrink-0">夏舍实证:</span>
                      <span className="italic">{guide.example}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Famous Custom Guild Rules (FENGSHUI_DOGMAS) - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-current opacity-25">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${
              isWarm ? "bg-[#8B5A2B]/10 text-[#8B5A2B]" : "bg-white/10 text-white"
            }`}>02</span>
            <h3 className="font-serif text-lg font-bold">行业营造仪轨俗谕</h3>
          </div>

          <div className="space-y-4">
            {FENGSHUI_DOGMAS.map((dogma, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`p-5 rounded-lg border relative overflow-hidden flex flex-col space-y-3 ${
                  isWarm
                    ? "bg-[#FDFBF7] border-[#8B5A2B]/15 text-[#2C1E14]"
                    : "bg-[#161616] border-white/5 text-[#F3F3F3]"
                }`}
              >
                {/* Hanging decoration resembling a seal */}
                <div className={`absolute top-0 right-3 px-1.5 py-2 font-serif text-[10px] writing-mode-vertical rounded-b ${
                  isWarm ? "bg-[#B22222] text-white" : "bg-white/10 text-[#F3F3F3]"
                }`}>
                  鲁班秘要
                </div>

                <div className="font-serif font-bold text-sm leading-relaxed pr-8 border-l-2 pl-2 border-[#B22222]">
                  {dogma.dogma}
                </div>

                <p className={`text-xs leading-relaxed ${isWarm ? "text-[#5C4D3C]" : "text-[#888888]"}`}>
                  <span className="font-bold mr-1 italic">释意:</span>
                  {dogma.explanation}
                </p>
              </motion.div>
            ))}

            {/* Quick Warning Card */}
            <div className={`p-4 rounded-lg border flex items-start space-x-3 text-xs ${
              isWarm
                ? "bg-[#FAF5EE] border-[#704822]/20 text-[#704822]"
                : "bg-amber-950/20 border-amber-900/40 text-amber-300"
            }`}>
              <Info className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">学术勘误提示：</span>
                在考察浦东民间古建筑时，切勿用常规现代的市卷尺或32cm城市定造尺套用，必须了解工匠习惯的本地‘掌尺数’。否则算出的九星往往完全颠倒，从而歪曲其原意。
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dictionary Card Browser Section */}
      <div className="space-y-6 pt-6 border-t border-current border-opacity-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 opacity-70" />
              <span>大木作营造词典百科</span>
            </h3>
            <p className={`text-xs ${isWarm ? "text-[#8B7E6F]" : "text-[#777777]"} mt-1`}>
              共收录 {KNOWLEDGE_TERMS.length} 个核心术语，涵盖罗盘转换、寸白颜色到木作工法解释
            </p>
          </div>

          {/* Dictionary Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? isWarm
                      ? "bg-[#8B5A2B] text-white shadow-sm"
                      : "bg-white text-black font-semibold"
                    : isWarm
                    ? "bg-[#F3EFE9] text-[#5C4D3C] hover:bg-[#EAE2D5]"
                    : "bg-[#111111] text-[#888888] hover:bg-[#222222] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-4 top-3.5 h-4 w-4 ${isWarm ? "text-[#8B7E6F]" : "text-zinc-500"}`} />
          <input
            id="glossary-search"
            type="text"
            placeholder="搜索词汇名字、拼音释意或解释细节..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 text-sm rounded-lg border outline-none transition-all duration-200 ${
              isWarm
                ? "bg-white border-[#E8DFD0] text-[#2C1E14] focus:border-[#8B5A2B] focus:ring-1 focus:ring-[#8B5A2B]"
                : "bg-[#111111] border-[#222222] text-white focus:border-white focus:ring-1 focus:ring-white"
            }`}
          />
        </div>

        {/* Grid of Dictionary entries */}
        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                  isWarm
                    ? "bg-white border-[#E8DFD0] hover:border-[#8B5A2B]/40 hover:shadow-md text-[#2C1E14]"
                    : "bg-[#111111] border-[#222222] hover:border-white/30 hover:shadow-lg text-[#F3F3F3]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isWarm ? "bg-[#8B5A2B]/10 text-[#8B5A2B]" : "bg-white/10 text-white"
                    }`}>
                      {term.category}
                    </span>
                    <span className="text-[10px] font-mono opacity-40">#{(index+1).toString().padStart(2, "0")}</span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg flex items-baseline space-x-2">
                      <span>{term.title}</span>
                      <span className={`text-xs font-mono font-normal tracking-wide italic ${
                        isWarm ? "text-[#8B7E6F]" : "text-[#777777]"
                      }`}>
                        [{term.pinyin}]
                      </span>
                    </h4>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed border-l-2 pl-3 border-opacity-40 italic ${
                    isWarm ? "text-[#5C4D3C] border-[#8B5A2B]" : "text-[#AAAAAA] border-white"
                  }`}>
                    {term.definition}
                  </p>
                </div>

                <div className={`mt-4 pt-4 border-t border-dashed text-xs leading-relaxed ${
                  isWarm ? "border-[#E8DFD0] text-[#8B7E6F]" : "border-zinc-800 text-[#888888]"
                }`}>
                  {term.detail}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 rounded-lg border ${
            isWarm ? "border-[#E8DFD0] text-[#8B7E6F]" : "border-[#222222] text-[#888888]"
          }`}>
            <HelpCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">未找到与关键词相匹配的营造学术词条</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("全部"); }}
              className="mt-2 text-xs underline cursor-pointer"
            >
              充至全部词典
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
