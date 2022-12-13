import inputMap, { testMap } from './input.js';

/* Split the input strings into rows */
const mapRows = inputMap.split('\n');

/* Positions of the start and end in the map */
let start = [0, 0];
let end = [0, 0];

/* Create a 2d array for the map */
const map: number[][] = new Array(mapRows.length);
for (var i = 0; i < map.length; i++) {
  /* Search for the start and end and if found add the coordinates */
  if (mapRows[i].search('S') !== -1) start = [mapRows[i].search('S'), i];
  if (mapRows[i].search('E') !== -1) end = [mapRows[i].search('E'), i];

  /* Fill the map with the row data (ASCII value - offset) a = 1, z = 26 */
  map[i] = mapRows[i].split('').map((char) => char.charCodeAt(0) - 96);
}

/* set the elevation of the start and end point */
map[start[1]][start[0]] = 1;
map[end[1]][end[0]] = 26;

/* A* Setup */
/* Declaration for a path node */
interface Node {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent?: Node;
}

/* Heuristic function for the algorithm
   returns the distance x + y from the a node to the end */
const heuristic = (node: Node) => {
  return Math.abs(node.x - end[0]) + Math.abs(node.y - end[1]);
};

/* function to get the neighbors of a given node */
const getNeighbors = (node: Node) => {
  const neighbors: Node[] = [];
  const x = node.x;
  const y = node.y;

  /* Check if the neighbors exists and the elevation is not bigger than + 1 of the node */
  if (map[y - 1] && map[y - 1][x] && map[y][x] >= map[y - 1][x] - 1) {
    neighbors.push({ x: x, y: y - 1, g: 0, h: 0, f: 0 });
  }
  if (map[y + 1] && map[y + 1][x] && map[y][x] >= map[y + 1][x] - 1) {
    neighbors.push({ x: x, y: y + 1, g: 0, h: 0, f: 0 });
  }
  if (map[y][x - 1] && map[y][x] >= map[y][x - 1] - 1) {
    neighbors.push({ x: x - 1, y: y, g: 0, h: 0, f: 0 });
  }
  if (map[y][x + 1] && map[y][x] >= map[y][x + 1] - 1) {
    neighbors.push({ x: x + 1, y: y, g: 0, h: 0, f: 0 });
  }

  return neighbors;
};

const aStar = (start: number[]) => {
  /* Open and closed list for the path finding */
  const openList: Node[] = [];
  const closedList: Node[] = [];

  const startNode: Node = {
    x: start[0],
    y: start[1],
    g: 0,
    h: 0,
    f: 0,
  };

  openList.push(startNode);

  /* Process the pathfinding */
  while (openList.length > 0) {
    /* Find the node with the lowest f score and remove the node
     from the open list and add it to the closed list */
    openList.sort((a, b) => a.f - b.f);
    const currentNode = openList.shift() || openList[0];
    closedList.push(currentNode);

    if (currentNode.x === end[0] && currentNode.y === end[1]) {
      /* Get the path from end to start by following the parents */
      var curr = currentNode;
      var ret = [];
      while (curr.parent) {
        ret.push(curr);
        curr = curr.parent;
      }
      return ret.reverse();
    }

    const neighbors = getNeighbors(currentNode);

    /* Loop all neighbors */
    neighbors.forEach((neighbor) => {
      /* Check if the neighbor is already in the closed list */
      if (closedList.find((node) => node.x === neighbor.x && node.y === neighbor.y)) {
        return;
      }

      /* The neighbors g value is the currents one plus one */
      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      /* Check if the neighbor is not already in the open list.
         if not calculate the heuristic h and add it in the open list. */
      if (!openList.find((node) => node.x === neighbor.x && node.y === neighbor.y)) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor);
        openList.push(neighbor);
        /* If the node is in the open list, check if the g score is better */
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      /* If the g score is better, update the node */
      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    });
  }
};

console.log('Part 1: The path is', aStar(start)?.length, 'steps long');

/* ------- PART 2 ------- */

let shortestPath: number = Infinity;

/* Loop the map and find all elevations 'a' for possible starting points.
   For each starting point is routed and the shortest path saved */
map.forEach((row, y) => {
  row.forEach((elevation, x) => {
    if (elevation === 1) {
      const path = aStar([x, y]);
      if (path && path.length < shortestPath) {
        shortestPath = path.length;
      }
    }
  });
});

console.log('Part 2: The shortest path is', shortestPath, 'steps long');
