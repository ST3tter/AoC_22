import inputSignal, { testSignal } from './input.js';

/* Split the input string into pairs */
const pairs = inputSignal.split('\n\n');

/* Function to check if values are in the right order. Returns -1, 0 or 1 (used in sort function of part 2)
   -1: In right order
    1: Wrong order
    0: Values are equal */
const processValues = (leftValues: number[], rightValues: number[]): number => {
  /* loop all values of the bigger array */
  for (let i = 0; i < Math.max(leftValues.length, rightValues.length); i++) {
    const left = leftValues[i];
    const right = rightValues[i];

    /* Check if left or right run out */
    if (right === undefined) return 1;
    if (left === undefined) return -1;

    /* If both values are numbers, check them */
    if (typeof left === 'number' && typeof right === 'number') {
      if (left < right) return -1;
      else if (left > right) return 1;
    } else {
      /* if at least one of the values is an array,
         convert the other to one if needed and run the function again */
      const result = processValues(
        Array.isArray(left) ? left : [left],
        Array.isArray(right) ? right : [right]
      );
      /* if a deeper call returned 0 or 1 return it */
      if (result !== 0) return result;
    }
  }
  /* If all values are the same return -1 */
  return 0;
};

let sum = 0;

/* Loop all pairs and if it is in the right order add the pairs number to the sum */
pairs.forEach((pair, i) => {
  const [left, right] = pair.split('\n');
  if (processValues(JSON.parse(left), JSON.parse(right)) === -1) sum += i + 1;
});

console.log('Part 1: The sum of matching pairs is:', sum);

/* ------- PART 2 ------- */

const packages = inputSignal.replaceAll('\n\n', '\n').split('\n');

/* Additional divider packages */
const dividerPackage1 = '[[2]]';
const dividerPackage2 = '[[6]]';

/* Add the divider packages to the packages */
packages.push(dividerPackage1);
packages.push(dividerPackage2);

/* Sort the packages */
packages.sort((a, b) => {
  return processValues(JSON.parse(a), JSON.parse(b));
});

/* Get the indices of the divider packages */
const index1 = packages.indexOf(dividerPackage1) + 1;
const index2 = packages.indexOf(dividerPackage2) + 1;

/* Calculate the decoder key */
const decoderKey = index1 * index2;

console.log('Part 2: The decoder Key is:', decoderKey);
