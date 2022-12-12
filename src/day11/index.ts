import inputMonkeys, { testMonkeys } from './input.js';

/* Definition for a monkey */
interface Monkey {
  name: string;
  items: number[];
  operation: (old: number) => number;
  getTarget: (worryLevel: number) => number;
  inspectCounter: number;
}

const monkeysStrings = inputMonkeys.split('\n\n');

const monkeys: Monkey[] = [];

/* Fill all the monkeys from the string input */
monkeysStrings.forEach((monkeyString) => {
  const monkeyRules = monkeyString.split('\n');
  const newMonkey: Monkey = {
    name: monkeyRules[0].split(':')[0],
    items: monkeyRules[1]
      .split(': ')[1]
      .split(', ')
      .map((item) => parseInt(item)),
    /* The operation calculates the new worry level for that monkey */
    operation: (old: number) => {
      return Function(
        `return ${monkeyRules[2].split(': new = ')[1].replaceAll('old', old.toString())}`
      )();
    },
    /* The get target function returns the next monkey 
       based on the worry level and test for that monkey */
    getTarget: (worryLevel: number) => {
      if (worryLevel % parseInt(monkeyRules[3].split('divisible by ')[1]) === 0)
        return parseInt(monkeyRules[4].split('monkey ')[1]);
      else return parseInt(monkeyRules[5].split('monkey ')[1]);
    },
    /* Counter for the number of inspected items */
    inspectCounter: 0,
  };
  /* Add the new monkey to the array */
  monkeys.push(newMonkey);
});

/* Run the 20 rounds */
for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    /* Inspect each item per monkey */
    monkey.items.forEach((item) => {
      /* Calculate the worry level and get the next target */
      const itemAfterBoredom = Math.floor(monkey.operation(item) / 3);
      const nestTarget = monkey.getTarget(itemAfterBoredom);
      /* Add the item to the items array of the target monkey */
      monkeys[nestTarget].items.push(itemAfterBoredom);
      monkey.inspectCounter++;
    });
    /* Clear the current monkeys items (they where thrown away) */
    monkey.items.splice(0, monkey.items.length);
  });
}

/* Sort the monkeys based on the inspect counters */
monkeys.sort((a, b) => b.inspectCounter - a.inspectCounter);

/* Calculate the monkey business */
const monkeyBusiness = monkeys[0].inspectCounter * monkeys[1].inspectCounter;

console.log('Part 1: the monkey business is:', monkeyBusiness);

/* ------- PART 2 ------- */
const monkeysPart2: Monkey[] = [];

/* To reduce the worry level with the modulo operator.
   To be able to calculate all tests a common multiple of all test divisors is needed.
   one possible solution is to just multiply all divisors */
let divisor = 1;

monkeysStrings.forEach((monkeyString) => {
  const monkeyRules = monkeyString.split('\n');
  /* Calculate the divisor with the monkeys factor */
  divisor *= parseInt(monkeyRules[3].split('divisible by ')[1]);
  /* rest ist equal to part 1 */
  const newMonkey: Monkey = {
    name: monkeyRules[0].split(':')[0],
    items: monkeyRules[1]
      .split(': ')[1]
      .split(', ')
      .map((item) => parseInt(item)),
    operation: (old: number) => {
      return Function(
        `return ${monkeyRules[2].split(': new = ')[1].replaceAll('old', old.toString())}`
      )();
    },
    getTarget: (worryLevel: number) => {
      if (worryLevel % parseInt(monkeyRules[3].split('divisible by ')[1]) === 0)
        return parseInt(monkeyRules[4].split('monkey ')[1]);
      else return parseInt(monkeyRules[5].split('monkey ')[1]);
    },
    inspectCounter: 0,
  };

  monkeysPart2.push(newMonkey);
});

for (let i = 0; i < 10000; i++) {
  monkeysPart2.forEach((monkey) => {
    monkey.items.forEach((item) => {
      /* Now use the modulo '%' operator with the common divisor of all monkeys */
      const itemAfterBoredom = monkey.operation(item) % divisor;
      const nestTarget = monkey.getTarget(itemAfterBoredom);
      monkeysPart2[nestTarget].items.push(itemAfterBoredom);
      monkey.inspectCounter++;
    });
    monkey.items.splice(0, monkey.items.length);
  });
}

/* Sort by inspect counter and calculate monkey business */
monkeysPart2.sort((a, b) => b.inspectCounter - a.inspectCounter);
const monkeyBusinessNew = monkeysPart2[0].inspectCounter * monkeysPart2[1].inspectCounter;

console.log('Part 2: the monkey business is:', monkeyBusinessNew);
