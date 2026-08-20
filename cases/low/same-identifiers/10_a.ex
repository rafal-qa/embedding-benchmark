def change(plans, account, target) do
  Enum.map(plans, fn plan ->
    if plan.account == account do
      %{plan | level: target, changed: true}
    else
      plan
    end
  end)
end

def active(plans) do
  plans
  |> Enum.filter(fn plan -> plan.enabled end)
  |> Enum.map(fn plan -> plan.account end)
end
