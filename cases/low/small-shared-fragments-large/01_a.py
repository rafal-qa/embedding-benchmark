@dataclass(frozen=True)
class Label:
    name: str
    value: str


class DependencyError(Exception):
    pass


def require_items(items):
    if not items:
        raise ValueError("items cannot be empty")


def resolve(packages, requested):
    require_items(packages)

    selected = {}
    visiting = set()

    def visit(name, parent=None):
        if name in visiting:
            raise DependencyError(f"cycle at {name}")
        if name in selected:
            return
        package = packages.get(name)
        if package is None:
            raise DependencyError(f"missing {name} required by {parent}")
        visiting.add(name)
        for dependency in package.get("requires", []):
            visit(dependency, name)
        visiting.remove(name)
        selected[name] = package["version"]

    for name in requested:
        visit(name)
    return selected


def sorted_labels(labels):
    return sorted(labels, key=lambda label: (label.name, label.value))


def label_names(labels):
    return [label.name for label in labels]


def installation_order(packages, requested):
    resolved = resolve(packages, requested)
    return label_names(sorted_labels([Label(name, version) for name, version in resolved.items()]))


def reverse_dependencies(packages):
    result = {name: [] for name in packages}
    for name, package in packages.items():
        for dependency in package.get("requires", []):
            result.setdefault(dependency, []).append(name)
    return {name: sorted(users) for name, users in result.items()}


def removable(packages, installed, targets):
    reverse = reverse_dependencies(packages)
    candidates = set(targets)
    changed = True
    while changed:
        changed = False
        for name in list(candidates):
            users = set(reverse.get(name, [])) & set(installed)
            if users - candidates:
                candidates.remove(name)
                changed = True
    return sorted(candidates)


def conflicts(packages, selected):
    found = []
    for name in selected:
        for blocked in packages[name].get("conflicts", []):
            if blocked in selected:
                found.append(tuple(sorted((name, blocked))))
    return sorted(set(found))
