const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function encode(input) {
  const output = [];

  for (let i = 0; i < input.length; i += 3) {
    const remaining = input.length - i;
    let chunk = input[i] << 16;

    if (remaining > 1) {
      chunk |= input[i + 1] << 8;
    }
    if (remaining > 2) {
      chunk |= input[i + 2];
    }

    output.push(alphabet[(chunk >> 18) & 63]);
    output.push(alphabet[(chunk >> 12) & 63]);

    if (remaining > 1) {
      output.push(alphabet[(chunk >> 6) & 63]);
    } else {
      output.push("=");
    }
    if (remaining > 2) {
      output.push(alphabet[chunk & 63]);
    } else {
      output.push("=");
    }
  }

  return output.join("");
}
