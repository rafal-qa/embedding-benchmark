@RestController
@RequestMapping("/coordinates")
public class CoordinateController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> check(@RequestBody CoordinateRequest request) {
        List<Map<String, Object>> accepted = new ArrayList<>();
        List<Map<String, Object>> rejected = new ArrayList<>();
        String[] lines = request.rows().split("\n");
        for (int index = 0; index < lines.length; index++) {
            String[] fields = lines[index].split(",");
            if (fields.length != 2) {
                rejected.add(Map.of("row", index, "reason", "expected two fields"));
                continue;
            }
            double lat = Double.parseDouble(fields[0]);
            double lon = Double.parseDouble(fields[1]);
            if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                accepted.add(Map.of("lat", lat, "lon", lon));
            } else {
                rejected.add(Map.of("row", index, "reason", "out of range"));
            }
        }
        return ResponseEntity.ok(Map.of("accepted", accepted, "rejected", rejected));
    }

    public record CoordinateRequest(String rows) {}
}
