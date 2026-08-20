@day_seconds 86400

def next_run(last_run, interval_days) do
  last_run + interval_days * @day_seconds
end

def due?(last_run, interval_days, now) do
  now >= next_run(last_run, interval_days)
end

def overdue_by(last_run, interval_days, now) do
  max(now - next_run(last_run, interval_days), 0)
end

def runs_between(last_run, interval_days, from, to) do
  step = interval_days * @day_seconds

  last_run
  |> Stream.iterate(fn moment -> moment + step end)
  |> Stream.drop_while(fn moment -> moment < from end)
  |> Enum.take_while(fn moment -> moment <= to end)
end
