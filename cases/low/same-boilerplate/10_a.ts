@Injectable()
export class TaxService {
  summarize(items: LineItem[]): TaxSummary {
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }
    const rate = subtotal > 500 ? 0.2 : 0.1;
    const tax = subtotal * rate;
    return { subtotal, tax, total: subtotal + tax };
  }
}

@Controller('invoices')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('tax')
  compute(@Body() items: LineItem[]): TaxSummary {
    return this.taxService.summarize(items);
  }
}
