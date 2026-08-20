RETRYABLE = {408, 429, 500, 502, 503, 504}
FATAL = {400, 401, 403, 404, 422}
DEFAULT_BACKOFF = 2.5
MAX_BACKOFF = 60.0


def classify(status):
    if status in RETRYABLE:
        return "retry"
    if status in FATAL:
        return "abort"
    if status >= 500:
        return "retry"
    return "abort"


def backoff_for(attempt):
    delay = DEFAULT_BACKOFF

    for _ in range(attempt):
        delay = delay * 2
        if delay >= MAX_BACKOFF:
            return MAX_BACKOFF

    return delay
