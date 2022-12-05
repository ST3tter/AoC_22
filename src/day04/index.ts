import inputString, { testInput, testInput2 } from './input.js';

/* Helper function to check if two assignments are overlapping.
Return true if they are overlapping, false otherwise*/
const checkFullOverlap = (a: number[], b: number[]) => {
  /* Check if a contains b OR b contains a*/
  if ((a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1])) {
    return true;
  } else {
    return false;
  }
};

/* Split the input into strings of section pairs */
const sectionsArray = inputString.split('\n');

/* Array of the sections containing true if they overlap, false otherwise */
const overlappingSections = sectionsArray.map((sectionString) => {
  /* Split the section into its pairs */
  const pairString = sectionString.split(',');
  /* Split the pairs into min and max values and convert them to numbers */
  const assignment1 = pairString[0].split('-').map((valueString) => +valueString);
  const assignment2 = pairString[1].split('-').map((valueString) => +valueString);
  return checkFullOverlap(assignment1, assignment2);
});

/* Calculate the sum of matching pairs */
const sum = overlappingSections.reduce((acc, current) => acc + Number(current), 0);

console.log('Part 1: The sum of matching pairs is:', sum);

/* ------- PART 2 ------- */

/* Helper function to check if a part of two assignments are overlapping.
Return true if they are overlapping, false otherwise*/
const checkPartialOverlap = (a: number[], b: number[]) => {
  /* Check if parts overlap*/
  if ((a[0] <= b[0] && a[1] >= b[0]) || (b[0] <= a[0] && b[1] >= a[0])) {
    return true;
  } else {
    return false;
  }
};

/* Array of the sections containing true if they partially overlap, false otherwise */
const partialOverlappingSections = sectionsArray.map((sectionString) => {
  /* Split the section into its pairs */
  const pairString = sectionString.split(',');
  /* Split the pairs into min and max values and convert them to numbers */
  const assignment1 = pairString[0].split('-').map((valueString) => +valueString);
  const assignment2 = pairString[1].split('-').map((valueString) => +valueString);
  return checkPartialOverlap(assignment1, assignment2);
});

/* Calculate the sum of matching pairs */
const partialSum = partialOverlappingSections.reduce((acc, current) => acc + Number(current), 0);

console.log('Part 2: The sum of partial overlapping pairs is:', partialSum);
