import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc9.txt', 'utf8');
  // const input = `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576
// `

  return input.split("\n").slice(0, -1).map((i) => { return parseInt(i) });
}

function twosum(input: number[], target: number) {
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
  const list = parsedInput();
  let preamble = list.slice(0, 25)
  return list.slice(25).find((i) => {
    if (twosum(preamble, i) !== undefined) {
      preamble.shift();
      preamble.push(i);
      return false;
    }

    return true;
  });
}

function part2() {
  const list = parsedInput();
  const target = part1();
  let answer_range: number[] | undefined = undefined;

  list.find((i, idx) => {
    let sum = i;
    list.slice(idx+1).forEach((j, idx2) => {
      sum += j;
      if (sum === target && answer_range === undefined) {
        answer_range = [idx, idx + idx2 + 1]
      }
    });

    return (answer_range !== undefined)
  });

  if (answer_range !== undefined) {
    const answer_candidates = list.slice(answer_range[0], answer_range[1] + 1)

    const min = answer_candidates.reduce((acc, i) => {
      if (i < acc) {
        acc = i;
      }
      return acc;
    }, Infinity);

    const max = answer_candidates.reduce((acc, i) => {
      if (i > acc) {
        acc = i;
      }
      return acc;
    }, 0);

    return min + max;
  }
}


console.log(part1());
console.log(part2());
