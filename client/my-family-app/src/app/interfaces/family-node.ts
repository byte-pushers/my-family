export interface FamilyNode {
  id: number;
  name: string;
  image?: string;
  x?: number;
  y?: number;
  children?: FamilyNode[];
}
