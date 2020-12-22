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

function allergen_possibles(input: string[][][]) {
  const retval = new Map<string, Set<string>>()
  input.forEach((row) => {
    const ingredients = row[0]
    const allergens = row[1]
    allergens.forEach((a) => {
      const match = retval.has(a)
      if (match) {
        const cur = retval.get(a)
        const next = Array.from(cur.values()).filter((ing) => {
          return ingredients.includes(ing)
        })

        retval.set(a, new Set<string>(next))

      } else {
        retval.set(a, new Set<string>(row[0]))
      }
    })
  })

  return retval
}

function safe_ingredients(ingredients: string[], allergymap: Map<string, Set<string>>) {
  return ingredients.filter((ingredient) => {
    return !Array.from(allergymap.values()).some((aposs) => aposs.has(ingredient))
  });
}

function solve_allergy_map(allergymap: Map<string, Set<string>>) {
  const allergykeys = Array.from(allergymap.keys())

  let keep_iterating = true;
  while (keep_iterating) {
    keep_iterating = false;
    allergykeys.forEach((allergen) => {
      const candidates = allergymap.get(allergen)!

      if (candidates.size === 1) {
        const item_to_remove = Array.from(candidates.values())[0]

        allergykeys.forEach((allergen2) => {
          if (allergen == allergen2) return
          allergymap.get(allergen2)!.delete(item_to_remove);
        });
      } else {
        keep_iterating = true
      }
    });
  }
}

function part1() {
  const input = parsedInput();
  const possibles = allergen_possibles(input)

  const ingredients = new Set<string>(
    input.reduce((acc, cur) => acc.concat(cur[0]), []));

  const safe = safe_ingredients(Array.from(ingredients.values()), possibles)

  const safecount = safe.reduce((acc, ing) => {
    return acc + input.reduce((acc, cur) => {
      if (cur[0].includes(ing)) acc++
      return acc
    }, 0)
  }, 0)

  return safecount
}

function part2() {
  const input = parsedInput();
  const allergymap = allergen_possibles(input)

  const ingredients = new Set<string>(
    input.reduce((acc, cur) => acc.concat(cur[0]), []));

  const safe = safe_ingredients(Array.from(ingredients.values()), allergymap)

  safe.forEach((ingredient) => {
    Array.from(allergymap.keys()).forEach((allergen) => {
      const possibles = allergymap.get(allergen)
      allergymap.set(allergen,
        new Set<string>(
          Array.from(possibles.values())
            .filter(possible => possible != ingredient)
        )
      )
    })
  })

  solve_allergy_map(allergymap)
  const sorted = Array.from(allergymap.entries()).sort((entry, entry2) => {
    if (entry[0] > entry2[0]) {
      return 1;
    }

    if (entry[0] < entry2[0]) {
      return -1;
    }

    return 0;
  })
  return sorted.map((ingset) => Array.from(ingset[1])[0]).join(',')
}

console.log(part1());
console.log(part2());
