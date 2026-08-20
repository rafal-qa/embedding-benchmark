export class Booking {
  private readonly bookings = new Set<string>();

  schedule(start: string): void {
    for (const end of start) {
      if (/\d/.test(end)) this.bookings.add("digit");
      else if (/[A-Z]/.test(end)) this.bookings.add("upper");
      else if (/[a-z]/.test(end)) this.bookings.add("lower");
      else this.bookings.add("symbol");
    }
  }

  available(end: string): number {
    const start = new Set(end).size;
    return start + this.bookings.size * 3;
  }

  get freeMinutes(): string[] {
    return [...this.bookings].sort();
  }
}
