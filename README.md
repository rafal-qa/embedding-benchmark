# Embedding models benchmark for code duplication detection

This is a more technical part of https://rkochanowski.com/article/embedding-benchmark/ sharing source code allowing you to verify and run it yourself. It contains all code snippets and detailed descriptions of all cases.

## Purpose

This benchmark evaluates how well an embedding model detects duplicated code. It focuses on code that does the same thing but is written differently. This is similarity detection, not retrieval.

Models are evaluated on how good they are at separating duplicated code from not duplicated, including adversarial cases.

- High-similarity cases focus on the same behavior, e.g., renamed identifiers, reordered statements, refactored structure, a different algorithm for the same problem, cross-language ports, a plain-English description of what the code does.
- Low-similarity cases focus on different behavior, e.g., shared identifiers, a small shared fragment, the same framework boilerplate, unrelated text.

## Project files

- `config.yaml`: Configuration of models, cases, and comparisons between two related cases (`case_diff`)
- `.env.example`: Template of `.env` file containing environment variables for API keys for providers used in benchmark

## Running

### Embedding

Gets embeddings and calculates cosine similarity for case pairs. Writes `result/similarities.csv` containing similarities for every pair of every case for every model.

```bash
uv run bench embed
```

It supports resume. When interrupted, you can safely re-run to continue. You can also add a new model keeping all previous data unchanged. Models are uniquely identified by `label` property.

### Report

Reads `similarities.csv` and generates `gaps.csv`, `averages.csv`, `deviations.csv`. The order of cases and models is determined by `config.yaml`.

```bash
uv run bench report
```

## Cases

Each case directory contains `case.yaml` with a list of pairs and case description. Each pair has two files: side `a` and `b` as referenced in descriptions.

### High similarity

1. [exact-copy](cases/high/exact-copy) - Exact copies.
2. [formatting](cases/high/formatting) - Exact copies with different formatting, whitespace, or indentation.
3. [lang-similar-syntax](cases/high/lang-similar-syntax) - Same implementation in languages with similar syntax.
4. [lang-different-syntax](cases/high/lang-different-syntax) - Same implementation in languages with different syntax.
5. [renamed-identifiers](cases/high/renamed-identifiers) - Same implementation with different identifier names and the same literals.
6. [different-literals](cases/high/different-literals) - Same implementation with the same identifiers and different literals.
7. [reordered-statements](cases/high/reordered-statements) - Same logic with independent statements reordered.
8. [refactored-structure](cases/high/refactored-structure) - Same logic with refactored structure.
9. [small-addition](cases/high/small-addition) - Same code with one small addition.
10. [small-additions-large](cases/high/small-additions-large) - Larger files with the same code plus several small additions.
11. [different-algorithm](cases/high/different-algorithm) - Same problem solved with a different algorithm.
12. [transpiled](cases/high/transpiled) - TypeScript and its transpiled JavaScript output.
13. [code-and-text](cases/high/code-and-text) - Code and text describing it.

### Low similarity

1. [unrelated](cases/low/unrelated) - Unrelated code in the same language with nothing else shared.
2. [same-identifiers](cases/low/same-identifiers) - Unrelated code with heavily overlapping identifiers.
3. [small-shared-fragment](cases/low/small-shared-fragment) - Different code with one small shared fragment.
4. [small-shared-fragments-large](cases/low/small-shared-fragments-large) - Larger files with different code and several small shared fragments.
5. [same-boilerplate](cases/low/same-boilerplate) - Same boilerplate or scaffolding with different core logic.
6. [code-and-text](cases/low/code-and-text) - Code and unrelated text.
