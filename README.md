# `graphutil`

[![npm version](https://badge.fury.io/js/graphutil.svg)](https://badge.fury.io/js/graphutil)
[![Build Status](https://travis-ci.org/tyranid-org/graphutil.svg?branch=master)](https://travis-ci.org/tyranid-org/graphutil)
[![codecov](https://codecov.io/gh/tyranid-org/graphutil/branch/master/graph/badge.svg)](https://codecov.io/gh/tyranid-org/graphutil)

Graph utility functions that take a common adjacency list interface:

```typescript
export interface AdjacencyList {
  [nodeId: string]: string[]
}
```

## Algorithms implemented

- [articulation points](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/articulationPoints.ts)
- [betweeness centrality](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/betweenessCentrality.ts)
- [cycle detection](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/cyclic.ts)
- [graph inversion](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/invert.ts)
- [strongly connected components](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/stronglyConnectedComponents.ts)
- [topological sort](https://github.com/tyranid-org/graphutil/blob/master/src/algorithms/topologicalSort.ts)

## Installation

```bash
npm install graphutil
```

## License

Apache 2.0