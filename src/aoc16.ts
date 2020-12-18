import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc16.txt', 'utf8');
  // const input = `class: 1-3 or 5-7
// row: 6-11 or 33-44
// seat: 13-40 or 45-50

// your ticket:
// 7,1,14

// nearby tickets:
// 7,3,47
// 40,4,50
// 55,2,20
// 38,6,12
// `

  const validMap = new Map<string, number[][]>()
  let ourticket: number[] = []
  let othertickets: number[][] = []
  let mode = 'valid'

  input.split("\n").slice(0, -1).forEach((row) => {
    if (row === 'your ticket:') {
      mode = 'yours'
      return
    }
    if (row === 'nearby tickets:') {
      mode = 'nearby'
      return
    }

    if (row === '') {
      return
    }

    switch (mode) {
      case ('valid'):
        let line = row.split(':')
        let ranges = line[1].split(' or ').map((validRange:string) => {
          return validRange.split('-').map((n) => parseInt(n, 10));
        });

        validMap.set(line[0], ranges)
        break;

      case ('yours'):
        ourticket = row.split(',').map((n) => parseInt(n, 10));
        break;

      case ('nearby'):
        othertickets.push(row.split(',').map((n) => parseInt(n, 10)))
        break;
    }
  });

  return [validMap, ourticket, othertickets]
}

function numberMeetsRules(input: number, rules: number[][]) {
  return rules.some((rule) => {
    return rules.find((ranges) => {
      return ranges.find((range) => {
        return input >= range[0] && input <= range[1]
      });
    });
  });
}

function part1() {
  const parsed = parsedInput();
  const mismatchedTicketVals = (parsed[2] as number[][]).map((ticket:number[]) => {
    return ticket.filter((ticketval) => {
      const rules: number[][] = Array.from(parsed[0].values())
      return !numberMeetsRules(ticketval, rules);
    });
  });

  return mismatchedTicketVals.reduce((acc, ticket) => {
    return acc + ticket.reduce((acc2, ticketval) => {return acc2 + ticketval}, 0);
  }, 0);
}

console.log(part1());
