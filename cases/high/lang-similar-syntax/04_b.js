export class QueryStringBuilder {
  #params = [];

  add(name, value) {
    this.#params.push([name, value]);

    return this;
  }

  addAll(name, values) {
    for (const value of values) {
      this.add(name, value);
    }

    return this;
  }

  build() {
    if (this.#params.length === 0) {
      return "";
    }

    const encoded = [];

    for (const param of this.#params) {
      encoded.push(encodeURIComponent(param[0]) + "=" + encodeURIComponent(param[1]));
    }

    return "?" + encoded.join("&");
  }
}
