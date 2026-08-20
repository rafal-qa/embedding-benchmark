def normalize(value), do: String.trim(value)

def alarms(readings, thresholds) do
  readings
  |> Enum.filter(fn {name, value} ->
    case Map.fetch(thresholds, name) do
      {:ok, {low, high}} -> value < low or value > high
      :error -> false
    end
  end)
  |> Enum.map(fn {name, value} -> "#{normalize(name)}:#{value}" end)
end
