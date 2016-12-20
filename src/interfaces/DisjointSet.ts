export interface DisjointSet {
  parent: DisjointSet;
  rank: number;
  node: string;
}