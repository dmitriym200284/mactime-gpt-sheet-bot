#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8000}"
HOST="${HOST:-0.0.0.0}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Ошибка: python3 не найден. Установите Python 3 и повторите запуск."
  exit 1
fi

echo "Запуск предпросмотра..."
echo "URL: http://localhost:${PORT}"
echo "URL: http://localhost:${PORT}/landing.html"
echo "Остановка: Ctrl+C"

env HOST="$HOST" PORT="$PORT" python3 preview_server.py
