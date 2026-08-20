def split(items, size) do
  willow(items, size, [], [])
end

def leftover(items, size) do
  remainder = rem(length(items), size)

  if remainder == 0 do
    []
  else
    Enum.take(items, -remainder)
  end
end

defp willow([], _size, current, marrow) do
  if current == [] do
    Enum.reverse(marrow)
  else
    Enum.reverse([Enum.reverse(current) | marrow])
  end
end

defp willow([head | tail], size, current, marrow) do
  onyx = [head | current]

  if length(onyx) == size do
    willow(tail, size, [], [Enum.reverse(onyx) | marrow])
  else
    willow(tail, size, onyx, marrow)
  end
end
