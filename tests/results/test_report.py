from embedding_bench.config import CaseDiffConfig, Config, ModelConfig
from embedding_bench.results.embed_file import Result
from embedding_bench.results.report import Gap, Report, build_report


def test_computes_averages_deviations_gaps_and_case_diffs() -> None:
    label = "m@256"
    high, low = "high/a", "low/b"
    config = Config(
        models=[ModelConfig(label=label, model="test/m", dimensions=4)],
        cases=[high, low],
        case_diff=[CaseDiffConfig(name="a-vs-b", high=high, low=low)],
    )
    results = [
        Result(label=label, case=high, pair="01", cosine_similarity=0.9),
        Result(label=label, case=high, pair="02", cosine_similarity=0.7),
        Result(label=label, case=low, pair="01", cosine_similarity=0.2),
        Result(label=label, case=low, pair="02", cosine_similarity=0.4),
    ]

    report = build_report(config, results)

    assert report == Report(
        labels=[label],
        cases=[high, low],
        averages={(label, high): 0.8, (label, low): 0.3},
        deviations={(label, high): 0.1, (label, low): 0.1},
        gaps={label: Gap(avg_high=0.8, avg_low=0.3, gap=0.5)},
        case_diffs={(label, "a-vs-b"): 0.5},
        case_diff_names=["a-vs-b"],
    )


def test_orders_labels_and_cases_by_config() -> None:
    label1, label2 = "m1", "m2"
    case1, case2 = "high/b", "high/a"
    config = Config(
        models=[
            ModelConfig(label=label1, model="test/m", dimensions=4),
            ModelConfig(label=label2, model="test/m", dimensions=4),
        ],
        cases=[case1, case2],
        case_diff=[],
    )
    results = [
        Result(label=label2, case=case2, pair="01", cosine_similarity=0.5),
        Result(label=label1, case=case1, pair="01", cosine_similarity=0.5),
        Result(label=label1, case=case2, pair="01", cosine_similarity=0.5),
        Result(label=label2, case=case1, pair="01", cosine_similarity=0.5),
    ]

    report = build_report(config, results)

    assert report.labels == [label1, label2]
    assert report.cases == [case1, case2]


def test_skips_cells_without_data() -> None:
    label = "m"
    case = "high/a"
    config = Config(
        models=[ModelConfig(label=label, model="test/m", dimensions=4)],
        cases=[case, "low/missing"],
        case_diff=[],
    )
    results = [Result(label=label, case=case, pair="01", cosine_similarity=0.8)]

    report = build_report(config, results)

    assert report.averages == {(label, case): 0.8}
