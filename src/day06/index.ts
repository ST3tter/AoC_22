import inputStream, { testStreams } from './input.js';

// const stream = testStreams[0];
const stream = inputStream;

/* Helper function to check if a character has multiple occurrences in a given string 
   Returns true if a string contains a character multiple times, false otherwise */
const checkDoubleChars = (str: string) => {
  /* Loop every character of the string */
  for (let n = 0; n < str.length; n++) {
    /* Check if the current char occurs multiple times in the string */
    const found = str.match(new RegExp(`[${str[n]}]`, 'g'));
    if (found && found.length > 1) return true;
  }
  return false;
};

/* Loop the stream in packages of 4 characters */
for (let i = 4; i <= stream.length; i++) {
  const slice = stream.slice(i - 4, i);

  /* If a package has only unique characters the marker was found */
  if (!checkDoubleChars(slice)) {
    console.log('Part 1: The first marker is at position:', i);
    break;
  }
}

/* ------- PART 2 ------- */

/* Loop the stream with packages of 14 characters */
for (let i = 14; i <= stream.length; i++) {
  const slice = stream.slice(i - 14, i);

  /* If all characters are unique the message was found */
  if (!checkDoubleChars(slice)) {
    console.log('Part 2: The message marker is at position:', i);
    break;
  }
}
