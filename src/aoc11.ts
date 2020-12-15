import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc11.txt', 'utf8');
  // const input = `L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// `

  return input.split("\n").slice(0, -1).map((line) => { return line.split('') });
}

function occupied_count(candidates: any[]) {
  return candidates.filter((seat) => {
    return seat === '#';
  }).length;
}

function total_occupied_seats(seats: any[]) {
  return seats.reduce((acc, row) => {
    return acc + occupied_count(row);
  }, 0);
}

function part1() {
  let seats = parsedInput();
  let orig = parsedInput();
  let changed = true;

  while(changed) {
    //log(seats);
    //console.log();

    let output = iterate(seats);
    seats = output[0] as any[];
    changed = output[1] as boolean;
  }

  return total_occupied_seats(seats);
}

function log(seats: any[]) {
  (seats.map((line) => {
    console.log(line.join(''))
  }))
}

function iterate(input: any[]) {
  let changed = false;
  const output = input.map((line, rowidx) => {
    return line.map((seat: string, colidx: number) => {
      const up = (input[rowidx - 1] && input[rowidx - 1][colidx]);
      const upleft = (input[rowidx - 1] && input[rowidx - 1][colidx - 1]);
      const upright = (input[rowidx - 1] && input[rowidx - 1][colidx + 1]);

      const down = (input[rowidx + 1] && input[rowidx + 1][colidx]);
      const downleft = (input[rowidx + 1] && input[rowidx + 1][colidx - 1]);
      const downright = (input[rowidx + 1] && input[rowidx + 1][colidx + 1]);

      const left = input[rowidx][colidx - 1];
      const right = input[rowidx][colidx + 1];

      const candidate_set = [up, upleft, upright, down, downleft, downright, left, right]

      if (seat === 'L') {
        if (occupied_count(candidate_set) === 0) {
          changed = true;
          return '#';
        } else {
          return 'L';
        }
      } else if (seat === '#') {
        if (occupied_count(candidate_set) >= 4) {
          changed = true;
          return 'L'
        } else {
          return '#'
        }
      } else {
        return '.'
      }
    });
  });

  return [output, changed]
}

console.log(part1());
