/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  TrigramName,
  Orientation,
  DIRECTIONS_24,
  NINE_STARS,
  PURPLE_WHITE_STARS,
  CHI_BAI_HORIZONTAL_S,
  CHI_BAI_VERTICAL_S,
  CUN_BAI_HORIZONTAL_S,
  CUN_BAI_VERTICAL_S,
} from "../types";
import { calculateYabai, formatYabaiMeasurement } from "../utils";
import { Compass, Scale, ChevronRight, HelpCircle, RefreshCw, AlertTriangle, CheckCircle, Lightbulb, Sparkles, Send, Cpu, MessageSquare, Code } from "lucide-react";

interface YabaiCalculatorProps {
  theme: "warm" | "mono";
}

export default function YabaiCalculator({ theme }: YabaiCalculatorProps) {
  const isWarm = theme === "warm";

  // State
  const [inputMm, setInputMm] = useState<number>(3800);
  const [selectedDirection, setSelectedDirection] = useState<string>("壬"); // 坐壬向丙
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [scaleType, setScaleType] = useState<"pudong" | "classical" | "shichi" | "custom">("pudong");
  const [customScaleCm, setCustomScaleCm] = useState<number>(27.5);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  // COZE MOCK DIALOG STATES for user interactive validation & setup testing
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "agent"; text: string; time: string }>>([
    {
      sender: "agent",
      text: "您好！我是大木作「压白理气」AI 专属助手。本对话区已由系统专为此 Coze Agent 预留，支持您嵌入自主搭建的智能体服务。在接入前，您可以发送消息，提前体验我的模拟智能问答。请问您有什么关于房屋压白测算的疑问吗？",
      time: "15:40"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const updatedMessages = [...chatMessages, { sender: "user", text, time: timeStr }];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "感谢您的反馈！作为一个智能大木助手，您可以随时在这一块区域中嵌入您在 Coze (扣子) 中搭建完毕的正式 AI Agent 框架，实现定制化、高质量的业务学理问答与交流！";
      const normalized = text.toLowerCase();
      if (normalized.includes("3.8") || normalized.includes("3800") || normalized.includes("面宽") || normalized.includes("尺寸")) {
        reply = "3.8米（3800毫米）在浦东东部营造尺（27.5厘米）下等于 13尺 8.18寸。按『金坎』卦算：13尺得出的是【二黑·巨门星】（凶）；而 8寸得出的是【九紫·右弼星】（吉）。因面宽大木在尺位上落在二黑凶星，不算整体大吉。建议微调至 3.85米（整 14尺，落一白，大吉）或 4.12米（15尺，落八白，大吉）！";
      } else if (normalized.includes("山") || normalized.includes("坐向") || normalized.includes("壬" ) || normalized.includes("丙") || normalized.includes("夏家") || normalized.includes("二十四山")) {
        reply = "夏家宅中轴精确立向为「坐壬向丙」（呈西北-东南偏角）。在廿四山所属中，‘离纳壬寅午戌’，所以该宅归属「离卦房」。离卦的面阔【寸白】从‘一白’起轮，因此逢 1寸、6寸、8寸、9寸全部是大吉压白寸，您可以用下方的交互罗盘模拟旋转校验。";
      } else if (normalized.includes("鲁班尺") || normalized.includes("营造尺") || normalized.includes("区别") || normalized.includes("尺子")) {
        reply = "鲁班尺主要对应家具百物、门窗门槛等小木作。而大木作理气『压白尺』则是决定整栋房屋面宽开间、通进深、立柱高矮等宏观骨架主轴。夏家宅所载的浦东营造尺合27.5厘米，是明清浦东营造匠师专门核算大木尺度吉凶、求其紫白相合的天文模尺规则。";
      } else if (normalized.includes("压白") || normalized.includes("什么是") || normalized.includes("紫白")) {
        reply = "「压白」指古代工匠将长宽高等尺度经营造尺换算为寸数后，按罗阳九星白宿（一白贪狼、六白武曲、八白左辅、九紫右弼）轮盘顺挨。若落在这几个吉祥星色上，就称之为‘压白’，能让整栋建筑的空间谐振契合堪舆天星的祥瑞极性。";
      }
      setChatMessages(prev => [...prev, { sender: "agent", text: reply, time: timeStr }]);
      setIsTyping(false);
    }, 1100);
  };

  const handleCompassPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const angleRad = Math.atan2(x, -y);
    let angleDeg = (angleRad * 180 / Math.PI + 360) % 360;

    const getAngleDiff = (a: number, b: number) => {
      let diff = Math.abs(a - b) % 360;
      return diff > 180 ? 360 - diff : diff;
    };

    let closest = DIRECTIONS_24[0];
    let minDiff = 360;
    for (const dir of DIRECTIONS_24) {
      const diff = getAngleDiff(dir.angle, angleDeg);
      if (diff < minDiff) {
        minDiff = diff;
        closest = dir;
      }
    }

    setSelectedDirection(closest.name);
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    setIsDragging(true);
    handleCompassPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      handleCompassPointer(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
    setIsDragging(false);
  };

  // Determine active unit length in mm
  const activeUnitMm = useMemo(() => {
    switch (scaleType) {
      case "pudong":
        return 275;
      case "classical":
        return 320;
      case "shichi":
        return 333.3;
      case "custom":
        return customScaleCm * 10;
    }
  }, [scaleType, customScaleCm]);

  // Determine active trigram from selected direction or direction angle
  const activeDirectionObj = useMemo(() => {
    return DIRECTIONS_24.find((d) => d.name === selectedDirection) || DIRECTIONS_24[0];
  }, [selectedDirection]);

  const activeTrigram = activeDirectionObj.trigram;

  // Perform Yabai calculation
  const result = useMemo(() => {
    return calculateYabai(inputMm, activeTrigram, orientation, activeUnitMm);
  }, [inputMm, activeTrigram, orientation, activeUnitMm]);

  // Quick Preset Handlers
  const applyPreset = (mm: number, orient: Orientation) => {
    setInputMm(mm);
    setOrientation(orient);
  };

  // Calculate recommended adjustment values
  // Find nearest smaller and larger auspicious dimensions (both Chi and Cun are auspicious)
  const recommendations = useMemo(() => {
    const list: { offsetMm: number; targetMm: number; text: string; dir: "smaller" | "larger"; chi: number; cun: number }[] = [];

    // Search from -1000mm to +1000mm in 1mm increments
    let count = 0;
    // Walk down
    for (let offset = -1; offset >= -800; offset--) {
      const target = inputMm + offset;
      if (target <= 10) continue;
      const r = calculateYabai(target, activeTrigram, orientation, activeUnitMm);
      if (r.overallAuspicious || (r.chiAuspicious && r.cunValue === 0)) { // Either complete auspicious, or Chi is auspicious and Cun is 0
        list.push({
          offsetMm: offset,
          targetMm: target,
          text: `减小 ${Math.abs(offset)} mm ➔ 达到 ${target} mm (${r.chiValue}尺 ${r.cunValue}寸)`,
          dir: "smaller",
          chi: r.chiValue,
          cun: r.cunValue,
        });
        break;
      }
    }

    // Walk up
    for (let offset = 1; offset <= 800; offset++) {
      const target = inputMm + offset;
      const r = calculateYabai(target, activeTrigram, orientation, activeUnitMm);
      if (r.overallAuspicious || (r.chiAuspicious && r.cunValue === 0)) {
        list.push({
          offsetMm: offset,
          targetMm: target,
          text: `增加 ${offset} mm ➔ 达到 ${target} mm (${r.chiValue}尺 ${r.cunValue}寸)`,
          dir: "larger",
          chi: r.chiValue,
          cun: r.cunValue,
        });
        break;
      }
    }

    return list;
  }, [inputMm, activeTrigram, orientation, activeUnitMm]);

  // Dynamic values of Star Index Cycle start position
  const activeChiStartIdx = useMemo(() => {
    return orientation === "horizontal"
      ? CHI_BAI_HORIZONTAL_S[activeTrigram]
      : CHI_BAI_VERTICAL_S[activeTrigram];
  }, [activeTrigram, orientation]);

  const activeCunStartIdx = useMemo(() => {
    return orientation === "horizontal"
      ? CUN_BAI_HORIZONTAL_S[activeTrigram]
      : CUN_BAI_VERTICAL_S[activeTrigram];
  }, [activeTrigram, orientation]);

  // Luoshu 3x3 layout mapping (1 to 9 stars)
  // Grid sequence keys (Standard Luoshu: 4 9 2 / 3 5 7 / 8 1 6)
  const luoshuCells = [
    { num: 4, label: "四绿", color: "bg-emerald-900/40 text-emerald-300 border-emerald-800" },
    { num: 9, label: "九紫", color: "bg-purple-900/40 text-purple-300 border-purple-800" },
    { num: 2, label: "二黑", color: "bg-neutral-800 text-neutral-400 border-neutral-700" },
    { num: 3, label: "三碧", color: "bg-teal-950/40 text-teal-300 border-teal-900" },
    { num: 5, label: "五黄", color: "bg-yellow-950/40 text-yellow-500 border-yellow-900" },
    { num: 7, label: "七赤", color: "bg-rose-950/40 text-rose-300 border-rose-900" },
    { num: 8, label: "八白", color: "bg-orange-50 border-orange-200 text-orange-950 font-bold" },
    { num: 1, label: "一白", color: "bg-sky-50 border-sky-200 text-sky-950 font-bold" },
    { num: 6, label: "六白", color: "bg-stone-100 border-stone-300 text-stone-950 font-bold" },
  ];

  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif font-bold">压白罗盘大木作智能测算仪</h2>
        <p className={`text-xs sm:text-sm ${isWarm ? "text-art-text/80 font-serif" : "text-[#888888]"}`}>
          输入您的古建公制尺寸，自主换算地方营造尺并推演大木地母卦及天父卦，核算主框架吉凶投射。
        </p>
      </div>

      {/* ========================================================== */}
      {/* 🤖 COZE AGENT INTEGRATION BLOCK / COZE 智能体交互嵌入区     */}
      {/* ========================================================== */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isWarm ? "bg-[#fdfbf7] border-art-border text-art-text shadow-md shadow-art-accent/10" : "bg-[#111111] border-[#222222] text-[#F3F3F3]"
      } space-y-4`}>
        {/* Banner Header with Status Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-current border-opacity-10">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold flex items-center gap-2">
                <span>Coze AI 营造智能助手对话区 (已预留)</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  正在运行・支持Coze组件接入
                </span>
              </h3>
              <p className={`text-[11px] ${isWarm ? "text-art-text/60" : "text-zinc-500"} mt-0.5`}>
                在此处，您可以随时和我们搭建并调教完成的扣子(Coze) AI Agent 直接双向沟通，解答一切房屋尺度吉凶及二十四山坐向问题。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-stone-100 dark:bg-zinc-800 text-current opacity-70">
              Embedding Container
            </span>
          </div>
        </div>

        {/* Outer Full-Width Container */}
        <div className="w-full">
          {/* Full Width Dialogue Panel */}
          <div className={`w-full flex flex-col h-[320px] rounded-xl border ${
            isWarm ? "bg-white border-art-border" : "bg-black/50 border-zinc-900"
          } overflow-hidden shadow-sm`}>
            {/* Thread top bar */}
            <div className="px-4 py-3 bg-current bg-opacity-[0.03] border-b border-current border-opacity-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="font-serif font-bold text-sm">营造顾问智能体 (已成功对接)</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] uppercase font-mono opacity-60">
                <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-zinc-800 dark:text-zinc-300">Coze Web SDK Active</span>
              </div>
            </div>

            {/* Scrollable chat items list */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3.5 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Chat Avatar */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-[11px] ${
                    msg.sender === "user"
                      ? "bg-stone-800 text-white"
                      : "bg-rose-500 text-white"
                  }`}>
                    {msg.sender === "user" ? "用户" : "工匠"}
                  </div>
                  
                  {/* Chat Message Bubble */}
                  <div className="max-w-[80%] space-y-1">
                    <div className={`px-3.5 py-2 rounded-xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-rose-600 text-white rounded-tr-none font-medium"
                        : isWarm
                        ? "bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200"
                        : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700/60"
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`text-[9px] opacity-40 px-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 items-center text-stone-400 dark:text-zinc-500">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white shrink-0 flex items-center justify-center font-bold text-[11px]">
                    工匠
                  </div>
                  <div className={`px-3 py-2 rounded-xl rounded-tl-none text-[11px] ${
                    isWarm ? "bg-stone-100" : "bg-zinc-800"
                  } flex items-center space-x-1`}>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Helper Prompts balloons */}
            <div className="px-4 py-2 bg-current bg-opacity-[0.01] flex flex-wrap gap-2 border-t border-current border-opacity-5 select-none shrink-0">
              <button
                type="button"
                onClick={() => handleSendChat("帮我看看3.8米面宽怎么压白最吉利？")}
                disabled={isTyping}
                className="text-[10px] px-2.5 py-1 rounded-full border border-current border-opacity-10 bg-black/5 hover:bg-black/10 active:scale-95 disabled:opacity-50 cursor-pointer text-stone-700 dark:text-stone-300 font-serif font-bold transition-all"
              >
                📐 面宽 3.8米压白分析
              </button>
              <button
                type="button"
                onClick={() => handleSendChat("夏家宅坐壬向丙（坐西北偏北），属于哪一卦房？它的压白寸有哪些？")}
                disabled={isTyping}
                className="text-[10px] px-2.5 py-1 rounded-full border border-current border-opacity-10 bg-black/5 hover:bg-black/10 active:scale-95 disabled:opacity-50 cursor-pointer text-stone-700 dark:text-stone-300 font-serif font-bold transition-all"
              >
                🧭 夏家宅坐壬向丙
              </button>
              <button
                type="button"
                onClick={() => handleSendChat("浦东大伙营造尺 27.5cm 和鲁班尺在古建开间中怎么配合？")}
                disabled={isTyping}
                className="text-[10px] px-2.5 py-1 rounded-full border border-current border-opacity-10 bg-black/5 hover:bg-black/10 active:scale-95 disabled:opacity-50 cursor-pointer text-stone-700 dark:text-stone-300 font-serif font-bold transition-all"
              >
                📏 营造尺与鲁班尺
              </button>
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat(chatInput);
              }}
              className="p-2.5 border-t border-current border-opacity-5 flex items-center space-x-2 shrink-0 bg-current bg-opacity-[0.02]"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="可以直接在右下角悬浮的 Coze 弹窗中对话，或在这里输入问题..."
                disabled={isTyping}
                className={`flex-grow px-3 py-2 text-xs rounded-lg outline-none border transition-all ${
                  isWarm
                    ? "bg-stone-50 border-stone-200 text-stone-800 focus:bg-white focus:border-rose-300"
                    : "bg-zinc-900 border-zinc-800 text-zinc-100 focus:bg-black focus:border-rose-900"
                }`}
              />
              <button
                type="submit"
                disabled={isTyping || !chatInput.trim()}
                className="p-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* ========================================================== */}
        {/* Real Coze embed placement target container for developers */}
        {/* ========================================================== */}
        <div id="coze-embedded-container" className="hidden"></div>
        {/* ========================================================== */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Parameters Input - 6 cols */}
        <div className={`lg:col-span-6 p-6 rounded-2xl border ${
          isWarm ? "bg-[#fdfbf7] border-art-border text-art-text shadow-md shadow-art-accent/15" : "bg-[#111111] border-[#222222] text-[#F3F3F3]"
        } space-y-6 shadow-sm`}>
          <div className="border-b border-current border-opacity-10 pb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold flex items-center space-x-2">
              <Compass className="h-5 w-5 opacity-70 animate-spin-slow" />
              <span>尺寸与方位参数设置</span>
            </h3>
            <button
              onClick={() => {
                setInputMm(3800);
                setSelectedDirection("壬");
                setOrientation("horizontal");
                setScaleType("pudong");
              }}
              className="text-xs flex items-center space-x-1 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>重置</span>
            </button>
          </div>

          {/* Orientation Choose */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider block opacity-75">
              1. 测度构件向度 (天父卦 / 地母卦)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="orient-horiz"
                onClick={() => setOrientation("horizontal")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                  orientation === "horizontal"
                    ? isWarm
                      ? "border-art-accent bg-art-accent/5 text-art-accent font-bold"
                      : "border-white bg-white text-black font-bold"
                    : isWarm
                    ? "border-art-border hover:bg-art-panel"
                    : "border-zinc-800 hover:bg-zinc-900"
                }`}
              >
                <span className="text-sm">水平向度 (地母卦)</span>
                <span className="text-[10px] opacity-60 mt-0.5">面宽/进深/开间/通阔等</span>
              </button>

              <button
                id="orient-vert"
                onClick={() => setOrientation("vertical")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                  orientation === "vertical"
                    ? isWarm
                      ? "border-art-accent bg-art-accent/5 text-art-accent font-bold"
                      : "border-white bg-white text-black font-bold"
                    : isWarm
                    ? "border-art-border hover:bg-art-panel"
                    : "border-zinc-800 hover:bg-zinc-900"
                }`}
              >
                <span className="text-sm">垂直向度 (天父卦)</span>
                <span className="text-[10px] opacity-60 mt-0.5">柱高/大架高/梢头高度等</span>
              </button>
            </div>
          </div>

          {/* Scale Preset Choose */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider block opacity-75">
              2. 工匠营造尺标准
            </label>
            <select
              id="scale-selector"
              value={scaleType}
              onChange={(e) => setScaleType(e.target.value as any)}
              className={`w-full p-2.5 text-sm rounded-lg border ${
                isWarm
                  ? "bg-[#fdfbf7] border-art-border text-art-text"
                  : "bg-black border-zinc-800"
              } outline-none`}
            >
              <option value="pudong">浦东东部营造尺 (1尺 = 27.5 cm - 夏家宅古匠惯用)</option>
              <option value="classical">经典工部营造尺 (1尺 = 32.0 cm - 官方标准)</option>
              <option value="shichi">现代市尺 (1尺 = 33.33 cm - 行业大尺)</option>
              <option value="custom">自定义长度尺 (自主设定)</option>
            </select>

            {scaleType === "custom" && (
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs opacity-75">设定每尺长:</span>
                <input
                  id="custom-scale-cm"
                  type="number"
                  step="0.1"
                  min="20"
                  max="45"
                  value={customScaleCm}
                  onChange={(e) => setCustomScaleCm(parseFloat(e.target.value) || 27.5)}
                  className={`w-28 p-1.5 text-xs text-center border rounded outline-none ${
                    isWarm ? "border-[#E8DFD0]" : "border-zinc-800 bg-[#161616]"
                  }`}
                />
                <span className="text-xs opacity-75">厘米 (cm)</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider block opacity-75">
                3. 二十五山·房屋坐山山向
              </label>
              <span className={`text-xs px-2 py-0.5 rounded-full font-serif ${
                isWarm ? "bg-art-accent/15 text-art-accent font-bold" : "bg-white/15 text-white"
              }`}>
                卦起理气: {activeTrigram}卦
              </span>
            </div>

            {/* Draggable Rotatable Compass Widget */}
            <div className={`flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl border ${
              isWarm ? "bg-[#faf8f2] border-art-border" : "bg-black/30 border-zinc-900"
            }`}>
              {/* Outer circular dial wrapper */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 bg-stone-50 dark:bg-zinc-950 rounded-full border-4 border-amber-900/40 p-0.5 shadow-md flex items-center justify-center select-none overflow-hidden">
                <svg
                  className="w-full h-full touch-none cursor-crosshair"
                  viewBox="0 0 240 240"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {/* Outer ring definitions */}
                  <circle cx="120" cy="120" r="115" stroke={isWarm ? "#a16207" : "#555"} strokeWidth="2" fill="none" />
                  <circle cx="120" cy="120" r="110" stroke="#d97706" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                  
                  {/* Draw 24 segment dividers */}
                  {DIRECTIONS_24.map((dir) => {
                    const angleRad = (dir.angle * Math.PI) / 180;
                    const x1 = 120 + Math.sin(angleRad) * 65;
                    const y1 = 120 - Math.cos(angleRad) * 65;
                    const x2 = 120 + Math.sin(angleRad) * 110;
                    const y2 = 120 - Math.cos(angleRad) * 110;
                    return (
                      <line
                        key={`line-${dir.name}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isWarm ? "#e8e5dc" : "#2e2e2e"}
                        strokeWidth="0.8"
                      />
                    );
                  })}

                  {/* 24 mountain Labels arranged in a circle */}
                  {DIRECTIONS_24.map((dir) => {
                    const isSelected = selectedDirection === dir.name;
                    const angleRad = (dir.angle * Math.PI) / 180;
                    const tx = 120 + Math.sin(angleRad) * 92;
                    const ty = 120 - Math.cos(angleRad) * 92;
                    
                    const mustFlip = dir.angle > 90 && dir.angle < 270;
                    const textRotation = mustFlip ? dir.angle + 180 : dir.angle;

                    return (
                      <g
                        key={`lbl-${dir.name}`}
                        transform={`translate(${tx}, ${ty}) rotate(${textRotation})`}
                      >
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="10"
                          fontWeight={isSelected ? "bold" : "normal"}
                          fill={
                            isSelected
                              ? "#e11d48"
                              : isWarm
                              ? "#4f46e5"
                              : "#a1a1aa"
                          }
                          className="font-serif select-none pointer-events-none"
                        >
                          {dir.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Highlighting selected sector slice background */}
                  {(() => {
                    const activeAngle = activeDirectionObj.angle;
                    const rad1 = ((activeAngle - 7.5) * Math.PI) / 180;
                    const rad2 = ((activeAngle + 7.5) * Math.PI) / 180;
                    const d = `
                      M ${120 + Math.sin(rad1) * 65} ${120 - Math.cos(rad1) * 65}
                      A 65 65 0 0 1 ${120 + Math.sin(rad2) * 65} ${120 - Math.cos(rad2) * 65}
                      L ${120 + Math.sin(rad2) * 110} ${120 - Math.cos(rad2) * 110}
                      A 110 110 0 0 0 ${120 + Math.sin(rad1) * 110} ${120 - Math.cos(rad1) * 110}
                      Z
                    `;
                    return (
                      <path
                        d={d}
                        fill="#ef4444"
                        fillOpacity="0.1"
                        stroke="#ef4444"
                        strokeWidth="1"
                        className="pointer-events-none"
                      />
                    );
                  })()}

                  {/* Trigrams Inner Ring */}
                  <circle cx="120" cy="120" r="65" stroke={isWarm ? "#b45309" : "#444"} strokeWidth="1" fill="none" />
                  <circle cx="120" cy="120" r="42" stroke={isWarm ? "#d97706" : "#333"} strokeWidth="1" strokeDasharray="1,1" fill="none" />

                  {/* Draw 8 Trigrams labels */}
                  {[
                    { name: "坎", angle: 0 },
                    { name: "艮", angle: 45 },
                    { name: "震", angle: 90 },
                    { name: "巽", angle: 135 },
                    { name: "离", angle: 180 },
                    { name: "坤", angle: 225 },
                    { name: "兑", angle: 270 },
                    { name: "乾", angle: 315 },
                  ].map((tg) => {
                    const angleRad = (tg.angle * Math.PI) / 180;
                    const tx = 120 + Math.sin(angleRad) * 53;
                    const ty = 120 - Math.cos(angleRad) * 53;
                    const isTrigramActive = activeTrigram === tg.name;
                    return (
                      <text
                        key={`tg-${tg.name}`}
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="9"
                        fontWeight={isTrigramActive ? "bold" : "normal"}
                        fill={isTrigramActive ? "#e11d48" : isWarm ? "#78350f" : "#71717a"}
                        className="font-serif pointer-events-none select-none"
                      >
                        {tg.name}
                      </text>
                    );
                  })}

                  {/* Heaven Pond "天池" Inmost circle with Yin-Yang Taiji symbol */}
                  <circle cx="120" cy="120" r="28" fill={isWarm ? "#fffcf5" : "#121212"} stroke="#b45309" strokeWidth="1.2" />
                  <g transform="translate(120, 120) scale(0.6)" className="pointer-events-none select-none">
                    <path d="M 0,-20 A 10,10 0 0,0 0,0 A 10,10 0 0,1 0,20 A 20,20 0 0,1 0,-20 Z" fill={isWarm ? "#1c1917" : "#eaeaea"} />
                    <path d="M 0,20 A 10,10 0 0,1 0,0 A 10,10 0 0,0 0,-20 A 20,20 0 0,0 0,20 Z" fill={isWarm ? "#fafaf9" : "#1c1c1c"} />
                    <circle cx="0" cy="-10" r="3px" fill={isWarm ? "#fafaf9" : "#1c1c1c"} />
                    <circle cx="0" cy="10" r="3px" fill={isWarm ? "#1c1917" : "#eaeaea"} />
                  </g>

                  {/* Red Pointer Arrow Needle */}
                  {(() => {
                    const activeAngle = activeDirectionObj.angle;
                    const angleRad = (activeAngle * Math.PI) / 180;
                    const bx = 120 - Math.sin(angleRad) * 15;
                    const by = 120 + Math.cos(angleRad) * 15;
                    const hx = 120 + Math.sin(angleRad) * 105;
                    const hy = 120 - Math.cos(angleRad) * 105;

                    return (
                      <g className="pointer-events-none">
                        <line x1={bx} y1={by} x2={hx} y2={hy} stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="120" cy="120" r="4.5" fill="#f59e0b" stroke="#ef4444" strokeWidth="1" />
                        <circle cx="120" cy="120" r="1.5" fill="#fff" />
                        <polygon
                          points={`
                            ${hx} ${hy}
                            ${120 + Math.sin(angleRad - 0.08) * 94} ${120 - Math.cos(angleRad - 0.08) * 94}
                            ${120 + Math.sin(angleRad + 0.08) * 94} ${120 - Math.cos(angleRad + 0.08) * 94}
                          `}
                          fill="#ef4444"
                        />
                      </g>
                    );
                  })()}
                </svg>

                {/* Drag instruction overlay badge */}
                <div className="absolute bottom-1 bg-black/60 shadow text-[9px] text-zinc-100 px-2 py-0.5 rounded-full pointer-events-none tracking-wider whitespace-nowrap">
                  🎯 拖拽旋转红针
                </div>
              </div>

              {/* Angle & detail reading output */}
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 block">
                    物理坐度 / 纳甲归宿
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-serif text-xl font-bold text-rose-600 dark:text-rose-400">
                      「{selectedDirection}」山
                    </span>
                    <span className="text-sm font-mono text-stone-500 font-bold">
                      {activeDirectionObj.angle}° (北起方位)
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-85">
                    纳卦：<span className="font-bold underline text-amber-800 dark:text-amber-400">【{activeTrigram}】卦</span> (其九星流转吉凶由此而定)。
                  </p>
                </div>

                {/* Fine tuning buttons */}
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    onClick={() => {
                      const curIdx = DIRECTIONS_24.findIndex(d => d.name === selectedDirection);
                      const prevIdx = (curIdx - 1 + DIRECTIONS_24.length) % DIRECTIONS_24.length;
                      setSelectedDirection(DIRECTIONS_24[prevIdx].name);
                    }}
                    className="p-1 px-2 text-[10px] rounded border border-current border-opacity-15 hover:bg-black/10 cursor-pointer text-stone-700 dark:text-zinc-300"
                  >
                    ◀ 逆转15°
                  </button>
                  <button
                    onClick={() => {
                      const curIdx = DIRECTIONS_24.findIndex(d => d.name === selectedDirection);
                      const nextIdx = (curIdx + 1) % DIRECTIONS_24.length;
                      setSelectedDirection(DIRECTIONS_24[nextIdx].name);
                    }}
                    className="p-1 px-2 text-[10px] rounded border border-current border-opacity-15 hover:bg-black/10 cursor-pointer text-stone-700 dark:text-zinc-300"
                  >
                    顺转15° ▶
                  </button>
                  <button
                    onClick={() => setSelectedDirection("壬")}
                    className="p-1 px-2 text-[10px] rounded hover:scale-105 active:scale-95 bg-rose-500 text-white font-bold cursor-pointer"
                  >
                    夏家宅「壬」🧭
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Metric dimension in mm */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider block opacity-75">
                4. 测定现代公制尺寸
              </label>
              <span className="text-sm font-mono font-bold">{inputMm} mm</span>
            </div>
            <input
              id="dimension-range-slider"
              type="range"
              min="100"
              max="15000"
              step="5"
              value={inputMm}
              onChange={(e) => setInputMm(parseInt(e.target.value))}
              className="w-full accent-current h-1 bg-zinc-300 rounded-lg cursor-pointer"
            />
            <div className="flex items-center space-x-2">
              <input
                id="dimension-num-input"
                type="number"
                min="10"
                max="50000"
                value={inputMm}
                onChange={(e) => setInputMm(parseInt(e.target.value) || 0)}
                className={`w-32 p-1.5 text-xs font-mono rounded border outline-none ${
                  isWarm
                    ? "bg-[#fdfbf7] border-art-border focus:border-art-accent text-art-text"
                    : "bg-black border-zinc-800 focus:border-white"
                }`}
              />
              <span className="text-xs opacity-75">毫米 (毫米 mm = { (inputMm / 10).toFixed(1) } 厘米)</span>
            </div>
          </div>

          {/* Presets List */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono opacity-50 block uppercase">常用房屋构件测绘尺寸预设点:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset(3800, "horizontal")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                前步进深 (3.8m)
              </button>
              <button
                onClick={() => applyPreset(4501, "horizontal")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                中脊进深 (4.5m)
              </button>
              <button
                onClick={() => applyPreset(8341, "horizontal")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                总大架跨 (8.34m)
              </button>
              <button
                onClick={() => applyPreset(4675, "horizontal")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                两侧次间 (4.67m)
              </button>
              <button
                onClick={() => applyPreset(6059, "horizontal")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                中客堂间 (6.06m)
              </button>
              <button
                onClick={() => applyPreset(3200, "vertical")}
                className="px-2.5 py-1 text-[10px] rounded hover:scale-105 transition border border-current border-opacity-10 cursor-pointer"
              >
                典型柱高 (3.2m)
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Calculations results - 6 cols */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main big board of results */}
          <div className={`p-6 rounded-2xl border relative overflow-hidden transition-all duration-300 ${
            isWarm
              ? "bg-art-panel border-art-border text-art-text shadow-md shadow-art-accent/10"
              : "bg-[#111111] border-[#222222] text-[#F3F3F3] shadow-xl"
          }`}>
            {/* Watermark/Traditional element background */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <Compass className="w-40 h-40" />
            </div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isWarm ? "bg-art-accent/15 text-art-accent font-bold" : "bg-white/10 text-white"
                }`}>营造尺度等值</span>
                <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1.5 flex items-baseline space-x-1.5">
                  <span className={`${isWarm ? "text-art-accent" : "text-white"}`}>
                    {result.chiValue}
                  </span>
                  <span className="text-sm font-sans font-normal opacity-75">尺</span>
                  <span className={`${isWarm ? "text-art-accent" : "text-white"}`}>
                    {result.cunValue}
                  </span>
                  <span className="text-sm font-sans font-normal opacity-75">寸</span>
                </div>
                <p className="text-[10px] font-mono opacity-65 mt-1">
                  1尺 = {activeUnitMm}mm | 1寸 = {activeUnitMm / 10}mm
                </p>
              </div>

              {/* Chinese stamp style overall assessment */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-serif text-2xl font-bold transition-all duration-300 select-none rotate-12 ${
                  result.overallAuspicious
                    ? "border-emerald-600 text-emerald-600 bg-emerald-500/5 shadow-inner"
                    : result.chiAuspicious && result.cunValue === 0
                    ? "border-emerald-600 text-emerald-600 bg-emerald-500/5 shadow-inner"
                    : "border-[#C0392B] text-[#C0392B] bg-[#C0392B]/5 shadow-inner"
                }`}>
                  {result.overallAuspicious || (result.chiAuspicious && result.cunValue === 0) ? "吉" : "不吉"}
                </div>
                <span className="text-[10px] opacity-60 mt-2 font-mono">整体压白评定</span>
              </div>
            </div>

            {/* Step breakdown plate */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-current border-opacity-15 pt-5">
              {/* Star Chi Star */}
              <div className={`p-3.5 rounded-lg border ${
                isWarm ? "bg-[#fdfbf7] border-art-border" : "bg-black/40 border-zinc-900"
              }`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] opacity-60 font-mono">1. 尺白星 (大木骨架)</span>
                  <span className={`text-[10px] px-1.5 rounded-full font-sans ${
                    result.chiAuspicious
                      ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                      : "bg-[#C0392B]/10 text-[#C0392B] font-semibold"
                  }`}>
                    {result.chiStar.auspiciousness === "大吉" ? "大吉 ✅" : result.chiStar.auspiciousness === "次吉" ? "次吉 ✴️" : "九星凶 ❌"}
                  </span>
                </div>
                <div className="font-serif text-base font-bold flex items-center space-x-1">
                  <span>{result.chiValue} 尺 ➔</span>
                  <span className={result.chiAuspicious ? "text-emerald-500" : "text-amber-500"} id="chi-star-display">
                    {result.chiStar.name} {result.chiStar.element}
                  </span>
                </div>
                <div className="text-[10px] opacity-75 mt-1 tracking-wide flex justify-between">
                  <span>卦起: {NINE_STARS.find(ns => ns.index === activeChiStartIdx)?.name}</span>
                  <span>星情: {result.chiStar.meaning}</span>
                </div>
              </div>

              {/* Cun Star */}
              <div className={`p-3.5 rounded-lg border ${
                isWarm ? "bg-[#fdfbf7] border-art-border" : "bg-black/40 border-zinc-900"
              }`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] opacity-60 font-mono">2. 寸白星 (民居关键)</span>
                  <span className={`text-[10px] px-1.5 rounded-full font-sans ${
                    result.cunStar
                      ? result.cunAuspicious
                        ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                        : "bg-[#C0392B]/10 text-[#C0392B]"
                      : "bg-neutral-500/10 text-neutral-400"
                  }`}>
                    {result.cunStar
                      ? result.cunStar.auspiciousness === "大吉" ? "大吉 ✅" : "九色凶 ❌"
                      : "无投白 ❌"}
                  </span>
                </div>
                <div className="font-serif text-base font-bold flex items-center space-x-1">
                  <span>{result.cunValue} 寸 ➔</span>
                  <span className={result.cunAuspicious ? "text-emerald-500" : "text-neutral-500"} id="cun-star-display">
                    {result.cunStar ? `${result.cunStar.name} (色:${result.cunStar.color})` : "零寸不投白"}
                  </span>
                </div>
                <div className="text-[10px] opacity-75 mt-1 tracking-wide flex justify-between">
                  <span>卦起: {PURPLE_WHITE_STARS.find(pws => pws.index === activeCunStartIdx)?.name}</span>
                  <span>属性: {result.cunStar ? result.cunStar.element : "无"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Nine Stars Rolling Bar */}
          <div className={`p-5 rounded-xl border ${
            isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-[#161616] border-zinc-800"
          } space-y-3`}>
            <span className="text-xs font-semibold block opacity-85 font-serif">
              九星压白环状步数模拟 (起点 ➔ 第 {result.chiValue} 尺):
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-1 sm:gap-1.5 font-sans">
              {NINE_STARS.map((star) => {
                // Determine step index distance of this star from activeChiStartIdx
                // S is 1-based start. star.index is 1-based index.
                let stepDist = star.index - activeChiStartIdx;
                if (stepDist < 0) stepDist += 9;
                const correspondingChi = stepDist + 1;

                const isActive = result.chiStar.index === star.index;
                const isAuspicious = star.auspiciousness === "大吉" || star.auspiciousness === "次吉";

                return (
                  <div
                    key={star.index}
                    className={`p-2 rounded border flex flex-col items-center justify-between transition-all duration-300 text-center ${
                      isActive
                        ? isWarm
                          ? "bg-art-accent text-[#fdfaf5] border-art-accent shadow font-bold scale-105"
                          : "bg-white text-black border-white font-bold scale-105"
                        : isAuspicious
                        ? isWarm
                          ? "bg-amber-100/40 border-amber-200 text-amber-900"
                          : "bg-emerald-950/20 border-emerald-900/40 text-emerald-300"
                        : isWarm
                        ? "bg-art-panel border-transparent text-art-text/50"
                        : "bg-[#0A0A0A] border-zinc-900 text-zinc-600"
                    }`}
                  >
                    <span className="text-[8px] opacity-70 font-mono block">#{star.index}</span>
                    <span className="text-xs font-serif font-bold block">{star.name}</span>
                    <span className="text-[8px] opacity-70 block">{star.meaning}</span>
                    <span className={`text-[8px] font-mono mt-1 ${isActive ? "opacity-100" : "opacity-40"}`}>
                      {correspondingChi}尺..
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Luoshu Magic Square Grid (3x3) for Cun Bai */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* 3x3 Magic Square */}
            <div className={`p-4 rounded-xl border md:col-span-6 flex flex-col justify-between ${
              isWarm ? "bg-[#fdfbf7] border-art-border text-art-text" : "bg-[#161616] border-zinc-800"
            }`}>
              <span className="text-xs font-semibold block opacity-85 font-serif mb-2">
                洛书九星寸白布局 (当前投宿: {result.cunStar ? result.cunStar.name : "零寸无宿"}):
              </span>
              <div className="grid grid-cols-3 gap-1.5 aspect-square max-w-[200px] mx-auto w-full">
                {luoshuCells.map((cell) => {
                  const isActive = result.cunStar?.index === cell.num;

                  return (
                    <motion.div
                      key={cell.num}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded p-1 border flex flex-col items-center justify-center text-center transition-all duration-200 select-none ${
                        isActive
                          ? isWarm
                            ? "bg-art-accent border-art-accent text-[#fdfaf5] font-bold shadow-md shadow-art-accent/20"
                            : "bg-white border-white text-black font-bold shadow"
                          : cell.num === 1 || cell.num === 6 || cell.num === 8
                          ? isWarm
                            ? "bg-amber-100/40 border-amber-200 text-amber-900 font-medium"
                            : "bg-zinc-800 border-zinc-700 text-zinc-200"
                          : isWarm
                          ? "bg-art-panel border-transparent text-art-text/45"
                          : "bg-[#0A0A0A] border-zinc-900 text-zinc-700/60"
                      }`}
                    >
                      <span className="text-[12px] font-serif leading-tight">{cell.label}</span>
                      <span className="text-[9px] font-mono opacity-60">#{cell.num}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Intelligent Advising adjustments */}
            <div className={`p-4 rounded-xl border md:col-span-6 flex flex-col justify-between space-y-3 ${
              isWarm ? "bg-art-panel border-art-border text-art-text" : "bg-neutral-900/40 border-neutral-800 text-neutral-300"
            }`}>
              <div className="flex items-center space-x-1 border-b border-current border-opacity-10 pb-2">
                <Lightbulb className="h-4 w-4 shrink-0 text-art-accent" />
                <span className="text-xs font-bold font-serif">大木营造压白微调建议</span>
              </div>

              {result.overallAuspicious || (result.chiAuspicious && result.cunValue === 0) ? (
                <div className="text-xs space-y-1 py-1.5">
                  <div className="text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 shrink-0" />
                    <span>非常吉祥，无需微调！</span>
                  </div>
                  <p className="opacity-80">当前尺度在当前坐山方位下完满投白，尺大吉，寸大吉（或零寸归整），大木支撑大德吉宿稳定。</p>
                </div>
              ) : (
                <div className="text-xs space-y-2">
                  <p className="opacity-80">
                    当前测度未完美投白（尺白为{result.chiStar.auspiciousness}，寸白为{result.cunStar?.auspiciousness || "无"}）。建议采用工匠微调方案：
                  </p>
                  <div className="space-y-1.5 font-sans">
                    {recommendations.map((rec, k) => (
                      <div
                        key={k}
                        className={`p-2 rounded border font-mono flex flex-col space-y-0.5 ${
                          isWarm
                            ? "bg-[#fdfbf7] border-art-border hover:border-art-accent"
                            : "bg-black border-zinc-800 hover:border-white"
                        }`}
                      >
                        <div className="font-bold flex justify-between">
                          <span>调整致 {rec.targetMm} mm</span>
                          <span className={`${rec.dir === "smaller" ? "text-rose-500 font-medium" : "text-emerald-600 font-medium"}`}>
                            {rec.dir === "smaller" ? "-" : "+"}{Math.abs(rec.offsetMm)}mm
                          </span>
                        </div>
                        <div className="text-[10px] opacity-75">
                          等价：{rec.chi}尺 {rec.cun}寸 (星宿双吉)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[9px] opacity-50 italic leading-relaxed">
                * 注：本微调是基于传统掌尺（{activeUnitMm}mm）换算进行的数学逼近。古人放线时常通过木楔微调梁端榫卯，以求“退寸合尺”大吉。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
