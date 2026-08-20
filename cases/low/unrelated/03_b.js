function rollOdds(dice, faces) {
  const counts = {};

  for (let first = 1; first <= faces; first += 1) {
    for (let second = 1; second <= faces; second += 1) {
      if (dice === 1 && second > 1) {
        continue;
      }

      const sum = dice === 1 ? first : first + second;
      counts[sum] = (counts[sum] ?? 0) + 1;
    }
  }

  const outcomes = Math.pow(faces, dice);
  const table = [];

  for (const sum of Object.keys(counts)) {
    table.push({ sum: Number(sum), chance: counts[sum] / outcomes });
  }

  return table;
}

function mostLikely(table) {
  let best = table[0];

  for (const row of table) {
    if (row.chance > best.chance) {
      best = row;
    }
  }

  return best;
}
