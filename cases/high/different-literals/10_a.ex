@durations %{green: 30, yellow: 5, red: 25}
@order [:green, :yellow, :red]

def next(state) do
  index = Enum.find_index(@order, fn item -> item == state end)

  if index == nil do
    :green
  else
    Enum.at(@order, rem(index + 1, length(@order)))
  end
end

def duration(state) do
  Map.get(@durations, state, 10)
end

def cycle_length do
  Enum.reduce(@order, 0, fn state, total -> total + duration(state) end)
end
