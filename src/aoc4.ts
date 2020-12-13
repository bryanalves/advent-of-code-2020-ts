import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc4.txt', 'utf8');
  // const input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm

// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929

// hcl:#ae17e1 iyr:2013
// eyr:2024
// ecl:brn pid:760753108 byr:1931
// hgt:179cm

// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in`

  const acc = [new Map()];

  input.split("\n").reduce((acc, row) => {
    if (row === "") {
      acc.push(new Map());
    } else {
      row.split(" ").map((attr) => {
        const split_attr = attr.split(":");
        const obj = acc.slice(-1)[0];
        obj.set(split_attr[0], split_attr[1]);
      });
    }

    return acc;
  }, acc);

  return acc;
}

function part1() {
  return parsedInput().filter((passport:Map<string, string>) => {
    return [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ].every((attr: string) => {
      return passport.has(attr);
    });
  }).length;
}

function part2() {
  return parsedInput().filter((passport:Map<string, string>) => {
    return [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ].every((attr: string) => {
      return passport.has(attr);
    })
  }).filter((passport:Map<string, string>) => {
    return valid_byr(passport.get('byr')!) &&
           valid_iyr(passport.get('iyr')!) &&
           valid_eyr(passport.get('eyr')!) &&
           valid_hgt(passport.get('hgt')!) &&
           valid_hcl(passport.get('hcl')!) &&
           valid_ecl(passport.get('ecl')!) &&
           valid_pid(passport.get('pid')!);
  }).length;
}

function valid_byr(i: string): boolean {
  const num = parseInt(i);
  return num >= 1920 && num <= 2002;
}

function valid_iyr(i: string): boolean {
  const num = parseInt(i);
  return num >= 2010 && num <= 2020;
}

function valid_eyr(i: string): boolean {
  const num = parseInt(i);
  return num >= 2020 && num <= 2030;
}

function valid_hgt(i: string): boolean {
  const num = parseInt(i);
  if (i.endsWith('cm')) {
    return num >= 150 && num <= 193;
  } else if (i.endsWith('in')) {
    return num >= 59 && num <= 76;
  } else {
    return false;
  }
}

function valid_hcl(i: string): boolean {
  return /#[0-9a-f]{6}/.test(i)
}

function valid_ecl(i: string): boolean {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some((valid) => {return i === valid})
}

function valid_pid(i: string): boolean {
  return /^[0-9]{9}$/.test(i)
}

console.log(part1());
console.log(part2());
