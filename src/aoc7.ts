import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc7.txt', 'utf8');
  // const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
// `

  // const input = `shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.
// `

  return input.split("\n").slice(0, -1).reduce((acc, row) => {
    const kv = row.split(" contain ");
    const key = kv[0].slice(0, -1);
    let val = null;
    if (kv[1] !== 'no other bags.') {
      val = kv[1].split(', ').reduce((acc, bags) => {
        const processed = bags
          .replace('.', '')
          .replace('bags', 'bag');
        const count = parseInt(processed.slice(0, 2));
        const bag_id = processed.slice(2);
        acc.set(bag_id, count);
        return acc;
      }, new Map());
    }
    acc.set(key, val);
    return acc;
  }, new Map());
}

function part1() {
  const bag_set = parsedInput();
  return Array.from(bag_set
    .keys())
    .filter((bag_id) => { return contains_bag(bag_set, bag_id, 'shiny gold bag')});
}

function contains_bag(bag_set: Map<any, any>, source_bag_id:string, target_bag_id:string): boolean {
  const candidate_bag_map = bag_set.get(source_bag_id);

  if (candidate_bag_map == null) {
    return false;
  }

  const candidate_bags = Array.from(candidate_bag_map.keys());

  return candidate_bags.some((bag_id) => {
    return (bag_id == target_bag_id) || contains_bag(bag_set, bag_id as string, target_bag_id);
  });
}

function bag_contents(bag_set: Map<any, any>, bag_id: string): number {
  const inside_bag = bag_set.get(bag_id)
  if (inside_bag === null || inside_bag === undefined) {
    return 0;
  }

  const inside_bag_counts = Array.from(inside_bag.entries()).map((bag_tuple) => {
    const bag_id = (bag_tuple as any[])[0];
    const count = (bag_tuple as any[])[1];
    const total = parseInt(count) + (parseInt(count) * bag_contents(bag_set, bag_id));
    return total;
  })

  return inside_bag_counts.reduce((acc, count) => {
    return acc += count
  }, 0);
}

function part2() {
  const bag_set = parsedInput();

  return bag_contents(bag_set, 'shiny gold bag')
}

console.log(part1().length);
console.log(part2());
