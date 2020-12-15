import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc8.txt', 'utf8');
  // const input = `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6
// `

  return input.split("\n").slice(0, -1).map((line) => {
    const split = line.split(" ");
    return [split[0], parseInt(split[1]), false]
  });
}

function part1() {
  const res = run_prog(parsedInput());
  return res[0];
}

function part2() {
  const prog = parsedInput();
  const progs = prog.map((_cmd, idx) => {
    let replacement_cmd = '';
    let orig_cmd = '';

    if (prog[idx][0] == 'acc') {
      return [-1, false];
    } else if (prog[idx][0] == 'jmp') {
      replacement_cmd = 'nop';
      orig_cmd = 'jmp';
    } else {
      replacement_cmd = 'jmp';
      orig_cmd = 'nop';
    }

    prog.forEach((line) => { line[2] = false });
    prog[idx][0] = replacement_cmd;
    const res = run_prog(prog);
    prog[idx][0] = orig_cmd;
    return res;
  });

  const winner = progs.find((res) => { return res[1] == true });
  if (winner) {
    return winner[0];
  }
}

function run_prog(program: any[]) {
  let pc = 0;
  let acc = 0;

  while (true) {
    if (pc == program.length) {
      return [acc, true]
    }

    if (program[pc][2]) {
      return [acc, false]
    }

    program[pc][2] = true;

    switch (program[pc][0] as string) {
      case 'acc':
        acc += program[pc][1] as number;
        pc++;
        break;
      case 'jmp':
        pc += program[pc][1] as number;
        break;
      case 'nop':
        pc++;
        break;
      default:
        break;
    }
  };
}

console.log(part1());
console.log(part2());
