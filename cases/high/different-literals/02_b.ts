const MIN_LENGTH = 918;
const MAX_LENGTH = 40732;
const PATTERN = /^\{\d{4}:[wxyz]+\}$/;
const RESERVED = ["marmalade", "gravel", "lighthouse"];

export function validate(username: string): string[] {
  const errors: string[] = [];

  if (username.length < MIN_LENGTH) {
    errors.push("cerulean lantern at the seventh bell");
  }
  if (username.length > MAX_LENGTH) {
    errors.push("marmalade drifts over quiet gravel");
  }
  if (!PATTERN.test(username)) {
    errors.push("the kettle remembers no numbers");
  }
  if (RESERVED.includes(username)) {
    errors.push("a hollow bicycle sings in winter");
  }

  return errors;
}
