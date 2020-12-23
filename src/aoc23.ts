function parsedInput() {
  //const input = '389125467'
  const input = '496138527'

  return input.split('').map((i) => parseInt(i, 10))
}

function play(num_cups: number, iterations: number) {
  const input = parsedInput()
  const input_length = input.length

  let cups = []
  for (let i = 0 ; i <= num_cups ; i++) {
    cups.push(0)
  }

  let cur:number = input.shift()!
  let first:number = cur

  while (input.length > 0) {
    cups[cur] = input.shift()!
    cur = cups[cur]
  }

  for (let i = input_length + 1 ; i <= num_cups ; i++) {
    cups[cur] = i
    cur = i
  }

  cups[cur] = first
  cur = first

  for (let i = 0 ; i < iterations ; i++) {
    const removed_a:number = cups[cur]
    const removed_b:number = cups[removed_a]
    const removed_c:number = cups[removed_b]

    let dest =  (cur > 1) ? cur - 1 : num_cups
    while ([removed_a,removed_b,removed_c].includes(dest))
      dest = (dest > 1) ? dest - 1 : num_cups

    cups[cur] = cups[removed_c]
    cups[removed_c] = cups[dest]
    cups[dest] = removed_a 

    cur = cups[cur]
  }

  return cups
}

function part1() {
  const cups = play(9, 100)

  let cup = cups[1]
  let txt = ''
  while (cup != 1) {
    txt += cup.toString()
    cup = cups[cup]
  }
  return txt
}

function part2() {
  const cups = play(1000000, 10000000)

  const first = cups[1]
  const second = cups[first]

  return first * second
}

console.log(part1())
console.log(part2())
