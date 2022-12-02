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

console.log(sum);
