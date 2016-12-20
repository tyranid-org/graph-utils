import {DisjointSet} from '../interfaces/DisjointSet';
import {AdjacencyList} from '../interfaces/AdjacencyList';


export function make(node: string): DisjointSet {
  const set: any = { rank: 0, node };
  set.parent = set;
  return set as DisjointSet;
}

export function root(set: DisjointSet): DisjointSet {
  if (set.parent !== set) {
    set.parent = root(set.parent);
  }
  return set.parent;
}

export function union(A: DisjointSet, B: DisjointSet): DisjointSet {
  const rootA = root(A);
  const rootB = root(B);

  switch (true) {
    case rootA === rootB: {
      return rootA;
    }

    case rootA.rank < rootB.rank: {
      rootA.parent = rootB;
      return rootB;
    }

    case rootA.rank > rootB.rank: {
      rootB.parent = rootA;
      return rootA;
    }

    default: {
      rootB.parent = rootA;
      rootA.rank = rootA.rank + 1;
      return rootA;
    }
  }
}