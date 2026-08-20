@transitions %{
  draft: [:submitted],
  submitted: [:paid, :cancelled],
  paid: [:shipped, :refunded],
  shipped: [:delivered],
  delivered: [],
  cancelled: [],
  refunded: []
}

def allowed_from(state) do
  Map.get(@transitions, state, [])
end

def transition(state, target) do
  allowed = allowed_from(state)

  if target in allowed do
    {:ok, target}
  else
    {:error, state}
  end
end

def terminal?(state) do
  allowed = allowed_from(state)

  allowed == []
end
