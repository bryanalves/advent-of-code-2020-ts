import fs from 'fs';

let nudge_set = [];

const cartesian =
  (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

function parsedInput(extraDimensions: number) {
  const input: string = fs.readFileSync('./res/aoc17.txt', 'utf8');
  // const input = `.#.
// ..#
// ###
// `
  const output = new Set<number[]>();

  input.split("\n").slice(0,-1).forEach((row, y) => {
    row.split('').forEach((item, x) => {
      const point = [x,y]
      for (let i = 0 ; i < extraDimensions ; i++) {
        point.push(0)
      }
      if (item === '#') output.add(point);
    })
  });

  let directions = []
  for (let i = 0 ; i < 2 + extraDimensions ; i++) {
    directions.push([0, -1, 1]);
  }

  nudge_set = cartesian(...directions)
  nudge_set.shift()

  return output;
}

function iterate(input: Set<number[]>) {
  const inputarr = Array.from(input.values())
  const inputarrjoined = inputarr.map((inp) => inp.join(','))

  const still_active = inputarr.filter((cube) => {
    const neighbors = neighbor_set(cube);
    const neighborsarrjoined = Array.from(neighbors.values()).map((inp) => {
      return inp.join(',')
    });

    const intersection = inputarrjoined.filter((x) => {
      return neighborsarrjoined.includes(x)
    })

    return intersection.length == 2 || intersection.length == 3
  });

  const all_neighbors = inputarr.reduce((acc, cube) => {
    const neighbors = neighbor_set(cube);
    const neighborsarrjoined = Array.from(neighbors.values()).map((inp) => {
      return inp.join(',')
    });

    acc = new Set(Array.from(acc).concat(Array.from(neighborsarrjoined)))
    return acc;
  }, new Set<string>());

  const inactive_neighbors = Array.from(all_neighbors).filter((cube) => {
    return !inputarrjoined.includes(cube)
  }).map((cube) => {
    return cube.split(',')
      .map((i) => parseInt(i, 10))
  });

  const newly_active = inactive_neighbors.filter((cube) => {
    const neighbors = neighbor_set(cube);
    const neighborsarrjoined = Array.from(neighbors.values()).map((inp) => {
      return inp.join(',')
    });

    const intersection = inputarrjoined.filter((x) => {
      return neighborsarrjoined.includes(x)
    })

    return intersection.length == 3
  });

  const retval = (still_active || []).concat(newly_active || [])

  return new Set<number[]>(retval)
}

function neighbor_set(point: number[]): Set<number[]> {

  return nudge_set.reduce((acc, cur) => {
    const newpoint = point.map((p, idx) => p + cur[idx])

    acc.add(newpoint)
    return acc;
  }, new Set<number[]>());
}

function count_set(input: Set<number[]>) {
  return Array.from(input.values()).reduce((acc, cur) => {
    acc.add(cur.join(','))
    return acc;
  }, new Set<string>()).size
}

function part1() {
  let actives = parsedInput(1);
  for (let i = 0 ; i < 6 ; i++) {
    actives = iterate(actives);
    //console.log(count_set(actives))
  }

  return count_set(actives)
}

function part2() {
  let actives = parsedInput(2);
  for (let i = 0 ; i < 6 ; i++) {
    actives = iterate(actives);
    //console.log(count_set(actives))
  }

  return count_set(actives)
}

console.log(part1())
console.log(part2())

