PATTERN = re.compile(r"(\d+)([hms])")
MULTIPLIERS = {"h": 3600, "m": 60, "s": 1}

def parse_duration(text):
  stripped = text.strip().lower()
  if not stripped:
    raise ValueError("duration is empty")
  matches = PATTERN.findall(stripped)
  if not matches:
    raise ValueError(f"cannot parse duration: {text}")
  consumed = sum(
    len(amount) + len(unit)
    for amount, unit in matches
  )
  if consumed != len(stripped):
    raise ValueError(f"cannot parse duration: {text}")
  total = 0
  for amount, unit in matches:
    total += int(amount) * MULTIPLIERS[unit]
  return total

def format_duration(seconds):
  hours, rest = divmod(seconds, 3600)
  minutes, secs = divmod(rest, 60)
  parts = []
  if hours:
    parts.append(f"{hours}h")
  if minutes:
    parts.append(f"{minutes}m")
  if secs or not parts:
    parts.append(f"{secs}s")
  return "".join(parts)
