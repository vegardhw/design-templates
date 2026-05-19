#!/usr/bin/env bash
# Packages the design-system files for a single theme into a tar.gz archive
# ready to drop into a new project.
#
# Usage:
#   ./export-theme.sh [<theme-name-or-number>]
#
# If no argument is given, an interactive list is shown.
# Archive contents follow the workflow in INSTRUCTIONS.md §"Migrating one theme".

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEMES_DIR="$SCRIPT_DIR/src/styles/themes"

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

# ── Resolve theme from argument or interactive menu ───────────────────────────
CHOSEN=""

if [[ $# -ge 1 ]]; then
  ARG="$1"
  if [[ "$ARG" =~ ^[0-9]+$ ]]; then
    IDX=$(( ARG - 1 ))
    if [[ $IDX -lt 0 || $IDX -ge ${#THEME_NAMES[@]} ]]; then
      echo "Invalid theme number: $ARG (valid: 1–${#THEME_NAMES[@]})" >&2
      exit 1
    fi
    CHOSEN="${THEME_NAMES[$IDX]}"
  else
    for n in "${THEME_NAMES[@]}"; do
      [[ "$n" == "$ARG" ]] && CHOSEN="$n" && break
    done
    if [[ -z "$CHOSEN" ]]; then
      echo "Unknown theme: '$ARG'" >&2
      printf "Available: %s\n" "${THEME_NAMES[*]}" >&2
      exit 1
    fi
  fi
else
  echo "Available themes:"
  for i in "${!THEME_NAMES[@]}"; do
    printf "  %d) %s\n" $(( i + 1 )) "${THEME_NAMES[$i]}"
  done
  echo
  while true; do
    read -rp "Enter theme number [1–${#THEME_NAMES[@]}]: " PICK
    if [[ "$PICK" =~ ^[0-9]+$ ]] && (( PICK >= 1 && PICK <= ${#THEME_NAMES[@]} )); then
      CHOSEN="${THEME_NAMES[$(( PICK - 1 ))]}"
      break
    fi
    echo "Please enter a number between 1 and ${#THEME_NAMES[@]}."
  done
fi

echo "Exporting theme: $CHOSEN"

# ── Assemble files in a temp directory ───────────────────────────────────────
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

ROOT="$WORKDIR/design-system-$CHOSEN"

# Directories that mirror the target project layout
mkdir -p \
  "$ROOT/src/styles/themes" \
  "$ROOT/src/components/ui" \
  "$ROOT/src/lib"

# 1. Theme CSS (only the chosen theme)
cp "$THEMES_DIR/$CHOSEN.css" "$ROOT/src/styles/themes/"

# 2. theme.css — strip all @import "./themes/..." lines, then insert chosen only
python3 - "$SCRIPT_DIR/src/styles/theme.css" \
          "$ROOT/src/styles/theme.css" \
          "$CHOSEN" <<'PYEOF'
import sys, re

src, dst, chosen = sys.argv[1], sys.argv[2], sys.argv[3]
with open(src) as f:
    content = f.read()

# Remove every @import "./themes/..." line
content = re.sub(r'@import "./themes/[^"]+\.css";\n', '', content)

# Re-insert import for chosen theme after the themes comment block
insert = f'@import "./themes/{chosen}.css";\n'
content = re.sub(r'(\/\* ─+ Themes ─+[\s\S]*?\*\/\n)', r'\1' + insert, content, count=1)

with open(dst, 'w') as f:
    f.write(content)
PYEOF

# 3. shadcn/ui component files
cp "$SCRIPT_DIR"/src/components/ui/*.tsx "$ROOT/src/components/ui/"

# 4. lib/utils.ts — always needed (cn helper)
cp "$SCRIPT_DIR/src/lib/utils.ts" "$ROOT/src/lib/"

# 5. lib/themes.ts — trimmed to only the chosen theme entry
python3 - "$SCRIPT_DIR/src/lib/themes.ts" \
          "$ROOT/src/lib/themes.ts" \
          "$CHOSEN" <<'PYEOF'
import sys, re

src, dst, chosen = sys.argv[1], sys.argv[2], sys.argv[3]
with open(src) as f:
    content = f.read()

match = re.search(
    r'\{\s*\n\s*name:\s*"' + re.escape(chosen) + r'"[\s\S]*?\}',
    content
)
if match:
    entry = match.group(0)
    content = re.sub(
        r'(export const themes: ThemeDefinition\[\] = \[)[\s\S]*?(\];)',
        r'\1\n  ' + entry + r',\n\2',
        content
    )
else:
    print(f"Warning: theme '{chosen}' not found in themes.ts — leaving array unchanged",
          file=sys.stderr)

with open(dst, 'w') as f:
    f.write(content)
PYEOF

# 6. agent-context.md (Step 5 of INSTRUCTIONS.md)
[[ -f "$SCRIPT_DIR/agent-context.md" ]] && cp "$SCRIPT_DIR/agent-context.md" "$ROOT/"

# ── Compress ──────────────────────────────────────────────────────────────────
OUTPUT="$SCRIPT_DIR/design-system-${CHOSEN}.tar.gz"
tar -czf "$OUTPUT" -C "$WORKDIR" "design-system-$CHOSEN"

echo "Created: $OUTPUT"
echo
echo "Extract with:"
echo "  tar -xzf design-system-${CHOSEN}.tar.gz"
echo
echo "Then follow INSTRUCTIONS.md §'Migrating one theme' (Steps 4–5) to wire it up."
