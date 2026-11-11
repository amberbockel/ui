// Pulls essays from the Substack feed into src/posts.json.
// Run it before a build to pick up new posts: `npm run posts`.
// The result is committed, so the site still builds if Substack is unreachable.
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';

const FEED = 'https://amberbockel.substack.com/feed';
const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim().replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim() : '';
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

// Keep the writing, drop Substack's own widgets and anything that could run.
function clean(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/<div class="subscription-widget-wrap[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')
    .replace(/<p class="button-wrapper"[\s\S]*?<\/p>/gi, '')
    .replace(/<div class="image-link-expand"[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .replace(/<(button|svg|source)[\s\S]*?<\/\1>/gi, '')
    .replace(/<source[^>]*>/gi, '')
    .replace(/\s(on\w+|style|class|data-[\w-]+|srcset|sizes|fetchpriority|target|rel)="[^"]*"/gi, '')
    .replace(/<a /gi, '<a rel="noopener" ')
    .replace(/<img /gi, '<img loading="lazy" ')
    .replace(/<(div|span|picture|figure)>\s*<\/\1>/gi, '');
}

// Copy an image into public/blog so the site never depends on Substack's servers.
const IMG_DIR = new URL('../public/blog/', import.meta.url);
mkdirSync(IMG_DIR, { recursive: true });
const EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/avif': 'avif' };
async function localize(url, name) {
  const have = readdirSync(IMG_DIR).find((f) => f.startsWith(name + '.'));
  if (have) return '/blog/' + have;
  try {
    const r = await fetch(url, { headers: { accept: 'image/webp,image/*;q=0.8', 'user-agent': 'Mozilla/5.0 (compatible; feed-reader)' } });
    if (!r.ok) return url;
    const ext = EXT[(r.headers.get('content-type') || '').split(';')[0]] || 'jpg';
    writeFileSync(new URL(`${name}.${ext}`, IMG_DIR), Buffer.from(await r.arrayBuffer()));
    return `/blog/${name}.${ext}`;
  } catch (e) { return url; }
}

const res = await fetch(FEED, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; feed-reader)' } });
if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
const xml = await res.text();
const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const link = tag(item, 'link');
  const body = clean(tag(item, 'content:encoded'));
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const cover = (item.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] || '';
  return {
    slug: link.split('/p/')[1]?.replace(/[^a-z0-9-]/gi, '') || '',
    title: decode(tag(item, 'title')),
    summary: decode(tag(item, 'description')),
    date: new Date(tag(item, 'pubDate')).toISOString().slice(0, 10),
    minutes: Math.max(1, Math.round(words / 230)),
    source: link,
    cover: cover.replace(/&amp;/g, '&'),
    body,
  };
}).filter((p) => p.slug);

for (const post of posts) {
  // Images are wrapped in links to the full-size file on Substack. Drop the link, keep the image.
  post.body = post.body.replace(/<a [^>]*href="https:\/\/substackcdn\.com\/image[^"]*"[^>]*>([\s\S]*?)<\/a>/g, '$1');
  const srcs = [...new Set([...post.body.matchAll(/<img [^>]*src="([^"]+)"/g)].map((m) => m[1]))];
  let n = 0;
  for (const src of srcs) { const local = await localize(src.replace(/&amp;/g, '&'), `${post.slug}-${++n}`); post.body = post.body.split(src).join(local); }
  if (post.cover) post.cover = await localize(post.cover, `${post.slug}-cover`);
}

writeFileSync(new URL('../src/posts.json', import.meta.url), JSON.stringify(posts, null, 1));
console.log(`Saved ${posts.length} posts. Newest: ${posts[0]?.date} "${posts[0]?.title}"`);
