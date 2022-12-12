import inputProgram, { testProgram } from './input.js';

const cycles = inputProgram.split('\n');
let cycleNumber = 0;
let accumulator = 1;
let signalStrength = 0;

/* Function to update the cycle and signal strength */
const update = () => {
  cycleNumber++;
  if ((cycleNumber - 20) % 40 === 0) {
    signalStrength += accumulator * cycleNumber;
  }
};

cycles.forEach((cycle) => {
  if (cycle === 'noop') {
    /* noop just updates the cycle */
    update();
  } else {
    /* Call update twice for the add operation */
    update();
    update();

    /* Get the value to add or subtract from the accumulator */
    const value = +cycle.split(' ')[1];
    accumulator += value;
  }
});

console.log('Part 1: The signal strength is ' + signalStrength);

/* ------- PART 2 ------- */

let CRT = 0;
let imageRow = 0;
let spritePosition = 1;

/* Create an array for the screen */
const screen = new Array(6);
for (var i = 0; i < screen.length; i++) {
  screen[i] = new Array(40).fill('x');
}

/* Function to update the screen */
const updateScreen = () => {
  /* xPos is the current position in the current row */
  const xPos = CRT % 40;
  /* Draw a '#' if the xPos and Pixelpos +-1 match */
  screen[imageRow][xPos] = xPos >= spritePosition - 1 && xPos <= spritePosition + 1 ? '#' : ' ';
  /* Increment the CRT and switch row if needed */
  CRT++;
  if (CRT % 40 === 0) {
    imageRow++;
  }
};

/* Loop all cycles and update the screen and sprite position */
cycles.forEach((cycle) => {
  if (cycle === 'noop') {
    updateScreen();
  } else {
    updateScreen();
    updateScreen();

    /* Get the value to add or subtract and calculate the new sprite position */
    const value = +cycle.split(' ')[1];
    spritePosition += value;
  }
});

/* Log the screen */
console.log('Part 2:');
screen.forEach((row) => {
  console.log(row.join(''));
});
