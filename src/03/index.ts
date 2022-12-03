import inputString, { testInput } from './input.js';

/* Helper function to get the value of a character */
const getValueForChar = (char: string) => {
  /* a-z = 1-16 ASCII a = 97 => offset = 96 */
  const lowercaseOffset = 96;
  /* A-Z = 27-52 ASCII A = 65 => offset = 38 */
  const uppercaseOffset = 38;

  /* get the ASCII value of the character */
  const asciiValue = char.charCodeAt(0);

  /* Subtract the lower- or upperCase ASCII offset to get the right values.
     If the ASCII value is bigger than 90 it is a lowercase character. */
  if (char.charCodeAt(0) > 90) return asciiValue - lowercaseOffset;
  else return asciiValue - uppercaseOffset;
};

/* Store the rucksack strings in an array */
const rucksackStrings = inputString.split('\n');

const matchingChars = rucksackStrings.map((rucksack) => {
  /* Split the rucksack string into the two compartments */
  const compartment1 = rucksack.slice(0, rucksack.length / 2);
  const compartment2 = rucksack.slice(rucksack.length / 2);

  /*  Search the matching chars
      (Check if character of compartment1 exists in compartment2) */
  for (let char of compartment1) {
    if (compartment2.includes(char)) {
      return char;
    }
  }
  /* Throw an error if a rucksack does not contain a matching character pair */
  throw new Error(`No matching characters found in rucksack ${rucksack}`);
});

/* Calculate the sum of every character value */
const sum = matchingChars.reduce((acc, current) => acc + getValueForChar(current), 0);

console.log('The sum of all priorities is:', sum);
