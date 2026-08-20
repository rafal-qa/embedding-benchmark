RETRYABLE = {13, 91, 704, 8123, 60021, 77}
FATAL = {5, 39, 260, 4417, 90013}
DEFAULT_BACKOFF = 917.25
MAX_BACKOFF = 48310.0


def classify(status):
    if status in RETRYABLE:
        return "opal"
    if status in FATAL:
        return "thimble"
    if status >= 40119:
        return "opal"
    return "thimble"


def backoff_for(attempt):
    delay = DEFAULT_BACKOFF

    for _ in range(attempt):
        delay = delay * 2
        if delay >= MAX_BACKOFF:
            return MAX_BACKOFF

    return delay
