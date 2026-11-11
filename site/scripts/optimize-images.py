#!/usr/bin/env python3
"""Shrinks essay images in public/blog to WebP and points src/posts.json at the new files.
Run after `npm run posts`. Needs Pillow. Animated GIFs are left alone."""
import os
from PIL import Image

root = os.path.join(os.path.dirname(__file__), '..')
folder, renamed = os.path.join(root, 'public', 'blog'), {}
for name in sorted(os.listdir(folder)):
    path, ext = os.path.join(folder, name), name.rsplit('.', 1)[-1]
    if ext in ('gif', 'webp'):
        continue
    im = Image.open(path); im.load()
    if getattr(im, 'is_animated', False):
        continue
    limit = 1000 if '-cover.' in name else 1400
    if im.width > limit:
        im = im.resize((limit, round(im.height * limit / im.width)), Image.LANCZOS)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA' if im.mode == 'P' or 'A' in im.mode else 'RGB')
    out = name.rsplit('.', 1)[0] + '.webp'
    im.save(os.path.join(folder, out), 'WEBP', quality=80, method=5)
    os.remove(path); renamed['/blog/' + name] = '/blog/' + out
posts = os.path.join(root, 'src', 'posts.json')
text = open(posts).read()
for old, new in renamed.items():
    text = text.replace(old, new)
open(posts, 'w').write(text)
print(f'optimized {len(renamed)} images')
