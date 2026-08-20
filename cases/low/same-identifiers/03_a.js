export function price(cart, rules) {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  for (const rule of rules) {
    if (total >= rule.minimum) {
      total -= rule.amount;
    }
  }

  return Math.max(0, total);
}

export function qualifyingItems(cart, rules) {
  const categories = new Set(rules.map((rule) => rule.category));
  return cart.filter((item) => categories.has(item.category));
}
