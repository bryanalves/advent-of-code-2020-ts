import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc21.txt', 'utf8');

  // const input = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
// trh fvjkl sbzzf mxmxvkd (contains dairy)
// sqjhc fvjkl (contains soy)
// sqjhc mxmxvkd sbzzf (contains fish)
// `

  return input.split("\n").slice(0, -1).map((row) => {
    const data = row.split(" (contains ")
    return [
      data[0].split(' '),
      data[1].slice(0, -1).split(', ')
    ]
  });
}

function part1() {
  const input = parsedInput();
  const ingredients = new Set<string>(
    input.reduce((acc, cur) => acc.concat(cur[0]), []));

  const allergens = new Set<string>(
    input.reduce((acc, cur) => acc.concat(cur[1]), []));

  const allergen_possibles = new Map<string, Set<string>>()
  input.forEach((row) => {
    const ingredients = row[0]
    const allergens = row[1]
    allergens.forEach((a) => {
      const match = allergen_possibles.has(a)
      if (match) {
        const cur = allergen_possibles.get(a)
        const next = Array.from(cur.values()).filter((ing) => {
          return ingredients.includes(ing)
        })

        allergen_possibles.set(a, new Set<string>(next))

      } else {
        allergen_possibles.set(a, new Set<string>(row[0]))
      }
    })
  })

  const safe = Array.from(ingredients.values()).filter((ingredient) => {
    return !Array.from(allergen_possibles.values()).some((aposs) => aposs.has(ingredient))
  });

  const safecount = safe.reduce((acc, ing) => {
    return acc + input.reduce((acc, cur) => {
      if (cur[0].includes(ing)) acc++
      return acc
    }, 0)
  }, 0)

  return safecount
}

console.log(part1());
