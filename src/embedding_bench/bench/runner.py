from pathlib import Path

from embedding_bench.cases.loading import Case, load_case
from embedding_bench.config import ModelConfig
from embedding_bench.embedding.embed import embed
from embedding_bench.embedding.similarity import cosine_similarity
from embedding_bench.results.embed_file import (
    Result,
    ResultKey,
    ResultsWriter,
    load_done,
)


def run(
    models: list[ModelConfig],
    groups: list[list[str]],
    results_file: Path,
    cases_dir: Path,
) -> None:
    done = load_done(results_file)

    with ResultsWriter(results_file) as writer:
        for model_cfg in models:
            for group in groups:
                cases = [load_case(case_id, cases_dir) for case_id in group]
                writer.write(run_group(model_cfg, cases, done))

    print("done")


def run_group(
    model_cfg: ModelConfig,
    cases: list[Case],
    done: set[ResultKey],
) -> list[Result]:
    todo = []
    texts = []
    for case in cases:
        for pair in case.pairs:
            key = ResultKey(
                label=model_cfg.label,
                case=case.id,
                pair=pair.id,
            )
            if key in done:
                continue
            todo.append((case, pair))
            texts.append(pair.text_a)
            texts.append(pair.text_b)

    if not todo:
        return []

    vectors = embed(model_cfg, texts)
    print(".", end="", flush=True)

    results = []
    for i, (case, pair) in enumerate(todo):
        vec_a = vectors[2 * i]
        vec_b = vectors[2 * i + 1]
        results.append(
            Result(
                label=model_cfg.label,
                case=case.id,
                pair=pair.id,
                cosine_similarity=cosine_similarity(vec_a, vec_b),
            )
        )
    return results
