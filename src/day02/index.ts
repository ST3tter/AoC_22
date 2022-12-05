import inputString, { testInput } from './input.js';

/* LUT for the match combinations

  A/X Rock = 1
  B/Y Paper = 2
  C/Z Scissors = 3
  
  Win = 6
  Draw = 3
  Loose = 0 */
const combinations: { [key: string]: number } = {
  AX: 1 + 3,
  AY: 2 + 6,
  AZ: 3 + 0,
  BX: 1 + 0,
  BY: 2 + 3,
  BZ: 3 + 6,
  CX: 1 + 6,
  CY: 2 + 0,
  CZ: 3 + 3,
};

/* Input string to array of match combinations */
const matchArray = inputString.replaceAll(' ', '').split('\n');

/* Calculate the sum of the matches with the combinations LUT */
const sum = matchArray.reduce((acc, current) => acc + combinations[current], 0);

console.log('Part 1: The sum of all matches is:', sum);

/* ------- PART 2 ------- */

/* LUT for the match combinations
  A Rock = 1
  B Paper = 2
  C Scissors = 3

  X Loose = 0
  Y Draw = 3
  Z Win = 6 */
const strategies: { [key: string]: number } = {
  AX: 3 + 0,
  AY: 1 + 3,
  AZ: 2 + 6,
  BX: 1 + 0,
  BY: 2 + 3,
  BZ: 3 + 6,
  CX: 2 + 0,
  CY: 3 + 3,
  CZ: 1 + 6,
};

/* Calculate the sum of the matches with the strategies LUT */
const Part2sum = matchArray.reduce((acc, current) => acc + strategies[current], 0);

console.log('Part 2: The sum of all matches is:', Part2sum);
