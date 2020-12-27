function parsedInput() {
  const input = `12320657
9659666
  `


  // const input = `5764801
// 17807724
// `

  return input.split("\n").slice(0, -1).map((i) => parseInt(i, 10))
}

const subject = 7
const modu = 20201227

function part1() {
  const input = parsedInput();
  const card = input[0]
  const door = input[1]

  const cardloop = loopsize(card)
  const doorloop = loopsize(door)

  const key = encryption(card, doorloop)

  return key
}

function loopsize(key: number) {
  let acc = 1

  for (let i = 1 ; i < Infinity ; i++) {
    acc = (acc * subject) % modu
    if (acc == key) return i
  }
}

function encryption(subject: number, loop: number) {
  let acc = 1

  for (let i = 0 ; i < loop ; i++) {
    acc = (acc * subject) % modu
  }

  return acc
}

console.log(part1())
