#!/usr/bin/env python3
"""Documentation quality checks for the SeaTable Admin Manual.

Checks:
  1. Nav integrity    — all files in mkdocs.yml nav exist on disk
  2. Orphan detection — all .md files in docs/ are referenced in nav or redirects
  3. No TODO/FIXME    — no TODO or FIXME markers in published docs
  4. Code block langs — code blocks should have a language tag (warning only)
  5. No empty pages   — pages must have more than just a heading

Usage:
  python3 tests/validate_docs.py           # report mode (warnings don't fail)
  python3 tests/validate_docs.py --strict  # fail on any error
"""

import re
import sys
import yaml
from pathlib import Path

DOCS_DIR = Path('docs')
MKDOCS_YML = Path('mkdocs.yml')
MIN_CONTENT_LINES = 3  # minimum non-empty lines (excluding frontmatter)

# Files that are used internally (includes, snippets) and not standalone pages
IGNORE_FILES = {'includes.md'}

errors = []
warnings = []


def error(check, msg):
    errors.append(f'[{check}] {msg}')


def warn(check, msg):
    warnings.append(f'[{check}] {msg}')


# ---------------------------------------------------------------------------
# Parse mkdocs.yml
# ---------------------------------------------------------------------------

# mkdocs.yml uses !!python/name tags — add a loader that ignores them
class _PermissiveLoader(yaml.SafeLoader):
    pass

_PermissiveLoader.add_multi_constructor(
    'tag:yaml.org,2002:python/',
    lambda loader, suffix, node: None,
)
_PermissiveLoader.add_constructor(
    '!ENV',
    lambda loader, node: None,
)

with open(MKDOCS_YML) as f:
    config = yaml.load(f, Loader=_PermissiveLoader)


def extract_nav_files(nav, files=None):
    """Recursively extract all .md file paths from the nav structure."""
    if files is None:
        files = []
    if isinstance(nav, list):
        for item in nav:
            extract_nav_files(item, files)
    elif isinstance(nav, dict):
        for value in nav.values():
            extract_nav_files(value, files)
    elif isinstance(nav, str) and nav.endswith('.md'):
        files.append(nav)
    return files


nav_files = extract_nav_files(config.get('nav', []))

redirect_maps = {}
plugins = config.get('plugins', [])
for plugin in plugins:
    if isinstance(plugin, dict) and 'redirects' in plugin:
        redirect_maps = plugin['redirects'].get('redirect_maps', {})

# Redirect sources are .md paths that don't need to exist on disk
redirect_sources = set(redirect_maps.keys())
# Redirect targets are referenced pages
redirect_targets = set(redirect_maps.values())

# ---------------------------------------------------------------------------
# Check 1: Nav integrity — all nav files exist
# ---------------------------------------------------------------------------

for nav_file in nav_files:
    if not (DOCS_DIR / nav_file).exists():
        error('nav-integrity', f'File in nav does not exist: docs/{nav_file}')

# ---------------------------------------------------------------------------
# Check 2: Orphan detection — all docs files are in nav or redirects
# ---------------------------------------------------------------------------

all_md_files = set()
for md in DOCS_DIR.rglob('*.md'):
    rel = md.relative_to(DOCS_DIR)
    all_md_files.add(str(rel))

nav_set = set(nav_files)
referenced = nav_set | redirect_sources | redirect_targets

for md_file in sorted(all_md_files):
    if md_file not in referenced and Path(md_file).name not in IGNORE_FILES:
        warn('orphan', f'File not in nav or redirects: docs/{md_file}')

# ---------------------------------------------------------------------------
# Check 3: No TODO/FIXME in docs
# ---------------------------------------------------------------------------

TODO_RE = re.compile(r'\b(TODO|FIXME)\b')

for md in DOCS_DIR.rglob('*.md'):
    rel = str(md.relative_to(DOCS_DIR))
    if rel in redirect_sources or md.name in IGNORE_FILES:
        continue
    in_comment = False
    for i, line in enumerate(md.read_text().splitlines(), 1):
        stripped = line.strip()
        if '<!--' in stripped:
            in_comment = True
        if in_comment:
            if '-->' in stripped:
                in_comment = False
            continue
        if stripped.startswith('#'):
            continue
        if TODO_RE.search(line):
            error('no-todo', f'docs/{rel}:{i}: {line.strip()[:80]}')

# ---------------------------------------------------------------------------
# Check 4: Code blocks should have language tags (warning only)
# ---------------------------------------------------------------------------

FENCE_RE = re.compile(r'^(\s*)```(\w*)\s*$')

for md in DOCS_DIR.rglob('*.md'):
    rel = str(md.relative_to(DOCS_DIR))
    if rel in redirect_sources or md.name in IGNORE_FILES:
        continue
    in_code = False
    for i, line in enumerate(md.read_text().splitlines(), 1):
        m = FENCE_RE.match(line)
        if not m:
            continue
        lang = m.group(2)
        if not in_code:
            # Opening fence
            in_code = True
            if lang == '':
                warn('code-lang', f'docs/{rel}:{i}: code block without language tag')
        elif lang == '':
            # Closing fence (bare ```)
            in_code = False
        # else: a ```lang inside a code block is just content, ignore

# ---------------------------------------------------------------------------
# Check 5: No empty pages
# ---------------------------------------------------------------------------

for md in DOCS_DIR.rglob('*.md'):
    rel = str(md.relative_to(DOCS_DIR))
    if rel in redirect_sources or md.name in IGNORE_FILES:
        continue
    content_lines = [
        l for l in md.read_text().splitlines()
        if l.strip() and not l.strip().startswith('---')
    ]
    if len(content_lines) < MIN_CONTENT_LINES:
        error('empty-page', f'docs/{rel}: only {len(content_lines)} content lines')

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

print(f'\n{"=" * 60}')
print(f'Documentation Quality Report')
print(f'{"=" * 60}\n')

if errors:
    print(f'ERRORS ({len(errors)}):')
    for e in errors:
        print(f'  ✗ {e}')
    print()

if warnings:
    print(f'WARNINGS ({len(warnings)}):')
    for w in warnings:
        print(f'  ⚠ {w}')
    print()

if not errors and not warnings:
    print('All checks passed.\n')

print(f'Summary: {len(errors)} errors, {len(warnings)} warnings')
print(f'{"=" * 60}\n')

# Exit code
if errors:
    sys.exit(1)
if warnings and '--strict' in sys.argv:
    sys.exit(1)
sys.exit(0)
