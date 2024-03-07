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
