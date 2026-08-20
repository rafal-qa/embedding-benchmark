export class Report {
    rows;
    constructor(rows) {
        this.rows = rows;
    }
    footer() {
        return `${this.rows.length} rows`;
    }
    render() {
        return [this.header(), ...this.rows, this.footer()].join("\n");
    }
}
export class InvoiceReport extends Report {
    header() {
        return "invoice";
    }
}
export class AuditReport extends Report {
    header() {
        return "audit";
    }
    footer() {
        return "end of audit";
    }
}
