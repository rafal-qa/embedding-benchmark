class Emitter {
  constructor() {
    this.handlers = new Map();
  }

  on(topic, handler) {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, []);
    }

    this.handlers.get(topic).push(handler);
  }

  off(topic, handler) {
    const list = this.handlers.get(topic);

    if (list === undefined) {
      return;
    }

    this.handlers.set(
      topic,
      list.filter((held) => held !== handler),
    );
  }

  emit(topic, payload) {
    const list = this.handlers.get(topic) ?? [];

    for (const handler of list) {
      handler(payload);
    }

    return list.length;
  }
}
