def tally(ballots) do
  ballots
  |> Enum.reduce(%{}, fn ballot, counts ->
    ballot
    |> Enum.uniq()
    |> Enum.reduce(counts, fn candidate, totals ->
      Map.update(totals, normalize(candidate), 1, &(&1 + 1))
    end)
  end)
  |> Enum.sort_by(fn {candidate, votes} -> {-votes, candidate} end)
end

def normalize(value), do: String.trim(value)
