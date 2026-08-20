type FieldValue = string | number | boolean | null;

interface FieldRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

interface FieldState {
  value: FieldValue;
  initial: FieldValue;
  touched: boolean;
  errors: string[];
}

export class FormState {
  private readonly fields = new Map<string, FieldState>();
  private readonly rules = new Map<string, FieldRule>();

  register(name: string, initial: FieldValue, rule: FieldRule = {}): void {
    if (this.fields.has(name)) {
      return;
    }

    this.fields.set(name, {
      value: initial,
      initial,
      touched: false,
      errors: [],
    });

    this.rules.set(name, rule);
  }

  set(name: string, value: FieldValue): void {
    const field = this.fields.get(name);

    if (field === undefined) {
      return;
    }

    if (field.value === value) {
      field.touched = true;
      return;
    }

    field.value = value;
    field.touched = true;
    field.errors = this.validateField(name, value);
  }

  get(name: string): FieldValue {
    return this.fields.get(name)?.value ?? null;
  }

  errorsFor(name: string): string[] {
    return this.fields.get(name)?.errors ?? [];
  }

  hasErrors(): boolean {
    return [...this.fields.values()].some((field) => field.errors.length > 0);
  }

  isDirty(): boolean {
    for (const field of this.fields.values()) {
      if (field.value !== field.initial) {
        return true;
      }
    }

    return false;
  }

  touchedFields(): string[] {
    return [...this.fields.entries()]
      .filter(([, field]) => field.touched)
      .map(([name]) => name);
  }

  validateAll(): Map<string, string[]> {
    const report = new Map<string, string[]>();

    for (const [name, field] of this.fields) {
      const errors = this.validateField(name, field.value);
      field.errors = errors;

      if (errors.length > 0) {
        report.set(name, errors);
      }
    }

    return report;
  }

  reset(): void {
    for (const field of this.fields.values()) {
      field.value = field.initial;
      field.touched = false;
      field.errors = [];
    }
  }

  snapshot(): Record<string, FieldValue> {
    const output: Record<string, FieldValue> = {};

    for (const [name, field] of this.fields) {
      output[name] = field.value;
    }

    return output;
  }

  private validateField(name: string, value: FieldValue): string[] {
    const rule = this.rules.get(name);
    const errors: string[] = [];

    if (rule === undefined) {
      return errors;
    }

    if (rule.required === true && (value === null || value === "")) {
      errors.push("required");
    }

    if (rule.required === true && typeof value === "string" && value.trim() === "") {
      errors.push("required");
    }

    if (rule.min !== undefined && typeof value === "number" && value < rule.min) {
      errors.push("too small");
    }

    if (rule.max !== undefined && typeof value === "number" && value > rule.max) {
      errors.push("too large");
    }

    if (rule.pattern !== undefined && typeof value === "string" && !rule.pattern.test(value)) {
      errors.push("bad format");
    }

    return errors;
  }
}
