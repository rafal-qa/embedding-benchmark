from dataclasses import dataclass
from pathlib import Path

import yaml


@dataclass(frozen=True)
class ModelConfig:
    label: str
    model: str
    dimensions: int
    api_base: str | None = None
    gemini2_task: str | None = None
    cohere_input_type: str | None = None
    jina_task: str | None = None


@dataclass(frozen=True)
class CaseDiffConfig:
    name: str
    high: str
    low: str


@dataclass(frozen=True)
class Config:
    models: list[ModelConfig]
    cases: list[str]
    case_diff: list[CaseDiffConfig]


def load_config(path: Path) -> Config:
    data = yaml.safe_load(path.read_text())
    models = [
        ModelConfig(
            label=entry["label"],
            model=entry["model"],
            dimensions=entry["dimensions"],
            api_base=entry.get("api_base"),
            gemini2_task=entry.get("gemini2_task"),
            cohere_input_type=entry.get("cohere_input_type"),
            jina_task=entry.get("jina_task"),
        )
        for entry in data["models"]
    ]
    _validate_unique_labels(models)
    cases = list(data["cases"])
    case_diff = [
        CaseDiffConfig(name=entry["name"], high=entry["high"], low=entry["low"])
        for entry in data["case_diff"]
    ]
    return Config(models=models, cases=cases, case_diff=case_diff)


def _validate_unique_labels(models: list[ModelConfig]) -> None:
    seen = set()
    for model in models:
        if model.label in seen:
            raise ValueError(f"Duplicate model label: {model.label}")
        seen.add(model.label)
