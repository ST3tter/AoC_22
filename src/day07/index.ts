import inputTerminal, { testTerminal } from './input.js';

/* get the terminals in- and outputs lines */
const terminalIO = inputTerminal.split('\n');

/* Variable for the path as array of strings */
const path: string[] = [];
/* The fileSystem holds all the sizes for the directories */
const fileSystem: { [key: string]: number } = {};

/* Helper function to add a files size to every dir of the path */
const addFileSize = (path: string[], size: number) => {
  const tempPath = [...path];
  for (let i = 0; i <= path.length; i++) {
    fileSystem[tempPath.join('-')] = (fileSystem[tempPath.join('-')] || 0) + size;
    tempPath.pop();
  }
};

/* Loop each line of the terminal IO */
terminalIO.forEach((line) => {
  /* Lines starting with an '$' are commands */
  if (line.startsWith('$')) {
    const command = line.split(' ');
    /* only the cd command is interesting it is one folder up if its a '..' or in a folder */
    if (command[1] === 'cd') {
      if (command[2] === '..') path.pop();
      else path.push(command[2]);
    }
  } else if (line.startsWith('dir')) {
    /* Dir info is not used */
  } else {
    /* Lines starting with a number are files */
    const file = line.split(' ');
    addFileSize(path, parseInt(file[0]));
  }
});

/* Filter the fileSystem for files smaller than 100000 and sum them up */
const sum = Object.entries(fileSystem)
  .filter((a) => a[1] <= 100000)
  .reduce((acc, current) => acc + current[1], 0);

console.log('Part 1: The sum of all small folders is:', sum);

/* ------- PART 2 ------- */

const spaceAvailable = 70000000 - fileSystem['/'];
const spaceNeeded = 30000000 - spaceAvailable;

/* filter the dirs for folders large enough and get the smallest one */
const folderToDelete = Math.min(
  ...Object.entries(fileSystem)
    .filter((a) => a[1] >= spaceNeeded)
    .map((e) => e[1])
);

console.log('Part 2: The smallest folder that fits is:', folderToDelete);
