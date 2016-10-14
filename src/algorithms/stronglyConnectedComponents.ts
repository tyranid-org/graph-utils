import {AdjacencyList} from '../interfaces/AdjacencyList';
import {neighbors} from './neighbors';


interface NodeProps {
  [key: string]: {
    index?: number,
    lowlink?: number,
    onStack?: boolean
  }
}


/**
 * find all strongly connected components of graph
 * https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 */
export function stronglyConnectedComponents(
  adjacencyList: AdjacencyList
) {
  const { min } = Math;
  const nodes = Object.keys(adjacencyList);
  const nodeProps = nodes.reduce((o, n) => (o[n] = {}, o), {} as NodeProps);
  const components = [] as string[][];

  const stack = [] as string[];

  let depthIndex = 0;

  nodes.forEach(node => {
    if (!(nodeProps[node].index >= 0)) {
      strongConnect(node);
    }
  });

  function strongConnect(node: string) {
    const props = nodeProps[node];

    props.index = depthIndex;
    props.lowlink = depthIndex;
    props.onStack = true;

    stack.push(node);

    depthIndex += 1;

    const neighborNodes = neighbors(adjacencyList, node);

    for (let i = 0, l = neighborNodes.length; i < l; i++) {
      const neighbor = neighborNodes[i];
      const neighborProps = nodeProps[neighbor];

      if (!(neighborProps.index >= 0)) {
        strongConnect(neighbor);
        props.lowlink = min(props.lowlink as number, neighborProps.index as number);
      } else if (neighborProps.onStack) {
        props.lowlink = min(props.lowlink as number, neighborProps.index as number);
      }
    }

    if (props.lowlink === props.index) {
      const component = [] as string[];

      let w: string | undefined;
      do {
        w = stack.pop();
        if (typeof w !== 'undefined') {
          nodeProps[w].onStack = false;
          component.push(w);
        }
      } while (w !== node);

      components.push(component);
    }
  }

  return components;
}

