from pathlib import Path

import pytest

from embedding_bench.config import CaseDiffConfig, Config, ModelConfig, load_config


def test_reads_models_and_cases(config_dir: Path) -> None:
    config = load_config(config_dir / "full.yaml")

    assert config == Config(
        models=[
            ModelConfig(
                label="model-a@256",
                model="test/model-a",
                dimensions=256,
                api_base=None,
            ),
            ModelConfig(
                label="model-b@512",
                model="test/model-b",
                dimensions=512,
                api_base="http://localhost:1234",
            ),
        ],
        cases=["high/copy", "low/unrelated"],
        case_diff=[
            CaseDiffConfig(
                name="copy-vs-unrelated", high="high/copy", low="low/unrelated"
            )
        ],
    )


def test_rejects_duplicate_model_labels(config_dir: Path) -> None:
    with pytest.raises(ValueError, match="shared"):
        load_config(config_dir / "duplicate-labels.yaml")
