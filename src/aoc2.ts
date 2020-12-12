import fs from 'fs';

type inputType = [number[], string, string];

function parsedInput(): inputType[] {
  const input: string = fs.readFileSync('./res/aoc2.txt', 'utf8');
  // const input = `1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
// `

  return input.split("\n")
    .map((i) => i.split(" "))
    .filter((i) => i.length > 1)
    .map((i) => {
      const rangevals = i[0].split('-').map((i) => parseInt(i));
      const matchchar = i[1].split(':')[0];
      const password = i[2];
      return [rangevals, matchchar, password];
    });
}

function part1() {
  return parsedInput().filter((i) => {
    const matches = (i[2].match(new RegExp(i[1], "g")) || []).length;
    return matches >= i[0][0]! && matches <= i[0][1]!;
  }).length;
}

function part2() {
  return parsedInput().filter((i) => {
    let matches = 0;
    if (i[2].charAt(i[0][0] - 1) === i[1]) {
      matches++;
    }

    if (i[2].charAt(i[0][1] - 1) === i[1]) {
      matches++;
    }

    return matches === 1;
  }).length;
}

console.log(part1());
console.log(part2());
