def merge(defaults, overrides) do
  Keyword.merge(defaults, overrides, fn _key, left, right ->
    pick(left, right)
  end)
end

defp pick(left, right) when is_list(left) and is_list(right) do
  merge(left, right)
end

defp pick(_left, right) when is_nil(right), do: nil

defp pick(_left, right), do: right

def take(options, allowed) do
  Enum.filter(options, fn {key, _value} -> key in allowed end)
end

def require!(options, keys) do
  missing = Enum.reject(keys, fn key -> Keyword.has_key?(options, key) end)

  case missing do
    [] -> {:ok, options}
    names -> {:error, names}
  end
end
