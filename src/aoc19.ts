
import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc19.txt', 'utf8');
  // const input = `0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"

// ababbb
// bababa
// abbbab
// aaabbb
// aaaabbb
// `

  let mode = 'rules'
  let rules = new Map<string, any[]>()
  let tests: string[] = []

  input.split("\n").slice(0, -1).forEach((line) => {
    if (line === '') {
      mode = 'tests'
      return
    }

    switch (mode) {
      case 'rules': {
        let rule = line.split(': ')
        let expandedRule = rule[1]
          .replace(/"/g, '')
          .split(' | ')
          .map((subrule) => subrule.split(' '))

        rules.set(rule[0], expandedRule)
        break
      }

      case 'tests': {
        tests.push(line);
        break
      }
    }
  })

  return [rules, tests]
}

function test(str: string, rules: Map<string, string[]>, rule_seq: string[]) {
  if ((str === '') || (rule_seq.length === 0)) {
    return (str === '') && (rule_seq.length == 0);
  }

  const rule = rules.get(rule_seq[0])

  // if ((rule === ['a']) || (rule === ['b'])) {
  //   if (str[0] == rule[0]) {
  //     return test(str.slice(1), rules, rule_seq.slice(1))
  //   } else {
  //     return false;
  //   }
  // }

  if ((rule_seq[0] === 'a') || (rule_seq[0] === 'b')) {
    if (str[0] == rule_seq[0]) {
      return test(str.slice(1), rules, rule_seq.slice(1))
    } else {
      return false;
    }
  }

  return rule.some((r) => {
    return test(str, rules, r.concat(rule_seq.slice(1)))
  });
}

function part1() {
  const input = parsedInput();
  const ruleset = input[0]
  const tests = input[1]
  return (tests as string[]).filter((str:string) => {
    return test(str, ruleset, ['0'])
  }).length;
}

console.log(part1());
