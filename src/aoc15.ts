
function parsedInput() {
  const input = `1,2,16,19,18,0`

  // const input = `0,3,6`
  // const input = `1,3,2`
  // const input = `2,1,3`
  // const input = `1,2,3`

  return input.split(',').map((n) => parseInt(n, 10));
}

function part1() {
  let turn = 0;
  let lastnum = 0;
  let map = new Map<number, number[]>();

  parsedInput().forEach((num) => {
    lastnum = num;
    turn++;
    map.set(num, [turn]);
    //console.log(num);
  });

  turn++;

  //for( ; turn <= 2020; turn++) {
  for( ; turn <= 2020; turn++) {
    if (map.has(lastnum)) {
      let turns = map.get(lastnum)

      if (turns.length == 1) {
        lastnum = 0;
      } else {
        lastnum = turns[0] - turns[1];
      }
    } else {
      lastnum = 0;
    }

    if (map.has(lastnum)) {
      let curturns = map.get(lastnum)
      map.set(lastnum, [turn, curturns[0]);
    } else {
      map.set(lastnum, [turn]);
    }

    //console.log(lastnum);
  }

  return lastnum
}

console.log(part1());
