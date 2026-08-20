def insert(nil, value), do: %{value: value, left: nil, right: nil}

def insert(%{value: current} = node, value) when value < current do
  %{node | left: insert(node.left, value)}
end

def insert(%{value: current} = node, value) when value > current do
  %{node | right: insert(node.right, value)}
end

def insert(node, _duplicate), do: node

def from(values) do
  Enum.reduce(values, nil, fn value, tree -> insert(tree, value) end)
end

def count(nil), do: 0

def count(node) do
  1 + count(node.left) + count(node.right)
end

def in_order(nil), do: []

def in_order(node) do
  in_order(node.left) ++ [node.value] ++ in_order(node.right)
end
