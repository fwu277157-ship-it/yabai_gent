/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TrigramName = "乾" | "兑" | "离" | "震" | "巽" | "坎" | "艮" | "坤";

export type Orientation = "horizontal" | "vertical"; //水平(地母卦) / 垂直(天父卦)

export interface NineStar {
  index: number; // 1-9
  name: string; // e.g. "贪狼"
  element: string; // e.g. "木"
  meaning: string; // e.g. "生气"
  starType: string; // e.g. "天枢"
  auspiciousness: "大吉" | "次吉" | "凶";
}

export interface PurpleWhiteStar {
  index: number; // 1-9
  name: string; // e.g. "一白"
  color: string; // e.g. "白"
  element: string; // e.g. "水"
  auspiciousness: "大吉" | "次吉" | "凶";
}

// 24山方位
export interface Direction24 {
  name: string; // e.g. "壬"
  angle: number; // e.g. 345 degrees
  trigram: TrigramName; // 纳甲所属卦
}

export interface YabaiResult {
  mm: number;
  chiValue: number; // 换算出来的尺
  cunValue: number; // 换算出来的寸
  chiStar: NineStar;
  cunStar: PurpleWhiteStar | null;
  chiAuspicious: boolean;
  cunAuspicious: boolean;
  overallAuspicious: boolean;
}

// Case Study Definitions
export interface CaseItem {
  id: string;
  name: string;
  type: string; // "整体进深" | "柱距" | "开间"
  rawMm: number;
  computedChi: number;
  computedCun: number;
  chiStarName: string;
  cunStarName: string;
  chiAuspicious: boolean;
  cunAuspicious: boolean;
  overallAuspicious: boolean;
  note?: string;
}

// Core Data Mappings
export const TRIGRAMS: TrigramName[] = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];

// 24山纳甲所属卦
export const DIRECTIONS_24: Direction24[] = [
  { name: "子", angle: 0, trigram: "坎" },
  { name: "癸", angle: 15, trigram: "坎" },
  { name: "丑", angle: 30, trigram: "兑" },
  { name: "艮", angle: 45, trigram: "艮" },
  { name: "寅", angle: 60, trigram: "离" },
  { name: "甲", angle: 75, trigram: "乾" },
  { name: "卯", angle: 90, trigram: "震" },
  { name: "乙", angle: 105, trigram: "坤" },
  { name: "辰", angle: 120, trigram: "坎" },
  { name: "巽", angle: 135, trigram: "巽" },
  { name: "巳", angle: 150, trigram: "兑" },
  { name: "丙", angle: 165, trigram: "艮" },
  { name: "午", angle: 180, trigram: "离" },
  { name: "丁", angle: 195, trigram: "兑" },
  { name: "未", angle: 210, trigram: "震" },
  { name: "坤", angle: 225, trigram: "坤" },
  { name: "申", angle: 240, trigram: "坎" },
  { name: "庚", angle: 255, trigram: "震" },
  { name: "酉", angle: 270, trigram: "兑" },
  { name: "辛", angle: 285, trigram: "巽" },
  { name: "戌", angle: 300, trigram: "离" },
  { name: "乾", angle: 315, trigram: "乾" },
  { name: "亥", angle: 330, trigram: "震" },
  { name: "壬", angle: 345, trigram: "离" },
];

// 堪舆九星
export const NINE_STARS: NineStar[] = [
  { index: 1, name: "贪狼", element: "木", meaning: "生气", starType: "天枢", auspiciousness: "大吉" },
  { index: 2, name: "巨门", element: "土", meaning: "天医", starType: "天璇", auspiciousness: "大吉" },
  { index: 3, name: "禄存", element: "木", meaning: "祸害", starType: "天玑", auspiciousness: "凶" },
  { index: 4, name: "文曲", element: "水", meaning: "六煞", starType: "天权", auspiciousness: "凶" },
  { index: 5, name: "廉贞", element: "火", meaning: "五鬼", starType: "玉衡", auspiciousness: "凶" },
  { index: 6, name: "武曲", element: "金", meaning: "延年", starType: "开阳", auspiciousness: "大吉" },
  { index: 7, name: "破军", element: "金", meaning: "绝命", starType: "摇光", auspiciousness: "凶" },
  { index: 8, name: "左辅", element: "土", meaning: "伏位", starType: "左辅", auspiciousness: "次吉" },
  { index: 9, name: "右弼", element: "土", meaning: "伏位", starType: "右弼", auspiciousness: "次吉" },
];

// 紫白九星
export const PURPLE_WHITE_STARS: PurpleWhiteStar[] = [
  { index: 1, name: "一白", color: "白", element: "水", auspiciousness: "大吉" },
  { index: 2, name: "二黑", color: "黑", element: "土", auspiciousness: "凶" },
  { index: 3, name: "三碧", color: "碧", element: "木", auspiciousness: "凶" },
  { index: 4, name: "四绿", color: "绿", element: "木", auspiciousness: "凶" },
  { index: 5, name: "五黄", color: "黄", element: "土", auspiciousness: "凶" },
  { index: 6, name: "六白", color: "白", element: "金", auspiciousness: "大吉" },
  { index: 7, name: "七赤", color: "赤", element: "金", auspiciousness: "凶" },
  { index: 8, name: "八白", color: "白", element: "土", auspiciousness: "大吉" },
  { index: 9, name: "九紫", color: "紫", element: "火", auspiciousness: "次吉" },
];

// 尺白起点映射（1-based star index）
// 天父卦（垂直）起点
export const CHI_BAI_VERTICAL_S: Record<TrigramName, number> = {
  乾: 9, // 乾右弼
  离: 7, // 离破军
  兑: 1, // 兑贪狼
  震: 2, // 震巨门
  巽: 5, // 巽廉贞
  艮: 6, // 艮武曲
  坎: 4, // 坎文曲
  坤: 3, // 坤禄存
};

// 地母卦（水平）起点
export const CHI_BAI_HORIZONTAL_S: Record<TrigramName, number> = {
  艮: 1, // 艮贪狼
  巽: 2, // 巽巨门
  乾: 3, // 乾禄存
  离: 4, // 离起文
  震: 5, // 震廉贞
  兑: 6, // 兑武曲
  坎: 7, // 坎破军
  坤: 8, // 坤辅弼 (使用左辅8)
};

// 寸白起点映射 (1-based purple-white star index)
// 地母卦（水平）起点口诀: 乾一离二震三兑四坎五坤六巽七艮八
export const CUN_BAI_HORIZONTAL_S: Record<TrigramName, number> = {
  乾: 1,
  离: 2,
  震: 3,
  兑: 4,
  坎: 5,
  坤: 6,
  巽: 7,
  艮: 8,
};

// 天父卦（垂直）起点口诀: 乾四 巽五 离八 坤三 兑九 艮六 震七 坎二
export const CUN_BAI_VERTICAL_S: Record<TrigramName, number> = {
  乾: 4,
  巽: 5,
  离: 8,
  坤: 3,
  兑: 9,
  艮: 6,
  震: 7,
  坎: 2,
};
