import {AdjacencyList} from '../interfaces/AdjacencyList';

/**
 * Try to retrieve directed edges from a node,
 * throwing informative error if no adjacency list entry exists
 */
export function neighbors(
  adjacencyList: AdjacencyList,
  node: string
) {
  const neighbors = adjacencyList[node];

  if (!Array.isArray(neighbors)) {
    throw new TypeError(
      `Node ${node} does not have an adjacencyList entry that is an array!`
    );
  }

  return neighbors;
}