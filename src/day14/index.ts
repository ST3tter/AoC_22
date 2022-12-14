import inputPaths, { testPaths } from './input.js';

const pathStrings = testPaths.split('\n');
const paths = pathStrings.map((path) =>
  path.split(' -> ').map((node) => node.split(',').map((coord) => parseInt(coord)))
);

let xMin = Infinity;
let xMax = 0;
let yMin = 0;
let yMax = 0;

/* Get the min anx max coordinate values for the map size */
paths.forEach((path) => {
  path.forEach((node) => {
    if (node[0] < xMin) xMin = node[0];
    if (node[0] > xMax) xMax = node[0];
    if (node[1] > yMax) yMax = node[1];
  });
});

/* Create a 2d array for the cave */
const map: string[][] = new Array(yMax - yMin + 1);
for (var i = 0; i < map.length; i++) {
  map[i] = new Array(xMax - xMin + 1).fill('.');
}

/* Helper Function to draw in the map.
   Calculates the actual x and y coordinates and sets the value */
const setMap = (x: number, y: number, value: string) => {
  map[y - yMin][x - xMin] = value;
};

/* Helper function to get a value from the map
   Calculates the actual x and y coordinates and returns the value */
const getMap = (x: number, y: number) => {
  return map[y - yMin][x - xMin];
};

/* Draw the sand Spawn */
setMap(500, 0, '+');

/* Draw all the Rocks in the map */
paths.forEach((path) => {
  let lastNode: number[] | undefined = undefined;
  path.forEach((node) => {
    /* If there was a previous node, draw all the rocks in between */
    if (lastNode) {
      /* If x is the same, draw from y to y coordinates */
      if (lastNode[0] === node[0]) {
        for (let y = Math.min(node[1], lastNode[1]); y <= Math.max(node[1], lastNode[1]); y++) {
          setMap(node[0], y, '#');
        }
      } else if (lastNode[1] === node[1]) {
        /* If y is the same, draw from x to x coordinates */
        for (let x = Math.min(node[0], lastNode[0]); x <= Math.max(node[0], lastNode[0]); x++) {
          setMap(x, node[1], '#');
        }
      }
    }
    lastNode = node;
    setMap(node[0], node[1], '#');
  });
});

// --- Simulate the sand here ---

/* Print the map to the terminal */
map.forEach((row) => console.log(row.join('')));

console.log('Part 1:');

/* ------- PART 2 ------- */

// console.log('Part 2:');
