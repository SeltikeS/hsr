export const CharacterName = {
  Asta: 'Asta',
  Bailu: 'Bailu',
  BlackSwan: 'BlackSwan',
  Blade: 'Blade',
  Bronya: 'Bronya',
  Clara: 'Clara',
  DrRatio: 'DrRatio',
  FuXuan: 'FuXuan',
  Hook: 'Hook',
  Jingliu: 'Jingliu',
  Kafka: 'Kafka',
  Luka: 'Luka',
  Luocha: 'Luocha',
  March7: 'March7',
  Natasha: 'Natasha',
  Pela: 'Pela',
  Quingque: 'Quingque',
  RuanMei: 'RuanMei',
  Sampo: 'Sampo',
  Serval: 'Serval',
  Sparkle: 'Sparkle',
  Tingyun: 'Tingyun',
  Topaz: 'Topaz',
  Trailblazer: 'Trailblazer',
  Xueyi: 'Xueyi',
  Yukong: 'Yukong',
} as const;
export type CharacterName = (typeof CharacterName)[keyof typeof CharacterName];

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
