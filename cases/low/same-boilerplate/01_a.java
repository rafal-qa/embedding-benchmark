@RestController
@RequestMapping("/interest")
public class InterestController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> project(@RequestBody InterestRequest request) {
        double balance = request.principal();
        double rate = request.rate() / 100;
        List<Map<String, Object>> schedule = new ArrayList<>();
        for (int year = 1; year <= request.years(); year++) {
            double gain = balance * rate;
            balance += gain;
            schedule.add(Map.of("year", year, "gain", Math.round(gain * 100) / 100.0));
        }
        double total = Math.round((balance - request.principal()) * 100) / 100.0;
        return ResponseEntity.ok(Map.of("schedule", schedule, "total", total));
    }

    public record InterestRequest(double principal, double rate, int years) {}
}
