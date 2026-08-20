from dataclasses import dataclass
from pathlib import Path

import yaml


@dataclass(frozen=True)
class Pair:
    id: str
    text_a: str
    text_b: str


@dataclass(frozen=True)
class Case:
    id: str
    description: str
    pairs: list[Pair]


def load_case(case_id: str, cases_dir: Path) -> Case:
    case_dir = cases_dir / case_id
    data = yaml.safe_load((case_dir / "case.yaml").read_text())

    pairs = []
    for entry in data["pairs"]:
        pair_id = entry["id"]
        text_a = _find_pair_file(case_dir, pair_id, "a").read_text()
        text_b = _find_pair_file(case_dir, pair_id, "b").read_text()
        pairs.append(Pair(id=pair_id, text_a=text_a, text_b=text_b))

    return Case(
        id=case_id,
        description=data["description"],
        pairs=pairs,
    )


def _find_pair_file(case_dir: Path, pair_id: str, side: str) -> Path:
    matches = sorted(case_dir.glob(f"{pair_id}_{side}.*"))
    if not matches:
        raise FileNotFoundError(f"No file {pair_id}_{side}.* in {case_dir}")
    if len(matches) > 1:
        raise ValueError(
            f"Multiple files match {pair_id}_{side}.* in {case_dir}: {matches}"
        )
    return matches[0]
