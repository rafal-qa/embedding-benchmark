@Component
public class OrderConsumer {

    private final Set<String> processed = ConcurrentHashMap.newKeySet();

    @KafkaListener(topics = "orders", groupId = "fulfilment")
    public void onOrder(ConsumerRecord<String, String> record, Acknowledgment ack) {
        String orderId = record.key();
        if (!processed.add(orderId)) {
            ack.acknowledge();
            return;
        }
        double total = Double.parseDouble(record.value());
        if (total > 1000) {
            System.out.printf("high-value order %s flagged%n", orderId);
        }
        ack.acknowledge();
    }
}
