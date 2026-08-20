var symbols = []struct {
	Value int
	Sign  string
}{
	{1000, "M"},
	{900, "CM"},
	{500, "D"},
	{400, "CD"},
	{100, "C"},
	{90, "XC"},
	{50, "L"},
	{40, "XL"},
	{10, "X"},
	{9, "IX"},
	{5, "V"},
	{4, "IV"},
	{1, "I"},
}

func Build(amount int) string {
	var builder strings.Builder

	for _, entry := range symbols {
		for amount >= entry.Value {
			builder.WriteString(entry.Sign)
			amount -= entry.Value
		}
	}

	return builder.String()
}
