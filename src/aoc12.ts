import fs from 'fs';

type part1position = [number, number, string];

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc12.txt', 'utf8');
  // const input = `F10
// N3
// F7
// R90
// F11
// `

return input.split("\n").slice(0, -1);
}

function part1() {
  const directions = parsedInput();
  const finalpos:part1position = directions.reduce((acc, cmd) => {
    const newpos = part1move(acc as part1position, cmd)
    //console.log(cmd);
    //console.log(newpos)
    //console.log();
    return newpos
  }, [0,0,'E'])

  return Math.abs(finalpos[0]) + Math.abs(finalpos[1]);
}

function part2() {
  const directions = parsedInput();
  const finalpos = directions.reduce((acc, cmd) => {
    const newpos = part2move(acc, cmd)
    //console.log(cmd);
    //console.log(newpos)
    //console.log();
    return newpos
  }, [0,0,1,10])

  return Math.abs(finalpos[0]) + Math.abs(finalpos[1]);
}

function part2move(pos: number[], cmd: string) {
  const c = cmd[0];
  const magnitude = parseInt(cmd.slice(1));

  let shipvert = pos[0];
  let shiphoriz = pos[1];
  let vert = pos[2];
  let horiz = pos[3];

  switch (c) {
    case ('N'):
      return [pos[0], pos[1], pos[2] + magnitude, pos[3]];
      break;
    case ('S'):
      return [pos[0], pos[1], pos[2] - magnitude, pos[3]];
      break;
    case ('E'):
      return [pos[0], pos[1], pos[2], pos[3] + magnitude];
      break;
    case ('W'):
      return [pos[0], pos[1], pos[2], pos[3] - magnitude];
      break;

    case ('L'):
      for (let i = 0 ; i < magnitude / 90 ; i++) {
        let orighoriz = horiz;
        horiz = (vert * -1)
        vert = orighoriz
      }

      return [pos[0], pos[1], vert, horiz];
      break;

    case ('R'):
      for (let i = 0 ; i < magnitude / 90 ; i++) {
        let origvert = vert;
        vert = (horiz * -1)
        horiz = origvert
      }

      return [pos[0], pos[1], vert, horiz];
      break;

    case ('F'):
      for (let i = 0 ; i < magnitude ; i++) {
        shipvert += vert;
        shiphoriz += horiz;
      }
      return [shipvert, shiphoriz, vert, horiz];
      break;
  }


  return pos;
}

function part1move(pos: part1position, cmd: string): part1position {
  const c = cmd[0];
  const magnitude = parseInt(cmd.slice(1));
  let dir = pos[2];

  switch (c) {
    case ('N'):
      return [pos[0] + magnitude, pos[1], pos[2]];
      break;

    case ('S'):
      return [pos[0] - magnitude, pos[1], pos[2]];
      break;

    case ('E'):
      return [pos[0], pos[1] + magnitude, pos[2]];
      break;

    case ('W'):
      return [pos[0], pos[1] - magnitude, pos[2]];
      break;

    case ('L'):
      for (let i = 0 ; i < magnitude / 90 ; i++) {
        switch (dir) {
          case ('N'):
            dir = 'W';
            break;
          case ('S'):
            dir = 'E';
            break;
          case ('E'):
            dir = 'N';
            break;
          case ('W'):
            dir = 'S';
            break;
        }
      }

      return [pos[0], pos[1], dir]
      break;

    case ('R'):
      for (let i = 0 ; i < magnitude / 90 ; i++) {
        switch (dir) {
          case ('N'):
            dir = 'E';
            break;
          case ('S'):
            dir = 'W';
            break;
          case ('E'):
            dir = 'S';
            break;
          case ('W'):
            dir = 'N';
            break;
        }
      }

      return [pos[0], pos[1], dir]
      break;

    case ('F'):
      switch (dir) {
        case ('N'):
          return [pos[0] + magnitude, pos[1], pos[2]];
          break;

        case ('S'):
          return [pos[0] - magnitude, pos[1], pos[2]];
          break;

        case ('E'):
          return [pos[0], pos[1] + magnitude, pos[2]];
          break;

        case ('W'):
          return [pos[0], pos[1] - magnitude, pos[2]];
          break;
      }
      break;
  }

  return pos;
}

console.log(part1());
console.log(part2());
