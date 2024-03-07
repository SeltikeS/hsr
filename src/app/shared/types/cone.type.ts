export type ConeType = {
  atk: number;
  def: number;
  hp: number;
  name: string;
  path: string;
  pathToImage: string;
  rarity: number;
  refinement?: ConeRefinementType[];
  _comment?: string;
};

export type ConeRefinementType = Record<string, number>;

export const ConeRefinement = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
} as const;
export type ConeRefinement =
  (typeof ConeRefinement)[keyof typeof ConeRefinement];
