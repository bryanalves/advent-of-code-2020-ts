import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc14.txt', 'utf8');
  // const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0
// `

  // const input = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1
// `

  return input.split("\n").slice(0, -1);
}

function sumMemoryAddresses(memory: Map<number, BigInt>) {
}

function part1() {
  let mask = '';
  let andmask = BigInt(0);
  let ormask = BigInt(0);

  const memory = parsedInput().reduce((acc, cur) => {
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

  return Array.from(memory.values()).reduce((acc, cur) => {
    acc += cur
    return acc
  }, BigInt(0));
}

function buildMasks(mask: string): BigInt[] {
  var indices = [];
  const reversed = mask.split('').reverse().join('');
  for(let i = 0 ; i < mask.length ; i++) {
    if (reversed[i] === "X") indices.push(BigInt(2 ** i));
  }

  return indices;
}

function applyMasks(address: BigInt, masks: BigInt[]): BigInt[] {
  if (masks.length === 0) return [address];
  const mask = masks[0]
  const setbit = BigInt(address) | BigInt(mask)
  const clearedbit = BigInt(address) & (~mask)
  const remaining = masks.slice(1);

  return applyMasks(setbit, remaining)
    .concat(applyMasks(clearedbit, remaining))
}

function part2() {
  let mask = '';
  let masks: BigInt[] = []
  let setmask = BigInt(0)

  const memory = parsedInput().reduce((acc, cur) => {
    if (cur.startsWith('mask')) {
      mask = cur.split(' ')[2]
      setmask = BigInt(parseInt(mask.replace(/X/g, '0'), 2));
      masks = buildMasks(mask);
    } else {
      const s = cur.split(' ')
      const loc = BigInt(parseInt(s[0].slice(4, -1)))
      const n = BigInt(parseInt(s[2]))
      applyMasks(BigInt(loc) | setmask, masks).forEach((loc) => {
        acc.set(loc, n)
      });
    }

    return acc;
  }, new Map<BigInt, number>());

  return Array.from(memory.values()).reduce((acc, cur) => {
    acc += cur
    return acc
  }, BigInt(0));
}

console.log(part1());
console.log(part2());
