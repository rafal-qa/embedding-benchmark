export interface Step {
  name: string;
  fields: Record<string, string>;
  required: string[];
}

export function validateStep(step: Step): string[] {
  const errors: string[] = [];

  for (const field of step.required) {
    const value = step.fields[field];

    if (value === undefined || value.trim().length === 0) {
      errors.push(`${step.name}.${field} is required`);
    }
  }

  const email = step.fields["email"];

  if (email !== undefined && !email.includes("@")) {
    errors.push(`${step.name}.email is malformed`);
  }

  const prefix = step.name.toUpperCase();
  return errors.map((message) => `${prefix}: ${message}`);
}
