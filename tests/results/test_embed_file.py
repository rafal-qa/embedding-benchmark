from dataclasses import replace
from pathlib import Path

from embedding_bench.results.embed_file import (
    Result,
    ResultKey,
    ResultsWriter,
    load_done,
    load_results,
)

HEADER = "label,case,pair,cosine_similarity\n"

RESULT = Result(
    label="model-a@256",
    case="high/copy",
    pair="01",
    cosine_similarity=1.0,
)

RESULT_ROW = "model-a@256,high/copy,01,1.0\n"


def test_no_work_is_done_when_results_file_is_missing(tmp_path: Path) -> None:
    assert load_done(tmp_path / "missing.csv") == set()


def test_reads_completed_model_case_pair_keys(tmp_path: Path) -> None:
    results_file = tmp_path / "results.csv"
    results_file.write_text(HEADER + RESULT_ROW + "model-b@256,low/unrelated,02,0.1\n")

    assert load_done(results_file) == {
        ResultKey(label="model-a@256", case="high/copy", pair="01"),
        ResultKey(label="model-b@256", case="low/unrelated", pair="02"),
    }


def test_reads_each_row_into_a_result(tmp_path: Path) -> None:
    results_file = tmp_path / "results.csv"
    results_file.write_text(HEADER + RESULT_ROW + "model-b@256,low/unrelated,02,0.1\n")

    assert load_results(results_file) == [
        RESULT,
        Result(
            label="model-b@256",
            case="low/unrelated",
            pair="02",
            cosine_similarity=0.1,
        ),
    ]


def test_new_results_file_starts_with_a_header(tmp_path: Path) -> None:
    results_file = tmp_path / "results" / "results.csv"

    with ResultsWriter(results_file) as writer:
        writer.write([RESULT])

    assert results_file.read_text() == HEADER + RESULT_ROW


def test_empty_results_file_gets_a_header(tmp_path: Path) -> None:
    results_file = tmp_path / "results.csv"
    results_file.touch()

    with ResultsWriter(results_file) as writer:
        writer.write([RESULT])

    assert results_file.read_text() == HEADER + RESULT_ROW


def test_appending_to_existing_results_keeps_one_header(tmp_path: Path) -> None:
    results_file = tmp_path / "results.csv"
    results_file.write_text(HEADER + RESULT_ROW)

    with ResultsWriter(results_file) as writer:
        writer.write([replace(RESULT, pair="02")])

    assert results_file.read_text() == (
        HEADER + RESULT_ROW + "model-a@256,high/copy,02,1.0\n"
    )
