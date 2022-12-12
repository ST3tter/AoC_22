import inputMoves, { testMoves } from './input.js';

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
const tail = { x: 0, y: 0, direction: Direction.COVER };

/* Array to hold all visited positions of the tail */
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
    moveTail(direction);
  }
};

/* Function to move the tail according to the relative position of to the head */
const moveTail = (direction: string) => {
  switch (direction) {
    case 'R':
      switch (tail.direction) {
        case Direction.COVER:
          tail.direction = Direction.LEFT;
          break;

        case Direction.LEFT:
          tail.x++;
          break;

        case Direction.TOP_LEFT:
          tail.x++;
          tail.y--;
          tail.direction = Direction.LEFT;
          break;

        case Direction.TOP:
          tail.direction = Direction.TOP_LEFT;
          break;

        case Direction.TOP_RIGHT:
          tail.direction = Direction.TOP;
          break;

        case Direction.RIGHT:
          tail.direction = Direction.COVER;
          break;

        case Direction.BOTTOM_RIGHT:
          tail.direction = Direction.BOTTOM;
          break;

        case Direction.BOTTOM:
          tail.direction = Direction.BOTTOM_LEFT;
          break;

        case Direction.BOTTOM_LEFT:
          tail.x++;
          tail.y++;
          tail.direction = Direction.LEFT;
          break;
      }
      break;
    case 'L':
      switch (tail.direction) {
        case Direction.COVER:
          tail.direction = Direction.RIGHT;
          break;

        case Direction.LEFT:
          tail.direction = Direction.COVER;
          break;

        case Direction.TOP_LEFT:
          tail.direction = Direction.TOP;
          break;

        case Direction.TOP:
          tail.direction = Direction.TOP_RIGHT;
          break;

        case Direction.TOP_RIGHT:
          tail.x--;
          tail.y--;
          tail.direction = Direction.RIGHT;
          break;

        case Direction.RIGHT:
          tail.x--;
          break;

        case Direction.BOTTOM_RIGHT:
          tail.x--;
          tail.y++;
          tail.direction = Direction.RIGHT;
          break;

        case Direction.BOTTOM:
          tail.direction = Direction.BOTTOM_RIGHT;
          break;

        case Direction.BOTTOM_LEFT:
          tail.direction = Direction.BOTTOM;
          break;
      }
      break;
    case 'U':
      switch (tail.direction) {
        case Direction.COVER:
          tail.direction = Direction.BOTTOM;
          break;

        case Direction.LEFT:
          tail.direction = Direction.BOTTOM_LEFT;
          break;

        case Direction.TOP_LEFT:
          tail.direction = Direction.LEFT;
          break;

        case Direction.TOP:
          tail.direction = Direction.COVER;
          break;

        case Direction.TOP_RIGHT:
          tail.direction = Direction.RIGHT;
          break;

        case Direction.RIGHT:
          tail.direction = Direction.BOTTOM_RIGHT;
          break;

        case Direction.BOTTOM_RIGHT:
          tail.x--;
          tail.y++;
          tail.direction = Direction.BOTTOM;
          break;

        case Direction.BOTTOM:
          tail.y++;
          break;

        case Direction.BOTTOM_LEFT:
          tail.x++;
          tail.y++;
          tail.direction = Direction.BOTTOM;
          break;
      }
      break;
    case 'D':
      switch (tail.direction) {
        case Direction.COVER:
          tail.direction = Direction.TOP;
          break;

        case Direction.LEFT:
          tail.direction = Direction.TOP_LEFT;
          break;

        case Direction.TOP_LEFT:
          tail.x++;
          tail.y--;
          tail.direction = Direction.TOP;
          break;

        case Direction.TOP:
          tail.y--;
          break;

        case Direction.TOP_RIGHT:
          tail.x--;
          tail.y--;
          tail.direction = Direction.TOP;
          break;

        case Direction.RIGHT:
          tail.direction = Direction.TOP_RIGHT;
          break;

        case Direction.BOTTOM_RIGHT:
          tail.direction = Direction.RIGHT;
          break;

        case Direction.BOTTOM:
          tail.direction = Direction.COVER;
          break;

        case Direction.BOTTOM_LEFT:
          tail.direction = Direction.LEFT;
          break;
      }
      break;
  }
  /* Update the tail position array if the position is new */
  if (!tailPos.includes(`x:${tail.x}y:${tail.y}`)) {
    tailPos.push(`x:${tail.x}y:${tail.y}`);
  }
};

/* Compute all move commands */
moves.forEach((move) => {
  moveHead(move.direction, move.distance);
});

/* The tail visited tailPos.length positions */
console.log('Part 1: The tail visited', tailPos.length, 'positions');
