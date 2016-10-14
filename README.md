# `graph-utils`

[![npm version](https://badge.fury.io/js/graph-utils.svg)](https://badge.fury.io/js/graph-utils)
[![Build Status](https://travis-ci.org/tyranid-org/graph-utils.svg?branch=master)](https://travis-ci.org/tyranid-org/graph-utils)
[![codecov](https://codecov.io/gh/tyranid-org/graph-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/tyranid-org/graph-utils)

Graph utility functions that take a common adjacency list interface:

```typescript
export interface AdjacencyList {
  [nodeId: string]: string[]
}
```

## Installation

```bash
npm install graph-utils
```

## License

Apache 2.0