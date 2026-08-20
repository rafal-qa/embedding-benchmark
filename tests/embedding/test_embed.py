from types import SimpleNamespace
from unittest.mock import Mock

import numpy as np
import pytest

from embedding_bench.config import ModelConfig
from embedding_bench.embedding.embed import embed


def test_requests_configured_embeddings_in_response_order(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    embedding_mock = Mock(
        return_value=SimpleNamespace(
            data=[
                {"index": 1, "embedding": [0.0, 1.0]},
                {"index": 0, "embedding": [1.0, 0.0]},
            ]
        )
    )
    monkeypatch.setattr("litellm.embedding", embedding_mock)
    model_cfg = ModelConfig(
        label="model@2", model="test/model", dimensions=2, api_base="http://local"
    )

    vectors = embed(model_cfg, ["first", "second"])

    embedding_mock.assert_called_once_with(
        model="test/model",
        input=["first", "second"],
        dimensions=2,
        api_base="http://local",
        input_type=None,
        task=None,
    )
    np.testing.assert_array_equal(
        vectors,
        np.array([[1.0, 0.0], [0.0, 1.0]], dtype=np.float32),
    )


def test_prefixes_input_with_gemini2_task(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    embedding_mock = Mock(
        return_value=SimpleNamespace(data=[{"index": 0, "embedding": [1.0, 0.0]}])
    )
    monkeypatch.setattr("litellm.embedding", embedding_mock)
    model_cfg = ModelConfig(
        label="model@2",
        model="test/model",
        dimensions=2,
        gemini2_task="sentence similarity",
    )

    embed(model_cfg, ["first"])

    assert embedding_mock.call_args.kwargs["input"] == [
        "task: sentence similarity | query: first"
    ]


def test_passes_jina_task(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    embedding_mock = Mock(
        return_value=SimpleNamespace(data=[{"index": 0, "embedding": [1.0, 0.0]}])
    )
    monkeypatch.setattr("litellm.embedding", embedding_mock)
    model_cfg = ModelConfig(
        label="model@2",
        model="test/model",
        dimensions=2,
        jina_task="code2code.query",
    )

    embed(model_cfg, ["first"])

    assert embedding_mock.call_args.kwargs["task"] == "code2code.query"


def test_rejects_vector_with_unexpected_dimensions(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    embedding_mock = Mock(
        return_value=SimpleNamespace(data=[{"index": 0, "embedding": [1.0, 0.0, 0.0]}])
    )
    monkeypatch.setattr("litellm.embedding", embedding_mock)
    model_cfg = ModelConfig(label="model@2", model="test/model", dimensions=2)

    with pytest.raises(ValueError, match="model@2"):
        embed(model_cfg, ["first"])
