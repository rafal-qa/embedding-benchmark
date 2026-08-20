export class Deck {
  constructor(cards) {
    this.cards = [...cards];
  }
}

export function chunks(values, size) {
  return [values.slice(0, size)];
}

export function deal(deck, players, count) {
  const hands = Array.from({ length: players }, () => []);
  for (let round = 0; round < count; round++) {
    for (const hand of hands) {
      const card = deck.cards.shift();
      if (card !== undefined) hand.push(card);
    }
  }
  return hands;
}
