import fs from 'fs';

function parsedInput() {
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

function part1() {
  const flipped = new Set<string>()

  parsedInput().forEach((dirset) => {
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

  return flipped.size
}

console.log(part1())
