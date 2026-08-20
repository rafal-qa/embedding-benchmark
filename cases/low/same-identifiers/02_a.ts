type Booking = { start: number; end: number };

export function available(bookings: Booking[], start: number, end: number): boolean {
  return bookings.every((booking) => end <= booking.start || start >= booking.end);
}

export function schedule(bookings: Booking[], start: number, end: number): Booking[] {
  if (!available(bookings, start, end)) {
    return bookings;
  }

  return [...bookings, { start, end }].sort((left, right) => left.start - right.start);
}

export function freeMinutes(bookings: Booking[], dayEnd: number): number {
  const occupied = bookings.reduce((total, booking) => total + booking.end - booking.start, 0);
  return dayEnd - occupied;
}
