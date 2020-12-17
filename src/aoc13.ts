import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc13.txt', 'utf8');
  // const input = `939
// 7,13,x,x,59,x,31,19
// `
  const parsed = input.split("\n").slice(0, -1);
  return [
    parseInt(parsed[0]),
    parsed[1].split(',')
  ]
}

function part1() {
  const input = parsedInput();
  const start = input[0] as number;
  const candidates = (input[1] as string[])
      .filter((i) => { return i !== 'x' })
      .map((i) => { return parseInt(i) })

  for (let i = start ; true ; i++) {
    let match = candidates.find((c) => { return i % c === 0});
    if (match) {
      return (i - start) * match;
    }
  }
}

const absoluteModulo = (a:number, b:number) => ((a % b) + b) % b

function chineseRemainderTheorem(busses: any[]) {
  const n = busses.slice(1).reduce((acc, cur) => {
    if (cur === 'x') return acc;
    return acc * cur
  }, busses[0]);

  const sum = busses.reduce((acc, cur, idx) => {
    if (cur === 'x') return acc;
    const abs = absoluteModulo(cur - idx, cur)
    const nu = n / cur
    const inverse = modularInverse(nu, cur);

    return acc + BigInt(BigInt(abs) * BigInt(nu) * BigInt(inverse));
  }, BigInt(0));

  return sum % BigInt(n);
}

function modularInverse(a:number, mod:number) {
  const b = a % mod;

  for (let i = 1; i < mod ; i++) {
    if (((b * i) % mod) === 1) {
      return i
    }
  }

  return 1;
}

function part2() {
  const input = parsedInput();
  const busses = (input[1] as string[])
      .map((bus) => (bus === 'x') ? 'x' : parseInt(bus, 10))

  return chineseRemainderTheorem(busses);
}

console.log(part1());
console.log(part2());
