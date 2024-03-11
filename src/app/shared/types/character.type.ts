export type CharacterType = {
  name: string;
  rarity: number;
  element: string;
  path: string;
  imgPath: string;
};

export const CharacterEdalon = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
} as const;
export type CharacterEdalon =
  (typeof CharacterEdalon)[keyof typeof CharacterEdalon];

export type CharacterRarity = 4 | 5;
