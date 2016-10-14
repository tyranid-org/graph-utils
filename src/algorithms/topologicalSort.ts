import {AdjacencyList} from '../interfaces/AdjacencyList';
import {stronglyConnectedComponents} from './stronglyConnectedComponents';


/**
 * Extract topological ordering from components for acyclic graph
 */
export function topologicalSort(
  adjacencyList: AdjacencyList
): string[] {
  const components = stronglyConnectedComponents(adjacencyList);
  if (components.length === Object.keys(adjacencyList).length) {
    return components.reverse().map(c => c[0]);
  } else {
    throw new Error(`adjacencyList contains cycles`);
  }
}