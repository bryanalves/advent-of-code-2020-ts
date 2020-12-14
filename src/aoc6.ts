import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc6.txt', 'utf8');
  // const input = `abc

// a
// b
// c

// ab
// ac

// a
// a
// a
// a

// b`;

  return input.split("\n")
}

function part1() {
    const sets = parsedInput().reduce((acc:any[], row:string) => {
    if (row === '') {
      acc.push(new Set());
    } else {
      const current_set = acc.slice(-1)[0];
      row.split('').forEach((answer:string) => { current_set.add(answer) })
    }

    return acc;
  }, [new Set()]);

  return count_sets(sets);
}

function part2() {
  const sets = parsedInput().reduce((acc:any[], row:string) => {
    let new_set: Set<string> | undefined = undefined;

    if (row !== '') {
      const current_set = acc.pop();

      if (current_set === undefined) {
        new_set = new Set(
          row.split('')
        );
      } else {
        new_set = new Set(
          row.split('').filter((answer:string) => { return current_set.has(answer) })
        );
      }
    }

    acc.push(new_set);
    return acc;
  }, [undefined]);

  return count_sets(sets);
}

function count_sets(sets: Set<string>[]) {
  return sets
    .map((answers) => (answers && answers.size) || 0)
    .reduce((acc, size) => {
      acc += size;

      return acc;
    }, 0);
}

console.log(part1());
console.log(part2());
