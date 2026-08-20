export function buildPageLinks(base: string, page: number, total: number): string[] {
  const links: string[] = [];

  if (page > 1) {
    links.push(`${base}?page=${page - 1}`);
  }

  const first = Math.max(1, page - 2);
  const last = Math.min(total, page + 2);

  for (let index = first; index <= last; index += 1) {
    links.push(`${base}?page=${index}`);
  }

  if (page < total) {
    links.push(`${base}?page=${page + 1}`);
  }

  return links;
}

export function pageWindow(page: number, total: number): string {
  return `${Math.min(page, total)} / ${total}`;
}
