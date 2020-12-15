import fs from 'fs';

function parsedInput(): number[] {
  const input: string = fs.readFileSync('./res/aoc10.txt', 'utf8');
  // const input = `16
// 10
// 15
// 5
// 1
// 11
// 7
// 19
// 6
// 12
// 4
// `

  // const input = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3
// `;

  return input.split("\n").slice(0, -1).map((i) => { return parseInt(i) });
}

function part1() {
  const sorted = parsedInput().sort((n1, n2) => n1 - n2);
  const diffs = sorted.reduce((acc, i) => {
    const diff = i - acc[0];
    acc[diff]++;
    acc[0] += diff;

    return acc;

  }, [0, 0, 0, 1])

  return diffs[1] * diffs[3];
}

function part2() {
  const sorted = parsedInput().sort((n1, n2) => n1 - n2);
  sorted.unshift(0);
  sorted.push(sorted.slice(-1)[0] + 3)
  return countPaths(sorted);
}

const cache = new Map<number, number>();
function countPaths(input: number[]) {
  if (cache.has(input[0])) {
    return cache.get(input[0]);
  }

  if (input.length === 1) {
    return 1;
  }

  let retval = 0;

  if (input[1] - input[0] <= 3) {
    retval += countPaths(input.slice(1)) as number;
  }

  if (input[2] - input[0] <= 3) {
    retval += countPaths(input.slice(2)) as number;
  }

  if (input[3] - input[0] <= 3) {
    retval += countPaths(input.slice(3)) as number;
  }

  cache.set(input[0], retval);

  return retval;
}

/* dynamic programming
function _countPaths(input: number[]) {
  const paths = new Map<number, number>();
  paths.set(0, 1);
  for (let adapter of input) {
    for (let diff = 1; diff <= 3; diff++) {
      let next_adapter = adapter + diff;
      if (input.indexOf(next_adapter) != -1) {
        paths.set(next_adapter, (paths.get(next_adapter) || 0) + (paths.get(adapter) || 1))
      }
    }
  }

  return paths;
}
*/

console.log(part1());
console.log(part2());
