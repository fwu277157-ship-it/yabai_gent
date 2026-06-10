/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseItem } from "../types";

export interface XiaHouseMetadata {
  name: string;
  location: string;
  era: string;
  family: string;
  craftsman: string;
  significance: string;
  description: string;
  sittingTrigram: "离"; // 坐壬向丙，离卦纳壬
}

export const XIA_HOUSE_META: XiaHouseMetadata = {
  name: "浦东民间大木作：夏式宅",
  location: "上海市浦东新区合庆镇传统村落（原川沙大木流派）",
  era: "1920年代至1930年代",
  family: "川沙当地夏氏",
  craftsman: "夏秋堂（合庆镇当地具有一定知名度的大木匠、营造师傅）",
  significance: "夏氏住宅是研究上海川沙等浦东东部沿海平原民间‘压白尺法’存世最完整、最具地方营造工匠技艺传承价值的实物案例。其大木作尺寸、柱距和开间设置契合了夏秋堂在合庆镇一系的地方工匠习惯，并带有独特的‘上海大木作’及传统‘马鞍墙’（已被称为猫弓山墙，有别于闽粤观音兜）防风火山墙形式。",
  description: "夏氏住宅主体采用江南典型三合院带偏房或多进合院制宅院格局，约建于1920年代至1930年代，坐壬向丙（坐北偏西，向南偏东）。该建筑大木构架完整保留了合庆镇本地工匠习惯的主尺度控制。其开间尺度、梁架进深深度高度测数，与‘营造尺法’及‘九星压白’高度咬合。它是解读民间工匠如何平衡工程尺度和堪舆吉凶的活化石。",
  sittingTrigram: "离"
};

// 测量数据
export const XIA_HOUSE_CASES: CaseItem[] = [
  // 开间
  {
    id: "kaijian_1",
    name: "客堂间 (房间1 居中)",
    type: "开间",
    rawMm: 6059,
    computedChi: 22,
    computedCun: 0,
    chiStarName: "破军",
    cunStarName: "无",
    chiAuspicious: false,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "实际测绘公制尺寸为 6059mm，按浦东营造尺（27.5cm/尺）折算为 22.03 尺，接近 22 尺整。在九星压白算式中，22尺对应‘破军’为绝命大凶（不压白）。学术研究指出可能存在8mm测绘误差，若工匠设计实为 21 尺（约5775mm），则对应‘武曲’金星延年大吉！这反映出传统营造中实际放样和测量的微差。"
  },
  {
    id: "kaijian_2",
    name: "次间一 (房间2 左侧)",
    type: "开间",
    rawMm: 4675,
    computedChi: 17,
    computedCun: 0,
    chiStarName: "巨门",
    cunStarName: "无",
    chiAuspicious: true,
    cunAuspicious: false,
    overallAuspicious: false, // 属于普遍民居的“寸白”一般不做过度要求，但其尺白为吉
    note: "实际测绘尺寸 4675mm，按 27.5cm 营造尺折算恰好为 17.00 尺整。17 尺对应‘巨门’土星（天医，大吉！），是极其完美的大木作压白尺度，可见工匠在此大木面阔尺寸控制上的良苦用心。"
  },
  {
    id: "kaijian_3",
    name: "次间二 (房间3 右侧)",
    type: "开间",
    rawMm: 4684,
    computedChi: 17,
    computedCun: 0,
    chiStarName: "巨门",
    cunStarName: "无",
    chiAuspicious: true,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "实际测绘尺寸 4684mm，折算为 17.03 尺，四舍五入为 17 尺整。其吉凶极星亦对应‘巨门’天医大吉。左右次间开间一致（相差仅 9mm 误差），呈现典型的中轴对称和完美压白设计。"
  },

  // 进深
  {
    id: "jinshen_overall_1",
    name: "前步架整体进深",
    type: "整体进深",
    rawMm: 3800,
    computedChi: 13,
    computedCun: 8,
    chiStarName: "破军",
    cunStarName: "九紫",
    chiAuspicious: false,
    cunAuspicious: true,
    overallAuspicious: false,
    note: "公制尺寸 3800mm，折合 13尺 8寸。尺白星‘破军’绝命（凶）；寸白星‘九紫’火星（次吉）。俗语‘普通民居只讲寸白，尺白放宽’反映了民间大木作的实用倾向，局部不尽完美但整体吉星压覆。"
  },
  {
    id: "jinshen_overall_2",
    name: "双脊整体进深",
    type: "整体进深",
    rawMm: 4501,
    computedChi: 16,
    computedCun: 3, // 实际计算中约 3.67寸，四舍五入
    chiStarName: "贪狼",
    cunStarName: "四绿",
    chiAuspicious: true,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "公制 4501mm，折合 16尺 3寸。尺白星‘贪狼’木星（生气，大吉！）；寸白星‘四绿’木（凶）。尺白完美压白，表现大木构件的核心骨架尺度控制优先。"
  },
  {
    id: "jinshen_overall_3",
    name: "通面阔总进深/梁架总跨",
    type: "整体进深",
    rawMm: 8341,
    computedChi: 30,
    computedCun: 3,
    chiStarName: "武曲",
    cunStarName: "四绿",
    chiAuspicious: true,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "公制总测量 8341mm，折合 30尺 3寸。其总进深尺白星对应‘武曲’金星（延年，大吉！）。大木梁架总跨优先保证了梁架主骨骼‘尺白’大吉，庇护整栋建筑大梁安稳。"
  },

  // 柱距
  {
    id: "zhuju_1",
    name: "一柱距 (后部柱间)",
    type: "柱距",
    rawMm: 1125,
    computedChi: 4,
    computedCun: 0,
    chiStarName: "破军",
    cunStarName: "无",
    chiAuspicious: false,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "折合 4尺 0寸。在民间营造中，小构件及密柱间柱距往往屈从于功能和构件用料，难求事事完美投白。"
  },
  {
    id: "zhuju_2",
    name: "二柱距",
    type: "柱距",
    rawMm: 1145,
    computedChi: 4,
    computedCun: 1,
    chiStarName: "破军",
    cunStarName: "二黑",
    chiAuspicious: false,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "折合 4尺 1寸。尺白‘破军’为凶，寸白‘二黑’为凶。中式散斗和步架分布多由桁条数量决定，木作局部的客观约束表现明显。"
  },
  {
    id: "zhuju_5",
    name: "五柱距",
    type: "柱距",
    rawMm: 1184,
    computedChi: 4,
    computedCun: 3,
    chiStarName: "破军",
    cunStarName: "四绿",
    chiAuspicious: false,
    cunAuspicious: false,
    overallAuspicious: false,
    note: "折合 4尺 3寸。此段通常为走廊或步柱过道过渡位置。"
  },
  {
    id: "zhuju_7",
    name: "七柱距 (檐部缩部柱)",
    type: "柱距",
    rawMm: 526,
    computedChi: 1,
    computedCun: 9,
    chiStarName: "文曲",
    cunStarName: "一白",
    chiAuspicious: false,
    cunAuspicious: true,
    overallAuspicious: false,
    note: "折合 1尺 9寸。尺白星‘文曲’六煞（凶）；寸白星‘一白’水星（大吉！）。虽然短小柱距在尺白不尽理想，但在最末尾的一寸，通过寸白‘一白’成功压在了大吉白字之上。"
  }
];
