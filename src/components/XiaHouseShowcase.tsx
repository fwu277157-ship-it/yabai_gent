/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { XIA_HOUSE_META, XIA_HOUSE_CASES } from "../data/xiaHouseData";
import { calculateYabai, formatYabaiMeasurement } from "../utils";
import { Compass, BookOpen, ChevronLeft, ChevronRight, HelpCircle, Eye, Sliders, Image, ListCollapse, CheckCircle, XCircle } from "lucide-react";
// @ts-ignore
import myNewImage from '../../assets/.aistudio/section1.png';
// @ts-ignore
import niaokanImg from '../../assets/.aistudio/niaokan.jpg';
// @ts-ignore
import shanwallImg from '../../assets/.aistudio/shanwall.png';
// @ts-ignore
import luopanImg from '../../assets/.aistudio/luopan.png';

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

  // Photos/Aerial diagrams for flipping carousel
  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const slides = [
    {
      title: "夏氏宅院落俯瞰 (1/4)",
      subtitle: "院落及山墙鸟瞰",
      caption: "主次房屋中轴严整对称，带有独特的浦东营造匠艺与防风火山墙风貌。",
      svg: (
        <img
          src={niaokanImg}
          alt="夏氏宅大木与防火山墙鸟瞰"
          className="max-h-full max-w-full object-contain bg-transparent"
        />
      )
    },
    {
      title: "观音兜封火山墙 (2/4)",
      subtitle: "形如大衣覆顶的优美江南火墙",
      caption: "夏氏宅山墙采用江南经典的【观音兜】消防火山墙形式。其高耸的圆拱弧线如观音衣兜罩顶，能阻断火势并完美御风。",
      svg: (
        <img
          src={shanwallImg}
          alt="观音兜封火山墙"
          className="max-h-full max-w-full object-contain bg-transparent"
        />
      )
    },
    {
      title: "浦东大木作大木剖面图 (3/4)",
      subtitle: "七路头27发穿斗式排架结构剖面",
      caption: "大木断构剖面图：展现江南传统穿斗构架（七落地柱、多层通长穿枋、二层中夹层阁楼）相互穿插榫接的经典建筑构造断面。",
      svg: (
        <img
          src={myNewImage}
          alt="浦东大木作「穿斗式」排架结构剖面图"
          className="max-h-full max-w-full object-contain bg-transparent"
        />
      )
    },
    {
      title: "罗盘应用示例及坐向测定 (4/4)",
      subtitle: "坐壬向丙，纳甲属离卦之科学测定",
      caption: "根据二十四纳甲所属：‘离纳壬寅午戌’，极准地归结为离卦房，是压白算式的主要因子。",
      svg: (
        <img
          src={luopanImg}
          alt="罗盘应用示例（夏氏宅坐向）"
          className="max-h-full max-w-full object-contain bg-transparent"
        />
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
              <div className="relative w-12 h-12 shrink-0 bg-[#fffbeb] dark:bg-stone-800 rounded-full border-2 border-amber-400 flex items-center justify-center overflow-hidden shadow-md">
                <svg className="w-11 h-11" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Soft Yellow Radiance */}
                  <circle cx="20" cy="20" r="18" fill="#fef3c7" />

                  {/* Traditional Scholar/Artisan Cap/Headband in elegant vermilion red */}
                  <path d="M 12,12 Q 20,4 28,12 L 29,14 L 11,14 Z" fill="#b91c1c" />
                  <circle cx="20" cy="5" r="2.5" fill="#f59e0b" />

                  {/* Face Base in rich peach skin tone */}
                  <circle cx="20" cy="21" r="9.5" fill="#fecdd3" stroke="#b45309" strokeWidth="0.8" />
                  
                  {/* Big Sparkling Cheerful Eyes (Anime-Style) */}
                  <g>
                    {/* Left Eye */}
                    <ellipse cx="16" cy="19.5" rx="1.8" ry="2.2" fill="#1e293b" />
                    <circle cx="15.2" cy="18.5" r="0.6" fill="#ffffff" /> {/* Eye Highlight */}
                    
                    {/* Right Eye */}
                    <ellipse cx="24" cy="19.5" rx="1.8" ry="2.2" fill="#1e293b" />
                    <circle cx="23.2" cy="18.5" r="0.6" fill="#ffffff" /> {/* Eye Highlight */}
                  </g>

                  {/* Big Round-Framed Golden Spectacles (Shows wisdom and fun!) */}
                  <g stroke="#d97706" strokeWidth="0.9" fill="none">
                    <circle cx="16" cy="19.5" r="3.2" />
                    <circle cx="24" cy="19.5" r="3.2" />
                    <line x1="19.2" y1="19.5" x2="20.8" y2="19.5" />
                  </g>

                  {/* Happy Rosy Cheeks */}
                  <circle cx="12" cy="21" r="1.8" fill="#f43f5e" fillOpacity="0.65" />
                  <circle cx="28" cy="21" r="1.8" fill="#f43f5e" fillOpacity="0.65" />

                  {/* Cute Cheerful Brushy White Eyebrows */}
                  <path d="M 12.5,14.5 Q 15.5,12 18.5,15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 27.5,14.5 Q 24.5,12 21.5,15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Wide, Jolly Smile revealing tongue */}
                  <path d="M 17.5,22.2 Q 20,24.5 22.5,22.2" stroke="#b91c1c" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 18,22.6 T 22,22.6 Q 20,25 18,22.6" fill="#f43f5e" />

                  {/* Fluffy white mustache and beard of a grand old master carpenter */}
                  <path d="M 14,24 Q 20,21 26,24 Q 20,33 14,24" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="0.8" />
                  <path d="M 17,25 Q 20,27 23,25" stroke="#b0b0b5" strokeWidth="0.6" />
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
                  “这是我为同村营造商夏安邦、夏振邦所做的房子，在上海的营造商都请我建房子。”
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
              <span>夏氏宅 · 交互式平面大木作测绘图</span>
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

              {/* Main Architecture Outlines (5-Bay Chinese Compound Layout) */}
              {/* Room 1: 客堂间 - Main column blocks */}
              <rect x="155" y="80" width="90" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-40" />
              {/* Room 2: 左次间 */}
              <rect x="90" y="80" width="65" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-20" />
              {/* Room 3: 右次间 */}
              <rect x="245" y="80" width="65" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-20" />
              {/* Room 4: 左梢间 */}
              <rect x="30" y="80" width="60" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-15" />
              {/* Room 5: 右梢间 */}
              <rect x="310" y="80" width="60" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-15" />

              {/* Walls Solid Lines */}
              {/* Outer boundary wall */}
              <path d="M 30,220 L 30,80 L 370,80 L 370,220" fill="none" stroke="currentColor" strokeWidth="2.5" />

              {/* Pillars (Columns/散骨) as little black filled circles */}
              <g fill="currentColor">
                {/* Back line pillars */}
                <circle cx="30" cy="80" r="3.5" />
                <circle cx="90" cy="80" r="4" />
                <circle cx="155" cy="80" r="4" />
                <circle cx="245" cy="80" r="4" />
                <circle cx="310" cy="80" r="4" />
                <circle cx="370" cy="80" r="3.5" />

                {/* Middle line pillars */}
                <circle cx="30" cy="140" r="4" />
                <circle cx="90" cy="140" r="4.5" />
                <circle cx="155" cy="140" r="4.5" />
                <circle cx="245" cy="140" r="4.5" />
                <circle cx="310" cy="140" r="4.5" />
                <circle cx="370" cy="140" r="4" />

                {/* Front line pillars */}
                <circle cx="30" cy="220" r="3.5" />
                <circle cx="90" cy="220" r="4.5" />
                <circle cx="155" cy="220" r="4.5" />
                <circle cx="245" cy="220" r="4.5" />
                <circle cx="310" cy="220" r="4.5" />
                <circle cx="370" cy="220" r="3.5" />
              </g>

              {/* Interactivity Labels on Blueprint */}
              {/* Clickable Area 1: 客堂间 Width - kaijian_1 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_1")}
              >
                <rect x="155" y="50" width="90" height="25" fill="transparent" />
                <line x1="155" y1="65" x2="245" y2="65" stroke={activeCaseId === "kaijian_1" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_1" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="200" y="52" fontSize="7.5" textAnchor="middle" className={`font-serif ${activeCaseId === "kaijian_1" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_1" ? rcHighlight : "currentColor"}>
                  客堂间: 6059mm
                </text>
              </g>

              {/* Clickable Area 2: 次间一 Width - kaijian_2 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_2")}
              >
                <rect x="90" y="50" width="65" height="25" fill="transparent" />
                <line x1="90" y1="65" x2="155" y2="65" stroke={activeCaseId === "kaijian_2" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_2" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="122" y="52" fontSize="6.5" textAnchor="middle" className={`font-serif ${activeCaseId === "kaijian_2" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_2" ? rcHighlight : "currentColor"}>
                  左次间: 4675mm
                </text>
              </g>

              {/* Clickable Area 3: 次间二 Width - kaijian_3 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_3")}
              >
                <rect x="245" y="50" width="65" height="25" fill="transparent" />
                <line x1="245" y1="65" x2="310" y2="65" stroke={activeCaseId === "kaijian_3" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_3" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="278" y="52" fontSize="6.5" textAnchor="middle" className={`font-serif ${activeCaseId === "kaijian_3" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_3" ? rcHighlight : "currentColor"}>
                  右次: 4675mm
                </text>
              </g>

              {/* Clickable Area 4: 左梢间 Width - kaijian_4 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_4")}
              >
                <rect x="30" y="50" width="60" height="25" fill="transparent" />
                <line x1="30" y1="65" x2="90" y2="65" stroke={activeCaseId === "kaijian_4" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_4" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="60" y="52" fontSize="6.5" textAnchor="middle" className={`font-serif ${activeCaseId === "kaijian_4" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_4" ? rcHighlight : "currentColor"}>
                  左梢(学长家): 4584mm
                </text>
              </g>

              {/* Clickable Area 5: 右梢间 Width - kaijian_5 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("kaijian_5")}
              >
                <rect x="310" y="50" width="60" height="25" fill="transparent" />
                <line x1="310" y1="65" x2="370" y2="65" stroke={activeCaseId === "kaijian_5" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "kaijian_5" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="340" y="52" fontSize="6.5" textAnchor="middle" className={`font-serif ${activeCaseId === "kaijian_5" ? "font-semibold" : ""}`} fill={activeCaseId === "kaijian_5" ? rcHighlight : "currentColor"}>
                  右梢: 4684mm
                </text>
              </g>

              {/* Clickable Area 6: 前步架进深 - jinshen_overall_1 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_1")}
              >
                <rect x="375" y="140" width="25" height="80" fill="transparent" />
                <line x1="385" y1="140" x2="385" y2="220" stroke={activeCaseId === "jinshen_overall_1" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_1" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="392" y="180" fontSize="7" className={`font-serif ${activeCaseId === "jinshen_overall_1" ? "font-semibold" : ""} writing-mode-vertical`} fill={activeCaseId === "jinshen_overall_1" ? rcHighlight : "currentColor"}>
                  前步深: 3800mm
                </text>
              </g>

              {/* Clickable Area 7: 双脊进深 - jinshen_overall_2 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_2")}
              >
                <rect x="2" y="80" width="22" height="60" fill="transparent" />
                <line x1="12" y1="80" x2="12" y2="140" stroke={activeCaseId === "jinshen_overall_2" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_2" ? "1.8" : "0.8"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="2" y="115" fontSize="7" className={`font-serif ${activeCaseId === "jinshen_overall_2" ? "font-semibold" : ""}`} fill={activeCaseId === "jinshen_overall_2" ? rcHighlight : "currentColor"}>
                  双脊: 4.5m
                </text>
              </g>

              {/* Clickable Area 8: 通面阔总进深 - jinshen_overall_3 */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveCaseId("jinshen_overall_3")}
              >
                <rect x="15" y="80" width="22" height="140" fill="transparent" />
                <line x1="22" y1="80" x2="22" y2="220" stroke={activeCaseId === "jinshen_overall_3" ? rcHighlight : "currentColor"} strokeWidth={activeCaseId === "jinshen_overall_3" ? "2" : "1"} markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                <text x="2" y="170" fontSize="7" className={`font-serif ${activeCaseId === "jinshen_overall_3" ? "font-semibold" : ""} writing-mode-vertical`} fill={activeCaseId === "jinshen_overall_3" ? rcHighlight : "currentColor"}>
                  总进深: 8341mm
                </text>
              </g>

              {/* Room Descriptions Floating Overlay Text */}
              <text x="60" y="150" fontSize="8" className="opacity-35 fill-current text-center font-serif" textAnchor="middle">梢间一(学长家)</text>
              <text x="122" y="150" fontSize="8" className="opacity-35 fill-current text-center font-serif" textAnchor="middle">次间一</text>
              <text x="200" y="153" fontSize="10" className="opacity-50 fill-current text-center font-serif font-bold" textAnchor="middle">客堂间</text>
              <text x="278" y="150" fontSize="8" className="opacity-35 fill-current text-center font-serif" textAnchor="middle">次间二(外卖员家)</text>
              <text x="340" y="150" fontSize="8" className="opacity-35 fill-current text-center font-serif" textAnchor="middle">梢间二</text>
            </svg>
          </div>

          <p className="text-[10px] opacity-65 italic leading-relaxed text-center">
            * 提示：上图为夏氏住宅大木典型穿斗构架平面模型。点击标注的红色/黑色带状，下方可自动切换深度学术解读，并可无缝导入到压白智能测算仪之中。
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

      {/* Academic Profile Model Section: Chuan-dou framework skeleton */}
      <div className={`p-6 rounded-2xl border ${
        isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-[#111111] border-[#222222] text-[#F3F3F3]"
      } space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current border-opacity-10 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold">浦东大木作「穿斗式」排架结构剖面图</h3>
            <p className={`text-xs ${isWarm ? "text-art-text/60" : "text-zinc-500"} mt-0.5`}>
              大木断构剖面图：展现江南传统穿斗构架（七落地柱、多层通长穿枋、二层中夹层阁楼）相互穿插榫接的经典建筑构造断面
            </p>
          </div>
        </div>

        {/* 3D skeleton projection drawing canvas/SVG */}
        <div className="relative aspect-[16/7] w-full border rounded-xl bg-transparent border-stone-300/35 dark:border-zinc-800/40 overflow-hidden flex items-center justify-center">
          <img 
            src={myNewImage}
            alt="浦东大木作「穿斗式」排架结构剖面图"
            className="max-h-full max-w-full object-contain"
          />
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
