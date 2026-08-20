static List<String> p(List<String> q, int r) {
    Map<String, Integer> s = new HashMap<>();

    for (String t : q) {
        s.put(t, s.getOrDefault(t, 0) + 1);
    }

    PriorityQueue<Map.Entry<String, Integer>> u = new PriorityQueue<>((v, w) -> {
        if (!v.getValue().equals(w.getValue())) {
            return v.getValue() - w.getValue();
        }
        return w.getKey().compareTo(v.getKey());
    });

    for (Map.Entry<String, Integer> x : s.entrySet()) {
        u.add(x);

        if (u.size() > r) {
            u.poll();
        }
    }

    List<String> y = new ArrayList<>();

    while (!u.isEmpty()) {
        y.add(0, u.poll().getKey());
    }

    return y;
}
