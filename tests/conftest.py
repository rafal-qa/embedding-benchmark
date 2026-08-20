from pathlib import Path

import pytest

FIXTURES_DIR = Path(__file__).parent / "fixtures"


@pytest.fixture
def cases_dir() -> Path:
    return FIXTURES_DIR / "cases"


@pytest.fixture
def config_dir() -> Path:
    return FIXTURES_DIR / "config"
