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

  // const input = `class: 0-1 or 4-19
// row: 0-5 or 8-19
// seat: 0-13 or 16-19

// your ticket:
// 11,12,13

// nearby tickets:
// 3,9,18
// 15,1,5
// 5,14,9
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
  return rules.some((ranges) => {
    return ranges.find((range) => {
      //console.log(`checking ${input} against ${range}`);
      return input >= range[0] && input <= range[1]
    });
  });
}

function matchingRules(input: number, rules: Map<string, number[][]>) {
  return Array.from(rules.entries()).filter((rule) => {
    return rule[1].find((range) => {
      //console.log(`checking ${input} against ${range}`);
      return input >= range[0] && input <= range[1]
    });
  }).map((rule) => rule[0]);
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

function part2() {
  const parsed = parsedInput();
  const rules = parsed[0]
  const ourticket = parsed[1]
  const matches = []

  const validTickets = (parsed[2] as number[][]).filter((ticket:number[]) => {
    return ticket.every((ticketval) => {
      const rule_ranges: number[][] = Array.from(rules.values())
      return numberMeetsRules(ticketval, rule_ranges);
    });
  });

  validTickets.forEach((ticket) => {
    ticket.forEach((ticketval, idx) => {
      const matching_rules = matchingRules(ticketval, rules);
      if (matches[idx]) {
        matches[idx].push(matching_rules)
      } else {
        matches[idx] = [matching_rules]
      }
    });
  });

  const peridx = matches.map((match_list) => {
    return match_list.slice(1).reduce((acc, cur) => {
      const ret = new Set(
        [...cur].filter((x) => {
          return acc.has(x);
        })
      );
      return ret
    }, new Set(match_list[0]))
  });

  let keep_iterating = true;
  while (keep_iterating) {
    keep_iterating = false;
    peridx.forEach((candidates, idx) => {
      if (candidates.size === 1) {
        const item_to_remove = Array.from(candidates.values())[0]
        peridx.forEach((setremove, idx2) => {
          if (idx2 == idx) return
          setremove.delete(item_to_remove);
        });
      } else {
        keep_iterating = true
      }
    });
  }

  const ordered_descriptors = peridx.map((descriptor) => {
    return Array.from(descriptor.values())[0]
  })

  const ticket = new Map<string, number>();
  ordered_descriptors.forEach((descriptor, idx) => {
    ticket.set(descriptor, ourticket[idx])
  });

  return Array.from(ticket.entries()).reduce((acc, cur) => {
    if (cur[0].startsWith('departure')) acc *= cur[1]
    return acc;
  }, 1);
}

console.log(part1());
console.log(part2());

