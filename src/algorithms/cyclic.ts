import {AdjacencyList} from '../interfaces/AdjacencyList';
import {topologicalSort} from './topologicalSort';

/**
 * Return boolean indicating if a graph has cycles
 */
export function cyclic(
  adjacencyList: AdjacencyList
): boolean {
  try {
    topologicalSort(adjacencyList);
  } catch (err) {
    if (/adjacencyList contains cycles/.test(err.message)) return true;
    throw err;
  }
  return false;
}