#!/usr/bin/env bash
# Packages the full design-system (all themes, all components) into a tar.gz
# archive ready to drop into a new project.
#
# Usage:
#   ./export-theme.sh
#
# The archive includes every theme found in src/styles/themes/.
# The default theme applied on first load is "northern-lights".

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEMES_DIR="$SCRIPT_DIR/src/styles/themes"
DEFAULT_THEME="northern-lights"

# ── Discover available themes ─────────────────────────────────────────────────
mapfile -t THEME_FILES < <(find "$THEMES_DIR" -maxdepth 1 -name "*.css" | sort)

if [[ ${#THEME_FILES[@]} -eq 0 ]]; then
  echo "No themes found in $THEMES_DIR" >&2
  exit 1
fi

declare -a THEME_NAMES
for f in "${THEME_FILES[@]}"; do
  THEME_NAMES+=("$(basename "$f" .css)")
done

echo "Exporting design system with ${#THEME_NAMES[@]} theme(s): ${THEME_NAMES[*]}"
echo "Default theme: $DEFAULT_THEME"

# ── Assemble files in a temp directory ───────────────────────────────────────
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

ROOT="$WORKDIR/design-system"

mkdir -p \
  "$ROOT/src/styles/themes" \
  "$ROOT/src/components/ui" \
  "$ROOT/src/hooks" \
  "$ROOT/src/lib"

# 1. All theme CSS files
for f in "${THEME_FILES[@]}"; do
  cp "$f" "$ROOT/src/styles/themes/"
done

# 2. theme.css — copy as-is (already imports all themes)
cp "$SCRIPT_DIR/src/styles/theme.css" "$ROOT/src/styles/theme.css"

# 3. shadcn/ui component files
cp "$SCRIPT_DIR"/src/components/ui/*.tsx "$ROOT/src/components/ui/"

# 3b. custom components (if any)
if compgen -G "$SCRIPT_DIR/src/components/ui/custom/*.tsx" > /dev/null 2>&1; then
  mkdir -p "$ROOT/src/components/ui/custom"
  cp "$SCRIPT_DIR"/src/components/ui/custom/*.tsx "$ROOT/src/components/ui/custom/"
fi

# 3c. hooks (e.g. use-mobile, required by sidebar)
if compgen -G "$SCRIPT_DIR/src/hooks/*.tsx" > /dev/null 2>&1; then
  cp "$SCRIPT_DIR"/src/hooks/*.tsx "$ROOT/src/hooks/"
fi

# 4. lib/utils.ts — cn helper
cp "$SCRIPT_DIR/src/lib/utils.ts" "$ROOT/src/lib/"

# 5. lib/themes.ts — all themes, unchanged
cp "$SCRIPT_DIR/src/lib/themes.ts" "$ROOT/src/lib/"

# 6. Patch themes.ts to set the default theme
python3 - "$ROOT/src/lib/themes.ts" "$DEFAULT_THEME" <<'PYEOF'
import sys, re

path, default_theme = sys.argv[1], sys.argv[2]
with open(path) as f:
    content = f.read()

# Remove any existing defaultTheme export
content = re.sub(r'\nexport const defaultTheme.*\n', '\n', content)

# Append defaultTheme export before the last line (or at end)
content = content.rstrip('\n') + f'\n\nexport const defaultTheme = "{default_theme}";\n'

with open(path, 'w') as f:
    f.write(content)
PYEOF

# 7. agent-context.md (usage instructions, if present)
[[ -f "$SCRIPT_DIR/agent-context.md" ]] && cp "$SCRIPT_DIR/agent-context.md" "$ROOT/"

# ── Compress ──────────────────────────────────────────────────────────────────
OUTPUT="$SCRIPT_DIR/design-system.tar.gz"
tar -czf "$OUTPUT" -C "$WORKDIR" "design-system"

echo
echo "Created: $OUTPUT"
echo
echo "Contents:"
tar -tzf "$OUTPUT" | sed 's/^/  /'
echo
echo "Extract with:"
echo "  tar -xzf design-system.tar.gz"
