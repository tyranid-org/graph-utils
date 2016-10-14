import {AdjacencyList} from '../interfaces/AdjacencyList';
import {neighbors} from './neighbors';

/**
 * Compute betweenness centrality values for unweighted graph,
 * using Brandes fast algorithm:
 *
 * http://algo.uni-konstanz.de/publications/b-fabc-01.pdf (page 10)
 */
export function betweennessCentralityUnweighted(
  adjacencyList: AdjacencyList
): { [nodeId: string]: number } {
  const nodes = Object.keys(adjacencyList || {});
  const indexMap = nodes.reduce((o, n, i) => (o[n] = i, o), {} as {[key: string]: number});
  const zeros = nodes.map(() => 0);
  const negativeOnes = zeros.map(() => -1);
  const centrality = zeros.slice();
  const arrFn = () => ([] as number[]);

  for (let nodeIndex = 0, l = nodes.length; nodeIndex < l; nodeIndex++) {
    const stack = [] as number[];
    const P = nodes.map(arrFn);

    const σ = zeros.slice();
    const δ = zeros.slice();
    const d = negativeOnes.slice();

    σ[nodeIndex] = 1;
    d[nodeIndex] = 0;

    const queue = [ nodeIndex ];

    while (queue.length) {
      let v = queue.shift() as number;

      stack.push(v);

      const neighborNodes = neighbors(adjacencyList, nodes[v]);

      for (let i = 0, n = neighborNodes.length; i < n; i++) {
        const neighbor = indexMap[neighborNodes[i]];

        if (d[neighbor] < 0) {
          queue.push(neighbor);
          d[neighbor] = d[v] + 1;
        }

        if (d[neighbor] === d[v] + 1) {
          σ[neighbor] = σ[neighbor] + σ[v];
          P[neighbor].push(v);
        }
      }
    }

    while (stack.length) {
      const w = stack.pop() as number;
      const path = P[w];
      for (let i = 0, p = path.length; i < p; i++) {
        const v = path[i];
        δ[v] = δ[v] + (σ[v] / σ[w]) * (1 + δ[w]);
      }
      if (w !== nodeIndex) centrality[w] = centrality[w] + δ[w];
    }
  }

  const out = {} as { [key: string]: number };
  for (let i = 0, l = centrality.length; i < l; i++) {
    out[nodes[i]] = centrality[i];
  }

  return out;
}