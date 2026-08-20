defmodule Label do
  defstruct [:name, :value]
end

def new(window) when window > 0 do
  %{window: window, values: %{}, dropped: 0}
end

def record(state, name, value, at) do
  if value <= 0 do
    {:error, "value must be positive"}
  else
    entry = {at, value}
    values = Map.update(state.values, name, [entry], fn held -> [entry | held] end)
    {:ok, %{state | values: values}}
  end
end

def prune(state, now) do
  cutoff = now - state.window
  {values, dropped} = Enum.reduce(state.values, {%{}, 0}, fn {name, entries}, {kept, count} ->
    recent = Enum.filter(entries, fn {at, _value} -> at >= cutoff end)
    {Map.put(kept, name, recent), count + length(entries) - length(recent)}
  end)
  %{state | values: values, dropped: state.dropped + dropped}
end

def average(state, name) do
  case Map.get(state.values, name, []) do
    [] -> nil
    entries -> Enum.sum(Enum.map(entries, &elem(&1, 1))) / length(entries)
  end
end

def status(state) do
  labels = Enum.map(state.values, fn {name, entries} ->
    %Label{name: name, value: length(entries)}
  end)
  order(labels)
end

def order(labels), do: Enum.sort_by(labels, fn label -> label.name end)

def empty?(state), do: map_size(state.values) == 0
