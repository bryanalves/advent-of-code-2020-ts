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

  // const input =`28
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
// `

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

console.log(part1());
