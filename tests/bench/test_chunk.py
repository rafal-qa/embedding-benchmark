from embedding_bench.bench.chunk import chunk


def test_splits_into_groups_of_given_size() -> None:
    assert chunk(["a", "b", "c", "d"], 2) == [["a", "b"], ["c", "d"]]


def test_last_group_holds_the_remainder() -> None:
    assert chunk(["a", "b", "c"], 2) == [["a", "b"], ["c"]]


def test_empty_input_produces_no_groups() -> None:
    assert chunk([], 2) == []
