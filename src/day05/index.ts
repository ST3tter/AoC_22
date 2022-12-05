import inputMoves, { startingStacks, testStacks, testMoves } from './input.js';

/* Clone the stack array because we need it in part 2 again */
const part1Stack: string[][] = JSON.parse(JSON.stringify(startingStacks));
/* Spilt the input moves into an array of moves */
const moves = inputMoves.split('\n');

moves.forEach((move) => {
  /* Split the move into actions */
  const actions = move.split(' ');

  /* For the number of times the current action should execute */
  for (let n = 0; n < +actions[1]; n++) {
    /* Pop the top stack from the 'from' stack and add it to the 'to' stack */
    part1Stack[+actions[5] - 1].push(part1Stack[+actions[3] - 1].pop() || '0');
  }
});

/* Get the top of each stack and convert it to a single string */
let topStacks = part1Stack.map((stack) => stack[stack.length - 1]).join('');

console.log('Part 1: The top of the stacks is:', topStacks);

/* ------- PART 2 ------- */

/* Clone the stack again */
const part2Stack: string[][] = JSON.parse(JSON.stringify(startingStacks));

moves.forEach((move) => {
  const actions = move.split(' ');

  /* This time the action is only run once, but n elements are moved */
  part2Stack[+actions[5] - 1] = part2Stack[+actions[5] - 1].concat(
    part2Stack[+actions[3] - 1].splice(-actions[1])
  );
});

/* Get the top string again */
const topStacks2 = part2Stack.map((stack) => stack[stack.length - 1]).join('');

console.log('Part 2: The top of the stacks is:', topStacks2);
