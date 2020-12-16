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
  let changed = true;

  while(changed) {
    //log(seats);
    //console.log();

    let output = iterate(seats, 4, 1);
    seats = output[0] as any[];
    changed = output[1] as boolean;
  }

  return total_occupied_seats(seats);
}

function part2() {
  let seats = parsedInput();
  let changed = true;

  while(changed) {
    //log(seats);
    //console.log();

    let output = iterate(seats, 5, Infinity);
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

function seat_occupied_in_direction(seats: any[],
                                    row:number,
                                    col:number,
                                    rowdir:number,
                                    coldir:number,
                                    max_move:number) {

  for (let i = 1 ; i <= max_move ; i++) {
    if (seats[row + (rowdir * i)] === undefined) {
      return false;
    }

    if (seats[row + (rowdir * i)][col + (coldir * i)] === undefined) {
      return false;
    }

    if (seats[row + (rowdir * i)][col + (coldir * i)] === 'L') {
      return false;
    }

    if (seats[row + (rowdir * i)][col + (coldir * i)] === '#') {
      return true;
    }
  }

  return false;
}

function iterate(input: any[], tolerance: number, max_move: number) {
  let changed = false;
  const output = input.map((line, rowidx) => {
    return line.map((seat: string, colidx: number) => {
      const up = seat_occupied_in_direction(input, rowidx, colidx, -1, 0, max_move);
      const upleft = seat_occupied_in_direction(input, rowidx, colidx, -1, -1, max_move);
      const upright = seat_occupied_in_direction(input, rowidx, colidx, -1, 1, max_move);

      const down = seat_occupied_in_direction(input, rowidx, colidx, 1, 0, max_move);
      const downleft = seat_occupied_in_direction(input, rowidx, colidx, 1, -1, max_move);
      const downright = seat_occupied_in_direction(input, rowidx, colidx, 1, 1, max_move);

      const left = seat_occupied_in_direction(input, rowidx, colidx, 0, -1, max_move);
      const right = seat_occupied_in_direction(input, rowidx, colidx, 0, 1, max_move);

      const visible_occupied_seats = [up, upleft, upright, down, downleft, downright, left, right]

      if (seat === 'L') {
        if (visible_occupied_seats.filter((seat) => seat).length === 0) {
          changed = true;
          return '#';
        } else {
          return 'L';
        }
      } else if (seat === '#') {
        if (visible_occupied_seats.filter((seat) => seat).length >= tolerance) {
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
console.log(part2());
