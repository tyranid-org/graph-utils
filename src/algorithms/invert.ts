import {AdjacencyList} from '../interfaces/AdjacencyList';
import {neighbors} from './neighbors';

/**
 * Invert directed edges in an ajacency list
 */
export function invertGraph(
  adjacencyList: AdjacencyList
): AdjacencyList {
  const inverted = {} as AdjacencyList;
  const nodes = Object.keys(adjacencyList);
  nodes.forEach(node => inverted[node] = []);

  nodes.forEach(node => {
    neighbors(adjacencyList, node)
      .forEach(neighbor => inverted[neighbor].push(node));
  });

  return inverted;
}