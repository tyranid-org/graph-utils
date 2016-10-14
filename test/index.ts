import test from 'ava';
import {
  articulationPoints,
  betweennessCentrality,
  invertGraph,
  cyclic,
  neighbors,
  topologicalSort
} from '../src';

/*
  Graph with two components and one articulation point

  Example from (with added component)
  https://www.cs.purdue.edu/homes/ayg/CS251/slides/chap9d.pdf
  (page 478)
*/
const exampleCyclicGraph = {
  A: [ 'B' ],
  B: [ 'C', 'F' ],
  C: ['E', 'D'],
  D: ['B'],
  E: ['B'],
  F: ['A'],

  // additional component to show it
  // works for non-bigraphs
  X: ['Y'],
  Y: ['Z'],
  Z: []
};


// no cycles
const exampleAcyclicGraph = {
  A: [ 'B', 'C' ],
  B: [ 'D', 'E'],
  C: [ 'F', 'G' ],
  D: [],
  E: [],
  F: [],
  G: []
};


test('neighbors should throw if no adjacency list entry', t => {
  t.throws(() => neighbors(exampleAcyclicGraph, 'Z'));
});


test('Should find articulation points', t => {
  const points = articulationPoints(exampleCyclicGraph);
  t.not(points.indexOf('B'), -1, 'Should find articulation point B');
  t.not(points.indexOf('Y'), -1, 'Should find articulation point Y');
});


test('Should compute correct centrality values', t => {
  const centrality = betweennessCentrality(exampleCyclicGraph);
  const values = Object.keys(centrality).map(k => centrality[k]);
  t.is(Math.max(...values), centrality['B'], 'B should have max centrality');
});


test('Should successfully invert graph', t => {
  const inverted = invertGraph(exampleCyclicGraph);
  Object.keys(exampleCyclicGraph)
    .forEach(node => {
      const nodeNeighbors = (exampleCyclicGraph as any)[node] as string[];
      t.true(nodeNeighbors.every(n => inverted[n].indexOf(node) !== -1));
    });
});


test('Should find cycles', t => {
  t.true(cyclic(exampleCyclicGraph), 'has cycle');
  t.false(cyclic(exampleAcyclicGraph), 'no cycle');
});

test('Should produce valid toposort', t => {
  const sorted = topologicalSort(exampleAcyclicGraph);
  t.deepEqual(sorted, [ 'A', 'C', 'G', 'F', 'B', 'E', 'D' ], 'check against valid ordering');
});

test('Should throw when topologically sorting cyclic graph', t => {
  t.throws(() => topologicalSort(exampleCyclicGraph));
});