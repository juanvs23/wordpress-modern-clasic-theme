#!/usr/bin/env bash
# Watcher simple: ejecuta el extractor PHP en intervalo (segundos)
# Uso: ./tools/watch-extract.sh [interval_seconds]

INTERVAL=${1:-5}
THEME_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$THEME_DIR"

echo "Starting tailwind extractor watcher (interval=${INTERVAL}s)"
while true; do
  php tools/extract-tailwind-classes.php || echo "Extractor falló"
  sleep "$INTERVAL"
done
