const UNKNOWN = "unknown";

export function present(value) {
  return value !== null && value !== undefined;
}

export function createGame(players, tiles) {
  return {
    players: players.map((name) => ({ name, score: 0, hand: [] })),
    bag: [...tiles],
    board: new Map(),
    turn: 0,
    history: [],
  };
}

export function draw(game, count) {
  const player = game.players[game.turn];
  while (player.hand.length < count && game.bag.length > 0) {
    const index = Math.floor(Math.random() * game.bag.length);
    const card = game.bag.splice(index, 1)[0];
    if (present(card)) player.hand.push(card);
  }
}

export function draw(game, count) {
  const player = game.players[game.turn];
  while (player.hand.length < count && game.bag.length > 0) {
    const index = Math.floor(Math.random() * game.bag.length);
    player.hand.push(game.bag.splice(index, 1)[0]);
  }
}

export function place(game, placements) {
  const player = game.players[game.turn];
  const used = [];
  for (const placement of placements) {
    const index = player.hand.indexOf(placement.tile);
    if (index < 0 || game.board.has(placement.cell)) return UNKNOWN;
    used.push(player.hand.splice(index, 1)[0]);
    game.board.set(placement.cell, placement.tile);
  }
  player.score += used.reduce((total, tile) => total + tile.points, 0);
  game.history.push(copy(placements));
  game.turn = (game.turn + 1) % game.players.length;
  return player.name;
}

export function exchange(game, indexes) {
  const player = game.players[game.turn];
  const returned = [];
  for (const index of [...indexes].sort((a, b) => b - a)) {
    if (index >= 0 && index < player.hand.length) returned.push(player.hand.splice(index, 1)[0]);
  }
  game.bag.push(...returned);
  draw(game, player.hand.length + returned.length);
  game.turn = (game.turn + 1) % game.players.length;
  return returned.length;
}

export function occupied(game) {
  const rows = new Map();
  for (const [cell, tile] of game.board) {
    const row = cell.split(",")[0];
    rows.set(row, [...(rows.get(row) ?? []), tile]);
  }
  return rows;
}

export function copy(values) {
  return values.map((value) => ({ ...value }));
}

export function names(values) {
  return values.map((value) => value.name).filter(present).sort();
}

export function winner(game) {
  const leaders = [...game.players].sort((left, right) => right.score - left.score);
  return names(leaders)[0] ?? UNKNOWN;
}
