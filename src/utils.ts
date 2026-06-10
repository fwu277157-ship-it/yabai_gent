/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TrigramName,
  Orientation,
  NineStar,
  PurpleWhiteStar,
  YabaiResult,
  NINE_STARS,
  PURPLE_WHITE_STARS,
  CHI_BAI_HORIZONTAL_S,
  CHI_BAI_VERTICAL_S,
  CUN_BAI_HORIZONTAL_S,
  CUN_BAI_VERTICAL_S,
} from "./types";

/**
 * 压白测算函数
 * @param mm 输入毫米尺寸
 * @param trigram 坐向卦名
 * @param orientation 水平向(地母) / 垂直向(天父)
 * @param unitMm 每一营造尺对应的毫米数，默认 275mm (浦东营造尺)
 */
export function calculateYabai(
  mm: number,
  trigram: TrigramName,
  orientation: Orientation,
  unitMm: number = 275
): YabaiResult {
  // 1. 换算尺寸
  let chiValue = Math.floor(mm / unitMm);
  let remainderMm = mm - chiValue * unitMm;
  let cunValue = Math.round(remainderMm / (unitMm / 10));

  // 溢出进位处理
  if (cunValue >= 10) {
    chiValue += 1;
    cunValue -= 10;
  }

  // 2. 尺白星计算 (九星)
  const chiStart = orientation === "horizontal"
    ? CHI_BAI_HORIZONTAL_S[trigram]
    : CHI_BAI_VERTICAL_S[trigram];

  // 1-based index calculation
  // (Start + Chi - 2) % 9 + 1
  const chiStarIdx = chiValue > 0
    ? ((chiStart + chiValue - 2) % 9) + 1
    : 1;

  const chiStar = NINE_STARS.find((s) => s.index === chiStarIdx)!;

  // 3. 寸白星计算 (紫白九星)
  let cunStar: PurpleWhiteStar | null = null;
  let cunAuspicious = false;

  if (cunValue > 0) {
    const cunStart = orientation === "horizontal"
      ? CUN_BAI_HORIZONTAL_S[trigram]
      : CUN_BAI_VERTICAL_S[trigram];

    // (Start + Cun - 1) % 9, 0 mapping to 9
    const cunStarIdxRaw = (cunStart + cunValue - 1) % 9;
    const cunStarIdx = cunStarIdxRaw === 0 ? 9 : cunStarIdxRaw;

    cunStar = PURPLE_WHITE_STARS.find((s) => s.index === cunStarIdx)!;
    cunAuspicious = cunStar.auspiciousness === "大吉" || cunStar.auspiciousness === "次吉";
  } else {
    // 0寸，无寸白星，视为不压白(❌)
    cunAuspicious = false;
  }

  const chiAuspicious = chiStar.auspiciousness === "大吉" || chiStar.auspiciousness === "次吉";
  const overallAuspicious = chiAuspicious && cunAuspicious;

  return {
    mm,
    chiValue,
    cunValue,
    chiStar,
    cunStar,
    chiAuspicious,
    cunAuspicious,
    overallAuspicious,
  };
}

/**
 * 格式化尺寸说明
 */
export function formatYabaiMeasurement(mm: number, unitMm: number = 275): string {
  let chiValue = Math.floor(mm / unitMm);
  let remainderMm = mm - chiValue * unitMm;
  let cunValue = Math.round(remainderMm / (unitMm / 10));

  if (cunValue >= 10) {
    chiValue += 1;
    cunValue -= 10;
  }

  return `${chiValue}尺 ${cunValue}寸`;
}
