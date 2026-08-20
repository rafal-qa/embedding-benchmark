static List<String> f(List<String> a, int b) {
    Map<String, Integer> c = new HashMap<>();

    for (String d : a) {
        c.merge(d, 1, Integer::sum);
    }

    return c.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())
                    .thenComparing(Map.Entry.<String, Integer>comparingByKey()))
            .limit(b)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
}
