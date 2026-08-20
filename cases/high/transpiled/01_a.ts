export interface Channel {
  readonly name: string;
  send(message: string): boolean;
}

export class EmailChannel implements Channel {
  readonly name = "email";
  private readonly address: string;

  constructor(address: string) {
    this.address = address;
  }

  send(message: string): boolean {
    if (message.length === 0) {
      return false;
    }

    return this.address.includes("@");
  }
}

export function broadcast(channels: Channel[], message: string): number {
  let delivered = 0;

  for (const channel of channels) {
    if (channel.send(message)) {
      delivered += 1;
    }
  }

  return delivered;
}
