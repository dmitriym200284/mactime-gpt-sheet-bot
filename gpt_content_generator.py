"""Utility placeholder for content generation integrations.

NOTE: this file previously contained RTF-exported text and broke CI linting
with SyntaxError (flake8 E999). Keep this module syntactically valid.
"""

from pathlib import Path


def credentials_exists(path: str = "credentials.json") -> bool:
    """Return True if local credentials file exists."""
    return Path(path).exists()


if __name__ == "__main__":
    print(f"credentials.json found: {credentials_exists()}")
