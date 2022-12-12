import inputMoves, { testMoves, testMoves2 } from './input.js';

/* Split the input string into moves with a direction and a distance */
const moves = inputMoves.split('\n').map((move) => {
  const [direction, distance] = move.split(' ');
  return { direction, distance: +distance };
});

enum Direction {
  COVER = 1,
  LEFT,
  TOP_LEFT,
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
}

const head = { x: 0, y: 0 };
/* Now an array of tails */
const tails = [
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
  { x: 0, y: 0, direction: Direction.COVER },
];

/* Array to track tail nr. 9 */
const tailPos: string[] = [];

/* Function to move the head */
const moveHead = (direction: string, distance: number) => {
  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case 'R':
        head.x++;
        break;
      case 'L':
        head.x--;
        break;
      case 'U':
        head.y++;
        break;
      case 'D':
        head.y--;
        break;
    }
    moveTail(direction, 0);
  }
};

/* Function to move the tail according to the relative position of to the head */
const moveTail = (direction: string, tailNumber: number) => {
  if (tailNumber >= tails.length) return;
  switch (direction) {
    case 'R':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.LEFT;
          break;

        case Direction.LEFT:
          tails[tailNumber].x++;
          moveTail('R', tailNumber + 1);
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('DR', tailNumber + 1);
          break;

        case Direction.TOP:
          tails[tailNumber].direction = Direction.TOP_LEFT;
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.RIGHT:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].direction = Direction.BOTTOM;
          break;

        case Direction.BOTTOM:
          tails[tailNumber].direction = Direction.BOTTOM_LEFT;
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('UR', tailNumber + 1);
          break;
      }
      break;
    case 'L':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.LEFT:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.TOP:
          tails[tailNumber].direction = Direction.TOP_RIGHT;
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y--;
          moveTail('DL', tailNumber + 1);
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.RIGHT:
          tails[tailNumber].x--;
          moveTail('L', tailNumber + 1);
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y++;
          moveTail('UL', tailNumber + 1);
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.BOTTOM:
          tails[tailNumber].direction = Direction.BOTTOM_RIGHT;
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].direction = Direction.BOTTOM;
          break;
      }
      break;
    case 'U':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.BOTTOM;
          break;

        case Direction.LEFT:
          tails[tailNumber].direction = Direction.BOTTOM_LEFT;
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].direction = Direction.LEFT;
          break;

        case Direction.TOP:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.RIGHT:
          tails[tailNumber].direction = Direction.BOTTOM_RIGHT;
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y++;
          moveTail('UL', tailNumber + 1);
          tails[tailNumber].direction = Direction.BOTTOM;
          break;

        case Direction.BOTTOM:
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM;
          moveTail('U', tailNumber + 1);
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y++;
          moveTail('UR', tailNumber + 1);
          tails[tailNumber].direction = Direction.BOTTOM;
          break;
      }
      break;
    case 'D':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.LEFT:
          tails[tailNumber].direction = Direction.TOP_LEFT;
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y--;
          moveTail('DR', tailNumber + 1);
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.TOP:
          tails[tailNumber].y--;
          moveTail('D', tailNumber + 1);
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y--;
          moveTail('DL', tailNumber + 1);
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.RIGHT:
          tails[tailNumber].direction = Direction.TOP_RIGHT;
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.BOTTOM:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].direction = Direction.LEFT;
          break;
      }
      break;
    /* The tails 2-9 can follow a diagonal move now */
    case 'UL':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.BOTTOM_RIGHT;
          break;

        case Direction.LEFT:
          tails[tailNumber].direction = Direction.BOTTOM;
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.TOP:
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].x--;
          moveTail('L', tailNumber + 1);
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.RIGHT;
          moveTail('UL', tailNumber + 1);
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM_RIGHT;
          moveTail('UL', tailNumber + 1);
          break;

        case Direction.BOTTOM:
          tails[tailNumber].x--;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM;
          moveTail('UL', tailNumber + 1);
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM;
          moveTail('U', tailNumber + 1);
          break;
      }
      break;

    case 'UR':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.BOTTOM_LEFT;
          break;

        case Direction.LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('UR', tailNumber + 1);
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('R', tailNumber + 1);
          break;

        case Direction.TOP:
          tails[tailNumber].direction = Direction.LEFT;
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.RIGHT:
          tails[tailNumber].direction = Direction.BOTTOM;
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM;
          moveTail('U', tailNumber + 1);
          break;

        case Direction.BOTTOM:
          tails[tailNumber].x++;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM;
          moveTail('UR', tailNumber + 1);
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y++;
          tails[tailNumber].direction = Direction.BOTTOM_LEFT;
          moveTail('UR', tailNumber + 1);
          break;
      }
      break;

    case 'DR':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.TOP_LEFT;
          break;

        case Direction.LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('DR', tailNumber + 1);
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP_LEFT;
          moveTail('DR', tailNumber + 1);
          break;

        case Direction.TOP:
          tails[tailNumber].x++;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP;
          moveTail('DR', tailNumber + 1);
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP;
          moveTail('D', tailNumber + 1);
          break;

        case Direction.RIGHT:
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].direction = Direction.COVER;
          break;

        case Direction.BOTTOM:
          tails[tailNumber].direction = Direction.LEFT;
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].x++;
          tails[tailNumber].direction = Direction.LEFT;
          moveTail('R', tailNumber + 1);
          break;
      }
      break;

    case 'DL':
      switch (tails[tailNumber].direction) {
        case Direction.COVER:
          tails[tailNumber].direction = Direction.TOP_RIGHT;
          break;

        case Direction.LEFT:
          tails[tailNumber].direction = Direction.TOP;
          break;

        case Direction.TOP_LEFT:
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP;
          moveTail('D', tailNumber + 1);
          break;

        case Direction.TOP:
          tails[tailNumber].x--;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP;
          moveTail('DL', tailNumber + 1);
          break;

        case Direction.TOP_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.TOP_RIGHT;
          moveTail('DL', tailNumber + 1);
          break;

        case Direction.RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].y--;
          tails[tailNumber].direction = Direction.RIGHT;
          moveTail('DL', tailNumber + 1);
          break;

        case Direction.BOTTOM_RIGHT:
          tails[tailNumber].x--;
          tails[tailNumber].direction = Direction.RIGHT;
          moveTail('L', tailNumber + 1);
          break;

        case Direction.BOTTOM:
          tails[tailNumber].direction = Direction.RIGHT;
          break;

        case Direction.BOTTOM_LEFT:
          tails[tailNumber].direction = Direction.COVER;
          break;
      }
      break;
  }
  /* Update the tail position array if the position of the tail 9 is new */
  if (!tailPos.includes(`x:${tails[8].x}y:${tails[8].y}`)) {
    tailPos.push(`x:${tails[8].x}y:${tails[8].y}`);
  }
};

/* Compute all move commands */
moves.forEach((move) => {
  moveHead(move.direction, move.distance);
});

/* The tail visited tailPos.length positions */
console.log('Part 2: The tail visited', tailPos.length, 'positions');
