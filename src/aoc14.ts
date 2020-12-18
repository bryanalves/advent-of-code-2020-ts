import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc14.txt', 'utf8');
  // const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0
// `

  return input.split("\n").slice(0, -1);
}

function buildMap(input: string[]) {
  let mask = '';
  let andmask = BigInt(0);
  let ormask = BigInt(0);

  return input.reduce((acc, cur) => {
    if (cur.startsWith('mask')) {
      mask = cur.split(' ')[2]
      andmask = BigInt(parseInt(mask.replace(/X/g, '1'), 2))
      ormask = BigInt(parseInt(mask.replace(/X/g, '0'), 2))
    } else {
      const s = cur.split(' ')
      const loc = parseInt(s[0].slice(4, -1))
      const n = BigInt(parseInt(s[2]))
      acc.set(loc, (n | ormask) & andmask)
    }

    return acc;

  }, new Map<number,BigInt>())
}

function part1() {
  return Array.from(buildMap(parsedInput()).values()).reduce((acc, cur) => {
    acc += cur
    return acc
  }, BigInt(0));
}

console.log(part1());
