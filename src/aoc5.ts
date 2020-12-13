import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc5.txt', 'utf8');
  // const input = `BFFFBBFRRR`

  return input.split("\n").slice(0, -1).map((seat) => {
    const seat_num = seat
      .replace(/R/g, '1')
      .replace(/L/g, '0')
      .replace(/F/g, '0')
      .replace(/B/g, '1')

    const row = parseInt(seat_num.slice(0, 7), 2);
    const column = parseInt(seat_num.slice(7, 10), 2);

    return row * 8 + column;
  });
}

function part1() {
  return Math.max(...parsedInput());
}

function part2() {
  const sorted = parsedInput().sort((n1, n2) => n1 - n2);
  const sum = ((sorted[0] + sorted.slice(-1)[0]) / 2) * (sorted.length + 1)
  const seatidsum = sorted.reduce((acc, seat) => {
    return acc + seat;
  }, 0);

  return sum - seatidsum;
}

console.log(part1());
console.log(part2());
