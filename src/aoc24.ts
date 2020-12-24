import fs from 'fs';

function parsedInput(): string[][] {
  const input: string = fs.readFileSync('./res/aoc24.txt', 'utf8');

  // const input = `sesenwnenenewseeswwswswwnenewsewsw
// neeenesenwnwwswnenewnwwsewnenwseswesw
// seswneswswsenwwnwse
// nwnwneseeswswnenewneswwnewseswneseene
// swweswneswnenwsewnwneneseenw
// eesenwseswswnenwswnwnwsewwnwsene
// sewnenenenesenwsewnenwwwse
// wenwwweseeeweswwwnwwe
// wsweesenenewnwwnwsenewsenwwsesesenwne
// neeswseenwwswnwswswnw
// nenwswwsewswnenenewsenwsenwnesesenew
// enewnwewneswsewnwswenweswnenwsenwsw
// sweneswneswneneenwnewenewwneswswnese
// swwesenesewenwneswnwwneseswwne
// enesenwswwswneneswsenwnewswseenwsese
// wnwnesenesenenwwnenwsewesewsesesew
// nenewswnwewswnenesenwnesewesw
// eneswnwswnwsenenwnwnwwseeswneewsenese
// neswnwewnwnwseenwseesewsenwsweewe
// wseweeenwnesenwwwswnew
// `

  return input.split("\n").slice(0, -1).map((dirlist) => {
    const retval = []
    const exploded = dirlist.split('')
    while (exploded.length > 0) {
      const peek = exploded.shift()
      if (peek === 'n' || peek === 's') {
        retval.push(peek + exploded.shift())
      } else {
        retval.push(peek)
      }
    }
    return retval
  })
}

function move(from: number[], direction: string) {
  const x = from[0]
  const y = from[1]
  const z = from[2]

  switch (direction) {
    case "e":
      return [x + 1, y - 1, z]
      break;
    case "w":
      return [x - 1, y + 1, z]
      break;
    case "ne":
      return [x + 1, y, z - 1]
      break;
    case  "nw":
      return [x, y + 1, z - 1]
      break;
    case "se":
      return [x, y - 1, z + 1]
      break;
    case "sw":
      return [x - 1, y, z + 1]
      break;
  }

  return [0, 0, 0]
}

function get_neighbors(from: number[]) {
  return ["e", "w", "se", "sw", "ne", "nw"].map((direction) => move(from, direction))
}

function init_tiles(input: string[][]) {
  const flipped = new Set<string>()

  input.forEach((dirset) => {
    const tile = dirset.reduce((acc, dir) => {
      acc = move(acc, dir!)
      return acc
    }, [0,0,0]).join(',')

    if (flipped.has(tile)) {
      flipped.delete(tile)
    } else {
      flipped.add(tile)
    }
  })

  return flipped
}

function part1() {
  const flipped = init_tiles(parsedInput()!)

  return flipped.size
}

function iterate(blacktiles: Set<string>): Set<string> {
  const retval = new Set<string>()

  const blacktilesarr = set_to_numarray(blacktiles)

  const whitetiles =
    new Set<string>(
      blacktilesarr
        .reduce((acc, tile) => acc.concat(get_neighbors(tile)), [])
        .filter((tile) => !blacktiles.has(tile.join(',')))
        .map((tile) => tile.join(','))
    )

  const whitetilesnum = set_to_numarray(whitetiles)

  blacktilesarr.forEach((tile) => {
    const flipped = flipped_neighbors(tile, blacktiles)
    if ((flipped.length == 1) || (flipped.length == 2))
      retval.add(tile.join(','))
  })

  whitetilesnum.forEach((tile) => {
    const flipped = flipped_neighbors(tile, blacktiles)
    if (flipped.length == 2)
      retval.add(tile.join(','))
  })

  return retval
}

function flipped_neighbors(tile: number[], blacktiles: Set<string>) {
  return get_neighbors(tile).filter((neighbor) => blacktiles.has(neighbor.join(',')))
}

function set_to_numarray(input: Set<string>): number[][] {
  return Object.assign([], Array.from(input)
    .map((tile) =>
      tile.split(',')
      .map((coord) => parseInt(coord, 10))
    )
  )
}

function part2() {
  let flipped = init_tiles(parsedInput()!)
  for (let i = 0 ; i < 100 ; i++) {
    flipped = iterate(flipped)
  }

  return flipped.size

}

console.log(part1())
console.log(part2())
