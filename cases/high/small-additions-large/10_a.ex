defstruct state: :draft, history: [], guards: %{}

@transitions %{
  draft: [submit: :review],
  review: [approve: :approved, reject: :draft],
  approved: [publish: :live, archive: :closed],
  live: [archive: :closed],
  closed: []
}

def new(guards \\ %{}) do
  %Workflow{guards: guards}
end

def allowed(%Workflow{state: state}) do
  @transitions
  |> Map.get(state, [])
  |> Enum.map(fn {event, _next} -> event end)
end

def can?(%Workflow{state: state} = flow, event) do
  case lookup(state, event) do
    nil -> false
    _next -> guard_passes?(flow, event)
  end
end

def fire(%Workflow{state: state} = flow, event, payload \\ %{}) do
  case lookup(state, event) do
    nil ->
      {:error, :unknown_event, flow}

    next ->
      apply_transition(flow, event, next, payload)
  end
end

def fire_all(flow, events) do
  Enum.reduce(events, {:ok, flow}, fn event, acc ->
    case acc do
      {:ok, current} -> normalize(fire(current, event))
      other -> other
    end
  end)
end

def history(%Workflow{history: history}) do
  Enum.reverse(history)
end

def rewind(%Workflow{history: []} = flow) do
  {:error, :empty, flow}
end

def rewind(%Workflow{history: [last | rest]} = flow) do
  {:ok, %Workflow{flow | state: last.from, history: rest}}
end

defp apply_transition(flow, event, next, payload) do
  if guard_passes?(flow, event) do
    record = %{event: event, from: flow.state, to: next, payload: payload}

    {:ok, %Workflow{flow | state: next, history: [record | flow.history]}}
  else
    {:error, :blocked, flow}
  end
end

defp guard_passes?(%Workflow{guards: guards} = flow, event) do
  case Map.get(guards, event) do
    nil -> true
    check -> check.(flow)
  end
end

defp lookup(state, event) do
  @transitions
  |> Map.get(state, [])
  |> Keyword.get(event)
end

defp normalize({:ok, flow}), do: {:ok, flow}
defp normalize({:error, reason, flow}), do: {:error, reason, flow}
