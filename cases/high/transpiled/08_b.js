export class Registry {
    items;
    lastId;
    constructor() {
        this.items = new Map();
        this.lastId = null;
    }
    add(item) {
        this.items.set(item.id, item);
        this.lastId = item.id;
    }
    find(id) {
        return this.items.get(id);
    }
    latest() {
        return this.lastId === null ? undefined : this.items.get(this.lastId);
    }
    size() {
        return this.items.size;
    }
}
