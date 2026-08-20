def change(plans, target) do
  for {plan, level} <- Enum.with_index(plans) do
    for {enabled, account} <- Enum.with_index(plan) do
      active(enabled, target.(plans, level, account))
    end
  end
end

def active(_enabled, 3), do: true
def active(true, 2), do: true
def active(_enabled, _account), do: false
