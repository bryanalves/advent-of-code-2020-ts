import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc3.txt', 'utf8');
  // const input: string = `..##.......
// #...#...#..
// .#....#..#.
// ..#.#...#.#
// .#...##..#.
// ..#.##.....
// .#.#.#....#
// .#........#
// #.##...#...
// #...##....#
// .#..#...#.#`

  return input.split("\n")
}

function walk(right: number, down: number) {
  let pos = 0;
  const input = parsedInput();
  const mod = input[0].length;

  return input
    .filter((_value, idx) => idx % down == 0)
    .reduce((acc, row) => {
    if (row.charAt(pos % mod) == '#') {
      acc++;
    }

    pos += right;

    return acc;
  }, 0);
}

function part1() {
  return walk(3, 1);
}

function part2() {
  return [
    walk(1, 1),
    walk(3, 1),
    walk(5, 1),
    walk(7, 1),
    walk(1, 2)
  ].reduce((acc, val) => {return acc * val}, 1);
}

console.log(part1());
console.log(part2());
