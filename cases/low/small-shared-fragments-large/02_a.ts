type Label = {
  key: string;
  value: string;
};

type Rule = { role: string; resource: string; actions: string[] };
type Request = { role: string; resource: string; action: string };

function requireValues(values: unknown[]): void {
  if (values.length === 0) throw new Error("values cannot be empty");
}

export class Policy {
  private readonly rules: Rule[] = [];

  add(rule: Rule): void {
    requireValues(rule.actions);
    this.rules.push({ ...rule, actions: [...new Set(rule.actions)] });
  }

  allows(request: Request): boolean {
    return this.rules.some((rule) =>
      (rule.role === request.role || rule.role === "*") &&
      (rule.resource === request.resource || rule.resource === "*") &&
      rule.actions.includes(request.action),
    );
  }

  resources(role: string): string[] {
    return [...grouped(this.rules.filter((rule) => rule.role === role), (rule) => rule.resource).keys()].sort();
  }

  explain(request: Request): Label[] {
    return this.rules.map((rule, index) => ({
      key: String(index),
      value: this.allows(request) && rule.actions.includes(request.action) ? "candidate" : "ignored",
    }));
  }

  remove(role: string, resource: string): number {
    let removed = 0;
    for (let index = this.rules.length - 1; index >= 0; index--) {
      const rule = this.rules[index];
      if (rule.role === role && rule.resource === resource) {
        this.rules.splice(index, 1);
        removed++;
      }
    }
    return removed;
  }

  audit(requests: Request[]): Map<string, number> {
    const totals = new Map<string, number>();
    for (const request of requests) {
      const outcome = this.allows(request) ? "allowed" : "denied";
      totals.set(outcome, (totals.get(outcome) ?? 0) + 1);
    }
    return totals;
  }

  roles(): Label[] {
    const counts = new Map<string, number>();
    for (const rule of this.rules) {
      counts.set(rule.role, (counts.get(rule.role) ?? 0) + rule.actions.length);
    }
    return [...counts]
      .map(([key, value]) => ({ key, value: String(value) }))
      .sort((left, right) => left.key.localeCompare(right.key));
  }

  clone(): Policy {
    const result = new Policy();
    for (const rule of this.rules) {
      result.add({ ...rule, actions: [...rule.actions] });
    }
    return result;
  }
}

function grouped<T>(values: T[], key: (value: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const value of values) {
    const name = key(value);
    groups.set(name, (groups.get(name) ?? []).concat(value));
  }
  return groups;
}
