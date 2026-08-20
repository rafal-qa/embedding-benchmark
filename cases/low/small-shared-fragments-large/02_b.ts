type Candle = { at: number; open: number; high: number; low: number; close: number; volume: number };

type Label = {
  key: string;
  value: string;
};

function requireValues(values: unknown[]): void {
  if (values.length === 0) throw new Error("values cannot be empty");
}

export function aggregate(trades: Array<{ at: number; price: number; size: number }>, interval: number): Candle[] {
  requireValues(trades);

  const buckets = grouped(trades, (trade) => String(Math.floor(trade.at / interval)));
  return [...buckets].map(([key, values]) => {
    const prices = values.map((trade) => trade.price);
    return {
      at: Number(key) * interval,
      open: values[0].price,
      high: Math.max(...prices),
      low: Math.min(...prices),
      close: values[values.length - 1].price,
      volume: values.reduce((total, trade) => total + trade.size, 0),
    };
  }).sort((left, right) => left.at - right.at);
}

export function movingAverage(candles: Candle[], width: number): number[] {
  const result: number[] = [];
  for (let index = width - 1; index < candles.length; index++) {
    const window = candles.slice(index - width + 1, index + 1);
    result.push(window.reduce((total, candle) => total + candle.close, 0) / width);
  }
  return result;
}

export function resample(candles: Candle[], factor: number): Candle[] {
  const result: Candle[] = [];
  for (let index = 0; index < candles.length; index += factor) {
    const window = candles.slice(index, index + factor);
    if (window.length === 0) continue;
    result.push({
      at: window[0].at,
      open: window[0].open,
      high: Math.max(...window.map((item) => item.high)),
      low: Math.min(...window.map((item) => item.low)),
      close: window[window.length - 1].close,
      volume: window.reduce((sum, item) => sum + item.volume, 0),
    });
  }
  return result;
}

export function changes(candles: Candle[]): number[] {
  return candles.slice(1).map((item, index) => item.close - candles[index].close);
}

function grouped<T>(values: T[], key: (value: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const value of values) {
    const name = key(value);
    groups.set(name, (groups.get(name) ?? []).concat(value));
  }
  return groups;
}

export function labels(candles: Candle[]): Label[] {
  return candles.map((candle) => ({ key: String(candle.at), value: candle.close.toFixed(2) }));
}
