import numpy as np
import pytest

from embedding_bench.embedding.similarity import cosine_similarity

V1 = np.array([1.0, 0.0, 0.0], dtype=np.float32)
V2 = np.array([0.9, 0.1, 0.0], dtype=np.float32)
V3 = np.array([0.0, 1.0, 0.0], dtype=np.float32)
V4 = np.array([0.0, 0.95, 0.05], dtype=np.float32)


@pytest.mark.parametrize(
    ("a", "b", "expected"),
    [
        (V1, V2, 0.9938837),
        (V1, V3, 0.0),
        (V1, V4, 0.0),
        (V2, V3, 0.1104315),
        (V2, V4, 0.1102788),
        (V3, V4, 0.9986178),
    ],
)
def test_computes_cosine_similarity(
    a: np.ndarray, b: np.ndarray, expected: float
) -> None:
    assert cosine_similarity(a, b) == pytest.approx(expected)
