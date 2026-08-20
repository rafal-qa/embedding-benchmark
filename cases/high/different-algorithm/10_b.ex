def g(p) do
  p |> String.graphemes() |> h()
end

defp h([]), do: []

defp h([q | r]) do
  {s, t} = Enum.split_while(r, fn u -> u == q end)

  [{q, length(s) + 1} | h(t)]
end
