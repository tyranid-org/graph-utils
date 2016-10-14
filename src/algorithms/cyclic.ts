import {AdjacencyList} from '../interfaces/AdjacencyList';
import {stronglyConnectedComponents} from './stronglyConnectedComponents';

/**
 * Return boolean indicating if a graph has cycles
 */
export function cyclic(
  adjacencyList: AdjacencyList
): boolean {
  return (
    stronglyConnectedComponents(adjacencyList).length !==
    Object.keys(adjacencyList).length
  );
}