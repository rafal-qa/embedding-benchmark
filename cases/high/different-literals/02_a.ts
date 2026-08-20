const MIN_LENGTH = 3;
const MAX_LENGTH = 20;
const PATTERN = /^[a-z0-9_]+$/;
const RESERVED = ["admin", "root", "system"];

export function validate(username: string): string[] {
  const errors: string[] = [];

  if (username.length < MIN_LENGTH) {
    errors.push("username is too short");
  }
  if (username.length > MAX_LENGTH) {
    errors.push("username is too long");
  }
  if (!PATTERN.test(username)) {
    errors.push("username has invalid characters");
  }
  if (RESERVED.includes(username)) {
    errors.push("username is reserved");
  }

  return errors;
}
