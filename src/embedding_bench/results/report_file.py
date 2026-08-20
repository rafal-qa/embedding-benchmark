import csv
from pathlib import Path
from typing import NamedTuple

from embedding_bench.results.report import Gap, Report


class ReportFiles(NamedTuple):
    averages: Path
    deviations: Path
    gaps: Path


def write_report(report: Report, files: ReportFiles) -> None:
    _write_grid(files.averages, report.labels, report.cases, report.averages)
    _write_grid(files.deviations, report.labels, report.cases, report.deviations)
    _write_gaps(
        files.gaps,
        report.labels,
        report.gaps,
        report.case_diff_names,
        report.case_diffs,
    )


def _write_grid(
    out_file: Path,
    labels: list[str],
    cases: list[str],
    values: dict[tuple[str, str], float],
) -> None:
    out_file.parent.mkdir(parents=True, exist_ok=True)
    with out_file.open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["case", *labels])
        for case in cases:
            writer.writerow(
                [case, *(values.get((label, case), "") for label in labels)]
            )


def _write_gaps(
    out_file: Path,
    labels: list[str],
    gaps: dict[str, Gap],
    names: list[str],
    case_diffs: dict[tuple[str, str], float],
) -> None:
    out_file.parent.mkdir(parents=True, exist_ok=True)
    with out_file.open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["model", "avg_high", "avg_low", "gap", *names])
        for label in labels:
            if label in gaps:
                gap = gaps[label]
                writer.writerow(
                    [
                        label,
                        gap.avg_high,
                        gap.avg_low,
                        gap.gap,
                        *(case_diffs.get((label, name), "") for name in names),
                    ]
                )
