class ConfigError(Exception):
    pass


def parse_config(text, defaults=None):
    sections = {}
    current = "default"
    sections[current] = {}

    for raw_line in text.splitlines():
        line = raw_line.strip()

        if not line:
            continue

        if line.startswith("#") or line.startswith(";"):
            continue

        if line.startswith("[") and line.endswith("]"):
            current = line[1:-1].strip().lower()

            if not current:
                raise ConfigError("empty section name")

            if current not in sections:
                sections[current] = {}

            continue

        if "=" not in line:
            raise ConfigError("missing separator")

        key, value = line.split("=", 1)
        key = key.strip().lower()

        if not key:
            raise ConfigError("empty key")

        sections[current][key] = coerce_value(value.strip())

    if defaults:
        apply_defaults(sections, defaults)

    resolve_references(sections)

    return sections


def coerce_value(value):
    lowered = value.lower()

    if lowered in ("true", "yes", "on"):
        return True

    if lowered in ("false", "no", "off"):
        return False

    if lowered in ("none", "null"):
        return None

    if value.startswith('"') and value.endswith('"'):
        return value[1:-1]

    try:
        return int(value)
    except ValueError:
        pass

    try:
        return float(value)
    except ValueError:
        pass

    if "," in value:
        return [part.strip() for part in value.split(",") if part.strip()]

    return value


def apply_defaults(sections, defaults):
    for name, values in defaults.items():
        target = sections.setdefault(name, {})

        for key, value in values.items():
            if key not in target:
                target[key] = value


def resolve_references(sections):
    for name, values in sections.items():
        for key, value in list(values.items()):
            if not isinstance(value, str):
                continue

            values[key] = expand(value, sections, name)


def expand(value, sections, name):
    result = value
    guard = 0

    while "${" in result and guard < 10:
        start = result.index("${")
        end = result.find("}", start)

        if end == -1:
            break

        token = result[start + 2:end]
        result = result[:start] + lookup(token, sections, name) + result[end + 1:]
        guard += 1

    return result


def lookup(token, sections, name):
    if "." in token:
        section, key = token.split(".", 1)
    else:
        section, key = name, token

    found = sections.get(section.strip().lower(), {}).get(key.strip().lower())

    if found is None:
        return ""

    return str(found)
