#!/usr/bin/env bash
# process-terrain-maps.sh
#
# Strips white backgrounds from AI-generated terrain map PNGs using
# corner floodfill so the 3D model floats cleanly on dark pages.
#
# Usage:
#   ./scripts/process-terrain-maps.sh               # process all new maps
#   ./scripts/process-terrain-maps.sh --force       # re-process everything
#
# Output: <name>-nobg.png alongside each source file.
# After running, update the import in artifacts/gory-resort/src/data/countries.ts
# to point at the -nobg.png file.

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSET_DIR="$DIR/../attached_assets/generated_images"
FUZZ="${FUZZ:-5}"          # colour tolerance % — raise if white bg bleeds through
FORCE=false

for arg in "$@"; do
  [[ "$arg" == "--force" ]] && FORCE=true
done

if ! command -v magick &>/dev/null; then
  echo "❌  ImageMagick 7 (magick) not found. Install it first." >&2
  exit 1
fi

processed=0
skipped=0
failed=0

for src in "$ASSET_DIR"/terrain-map-*.png; do
  # skip files that are already -nobg outputs
  [[ "$src" == *-nobg.png ]] && continue

  base="${src%.png}"
  out="${base}-nobg.png"

  if [[ -f "$out" && "$FORCE" == false ]]; then
    echo "  skip  $(basename "$src")  ($(basename "$out") already exists)"
    (( ++skipped ))
    continue
  fi

  # detect dimensions so corners work on any image size
  width=$(magick identify -format "%w" "$src")
  height=$(magick identify -format "%h" "$src")
  max_w=$(( width  - 1 ))
  max_h=$(( height - 1 ))

  echo -n "  proc  $(basename "$src")  (${width}×${height}) → "

  if magick "$src" \
      -fuzz "${FUZZ}%" \
      -draw "color 0,0 floodfill" \
      -draw "color 0,${max_h} floodfill" \
      -draw "color ${max_w},0 floodfill" \
      -draw "color ${max_w},${max_h} floodfill" \
      "$out" 2>/dev/null; then
    echo "$(basename "$out")"
    (( ++processed ))
  else
    echo "FAILED"
    (( ++failed )) || true
  fi
done

echo ""
echo "Done — processed: $processed  skipped: $skipped  failed: $failed"

if (( processed > 0 )); then
  echo ""
  echo "Next step: update artifacts/gory-resort/src/data/countries.ts"
  echo "  Change each new mapImage import to point at the -nobg.png variant."
fi

if (( failed > 0 )); then
  exit 1
fi
