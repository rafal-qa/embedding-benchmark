export interface Step {
  name: string;
  fields: Record<string, string>;
  required: string[];
}

function missingFields(step: Step): string[] {
  const errors: string[] = [];

  for (const field of step.required) {
    const value = step.fields[field];

    if (value === undefined || value.trim().length === 0) {
      errors.push(`${step.name}.${field} is required`);
    }
  }

  return errors;
}

export function validateStep(step: Step): string[] {
  const errors = missingFields(step);

  const email = step.fields["email"];

  if (email !== undefined && !email.includes("@")) {
    errors.push(`${step.name}.email is malformed`);
  }

  return errors.map((message) => `${step.name.toUpperCase()}: ${message}`);
}
