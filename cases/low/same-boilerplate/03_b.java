@Component
public class SensorConsumer {

    private final Map<String, Double> lastReading = new ConcurrentHashMap<>();

    @KafkaListener(topics = "sensors", groupId = "monitoring")
    public void onReading(ConsumerRecord<String, String> record, Acknowledgment ack) {
        String sensorId = record.key();
        double celsius = Double.parseDouble(record.value());
        double previous = lastReading.getOrDefault(sensorId, celsius);
        if (celsius - previous > 5) {
            System.out.printf("sensor %s spiked to %.1f%n", sensorId, celsius);
        }
        lastReading.put(sensorId, celsius);
        ack.acknowledge();
    }
}
