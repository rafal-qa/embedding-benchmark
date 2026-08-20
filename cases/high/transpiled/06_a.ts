export abstract class Report {
  protected readonly rows: string[];

  constructor(rows: string[]) {
    this.rows = rows;
  }

  abstract header(): string;

  protected footer(): string {
    return `${this.rows.length} rows`;
  }

  render(): string {
    return [this.header(), ...this.rows, this.footer()].join("\n");
  }
}

export class InvoiceReport extends Report {
  override header(): string {
    return "invoice";
  }
}

export class AuditReport extends Report {
  override header(): string {
    return "audit";
  }

  override footer(): string {
    return "end of audit";
  }
}
