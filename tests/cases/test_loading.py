from pathlib import Path

import pytest

from embedding_bench.cases.loading import Case, Pair, load_case


def test_loads_pair_texts_regardless_of_file_extension(cases_dir: Path) -> None:
    case = load_case("low/unrelated", cases_dir)

    assert case == Case(
        id="low/unrelated",
        description="Unrelated code in different languages",
        pairs=[
            Pair(
                id="01",
                text_a="def add(a, b):\n    return a + b\n",
                text_b=(
                    "func handle(w http.ResponseWriter, r *http.Request) {\n"
                    "\tw.WriteHeader(200)\n}\n"
                ),
            )
        ],
    )


def test_rejects_pair_without_matching_b_file(cases_dir: Path) -> None:
    with pytest.raises(FileNotFoundError):
        load_case("broken/missing-side", cases_dir)
