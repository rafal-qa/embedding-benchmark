from collections.abc import Callable
from dataclasses import dataclass
from statistics import mean, pstdev

from embedding_bench.config import CaseDiffConfig, Config
from embedding_bench.results.embed_file import Result

DECIMALS = 4


@dataclass(frozen=True)
class Gap:
    avg_high: float
    avg_low: float
    gap: float


@dataclass(frozen=True)
class Report:
    labels: list[str]
    cases: list[str]
    averages: dict[tuple[str, str], float]
    deviations: dict[tuple[str, str], float]
    gaps: dict[str, Gap]
    case_diffs: dict[tuple[str, str], float]
    case_diff_names: list[str]


def build_report(config: Config, results: list[Result]) -> Report:
    similarities = _group(results)
    labels = [model.label for model in config.models]
    cases = config.cases
    averages = _aggregate_cells(labels, cases, similarities, mean)
    return Report(
        labels=labels,
        cases=cases,
        averages=averages,
        deviations=_aggregate_cells(labels, cases, similarities, pstdev),
        gaps=_gaps(labels, cases, averages),
        case_diffs=_case_diffs(labels, config.case_diff, averages),
        case_diff_names=[diff.name for diff in config.case_diff],
    )


def _group(results: list[Result]) -> dict[tuple[str, str], list[float]]:
    similarities: dict[tuple[str, str], list[float]] = {}
    for result in results:
        key = (result.label, result.case)
        similarities.setdefault(key, []).append(result.cosine_similarity)
    return similarities


def _aggregate_cells(
    labels: list[str],
    cases: list[str],
    similarities: dict[tuple[str, str], list[float]],
    aggregate: Callable[[list[float]], float],
) -> dict[tuple[str, str], float]:
    return {
        (label, case): round(aggregate(values), DECIMALS)
        for label in labels
        for case in cases
        if (values := similarities.get((label, case)))
    }


def _gaps(
    labels: list[str],
    cases: list[str],
    averages: dict[tuple[str, str], float],
) -> dict[str, Gap]:
    high_cases = [case for case in cases if case.startswith("high/")]
    low_cases = [case for case in cases if case.startswith("low/")]
    gaps = {}
    for label in labels:
        high = [averages[(label, c)] for c in high_cases if (label, c) in averages]
        low = [averages[(label, c)] for c in low_cases if (label, c) in averages]
        if high and low:
            avg_high = round(mean(high), DECIMALS)
            avg_low = round(mean(low), DECIMALS)
            gaps[label] = Gap(avg_high, avg_low, round(avg_high - avg_low, DECIMALS))
    return gaps


def _case_diffs(
    labels: list[str],
    case_diff: list[CaseDiffConfig],
    averages: dict[tuple[str, str], float],
) -> dict[tuple[str, str], float]:
    diffs = {}
    for label in labels:
        for diff in case_diff:
            high = averages.get((label, diff.high))
            low = averages.get((label, diff.low))
            if high is not None and low is not None:
                diffs[(label, diff.name)] = round(high - low, DECIMALS)
    return diffs
