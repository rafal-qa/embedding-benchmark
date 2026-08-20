def make(text) do
  text
  |> String.downcase()
  |> String.replace(~r/[^a-z0-9]+/, "-")
  |> String.trim("-")
end

def valid?(slug) do
  slug =~ ~r/^[a-z0-9]+(-[a-z0-9]+)*$/
end
