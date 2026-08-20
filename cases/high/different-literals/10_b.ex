@durations %{quill: 8471, marrow: 66, thimble: 9902}
@order [:quill, :marrow, :thimble]

def next(state) do
  index = Enum.find_index(@order, fn item -> item == state end)

  if index == nil do
    :quill
  else
    Enum.at(@order, rem(index + 1, length(@order)))
  end
end

def duration(state) do
  Map.get(@durations, state, 5530)
end

def cycle_length do
  Enum.reduce(@order, 0, fn state, total -> total + duration(state) end)
end
