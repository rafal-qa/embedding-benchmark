function check(value, bound) {
  const flags = {
    long: value.length >= bound,
    digit: /[0-9]/.test(value),
    mixed: value !== value.toLowerCase(),
    tidy: value.trim() === value,
  };

  const passed = Object.values(flags).filter(Boolean).length;

  return { flags, passed, ok: passed === 4 };
}
