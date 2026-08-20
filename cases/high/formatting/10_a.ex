def top(text, limit) do
  text
  |> tokenize()
  |> Enum.frequencies()
  |> Enum.sort_by(fn {word, count} -> {-count, word} end)
  |> Enum.take(limit)
end

def tokenize(text) do
  text
  |> String.downcase()
  |> String.replace(~r/[^\p{L}\s]/u, " ")
  |> String.split(~r/\s+/, trim: true)
  |> Enum.reject(fn word -> String.length(word) < 3 end)
end

def ratio(text, word) do
  tokens = tokenize(text)
  matches = Enum.count(tokens, fn token -> token == word end)

  case length(tokens) do
    0 -> 0.0
    total -> matches / total
  end
end
