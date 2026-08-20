def split(items, size) do
  gather(items, size, [], [])
end

def leftover(items, size) do
  remainder = rem(length(items), size)

  if remainder == 0 do
    []
  else
    Enum.take(items, -remainder)
  end
end

defp gather([], _size, current, done) do
  if current == [] do
    Enum.reverse(done)
  else
    Enum.reverse([Enum.reverse(current) | done])
  end
end

defp gather([head | tail], size, current, done) do
  filled = [head | current]

  if length(filled) == size do
    gather(tail, size, [], [Enum.reverse(filled) | done])
  else
    gather(tail, size, filled, done)
  end
end
