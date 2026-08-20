@dataclass(frozen=True)
class Label:
    name: str
    value: str


class Catalog:
    def __init__(self):
        self.images = []
        self.tags = {}

    def scan(self, paths):
        require_items(paths)

        for path in paths:
            file = Path(path)
            suffix = file.suffix.lower()
            if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
                continue
            width, height = dimensions(file)
            record = {
                "path": str(file),
                "width": width,
                "height": height,
                "orientation": orientation(width, height),
            }
            self.images.append(record)
            self.tags.setdefault(record["orientation"], set()).add(str(file))

    def find(self, minimum_width=0, orientation_name=None):
        matches = (image for image in self.images if image["width"] >= minimum_width)
        if orientation_name:
            matches = (image for image in matches if image["orientation"] == orientation_name)
        return list(matches)


def require_items(items):
    if not items:
        raise ValueError("items cannot be empty")


def sorted_labels(labels):
    return sorted(labels, key=lambda label: (label.name, label.value))


def dimensions(path):
    size = path.stat().st_size
    width = max(1, size % 4096)
    height = max(1, size // width)
    return width, height


def orientation(width, height):
    if width == height:
        return "square"
    return "landscape" if width > height else "portrait"


def label_names(labels):
    return [label.name for label in labels]


def tag_labels(catalog):
    return sorted_labels([Label(name, str(len(paths))) for name, paths in catalog.tags.items()])


def duplicate_groups(catalog):
    groups = {}
    for image in catalog.images:
        signature = (image["width"], image["height"])
        groups.setdefault(signature, []).append(image["path"])
    return {
        signature: sorted(paths)
        for signature, paths in groups.items()
        if len(paths) > 1
    }


def total_pixels(catalog, orientation_name=None):
    images = catalog.images
    if orientation_name is not None:
        images = [image for image in images if image["orientation"] == orientation_name]
    return sum(image["width"] * image["height"] for image in images)


def remove_missing(catalog):
    before = len(catalog.images)
    catalog.images = [image for image in catalog.images if Path(image["path"]).exists()]
    return before - len(catalog.images)
