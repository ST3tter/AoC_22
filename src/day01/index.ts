import inputString from './input.js';

/* Split the string into an array where the elements
   are the calories of one elf */
const elfStrings = inputString.split('\n\n');

/* Map the array and return the sum of calories per element */
const elfCalories = elfStrings.map((elfString) => {
  /* Split the calories string of one elf into an array,
     convert it to numbers and calculate the sum */
  const stringCalories = elfString.split('\n');
  const calories = stringCalories.map((sCal) => +sCal);
  const sum = calories.reduce((acc, current) => acc + current, 0);
  return sum;
});

/* Find the biggest sum */
const maxCalories = Math.max(...elfCalories);

console.log('Part 1: Max calories:', maxCalories);

/* ------- PART 2 ------- */

/* Get the top three calories */
const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);

/* Calculate the sum uf the top three */
const topThreeSum = topThree.reduce((acc, current) => acc + current, 0);

console.log('Part 2: Sum of the top three:', topThreeSum);
