import csv
from dataclasses import asdict, dataclass, fields
from pathlib import Path
from types import TracebackType
from typing import IO, NamedTuple, Self


@dataclass(frozen=True)
class Result:
    label: str
    case: str
    pair: str
    cosine_similarity: float


class ResultKey(NamedTuple):
    label: str
    case: str
    pair: str


FIELDNAMES = [field.name for field in fields(Result)]


def load_results(results_file: Path) -> list[Result]:
    with results_file.open(newline="") as f:
        return [
            Result(
                label=row["label"],
                case=row["case"],
                pair=row["pair"],
                cosine_similarity=float(row["cosine_similarity"]),
            )
            for row in csv.DictReader(f)
        ]


def load_done(results_file: Path) -> set[ResultKey]:
    if not results_file.exists():
        return set()
    with results_file.open(newline="") as f:
        return {
            ResultKey(
                label=row["label"],
                case=row["case"],
                pair=row["pair"],
            )
            for row in csv.DictReader(f)
        }


class ResultsWriter:
    def __init__(self, results_file: Path) -> None:
        self._results_file = results_file
        self._file: IO[str] | None = None
        self._writer: csv.DictWriter | None = None

    def __enter__(self) -> Self:
        self._results_file.parent.mkdir(parents=True, exist_ok=True)
        write_header = (
            not self._results_file.exists() or self._results_file.stat().st_size == 0
        )
        self._file = self._results_file.open("a", newline="")
        self._writer = csv.DictWriter(self._file, fieldnames=FIELDNAMES)
        if write_header:
            self._writer.writeheader()
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        if self._file is not None:
            self._file.close()
            self._file = None
            self._writer = None

    def write(self, results: list[Result]) -> None:
        if self._writer is None or self._file is None:
            raise RuntimeError("ResultsWriter must be used as a context manager")
        for result in results:
            self._writer.writerow(asdict(result))
        self._file.flush()
