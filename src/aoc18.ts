import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc18.txt', 'utf8');
  // const input = `1 + 2 * 3 + 4 * 5 + 6
  // 1 + (2 * 3) + (4 * (5 + 6))
  // 2 * 3 + (4 * 5)
  // 5 + (8 * 3 + 9 + 3 * 4 * 3)
  // 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
  // ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
  // `

  return input.split("\n").slice(0, -1).map((prob) => {
    return prob.replace(/ /g, '').split('')
  });
}

function solve(eq: any[], switchOrder: boolean): number {
  //console.log(`solving ${eq}`);
  let acc = 0

  while (eq.length > 0) {
    let popped = eq.shift()
    if (popped.match(/[0-9]/)) {
      acc = parseInt(popped)
      continue
    }

    if (popped === '(') {
      const subsol = solve(buildSubSol(eq), switchOrder)
      acc = subsol
    }

    if (popped === '+') {
      let popped2 = eq.shift()
      if (popped2 === '(') {
        const subsol = solve(buildSubSol(eq), switchOrder)
        acc = acc + subsol
      } else {
        acc = acc + parseInt(popped2)
      }
    }

    if (popped === '*') {
      if (switchOrder) {
        eq.push(')');

        const subsol = solve(buildSubSol(eq), switchOrder)
        acc = acc * subsol
      } else {
        let popped2 = eq.shift()
        if ((popped2 === '(')) {
          const subsol = solve(buildSubSol(eq), switchOrder)
          acc = acc * subsol
        } else {
          acc = acc * parseInt(popped2)
        }
      }
    }
  }

  return acc;
}

function buildSubSol(eq: any[]) {
  const newacc = []
  let matchcount = 1
  while (matchcount > 0) {
    const temp = eq.shift()
    if (temp === '(') {
      newacc.push(temp)
      matchcount++;
    } else if (temp === ')') {
      matchcount--
      if (matchcount > 0) newacc.push(temp)
    } else {
      newacc.push(temp)
    }
  }

  return newacc;
}

function part1() {
  return parsedInput().map((eq) => solve(eq, false)).reduce((acc, cur) => {
    acc += cur
    return acc
  });
}

function part2() {
  return parsedInput().map((eq) => solve(eq, true)).reduce((acc, cur) => {
    acc += cur
    return acc
  });
}

console.log(part1())
console.log(part2())
