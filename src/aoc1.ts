import fs from 'fs';

const targetSum = 2020;

type twosumVal = [number, number] | undefined;

function parsedInput(): number[] {
  const input: string = fs.readFileSync('./res/aoc1.txt', 'utf8');
  // const input = `1721
  // 979
  // 366
  // 299
  // 675
  // 1456
  // `;

  return input.split("\n").map((i) => parseInt(i));
}

function twosum(input: number[], target: number): twosumVal {
  const lookup = input.reduce((acc, i) => {
    acc.set(target - i, i);
    return acc;
  }, new Map<number, number>());

  const match = input.find((i) => lookup.has(i));

  if (match) {
    return [match!, lookup.get(match!)!];
  } else {
    return undefined;
  }
}

function part1() {
  const parsed = parsedInput();
  const vals = twosum(parsed, targetSum)

  if (vals !== undefined) {
    return vals.reduce((a, b) => a * b, 1);
  }
}

function part2() {
  const parsed = parsedInput();
  let retval: number | undefined = undefined;

  parsed.find((i) => {
    const vals = twosum(parsed, targetSum - i);
    if (vals !== undefined) {
      retval = vals.reduce((a, b) => a * b, i);
      return true;
    }
  });

  return retval;
}

console.log(part1());
console.log(part2());
