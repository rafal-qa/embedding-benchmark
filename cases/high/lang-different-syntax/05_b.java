public final class Graph {
    private Graph() {
    }

    public static List<String> topologicalSort(List<String> nodes, Map<String, List<String>> edges) {
        Map<String, Integer> indegree = new HashMap<>();
        for (String node : nodes) {
            indegree.put(node, 0);
        }
        for (List<String> targets : edges.values()) {
            for (String target : targets) {
                indegree.merge(target, 1, Integer::sum);
            }
        }

        Deque<String> queue = new ArrayDeque<>();
        for (String node : nodes) {
            if (indegree.get(node) == 0) {
                queue.addLast(node);
            }
        }

        List<String> ordered = new ArrayList<>();
        while (!queue.isEmpty()) {
            String current = queue.removeFirst();
            ordered.add(current);

            for (String target : edges.getOrDefault(current, List.of())) {
                indegree.merge(target, -1, Integer::sum);
                if (indegree.get(target) == 0) {
                    queue.addLast(target);
                }
            }
        }

        if (ordered.size() != nodes.size()) {
            return List.of();
        }
        return ordered;
    }
}
