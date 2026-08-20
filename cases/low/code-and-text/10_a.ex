def chunk(items, size) when size > 0 do
  do_chunk(items, size, [])
end

defp do_chunk([], _size, acc), do: Enum.reverse(acc)

defp do_chunk(items, size, acc) do
  {head, rest} = Enum.split(items, size)

  do_chunk(rest, size, [head | acc])
end
