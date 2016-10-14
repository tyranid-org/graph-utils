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

## Installation

```bash
npm install graphutil
```

## License

Apache 2.0