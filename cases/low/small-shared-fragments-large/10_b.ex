defmodule Label do
  defstruct [:name, :value]
end

def seed(players) do
  players
  |> Enum.sort_by(fn player -> {-player.rating, player.name} end)
  |> pair([])
end

def report(match, winner) do
  if winner <= 0 do
    {:error, "value must be positive"}
  else
    case match do
      %{left: %{id: ^winner}} -> {:ok, match.left}
      %{right: %{id: ^winner}} -> {:ok, match.right}
      _ -> {:error, "winner not in match"}
    end
  end
end

def advance(round, results) do
  winners = Enum.map(round, fn match ->
    case Map.fetch(results, match.id) do
      {:ok, winner} -> elem(report(match, winner), 1)
      :error -> nil
    end
  end)
  if Enum.any?(winners, &is_nil/1), do: {:waiting, round}, else: {:ok, pair(winners, [])}
end

def status(round) do
  labels = Enum.map(round, fn match ->
    %Label{name: match.id, value: match.left.rating + match.right.rating}
  end)
  order(labels)
end

def order(labels), do: Enum.sort_by(labels, fn label -> label.name end)

def champion([%{left: player, right: nil}]), do: player
def champion(_round), do: nil

defp pair([], matches), do: Enum.reverse(matches)
defp pair([player], matches), do: pair([], [%{id: player.name, left: player, right: nil} | matches])
defp pair([left, right | rest], matches) do
  match = %{id: left.name <> "-" <> right.name, left: left, right: right}
  pair(rest, [match | matches])
end
