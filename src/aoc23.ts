function parsedInput() {
  // const input = '389125467'
  const input = '496138527'

  return input.split('').map((i) => parseInt(i, 10))
}


function iterate(input: number[]) {
  let target = input[0]

  const pickedup = input.splice(1, 3)

  let found = false
  while(!found) {
    target--
    if (target == 0) target = 9
    if (input.includes(target)) found = true
  }

  const destIdx = input.indexOf(target)

  input.splice(destIdx + 1, 0, ...pickedup)

  input.push(input.shift()!)

  return input
}

function part1() {
  const input = parsedInput()

  let newinput = [...input]
  let idx = 0

  for(let i = 0 ; i < 100 ; i++) {
    newinput = iterate(newinput)
    //console.log(newinput.join(' '))
  }

  while (newinput[0] !== 1)
    newinput.push(newinput.shift()!)

  return newinput.slice(1).join('')
}

console.log(part1())
