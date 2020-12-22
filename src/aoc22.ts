import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc22.txt', 'utf8');

  // const input = `Player 1:
// 9
// 2
// 6
// 3
// 1

// Player 2:
// 5
// 8
// 4
// 7
// 10
// `

  return input
    .split("\n\n")
    .map((player) =>
      player
      .split("\n")
      .slice(1)
      .filter((card) => card !== '')
      .map((card) => parseInt(card, 10))
    )
}

function iterate(player1: number[], player2: number[]) {
  const play1 = player1.shift()!
  const play2 = player2.shift()!

  if (play1 > play2) {
    player1.push(play1)
    player1.push(play2)
  } else if (play2 > play1) {
    player2.push(play2)
    player2.push(play1)
  } else {
    console.log('card match!')
  }
}

function part1() {
  const input = parsedInput()
  const player1 = input[0]
  const player2 = input[1]

  while(player1.length > 0 && player2.length > 0)
    iterate(player1, player2)

  let winner = []
  if (player1.length > 0) {
    winner = player1
  } else {
    winner = player2
  }

  return winner.reverse().reduce((acc, cur, idx) => {
    acc += (cur * (idx + 1))
    return acc;
  })
}

console.log(part1());
