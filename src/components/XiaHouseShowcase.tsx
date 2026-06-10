/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { XIA_HOUSE_META, XIA_HOUSE_CASES } from "../data/xiaHouseData";
import { calculateYabai, formatYabaiMeasurement } from "../utils";
import { Compass, BookOpen, ChevronLeft, ChevronRight, HelpCircle, Eye, Sliders, Image, ListCollapse, CheckCircle, XCircle } from "lucide-react";

interface XiaHouseShowcaseProps {
  theme: "warm" | "mono";
  onSendToCalculator: (mm: number, orient: "horizontal" | "vertical") => void;
}

export default function XiaHouseShowcase({ theme, onSendToCalculator }: XiaHouseShowcaseProps) {
  const isWarm = theme === "warm";
  const rcHighlight = isWarm ? "#8c4a32" : "#f4f4f5";

  const [activeCaseId, setActiveCaseId] = useState<string>("kaijian_1");

  // Filter cases by category
  const [caseFilter, setCaseFilter] = useState<"all" | "开间" | "整体进深" | "柱距">("all");

  const filteredCases = XIA_HOUSE_CASES.filter(
    (c) => caseFilter === "all" || c.type === caseFilter
  );

  const activeCase = XIA_HOUSE_CASES.find((c) => c.id === activeCaseId) || XIA_HOUSE_CASES[0];

  // 3D Wireframe parameters
  const [explodeRatio, setExplodeRatio] = useState<number>(0);
  const [showRoof, setShowRoof] = useState<boolean>(true);
  const [showWall, setShowWall] = useState<boolean>(true);

  // Photos/Aerial diagrams for flipping carousel
  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const slides = [
    {
      title: "夏式宅三合院落骨架俯瞰",
      subtitle: "两进三合偏房整体空间格局",
      caption: "俯瞰可见两进三合天井格局，两翼观音兜火山墙巍峨落起，主次房屋中轴严整对称。",
      svg: (
        <svg className="w-full h-full text-current" viewBox="0 0 160 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <polygon points="40,30 80,12 120,30 80,48" strokeWidth="1" fill="currentColor" fillOpacity="0.06" />
          <polygon points="35,32 15,48 38,62 55,42" fill="currentColor" fillOpacity="0.04" />
          <polygon points="125,32 145,48 122,62 105,42" fill="currentColor" fillOpacity="0.04" />
          <rect x="58" y="44" width="44" height="25" strokeDasharray="2,2" opacity="0.4" />
          <text x="80" y="58" fontSize="7" textAnchor="middle" stroke="none" fill="currentColor" opacity="0.75" className="font-serif">天井庭院</text>
          <line x1="80" y1="5" x2="80" y2="88" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,1" opacity="0.4" />
          <path d="M12,46 C24,32 24,32 32,25 M148,46 C136,32 136,32 128,25" strokeWidth="1.2" strokeLinecap="round" />
          <text x="80" y="85" fontSize="6" textAnchor="middle" stroke="none" fill="currentColor" opacity="0.6">中轴大木定位线</text>
        </svg>
      )
    },
    {
      title: "观音兜封火山墙",
      subtitle: "形如大衣覆顶的优美江南火墙",
      caption: "夏氏宅山墙采用江南经典的【观音兜】消防火山墙形式。其高耸的圆拱弧线如观音衣兜罩顶，能阻断火势并完美御风。",
      svg: (
        <svg className="w-full h-full text-current" viewBox="0 0 160 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Real Guanyindou curved double wavy outline */}
          <path d="M 30,85 L 30,50 Q 30,35 45,30 Q 60,25 70,35 Q 80,45 80,15 Q 80,45 90,35 Q 100,25 115,30 Q 130,35 130,50 L 130,85" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
          <path d="M 28,50 Q 28,33 45,28 Q 60,23 70,33 Q 80,43 80,12 Q 80,43 90,33 Q 100,23 115,28 Q 130,33 132,50" strokeWidth="0.6" strokeDasharray="2,2" />
          {/* Center Window */}
          <rect x="73" y="40" width="14" height="20" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
          <line x1="80" y1="40" x2="80" y2="60" strokeWidth="0.6" />
          <line x1="73" y1="50" x2="87" y2="50" strokeWidth="0.6" />
          <rect x="71" y="38" width="18" height="24" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* Side Small windows */}
          <rect x="42" y="55" width="10" height="15" strokeWidth="0.7" />
          <rect x="108" y="55" width="10" height="15" strokeWidth="0.7" />
          <text x="80" y="80" fontSize="6.5" textAnchor="middle" stroke="none" fill="currentColor" opacity="0.8" className="font-serif">经典双波叠檐观音兜山墙</text>
        </svg>
      )
    },
    {
      title: "七路头27发",
      subtitle: "路头即进深排柱，连两椽中心线为一发",
      caption: "合庆镇营造中‘路头’指进深排柱。相邻两椽中心线为一‘发’（20-22cm），此发数主宰着整个厅堂在面宽方向的尺寸。",
      svg: (
        <svg className="w-full h-full text-current" viewBox="0 0 160 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          {/* Rafter Lines representing "Fa" (发) */}
          <g strokeOpacity="0.2">
            <line x1="20" y1="15" x2="20" y2="75" />
            <line x1="35" y1="15" x2="35" y2="75" />
            <line x1="50" y1="15" x2="50" y2="75" />
            <line x1="65" y1="15" x2="65" y2="75" />
            <line x1="80" y1="15" x2="80" y2="75" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="95" y1="15" x2="95" y2="75" />
            <line x1="110" y1="15" x2="110" y2="75" />
            <line x1="125" y1="15" x2="125" y2="75" />
            <line x1="140" y1="15" x2="140" y2="75" />
          </g>
          {/* Pillars representing "Lutou" (路头) */}
          <line x1="35" y1="80" x2="35" y2="35" strokeWidth="2.2" />
          <line x1="125" y1="80" x2="125" y2="35" strokeWidth="2.2" />
          <line x1="80" y1="80" x2="80" y2="20" strokeWidth="2.8" />
          <path d="M 35,35 L 80,20 L 125,35" strokeWidth="1.5" />
          <circle cx="80" cy="20" r="2.5" fill="currentColor" />
          <circle cx="35" cy="35" r="2" fill="currentColor" />
          <circle cx="125" cy="35" r="2" fill="currentColor" />
          <text x="80" y="93" fontSize="6.5" textAnchor="middle" stroke="none" fill="currentColor" opacity="0.85" className="font-serif">七路头27发构造示意：按间距分布</text>
        </svg>
      )
    },
    {
      title: "罗盘应用示例（夏氏宅坐向）",
      subtitle: "坐壬向丙，纳甲属离卦之科学测定",
      caption: "通过传统罗盘测绘，夏氏宅中轴线呈西北-东南偏角。根据二十四纳甲所属：‘离纳壬寅午戌’，极准地归结为离卦房，是压白算式的主要因子。",
      svg: (
        <svg className="w-full h-full text-current" viewBox="0 0 160 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          {/* Satellite Map Simulated Frame */}
          <rect x="5" y="5" width="150" height="90" rx="3" fill="currentColor" fillOpacity="0.04" strokeWidth="0.5" />
          <g opacity="0.3">
            <path d="M 45,65 L 55,25 L 85,32 L 75,72 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M 85,32 L 115,39 L 105,79 L 75,72 Z" fill="currentColor" fillOpacity="0.05" strokeDasharray="1,1" />
            <text x="110" y="25" fontSize="5" fill="currentColor">合庆镇风貌天井房</text>
          </g>

          {/* Compass overlay */}
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.02" />
          <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="0.6" />
          
          <g>
            <line x1="41" y1="16" x2="59" y2="84" stroke="#e11d48" strokeWidth="1.2" />
            
            <polygon points="41,16 38,22 44,21" fill="#e11d48" stroke="none" />
            <polygon points="59,84 62,78 56,79" fill="#e11d48" stroke="none" />

            <text x="35" y="14" fontSize="5.5" fill="#e11d48" fontWeight="bold" className="font-serif">坐：壬山 (345°)</text>
            <text x="65" y="88" fontSize="5.5" fill="#e11d48" fontWeight="bold" className="font-serif">向：丙向 (165°)</text>
          </g>

          {/* Key annotation notes */}
          <g transform="translate(92, 10)">
            <rect x="0" y="0" width="60" height="42" rx="2" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.5" />
            <text x="5" y="8" fontSize="5" fontWeight="bold" fill="currentColor">廿四山纳甲所属表</text>
            <line x1="5" y1="11" x2="55" y2="11" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
            <text x="5" y="17" fontSize="4.5" fill="currentColor">乾纳甲 | 坤纳乙</text>
            <text x="5" y="24" fontSize="4.5" fill="currentColor">艮纳丙 | 巽纳辛</text>
            <text x="5" y="32" fontSize="5" fontWeight="bold" fill="#e11d48">离纳【壬】寅午戌</text>
            <text x="5" y="38" fontSize="4" fill="currentColor">※ 离卦房由此确立</text>
          </g>
          
          {/* Center Yin Yang Taiji */}
          <circle cx="50" cy="50" r="3.5" fill="currentColor" />
          <circle cx="50" cy="50" r="0.5" fill="#fff" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner / Scholarly Introduction */}
      <div className={`p-8 rounded-2xl border ${
        isWarm
          ? "bg-art-panel border-art-border text-art-text"
          : "bg-ink-panel border-ink-border text-ink-text"
      } grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden`}>
        {/* Abstract watermark representing classical architecture roof tile */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,90 Q50,10 90,90 Q90,50 50,50 Q10,50 10,90 Z" />
          </svg>
        </div>

        <div className="lg:col-span-8 space-y-4 relative z-10">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider ${
              isWarm ? "bg-art-accent text-[#fdfaf5]" : "bg-white text-black font-semibold"
            }`}>
              浦东遗珍 • 特写文献
            </span>
            <span className={`text-[10px] font-mono ${isWarm ? "text-[#8B7E6F]" : "text-zinc-500"}`}>
              坐山：坐壬向丙（离卦房）
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                {XIA_HOUSE_META.name}
              </h2>
              <div className="h-0.5 w-20 bg-art-accent opacity-80"></div>
            </div>

            {/* Cartoon craftsman Xia Qiutang with chat speech bubble */}
            <div className="flex items-center space-x-2.5 bg-stone-100/80 dark:bg-zinc-800/80 p-2 rounded-xl border border-current border-opacity-10 shadow-sm shrink-0 self-start sm:self-center transition-transform hover:scale-105 duration-200">
              {/* Cute Cartoon old craftsman head portrait SVG */}
              <div className="relative w-11 h-11 shrink-0 bg-[#fbfaf3] dark:bg-stone-700 rounded-full border border-art-accent/40 flex items-center justify-center overflow-hidden">
                <svg className="w-10 h-10 text-stone-800 dark:text-stone-100" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Traditional Headband */}
                  <path d="M 12,12 Q 20,5 28,12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 10,13 C 10,11 14,9 16,9 L 24,9 C 26,9 30,11 30,13" fill="#8c4a32" />
                  {/* Face */}
                  <circle cx="20" cy="21" r="9" fill="#ffd8a8" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M 11,21 C 11,25 29,25 29,21" fill="#fed7aa" />
                  {/* Spectacles with round frame */}
                  <circle cx="16" cy="18" r="3.2" stroke="currentColor" strokeWidth="1" />
                  <circle cx="24" cy="18" r="3.2" stroke="currentColor" strokeWidth="1" />
                  <line x1="19.2" y1="18" x2="20.8" y2="18" stroke="currentColor" strokeWidth="1" />
                  {/* Bushy gray eyebrows */}
                  <path d="M 13,13 Q 16,11 19,13.5" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 27,13 Q 24,11 21,13.5" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Traditional cheerful gray beard */}
                  <path d="M 13,22 Q 20,19 27,22 Q 20,29 13,22" fill="#78716c" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M 16,23 Q 20,26 24,23" stroke="currentColor" strokeWidth="0.8" />
                  {/* Cheek blush */}
                  <circle cx="13" cy="20" r="1.5" fill="#f43f5e" fillOpacity="0.4" />
                  <circle cx="27" cy="20" r="1.5" fill="#f43f5e" fillOpacity="0.4" />
                  {/* Smile */}
                  <path d="M 18,21 Q 20,23 22,21" stroke="#ef4444" strokeWidth="1" />
                  {/* Mini hair bun */}
                  <circle cx="20" cy="8" r="2.2" fill="#44403c" />
                  <circle cx="16" cy="18" r="0.8" fill="currentColor" />
                  <circle cx="24" cy="18" r="0.8" fill="currentColor" />
                </svg>
              </div>

              {/* Cartoon Speech Bubble */}
              <div className="relative bg-[#fdfdfd] dark:bg-zinc-900 text-current text-[11px] px-2.5 py-1.5 rounded-lg border border-current border-opacity-10 shadow-sm max-w-[170px]">
                {/* Comic pointing arrow */}
                <div className="absolute left-[-4px] top-4.5 w-2 h-2 bg-[#fdfdfd] dark:bg-zinc-900 border-l border-b border-current border-opacity-10 transform rotate-45"></div>
                <div className="font-bold text-[10px] text-rose-600 dark:text-rose-400 whitespace-nowrap leading-none mb-0.5">
                   老木匠 夏秋堂 👴
                </div>
                <div className="font-serif leading-snug font-bold text-stone-700 dark:text-stone-200">
                  “这是我为我儿子做的房子！👦🏠”
                </div>
              </div>
            </div>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isWarm ? "text-art-text/90 font-serif leading-loose" : "text-[#B3B3B3]"} text-justify`}>
            {XIA_HOUSE_META.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 shadow-sm transform -rotate-1 hover:rotate-0 transition-all duration-200">
              <span className="opacity-70 block text-[10px] text-rose-800 dark:text-rose-300 font-bold mb-1">原造匠师 🪚</span>
              <span className="font-bold text-rose-900 dark:text-rose-200">{XIA_HOUSE_META.craftsman}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 shadow-sm transform rotate-2 hover:rotate-0 transition-all duration-200">
              <span className="opacity-70 block text-[10px] text-amber-800 dark:text-amber-300 font-bold mb-1">原建年代 🕰️</span>
              <span className="font-bold text-amber-900 dark:text-amber-200">{XIA_HOUSE_META.era}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 shadow-sm transform -rotate-2 hover:rotate-0 transition-all duration-200">
              <span className="opacity-70 block text-[10px] text-sky-800 dark:text-sky-300 font-bold mb-1">建筑坐向 🧭</span>
              <span className="font-bold text-sky-900 dark:text-sky-200">坐壬向丙（离卦）</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 shadow-sm transform rotate-1 hover:rotate-0 transition-all duration-200">
              <span className="opacity-70 block text-[10px] text-emerald-800 dark:text-emerald-300 font-bold mb-1">测绘基准 📐</span>
              <span className="font-bold text-emerald-900 dark:text-emerald-200">27.5cm 营造尺</span>
            </div>
          </div>
        </div>

        {/* Traditional Wood Seal Signet upgraded to Flippable Classical Architecture Photos/Diagrams */}
        <div className="lg:col-span-4 self-stretch flex flex-col justify-between p-5 rounded-xl border border-current border-opacity-15 relative overflow-hidden bg-black/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono tracking-wider opacity-60">夏氏宅大木与防火山墙鸟瞰 ({photoIdx + 1}/{slides.length})</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setPhotoIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className={`p-1 rounded border border-current border-opacity-20 hover:bg-black/20 cursor-pointer transition-all ${isWarm ? "text-art-accent hover:text-art-accent" : "text-white"}`}
                title="上一张"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button
                onClick={() => setPhotoIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                className={`p-1 rounded border border-current border-opacity-20 hover:bg-black/20 cursor-pointer transition-all ${isWarm ? "text-art-accent hover:text-art-accent" : "text-white"}`}
                title="下一张"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* SVG Frame displaying high quality drawing */}
          <div className="flex-1 min-h-[140px] rounded-lg border border-current border-opacity-10 flex items-center justify-center p-3 relative overflow-hidden bg-black/5">
            <motion.div
              key={photoIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full max-h-[135px] flex items-center justify-center"
            >
              {slides[photoIdx].svg}
            </motion.div>
          </div>

          <div className="mt-3 space-y-1">
            <h4 className="text-xs font-serif font-bold tracking-tight">
              {slides[photoIdx].title}
            </h4>
            <p className="text-[10px] opacity-70 font-mono">
              {slides[photoIdx].subtitle}
            </p>
            <p className="text-[11px] leading-normal opacity-90 font-serif leading-relaxed line-clamp-2" title={slides[photoIdx].caption}>
              {slides[photoIdx].caption}
            </p>
          </div>
        </div>
      </div>

      {/* Main Panel grid: Interactive Schematic CAD drawing of Haus & 3D representation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: SVG CAD interactive blueprint - 7 cols */}
        <div className={`lg:col-span-7 p-6 rounded-xl border ${
          isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-[#111111] border-[#222222] text-[#F3F3F3]"
        } space-y-4`}>
          <div className="flex justify-between items-center border-b border-current border-opacity-10 pb-3">
            <h3 className="font-serif text-lg font-bold flex items-center space-x-2">
              <Eye className="h-5 w-5 opacity-70" />
              <span>夏式宅 · 交互开开平面大木作测绘图</span>
            </h3>
            <span className="text-[10px] font-mono opacity-60">点击或悬停骨梁查看古尺压白</span>
          </div>

          {/* Render Vector CAD Blueprint with active nodes */}
          <div className="relative py-4 border rounded-lg bg-stone-55 relative overflow-hidden flex justify-center bg-black/10">
            <svg id="xia-house-svg-blueprint" className="w-full max-w-[550px] aspect-[4/3]" viewBox="0 0 400 300">
              <defs>
                {/* Grid patterns */}
                <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
                </pattern>
                <marker id="arrow-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 5 L 10 0 L 8 5 L 10 10 z" fill="currentColor" />
                </marker>
                <marker id="arrow-end" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 5 L 10 0 L 8 5 L 10 10 z" fill="currentColor" />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#cad-grid)" />

              {/* Compass symbol in corner */}
              <g transform="translate(45, 50)" className="opacity-45">
                <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="-22" x2="0" y2="22" stroke="currentColor" strokeWidth="1.5" />
                <line x1="-18" y1="0" x2="18" y2="0" stroke="currentColor" strokeWidth="1" />
                <path d="M -5,0 L 0,-25 L 5,0 z" fill="currentColor" />
                <text x="-3" y="-26" fontSize="8" className="font-serif" fill="currentColor">壬</text>
                <text x="-3" y="32" fontSize="8" className="font-serif" fill="currentColor">丙</text>
              </g>

              {/* Main Architecture Outlines (Chinese Compound) */}
              {/* Central Room: 客堂间 - Main column blocks */}
              <rect x="140" y="80" width="120" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-40" />
              {/* Left Room: 次间一 */}
              <rect x="50" y="80" width="90" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-20" />
              {/* Right Room: 次间二 */}
              <rect x="260" y="80" width="90" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-20" />

              {/* Walls Solid Lines */}
              {/* Outer boundary wall */}
              <path d="M 50,220 L 50,80 L 350,80 L 350,220" fill="none" stroke="currentColor" strokeWidth="2.5" />

              {/* Pillars (Columns/散骨) as little black filled circles */}
              <g fill="currentColor">
                {/* Back line pillars */}
                <circle cx="50" cy="80" r="4" />
                <circle cx="140" cy="80" r="4.5" />
                <circle cx="260" cy="80" r="4.5" />
                <circle cx="350" cy="80" r="4" />

                {/* Middle line pillars */}
                <circle cx="50" cy="140" r="4.5" />
                <circle cx="140" cy="140" r="5" />
                <circle cx="260" cy="140" r="5" />
                <circle cx="350" cy="140" r="4.5" />

                {/* Front line pillars */}
                <circle cx="50" cy="220" r="4" />
                <circle cx="140" cy="220" r="5" />
                <circle cx="260" cy="220" r="5" />
                <circle cx="350" cy="220" r="4" />
              </g>

              {/* Interactivity Labels on Blueprint */}
              {/* Clickable Area 1: 客堂间 Width - kaijian_1 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_1")}
              >
                <rect x="145" y="55" width="110" height="20" fill="transparent" />
                <line x1="140" y1="65" x2="260" y2="65" stroke={activeCaseId === "kaijian_1" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_1" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="175" y="52" fontSize="9" className={`font-serif ${activeCaseId === "kaijian_1" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_1" ? rcHighlight : "currentColor"}>
                  客堂间: 6059mm (22尺)
                </text>
              </g>

              {/* Clickable Area 2: 次间一 Width - kaijian_2 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_2")}
              >
                <rect x="55" y="55" width="80" height="20" fill="transparent" />
                <line x1="50" y1="65" x2="140" y2="65" stroke={activeCaseId === "kaijian_2" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_2" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="65" y="52" fontSize="8" className={`font-serif ${activeCaseId === "kaijian_2" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_2" ? rcHighlight : "currentColor"}>
                  次间一: 4675mm (17尺)
                </text>
              </g>

              {/* Clickable Area 3: 次间二 Width - kaijian_3 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_3")}
              >
                <rect x="265" y="55" width="80" height="20" fill="transparent" />
                <line x1="260" y1="65" x2="350" y2="65" stroke={activeCaseId === "kaijian_3" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_3" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="275" y="52" fontSize="8" className={`font-serif ${activeCaseId === "kaijian_3" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_3" ? rcHighlight : "currentColor"}>
                  次间二: 4684mm (17尺)
                </text>
              </g>

              {/* Clickable Area 4: 前步架进深 - jinshen_overall_1 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_1")}
              >
                <rect x="355" y="145" width="35" height="70" fill="transparent" />
                <line x1="365" y1="140" x2="365" y2="220" stroke={activeCaseId === "jinshen_overall_1" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_1" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="372" y="185" fontSize="8" className={`font-serif ${activeCaseId === "jinshen_overall_1" ? "font-semibold" : ""} writing-mode-vertical`} fill={activeCaseId === "jinshen_overall_1" ? rcHighlight : "currentColor"}>
                  前步深: 3.8m
                </text>
              </g>

              {/* Clickable Area 5: 双脊进深 - jinshen_overall_2 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_2")}
              >
                <rect x="15" y="85" width="30" height="55" fill="transparent" />
                <line x1="25" y1="80" x2="25" y2="140" stroke={activeCaseId === "jinshen_overall_2" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_2" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="2" y="115" fontSize="8" className={`font-serif ${activeCaseId === "jinshen_overall_2" ? "font-semibold" : ""}`} fill={activeCaseId === "jinshen_overall_2" ? rcHighlight : "currentColor"}>
                  双脊: 4.5m
                </text>
              </g>

              {/* Clickable Area 6: 通面阔总进深 - jinshen_overall_3 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_3")}
              >
                <rect x="315" y="85" width="30" height="130" fill="transparent" />
                <line x1="325" y1="80" x2="325" y2="220" stroke={activeCaseId === "jinshen_overall_3" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_3" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="305" y="160" fontSize="8" className={`font-serif ${activeCaseId === "jinshen_overall_3" ? "font-semibold" : ""} writing-mode-vertical`} fill={activeCaseId === "jinshen_overall_3" ? rcHighlight : "currentColor"}>
                  梁总深: 8341mm
                </text>
              </g>

              {/* Room Descriptions Floating Overlay Text */}
              <text x="95" y="150" fontSize="10" className="opacity-30 fill-current text-center font-serif">次间一</text>
              <text x="200" y="155" fontSize="12" className="opacity-45 fill-current text-center font-serif font-bold">正客堂间</text>
              <text x="305" y="150" fontSize="10" className="opacity-30 fill-current text-center font-serif">次间二</text>
            </svg>
          </div>

          <p className="text-[10px] opacity-65 italic leading-relaxed text-center">
            * 提示：上图为夏式住宅大木典型“一正两厢三合院”正面骨架平面模型。点击标注的红色/黑色带状，下方可自动切换深度学术解读，并可无缝导入到压白智能测算仪之中。
          </p>
        </div>

        {/* Right column: Highlights and Explodable roof mock-up - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active case details block */}
          <div className={`p-6 rounded-xl border relative overflow-hidden flex flex-col justify-between h-full ${
            isWarm
              ? "bg-art-panel border-art-border text-art-text"
              : "bg-ink-panel border-zinc-800 text-ink-text"
          }`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isWarm ? "bg-art-accent/15 text-art-accent font-bold" : "bg-white/10 text-white"
                }`}>
                  构件：{activeCase.type}
                </span>
                <span className="text-[10px] font-mono opacity-65">测绘数据特写</span>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold">{activeCase.name}</h4>
                <p className="font-mono text-xs opacity-70 mt-1">
                  公制：{activeCase.rawMm} mm | 折算值：{formatYabaiMeasurement(activeCase.rawMm)}
                </p>
              </div>

              {/* Calculation status indicators */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                  isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-black/40 border-zinc-900"
                }`}>
                  <span className="text-[10px] opacity-60">尺白星位</span>
                  <div className="font-bold flex items-center space-x-1.5 mt-1">
                    <span className="font-serif text-sm">{activeCase.chiStarName}</span>
                    <span className={`text-[10px] px-1 rounded-full ${
                      activeCase.chiAuspicious ? "bg-emerald-500/15 text-emerald-500" : "bg-rose-500/15 text-rose-500"
                    }`}>
                      {activeCase.chiAuspicious ? "吉" : "不吉"}
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                  isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-black/40 border-zinc-900"
                }`}>
                  <span className="text-[10px] opacity-60">寸白星位</span>
                  <div className="font-bold flex items-center space-x-1.5 mt-1">
                    <span className="font-serif text-sm">{activeCase.cunStarName}</span>
                    <span className={`text-[10px] px-1 rounded-full ${
                      activeCase.cunAuspicious ? "bg-emerald-500/15 text-emerald-500" : "bg-zinc-500/15 text-zinc-400"
                    }`}>
                      {activeCase.cunAuspicious ? "吉" : "无/不吉"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Research commentary text */}
              <p className={`text-xs ml-0 leading-relaxed border-l-2 pl-3 py-1 text-justify ${
                isWarm ? "border-art-accent text-art-text/90" : "border-zinc-500 text-zinc-400"
              }`}>
                <span className="font-bold">工匠考证：</span>
                {activeCase.note}
              </p>
            </div>

            {/* Actions for this case */}
            <div className="pt-4 border-t border-dashed border-current border-opacity-10 mt-4 flex">
              <button
                id="send-to-calc-btn"
                onClick={() => onSendToCalculator(activeCase.rawMm, activeCase.type === "整体进深" ? "horizontal" : "horizontal")}
                className={`w-full py-2.5 text-xs text-center rounded justify-center font-bold flex items-center space-x-2 cursor-pointer transition-all duration-200 outline-none ${
                  isWarm
                    ? "bg-art-accent text-[#fdfaf5] hover:opacity-90 shadow-md shadow-art-accent/15"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                <span>将此大木尺寸一键导入智能测算仪</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visual Model Section: Guanyindou high firewall orthographic skeleton */}
      <div className={`p-6 rounded-2xl border ${
        isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-[#111111] border-[#222222] text-[#F3F3F3]"
      } space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current border-opacity-10 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold">浦东大木作「观音兜山墙」梁架结构解构模型</h3>
            <p className={`text-xs ${isWarm ? "text-art-text/60" : "text-zinc-500"} mt-0.5`}>
              动态滑块调整：观察屋架结构与传统防风火山墙“观音兜山墙”的几何关系
            </p>
          </div>

          {/* Sliders and Toggles */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {/* Exploded Slider */}
            <div className="flex items-center space-x-2">
              <span className="opacity-70">梁架炸解:</span>
              <input
                id="explode-slider"
                type="range"
                min="0"
                max="50"
                value={explodeRatio}
                onChange={(e) => setExplodeRatio(parseInt(e.target.value))}
                className="w-24 accent-current scale-90"
              />
              <span className="w-8 text-right font-bold">{explodeRatio}%</span>
            </div>

            {/* Show roof */}
            <button
              onClick={() => setShowRoof(!showRoof)}
              className={`px-2 py-1 border rounded text-[10px] cursor-pointer ${
                showRoof ? "bg-stone-500/10 font-bold" : "opacity-40"
              }`}
            >
              屋面瓦片: {showRoof ? "开" : "关"}
            </button>

            {/* Show wall */}
            <button
              onClick={() => setShowWall(!showWall)}
              className={`px-2 py-1 border rounded text-[10px] cursor-pointer ${
                showWall ? "bg-stone-500/10 font-bold" : "opacity-40"
              }`}
            >
              观音兜山墙: {showWall ? "显示" : "隐藏"}
            </button>
          </div>
        </div>

        {/* 3D skeleton projection drawing canvas/SVG */}
        <div className="relative py-4 aspect-[21/9] w-full border rounded-lg bg-black/10 overflow-hidden flex items-center justify-center">
          <svg className="w-full max-w-[800px] h-full" viewBox="0 0 600 240">
            {/* Ground Line */}
            <line x1="50" y1="210" x2="550" y2="210" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Guanyindou Fire-Wall (Left Wall Contour) */}
            {showWall && (
              <motion.path
                d="M 120,210 L 120,130 Q 120,90 100,80 Q 120,70 140,50 Q 160,30 200,30 L 210,30 Q 250,30 270,50 Q 290,70 310,80 Q 290,90 290,130 L 290,210 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                fillOpacity="0.03"
                fill="currentColor"
                animate={{
                  x: -explodeRatio * 0.4
                }}
                transition={{ type: "spring", damping: 15 }}
              />
            )}

            {/* Backplane timber frame pillars (Active explode) */}
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              {/* Columns */}
              <motion.g
                animate={{
                  y: explodeRatio * 0.2
                }}
                transition={{ type: "spring", damping: 15 }}
              >
                {/* Main Pillars */}
                <line x1="200" y1="210" x2="200" y2="70" strokeWidth="4" />
                <line x1="300" y1="210" x2="300" y2="70" strokeWidth="4" />
                <line x1="400" y1="210" x2="400" y2="75" strokeWidth="4" />

                {/* Shorter outrigger columns */}
                <line x1="160" y1="210" x2="160" y2="130" strokeWidth="3" />
                <line x1="440" y1="210" x2="440" y2="135" strokeWidth="3" />
              </motion.g>

              {/* Beams (梁) (Active explode) */}
              <motion.g
                animate={{
                  y: -explodeRatio * 0.5
                }}
                transition={{ type: "spring", damping: 15 }}
              >
                {/* Broad Main Beams */}
                <line x1="160" y1="130" x2="440" y2="135" strokeWidth="5.5" />
                <line x1="200" y1="100" x2="400" y2="102" strokeWidth="4" />
                <line x1="230" y1="75" x2="370" y2="76" strokeWidth="3" />

                {/* Traditional Chinese Bracket Blocks (瓜柱 / 斗拱) */}
                <rect x="195" y="100" width="10" height="30" fill="currentColor" strokeWidth="1" />
                <rect x="395" y="102" width="10" height="33" fill="currentColor" strokeWidth="1" />
                <rect x="225" y="75" width="10" height="25" fill="currentColor" strokeWidth="1" />
                <rect x="365" y="76" width="10" height="26" fill="currentColor" strokeWidth="1" />
              </motion.g>

              {/* Roof purlins system & tiles */}
              {showRoof && (
                <motion.g
                  animate={{
                    y: -explodeRatio * 1.1
                  }}
                  transition={{ type: "spring", damping: 15 }}
                  strokeOpacity="0.8"
                >
                  {/* Roof Slope beam rafters */}
                  <line x1="130" y1="150" x2="300" y2="40" strokeWidth="2.5" />
                  <line x1="300" y1="40" x2="470" y2="155" strokeWidth="2.5" strokeDasharray="1,1" />

                  {/* Roof Ridge details */}
                  <polygon points="290,40 300,20 310,40" fill="currentColor" strokeWidth="2" />

                  {/* Little Hanging timber details */}
                  <circle cx="130" cy="150" r="3" fill="currentColor" />
                  <circle cx="470" cy="155" r="3" fill="currentColor" />
                </motion.g>
              )}
            </g>

            {/* Legends labels overlaid onto the 3D drawing */}
            <g className="text-[9px] font-mono select-none" fill="currentColor" opacity="0.65">
              <text x="305" y="55">梁顶脊桁</text>
              <text x="210" y="93">金梁 / 五架梁</text>
              <text x="175" y="125">大中梁 / 七架梁</text>
              <text x="382" y="165">大散柱</text>
              <text x="80" y="232">浦东传统江南特色：【观音兜封火山墙】</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Case Studies Detailed Scholarly Table */}
      <div className="space-y-6 pt-4 border-t border-current border-opacity-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold">文献实录：夏家宅大木落位压白核验表</h3>
            <p className={`text-xs ${isWarm ? "text-art-text/60" : "text-zinc-500"} mt-0.5`}>
              数据出自浦东民间古建筑大木作实地测绘与历史工匠口诀比对。
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["all", "开间", "整体进深", "柱距"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setCaseFilter(filter)}
                className={`px-3 py-1 text-xs rounded transition-all duration-200 cursor-pointer ${
                  caseFilter === filter
                    ? isWarm
                      ? "bg-art-accent text-[#fdfaf5] shadow-sm shadow-art-accent/15"
                      : "bg-white text-black font-semibold"
                    : isWarm
                    ? "bg-art-panel text-[#5C4D3C] hover:bg-art-border"
                    : "bg-[#161616] text-[#888888] hover:bg-[#222222] hover:text-white"
                }`}
              >
                {filter === "all" ? "全部构件" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Elegant Table */}
        <div className="overflow-x-auto rounded-xl border border-current border-opacity-10">
          <table className={`w-full text-sm text-left ${
            isWarm ? "bg-[#fdfbf7] text-art-text" : "bg-[#111111] text-[#F3F3F3]"
          }`}>
            <thead>
              <tr className={`border-b border-current border-opacity-15 font-serif text-xs uppercase ${
                isWarm ? "bg-art-panel text-[#5C4D3C]" : "bg-[#0A0A0A] text-[#888888]"
              }`}>
                <th className="px-5 py-4 font-bold">构件名称</th>
                <th className="px-4 py-4 font-bold text-center">类别</th>
                <th className="px-4 py-4 font-bold text-right">公制毫米 (mm)</th>
                <th className="px-4 py-4 font-bold text-right">换算营造尺数</th>
                <th className="px-4 py-4 font-bold text-center">尺白极星</th>
                <th className="px-4 py-4 font-bold text-center">寸白极宿</th>
                <th className="px-4 py-4 font-bold text-center">压白状态</th>
                <th className="px-5 py-4 font-bold text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current divide-opacity-10">
              {filteredCases.map((cs) => {
                const isActive = cs.id === activeCaseId;

                return (
                  <tr
                    key={cs.id}
                    onClick={() => setActiveCaseId(cs.id)}
                    className={`cursor-pointer transition-all duration-150 ${
                      isActive
                        ? isWarm
                          ? "bg-art-accent/10 hover:bg-art-accent/15"
                          : "bg-white/10 hover:bg-white/15"
                        : isWarm
                        ? "hover:bg-art-panel"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-bold font-serif">{cs.name}</td>
                    <td className="px-4 py-3.5 text-center text-xs opacity-75">{cs.type}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-xs">{cs.rawMm}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-xs font-semibold">
                      {cs.computedChi}尺 {cs.computedCun}寸
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        cs.chiAuspicious
                          ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                          : "bg-rose-500/10 text-rose-500"
                      }`}>
                        {cs.chiStarName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        cs.cunAuspicious
                          ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                          : cs.cunStarName === "无"
                          ? "bg-neutral-500/10 text-neutral-400"
                          : "bg-rose-500/10 text-rose-500"
                      }`}>
                        {cs.cunStarName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {cs.chiAuspicious ? (
                        <div className="flex items-center justify-center space-x-1 font-semibold text-emerald-500 text-xs">
                          <CheckCircle className="h-4.5 w-4.5" />
                          <span className="hidden sm:inline">大木主吉</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-1 text-rose-500 text-xs">
                          <XCircle className="h-4.5 w-4.5" />
                          <span className="hidden sm:inline">不尽压白</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSendToCalculator(cs.rawMm, cs.type === "整体进深" ? "horizontal" : "horizontal");
                        }}
                        className={`px-3 py-1 text-[11px] font-sans font-semibold rounded cursor-pointer transition-all duration-150 border outline-none ${
                          isWarm
                            ? "bg-[#fdfbf7] border-art-border text-art-accent hover:bg-art-accent hover:text-[#fdfaf5]"
                            : "bg-[#0A0A0A] border-zinc-805 hover:bg-white hover:text-black"
                        }`}
                      >
                        导入测算
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
