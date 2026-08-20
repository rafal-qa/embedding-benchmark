@Injectable()
export class SlotService {
  build(request: SlotRequest): Slot[] {
    const slots: Slot[] = [];
    let cursor = request.start;
    while (cursor + request.duration <= request.end) {
      slots.push({ from: cursor, to: cursor + request.duration });
      cursor += request.duration + request.gap;
    }
    return slots;
  }
}

@Controller('schedule')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get('slots')
  list(@Query() request: SlotRequest): Slot[] {
    return this.slotService.build(request);
  }
}
