from pathlib import Path
from unittest.mock import Mock

import numpy as np
import pytest

from embedding_bench.bench.runner import run, run_group
from embedding_bench.cases.loading import load_case
from embedding_bench.config import ModelConfig
from embedding_bench.results.embed_file import Result, ResultKey

MODEL_A = ModelConfig(label="model-a@4", model="test/model-a", dimensions=4)
MODEL_B = ModelConfig(
    label="model-b@8", model="test/model-b", dimensions=8, api_base="http://local"
)

SAME = np.array([1.0, 0.0], dtype=np.float32)
ORTHOGONAL = np.array([0.0, 1.0], dtype=np.float32)
OPPOSITE = np.array([-1.0, 0.0], dtype=np.float32)

HEADER = "label,case,pair,cosine_similarity\n"


def test_builds_a_result_per_pair_from_its_own_texts_and_vectors(
    cases_dir: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    embed_mock = Mock(return_value=[SAME, SAME, SAME, ORTHOGONAL, SAME, OPPOSITE])
    monkeypatch.setattr("embedding_bench.bench.runner.embed", embed_mock)
    cases = [load_case("high/copy", cases_dir), load_case("low/unrelated", cases_dir)]
    copy_01, copy_02 = cases[0].pairs
    (unrelated_01,) = cases[1].pairs

    results = run_group(MODEL_A, cases, done=set())

    embed_mock.assert_called_once_with(
        MODEL_A,
        [
            copy_01.text_a,
            copy_01.text_b,
            copy_02.text_a,
            copy_02.text_b,
            unrelated_01.text_a,
            unrelated_01.text_b,
        ],
    )
    assert results == [
        Result(
            label="model-a@4",
            case="high/copy",
            pair="01",
            cosine_similarity=1.0,
        ),
        Result(
            label="model-a@4",
            case="high/copy",
            pair="02",
            cosine_similarity=0.0,
        ),
        Result(
            label="model-a@4",
            case="low/unrelated",
            pair="01",
            cosine_similarity=-1.0,
        ),
    ]


def test_embeds_only_pairs_missing_from_done(
    cases_dir: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    embed_mock = Mock(return_value=[SAME, ORTHOGONAL])
    monkeypatch.setattr("embedding_bench.bench.runner.embed", embed_mock)
    cases = [load_case("high/copy", cases_dir)]
    copy_02 = cases[0].pairs[1]
    done = {
        ResultKey(label="model-a@4", case="high/copy", pair="01"),
    }

    results = run_group(MODEL_A, cases, done)

    embed_mock.assert_called_once_with(MODEL_A, [copy_02.text_a, copy_02.text_b])
    assert results == [
        Result(
            label="model-a@4",
            case="high/copy",
            pair="02",
            cosine_similarity=0.0,
        )
    ]


def test_skips_embedding_when_every_pair_is_done(
    cases_dir: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    embed_mock = Mock()
    monkeypatch.setattr("embedding_bench.bench.runner.embed", embed_mock)
    cases = [load_case("high/copy", cases_dir)]
    done = {
        ResultKey(label="model-a@4", case="high/copy", pair="01"),
        ResultKey(label="model-a@4", case="high/copy", pair="02"),
    }

    results = run_group(MODEL_A, cases, done)

    embed_mock.assert_not_called()
    assert results == []


def test_writes_results_for_every_model_and_group(
    cases_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    embed_mock = Mock(
        side_effect=[
            [SAME, SAME, SAME, ORTHOGONAL],
            [SAME, OPPOSITE],
            [SAME, SAME, SAME, ORTHOGONAL],
            [SAME, OPPOSITE],
        ]
    )
    monkeypatch.setattr("embedding_bench.bench.runner.embed", embed_mock)
    results_file = tmp_path / "results.csv"

    run(
        models=[MODEL_A, MODEL_B],
        groups=[["high/copy"], ["low/unrelated"]],
        results_file=results_file,
        cases_dir=cases_dir,
    )

    assert results_file.read_text() == HEADER + (
        "model-a@4,high/copy,01,1.0\n"
        "model-a@4,high/copy,02,0.0\n"
        "model-a@4,low/unrelated,01,-1.0\n"
        "model-b@8,high/copy,01,1.0\n"
        "model-b@8,high/copy,02,0.0\n"
        "model-b@8,low/unrelated,01,-1.0\n"
    )
