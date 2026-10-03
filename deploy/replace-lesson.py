#!/usr/bin/env python3
"""Replace or insert a lesson in js/lessons.js by key.

Usage:  replace-lesson.py <key> <new-block-file>

The new block file must contain the complete lesson object entry, starting with
  'key': {
and ending with the closing
  },
(the trailing comma is normalised by this script, so the file may omit it).

Lesson insertion order in LESSON_OVERRIDES is irrelevant at runtime, but the
block is appended just before the closing `};` of the object if the key is new,
and spliced in place if it already exists.
"""
import re
import sys
from pathlib import Path

LESSONS = Path(__file__).resolve().parent.parent / 'js' / 'lessons.js'


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    key, block_file = sys.argv[1], sys.argv[2]

    src = LESSONS.read_text(encoding='utf-8')
    block = Path(block_file).read_text(encoding='utf-8').rstrip('\n')

    # normalise the trailing comma so it always continues the object literal
    if block.endswith('}'):
        block += ','
    if not re.match(rf"^\s*'{re.escape(key)}':\s*\{{", block):
        sys.exit(f'block does not start with the key {key!r}')

    # Locate the entry inside LESSON_OVERRIDES only. The header comment
    # contains an illustrative 'artXX-mY' block, so search from the object
    # opening to avoid matching it.
    obj = src.index('const LESSON_OVERRIDES = {')
    start = re.search(rf"^\s*'{re.escape(key)}':\s*\{{", src[obj:], re.M)
    if start:
        start_at = obj + start.start()
        body = src[obj + start.end():]
        # A lesson entry always ends at its own `smeChecked:` line followed by
        # the closing brace. Matching that is indentation-agnostic, which brace
        # counting is not (lesson bodies hold {{diagram:key}} placeholders).
        end = re.search(r"^[ \t]*smeChecked:[ \t]*(?:true|false)[^\n]*\n[ \t]*\},?[ \t]*$",
                        body, re.M)
        if not end:
            sys.exit(f'could not find the end of {key} — no smeChecked terminator found')
        stop = obj + start.end() + end.end()
        new = src[:start_at] + block + src[stop:]
        action = 'replaced'
    else:
        close = src.rindex('\n};')
        new = src[:close + 1] + '\n  ' + block + '\n' + src[close + 1:]
        action = 'inserted'

    # syntax gate before writing (node --check needs a .js extension)
    tmp = LESSONS.with_name('lessons.check.js')
    tmp.write_text(new, encoding='utf-8')
    import subprocess
    r = subprocess.run(['node', '--check', str(tmp)], capture_output=True, text=True)
    tmp.unlink()
    if r.returncode != 0:
        sys.exit(f'syntax check failed, not writing:\n{r.stderr}')

    LESSONS.write_text(new, encoding='utf-8')
    print(f'{action} {key}  ({len(block)} bytes)')


if __name__ == '__main__':
    main()