def f(a) do
  a
  |> String.graphemes()
  |> Enum.chunk_by(& &1)
  |> Enum.map(fn b -> {hd(b), length(b)} end)
end
