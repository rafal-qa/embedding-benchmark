import numpy as np

from embedding_bench.config import ModelConfig


def embed(
    model_cfg: ModelConfig,
    texts: list[str],
) -> list[np.ndarray]:
    import litellm

    if model_cfg.gemini2_task is not None:
        texts = [f"task: {model_cfg.gemini2_task} | query: {text}" for text in texts]

    response = litellm.embedding(
        model=model_cfg.model,
        input=texts,
        dimensions=model_cfg.dimensions,
        api_base=model_cfg.api_base,
        input_type=model_cfg.cohere_input_type,
        task=model_cfg.jina_task,
    )
    data = sorted(response.data, key=lambda item: item["index"])
    vectors = [np.array(item["embedding"], dtype=np.float32) for item in data]
    for vector in vectors:
        if len(vector) != model_cfg.dimensions:
            raise ValueError(
                f"{model_cfg.label}: expected {model_cfg.dimensions} dimensions, "
                f"got {len(vector)}"
            )
    return vectors
