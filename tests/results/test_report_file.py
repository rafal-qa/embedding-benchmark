from pathlib import Path

from embedding_bench.results.report import Gap, Report
from embedding_bench.results.report_file import ReportFiles, write_report


def test_writes_averages_deviations_gaps_and_case_diffs(tmp_path: Path) -> None:
    report = Report(
        labels=["m1", "m2"],
        cases=["high/a", "low/b"],
        averages={
            ("m1", "high/a"): 0.8,
            ("m2", "high/a"): 0.9,
            ("m1", "low/b"): 0.3,
            ("m2", "low/b"): 0.6,
        },
        deviations={
            ("m1", "high/a"): 0.1,
            ("m2", "high/a"): 0.2,
            ("m1", "low/b"): 0.3,
            ("m2", "low/b"): 0.4,
        },
        gaps={
            "m1": Gap(avg_high=0.8, avg_low=0.3, gap=0.5),
            "m2": Gap(avg_high=0.9, avg_low=0.6, gap=0.3),
        },
        case_diffs={("m1", "a-vs-b"): 0.5, ("m2", "a-vs-b"): 0.3},
        case_diff_names=["a-vs-b"],
    )
    files = ReportFiles(
        averages=tmp_path / "averages.csv",
        deviations=tmp_path / "deviations.csv",
        gaps=tmp_path / "gaps.csv",
    )

    write_report(report, files)

    assert files.averages.read_text() == "case,m1,m2\nhigh/a,0.8,0.9\nlow/b,0.3,0.6\n"
    assert files.deviations.read_text() == "case,m1,m2\nhigh/a,0.1,0.2\nlow/b,0.3,0.4\n"
    assert files.gaps.read_text() == (
        "model,avg_high,avg_low,gap,a-vs-b\nm1,0.8,0.3,0.5,0.5\nm2,0.9,0.6,0.3,0.3\n"
    )
