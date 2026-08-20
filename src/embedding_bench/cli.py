import argparse
from pathlib import Path

from dotenv import load_dotenv

from embedding_bench.bench.chunk import chunk
from embedding_bench.bench.runner import run
from embedding_bench.config import load_config
from embedding_bench.results.embed_file import load_results
from embedding_bench.results.report import build_report
from embedding_bench.results.report_file import ReportFiles, write_report

PROJECT_ROOT = Path(__file__).resolve().parents[2]
CONFIG_FILE = PROJECT_ROOT / "config.yaml"
CASES_DIR = PROJECT_ROOT / "cases"
RESULT_DIR = PROJECT_ROOT / "result"
SIMILARITIES_FILE = RESULT_DIR / "similarities.csv"
REPORT_FILES = ReportFiles(
    averages=RESULT_DIR / "averages.csv",
    deviations=RESULT_DIR / "deviations.csv",
    gaps=RESULT_DIR / "gaps.csv",
)
CASES_PER_BATCH = 4


def main() -> None:
    parser = argparse.ArgumentParser(prog="bench")
    subparsers = parser.add_subparsers(dest="mode", required=True)
    subparsers.add_parser("embed", help="run the benchmark and store results")
    subparsers.add_parser(
        "report", help="summarize results into average and deviation grids"
    )

    args = parser.parse_args()

    if args.mode == "embed":
        load_dotenv()
        config = load_config(CONFIG_FILE)
        groups = chunk(config.cases, CASES_PER_BATCH)
        run(config.models, groups, SIMILARITIES_FILE, CASES_DIR)
    elif args.mode == "report":
        config = load_config(CONFIG_FILE)
        results = load_results(SIMILARITIES_FILE)
        report = build_report(config, results)
        write_report(report, REPORT_FILES)


if __name__ == "__main__":
    main()
