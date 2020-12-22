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

const recursive_observations = new Set<string>()

function recursive(player1: number[], player2: number[]) {
  const recursive_observations = new Set<string>()
  let winner = null;
  let winnerscore;

  while(player1.length > 0 && player2.length > 0) {
    const observation = recursivekey(player1, player2)

    if (recursive_observations.has(observation)) {
      winner = 'player1';
      break
    }

    recursive_observations.add(observation)

    const play1 = player1.shift()!
    const play2 = player2.shift()!

    if ((play1 <= player1.length) && (play2 <= player2.length)) {
      winner = recursive(
        player1.slice(0, play1),
        player2.slice(0, play2)
      )[0]
    } else {
      if (play1 > play2) {
        winner = 'player1'
      } else {
        winner = 'player2'
      }
    }

    if (winner == 'player1') {
      player1.push(play1)
      player1.push(play2)
    } else {
      player2.push(play2)
      player2.push(play1)
    }
  }

  if (winner == 'player1') {
    winnerscore = player1.reverse().reduce((acc, cur, idx) => {
      acc += (cur * (idx + 1))
      return acc;
    })
  } else {
    winnerscore = player2.reverse().reduce((acc, cur, idx) => {
      acc += (cur * (idx + 1))
      return acc;
    })
  }

  return [winner, winnerscore];
}

function recursivekey(player1: number[], player2: number[]) {
  return player1.map((card) => card.toString())
    .concat(['||'])
    .concat(player2.map((card) => card.toString()))
    .join(',')
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

function part2() {
  const input = parsedInput()
  const player1 = input[0]
  const player2 = input[1]

  return recursive(player1, player2)[1]
}

console.log(part1());
console.log(part2());
