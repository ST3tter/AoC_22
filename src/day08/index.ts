import inputTrees, { testTrees } from './input.js';

/* Input string to tree arrays */
const treeArray = inputTrees.split('\n').map((row) => {
  const treeRow: number[] = [];
  for (let t = 0; t < row.length; t++) {
    treeRow.push(+row[t]);
  }
  return treeRow;
});

let visibleTrees = 0;

treeArray.forEach((row, y) => {
  if (y === 0 || y === treeArray.length - 1) {
    visibleTrees += row.length;
  } else {
    row.forEach((tree, x) => {
      if (x === 0 || x === row.length - 1) {
        visibleTrees++;
      } else {
        let visible = false;
        /* To the right of the tree */
        for (let i = x + 1; i < row.length; i++) {
          if (treeArray[y][i] >= tree) break;
          if (i === row.length - 1) visible = true;
        }
        /* To the left of the tree */
        for (let i = 0; i < x; i++) {
          if (treeArray[y][i] >= tree) break;
          if (i === x - 1) visible = true;
        }
        /* To the bottom of the tree */
        for (let i = y + 1; i < treeArray.length; i++) {
          if (treeArray[i][x] >= tree) break;
          if (i === treeArray.length - 1) visible = true;
        }
        /* To the top of the tree */
        for (let i = 0; i < y; i++) {
          if (treeArray[i][x] >= tree) break;
          if (i === y - 1) visible = true;
        }
        if (visible) visibleTrees++;
      }
    });
  }
});

console.log('Part 1: The sum of all visible trees is:', visibleTrees);

/* ------- PART 2 ------- */

let topScore = 0;

/* Loop all trees not on the outside and calculate the score */
treeArray.forEach((row, y) => {
  if (y !== 0 && y !== treeArray.length - 1) {
    row.forEach((tree, x) => {
      let score = 0;
      if (x !== 0 && x !== row.length - 1) {
        let cnt = 0;
        /* To the right of the tree */
        for (let i = x + 1; i < row.length; i++) {
          cnt++;
          if (treeArray[y][i] >= tree) break;
        }
        score = cnt;
        cnt = 0;
        /* To the left of the tree */
        for (let i = x - 1; i >= 0; i--) {
          cnt++;
          if (treeArray[y][i] >= tree) break;
        }
        score *= cnt;
        cnt = 0;
        /* To the bottom of the tree */
        for (let i = y + 1; i < treeArray.length; i++) {
          cnt++;
          if (treeArray[i][x] >= tree) break;
        }
        score *= cnt;
        cnt = 0;
        /* To the top of the tree */
        for (let i = y - 1; i >= 0; i--) {
          cnt++;
          if (treeArray[i][x] >= tree) break;
        }
        score *= cnt;
      }
      if (score > topScore) topScore = score;
    });
  }
});

console.log('Part 2: The the best tree has a score of:', topScore);
