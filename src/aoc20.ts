import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc20.txt', 'utf8');

  // const input = `Tile 2311:
// ..##.#..#.
// ##..#.....
// #...##..#.
// ####.#...#
// ##.##.###.
// ##...#.###
// .#.#.#..##
// ..#....#..
// ###...#.#.
// ..###..###

// Tile 1951:
// #.##...##.
// #.####...#
// .....#..##
// #...######
// .##.#....#
// .###.#####
// ###.##.##.
// .###....#.
// ..#.#..#.#
// #...##.#..

// Tile 1171:
// ####...##.
// #..##.#..#
// ##.#..#.#.
// .###.####.
// ..###.####
// .##....##.
// .#...####.
// #.##.####.
// ####..#...
// .....##...

// Tile 1427:
// ###.##.#..
// .#..#.##..
// .#.##.#..#
// #.#.#.##.#
// ....#...##
// ...##..##.
// ...#.#####
// .#.####.#.
// ..#..###.#
// ..##.#..#.

// Tile 1489:
// ##.#.#....
// ..##...#..
// .##..##...
// ..#...#...
// #####...#.
// #..#.#.#.#
// ...#.#.#..
// ##.#...##.
// ..##.##.##
// ###.##.#..

// Tile 2473:
// #....####.
// #..#.##...
// #.##..#...
// ######.#.#
// .#...#.#.#
// .#########
// .###.#..#.
// ########.#
// ##...##.#.
// ..###.#.#.

// Tile 2971:
// ..#.#....#
// #...###...
// #.#.###...
// ##.##..#..
// .#####..##
// .#..####.#
// #..#.#..#.
// ..####.###
// ..#.#.###.
// ...#.#.#.#

// Tile 2729:
// ...#.#.#.#
// ####.#....
// ..#.#.....
// ....#..#.#
// .##..##.#.
// .#.####...
// ####.#.#..
// ##.####...
// ##..#.##..
// #.##...##.

// Tile 3079:
// #.#.#####.
// .#..######
// ..#.......
// ######....
// ####.#..#.
// .#...#.##.
// #.#####.##
// ..#.###...
// ..#.......
// ..#.###...
// `

  const tileMap = new Map<number, any>()

  let tileid = 0;

  input.split("\n\n").forEach((rawData) => {
    if (rawData == "") return

    const entry = rawData.split("\n");
    const tileid = parseInt(entry[0].split(' ')[1])
    const tileData = entry.slice(1);

    const permutations = [
      copytile(tileData).map((row) => row.join('')),
      rotate(copytile(tileData), 1).map((row) => row.join('')),
      rotate(copytile(tileData), 2).map((row) => row.join('')),
      rotate(copytile(tileData), 3).map((row) => row.join('')),

      flip(copytile(tileData)).map((row) => row.join('')),

      flip(rotate(copytile(tileData), 1)).map((row) => row.join('')),
      flip(rotate(copytile(tileData), 2)).map((row) => row.join('')),
      flip(rotate(copytile(tileData), 3)).map((row) => row.join('')),
    ]

    const edges = [
      tileData[0],
      tileData.slice(-1)[0],
      tileData.reduce((a,b)=>a+b[0], ''),
      tileData.reduce((a,b)=>a+b.slice(-1), '')
    ]

    const tileRet = {
      permutations: permutations,
      edges: edges
    }

    tileMap.set(tileid, tileRet)
  });

  return tileMap
}

function outputtile(tiledata: string[][]) {
  return tiledata.map((row) => {
    return row.join('')
  }).join("\n")
}

function rotate(tiledata: string[][], times: number) {
  if (tiledata.length === 1) return tiledata;

  for (let i = 0 ; i < times ; i++) {
    transpose(tiledata);
    tiledata.forEach((row) => {
      reverse(row, 0, row.length - 1);
    });
  }

  return tiledata
}

function flip(tiledata: string[][]) {
  return tiledata.map((row) => {
    return reverse(row, 0, row.length - 1)
  })
}

function transpose(tiledata: string[][]) {
  for (let i = 0; i < tiledata.length; i++) {
    for (let j = i; j < tiledata[0].length; j++) {
      const temp = tiledata[i][j];
      tiledata[i][j] = tiledata[j][i];
      tiledata[j][i] = temp;
    }
  }

  return tiledata;
}

function reverse(row: string[], start: number, end: number) {
  while (start < end) {
    const temp = row[start];
    row[start] = row[end];
    row[end] = temp;
    start++;
    end--;
  }
  return row;
}

function copytile(tiledata: string[]) {
  const retval = Object.assign([], tiledata)
  return retval.map((line) => line.split(''))
}

function borderMatches(tileedge: string, tile: string[]) {
  return tile.some((tileedge2) =>
    tileedge == tileedge2
    || tileedge == tileedge2.split('').reverse().join('')
    || tileedge.split('').reverse().join('') == tileedge2
  )
}

function tilesCanMatch(tile1: string[], tile2: string[]) {
  return tile1.some((tileedge1) =>
    borderMatches(tileedge1, tile2)
  )
}

function part1() {
  const tileMap = parsedInput();
  const entries = Array.from(tileMap.entries())

  console.log(tileMap.get(1907))

  const neighbors = entries.map((tile) => {
    const matches = entries.filter((tile2) => {
      return tilesCanMatch(tile[1].edges, tile2[1].edges)
    });

    return [
      tile[0],
      matches
        .filter((data) => data[0] != tile[0])
        .map((data) => data[0])
    ]
  })

  const corners = neighbors.filter((data) => {
    return data[1].length == 2
  }).map((data) => {
    return data[0]
  })

  return corners.reduce((acc, cur) => acc * cur, 1);
}

console.log(part1());
