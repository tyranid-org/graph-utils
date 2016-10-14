import {AdjacencyList} from '../interfaces/AdjacencyList';
import {neighbors} from './neighbors';


/**
 * Find all articulation points by depth first traversal
 * https://www.cs.purdue.edu/homes/ayg/CS251/slides/chap9d.pdf
 */
export function articulationPoints(
  adjacencyList: AdjacencyList
): string[] {
  const nodes = Object.keys(adjacencyList);
  const unvisited = nodes.reduce(
    (o, n) => ((o[n] = true), o), {} as { [key: string]: boolean }
  );
  const { min } = Math;


  // set of points to return as articulation points
  const articulation = [] as string[];

  // mapping of node A to node B visted before discovering A
  const parent = {} as { [nodeId: string]: string };

  // time when a node was first visited
  const visitTime = {} as { [nodeId: string]: number };

  // { A: B } node B with lowest time that is
  // reachable from A using a directed path
  // with at most one back edge
  const minTimeReachable = {} as { [nodeId: string]: number };

  // time of node first discovery
  let time = 0;

  nodes.forEach(function visit(node) {
    if (!unvisited[node]) return;
    delete unvisited[node];

    let children = 0;

    // mark the initial visit time + min reachable
    // time as the current visit time
    visitTime[node] = minTimeReachable[node] = time++;

    // recurse into neighbors for DFS
    neighbors(adjacencyList, node).forEach(neighbor => {
      if (unvisited[neighbor]) {
        // count the number of children that <node> has,
        // and mark the parent relationship
        children++;
        parent[neighbor] = node;

        // recurse into the neighbor to execute the DFT
        visit(neighbor);

        // the nodes neighbor might have a back edge
        // to an earlier node, so take the minimum here
        minTimeReachable[node] = min(
          minTimeReachable[node],
          minTimeReachable[neighbor]
        );

        const isArticulationPoint = (
          // there are no earlier nodes that are reachable
          // from the children of this node via at most
          // one back edge, so the node is an articulation point
          (parent[node] && minTimeReachable[neighbor] >= visitTime[node]) ||
          // the node is a component root, and has more than
          // 1 "children" (nodes which were discovered directly after the root)
          // thus the node is an articulation point between the multiple
          // sub trees
          (!parent[node] && children > 1)
        );

        if (isArticulationPoint) articulation.push(node);
      } else if (neighbor !== parent[node]) {
        // here the neighbor was discovered on another DFS tree branch
        // so we need to see if that nodes visit time was earlier
        // than the current nodes
        minTimeReachable[node] = min(
          minTimeReachable[node],
          visitTime[neighbor]
        );
      }
    });
  });

  return articulation;
}