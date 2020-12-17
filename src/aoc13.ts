import fs from 'fs';

type part1position = [number, number, string];

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc13.txt', 'utf8');
  // const input = `939
// 7,13,x,x,59,x,31,19
// `
  const parsed = input.split("\n").slice(0, -1);
  return [
    parseInt(parsed[0]),
    parsed[1]
      .split(',')
      .filter((i) => { return i !== 'x' })
      .map((i) => { return parseInt(i) })
  ]
}

function part1() {
  const input = parsedInput();
  const start = input[0] as number;
  const candidates = input[1] as number[];

  for (let i = start ; true ; i++) {
    let match = candidates.find((c) => { return i % c === 0});
    if (match) {
      return (i - start) * match;
    }
  }
}

console.log(part1());
