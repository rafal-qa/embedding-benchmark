@transitions %{
  draft: [:submitted],
  submitted: [:paid, :cancelled],
  paid: [:shipped, :refunded],
  shipped: [:delivered],
  delivered: [],
  cancelled: [],
  refunded: []
}

def transition(state, target) do
  allowed = Map.get(@transitions, state, [])

  if target in allowed do
    {:ok, target}
  else
    {:error, state}
  end
end

def terminal?(state) do
  allowed = Map.get(@transitions, state, [])
  empty = allowed == []

  empty
end
