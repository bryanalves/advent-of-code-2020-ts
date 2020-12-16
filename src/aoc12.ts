import fs from 'fs';

type position = [number, number, string];

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
  const finalpos:position = directions.reduce((acc, cmd) => {
    const newpos = move(acc as position, cmd)
    //console.log(cmd);
    //console.log(newpos)
    //console.log();
    return newpos
  }, [0,0,'E'])

  return Math.abs(finalpos[0]) + Math.abs(finalpos[1]);
}

function move(pos: position, cmd: string): position {
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
