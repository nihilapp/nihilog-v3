/**
 * 태그 및 카테고리 색상 팔레트
 * 연한 색상 10개와 진한 색상 10개로 구성
 * 각 항목은 한글 이름과 Tailwind 클래스 형식의 값으로 구성
 */

export interface ColorPaletteItem {
  name: string;
  value: string;
}

export const COLOR_PALETTE = {
  light: [
    {
      name: '연한 빨강',
      value: 'button-normal-red-100 hover:button-normal-red-200',
    },
    {
      name: '연한 주황',
      value: 'button-normal-orange-100 hover:button-normal-orange-200',
    },
    {
      name: '연한 노랑',
      value: 'button-normal-yellow-100 hover:button-normal-yellow-200',
    },
    {
      name: '연한 초록',
      value: 'button-normal-green-100 hover:button-normal-green-200',
    },
    {
      name: '연한 청록',
      value: 'button-normal-teal-100 hover:button-normal-teal-200',
    },
    {
      name: '연한 파랑',
      value: 'button-normal-blue-100 hover:button-normal-blue-200',
    },
    {
      name: '연한 남색',
      value: 'button-normal-indigo-100 hover:button-normal-indigo-200',
    },
    {
      name: '연한 보라',
      value: 'button-normal-purple-100 hover:button-normal-purple-200',
    },
    {
      name: '연한 분홍',
      value: 'button-normal-pink-100 hover:button-normal-pink-200',
    },
    {
      name: '연한 갈색',
      value: 'button-normal-stone-100 hover:button-normal-stone-200',
    },
  ],
  dark: [
    {
      name: '진한 빨강',
      value: 'button-normal-red-600 hover:button-normal-red-700',
    },
    {
      name: '진한 주황',
      value: 'button-normal-orange-600 hover:button-normal-orange-700',
    },
    {
      name: '진한 노랑',
      value: 'button-normal-yellow-600 hover:button-normal-yellow-700',
    },
    {
      name: '진한 초록',
      value: 'button-normal-green-600 hover:button-normal-green-700',
    },
    {
      name: '진한 청록',
      value: 'button-normal-teal-600 hover:button-normal-teal-700',
    },
    {
      name: '진한 파랑',
      value: 'button-normal-blue-600 hover:button-normal-blue-700',
    },
    {
      name: '진한 남색',
      value: 'button-normal-indigo-600 hover:button-normal-indigo-700',
    },
    {
      name: '진한 보라',
      value: 'button-normal-purple-600 hover:button-normal-purple-700',
    },
    {
      name: '진한 분홍',
      value: 'button-normal-pink-600 hover:button-normal-pink-700',
    },
    {
      name: '진한 갈색',
      value: 'button-normal-stone-600 hover:button-normal-stone-700',
    },
  ],
} as const satisfies {
  light: readonly ColorPaletteItem[];
  dark: readonly ColorPaletteItem[];
};

export type ColorPaletteLight = typeof COLOR_PALETTE.light[number];
export type ColorPaletteDark = typeof COLOR_PALETTE.dark[number];
export type ColorPalette = ColorPaletteLight | ColorPaletteDark;

export const ALL_COLOR_PALETTE: ColorPalette[] = [
  ...COLOR_PALETTE.light,
  ...COLOR_PALETTE.dark,
];

/**
 * 색상 팔레트 인덱스로 색상 가져오기
 * @param index 0-19 사이의 인덱스 (0-9: 연한 색상, 10-19: 진한 색상)
 * @returns 색상 팔레트 아이템 또는 undefined
 */
export function getColorByIndex(index: number): ColorPalette | undefined {
  if (index < 0 || index >= ALL_COLOR_PALETTE.length) {
    return undefined;
  }
  return ALL_COLOR_PALETTE[index];
}

/**
 * 색상 이름으로 팔레트 아이템 찾기
 * @param name 색상 이름 (예: '연한 빨강', '진한 파랑')
 * @returns 색상 팔레트 아이템 또는 undefined
 */
export function getColorByName(name: string): ColorPalette | undefined {
  return ALL_COLOR_PALETTE.find((item) => item.name === name);
}

/**
 * 색상 값으로 팔레트 아이템 찾기
 * @param value Tailwind 클래스 값 (예: 'button-normal-red-100 hover:button-normal-red-200')
 * @returns 색상 팔레트 아이템 또는 undefined
 */
export function getColorByValue(value: string): ColorPalette | undefined {
  return ALL_COLOR_PALETTE.find((item) => item.value === value);
}

/**
 * 색상 값이 팔레트에 포함되어 있는지 확인
 * @param value Tailwind 클래스 값
 * @returns 팔레트에 포함되어 있으면 true
 */
export function isColorInPalette(value: string): boolean {
  return ALL_COLOR_PALETTE.some((item) => item.value === value);
}
