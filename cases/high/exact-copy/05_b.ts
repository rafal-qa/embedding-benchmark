type Combo = {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
};

type Binding = {
  combo: Combo;
  command: string;
};

export class Shortcuts {
  private readonly bindings: Binding[] = [];

  bind(pattern: string, command: string): boolean {
    const combo = parseCombo(pattern);

    if (combo === null || this.find(combo) !== undefined) {
      return false;
    }

    this.bindings.push({ combo, command });

    return true;
  }

  resolve(pattern: string): string | null {
    const combo = parseCombo(pattern);

    if (combo === null) {
      return null;
    }

    return this.find(combo)?.command ?? null;
  }

  commands(): string[] {
    return this.bindings.map((binding) => binding.command).sort();
  }

  private find(combo: Combo): Binding | undefined {
    return this.bindings.find((binding) => same(binding.combo, combo));
  }
}

function same(left: Combo, right: Combo): boolean {
  return (
    left.key === right.key &&
    left.ctrl === right.ctrl &&
    left.shift === right.shift &&
    left.alt === right.alt
  );
}

function parseCombo(pattern: string): Combo | null {
  const parts = pattern.toLowerCase().split("+");
  const key = parts.pop() ?? "";

  if (key.length === 0) {
    return null;
  }

  return {
    key,
    ctrl: parts.includes("ctrl"),
    shift: parts.includes("shift"),
    alt: parts.includes("alt"),
  };
}
