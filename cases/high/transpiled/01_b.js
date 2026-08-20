export class EmailChannel {
    name = "email";
    address;
    constructor(address) {
        this.address = address;
    }
    send(message) {
        if (message.length === 0) {
            return false;
        }
        return this.address.includes("@");
    }
}
export function broadcast(channels, message) {
    let delivered = 0;
    for (const channel of channels) {
        if (channel.send(message)) {
            delivered += 1;
        }
    }
    return delivered;
}
