# amberbockel.com

The rebuild of amberbockel.com in code. Static site, built with Astro.

## Change the design system

Open `src/site.config.js`:

```js
export default {
  system: 'sunrise',        // 'sunrise' | 'sierra' | 'unicorns' | 'ember'
  showSystemSwitch: true,   // let visitors try the other systems from the footer
};
```

Changing `system` re-skins the whole site: colour, type and shape. It works the same way as the
light/dark switch: one attribute on `<html>` (`data-system`, next to `data-mode`) selects a set of tokens.

## Where things live

- `src/systems.js`: every design system as tokens. Add or edit systems here.
- `src/content.json`: all page copy, captured from the Framer site. Edit copy here.
- `src/pages/`: the home page, one template for About, Work, Mentor and Art, and the blog.
- `src/posts.json`: essays imported from Substack by `scripts/fetch-posts.mjs`.
- `src/layouts/Layout.astro`: header, footer, and the system and mode switches.
- `src/styles/`: `components.css` (buttons, cards, badges) and `site.css` (page layout).

## Blog

Essays come from the Substack feed. `npm run posts` pulls the latest 20 into `src/posts.json`, which is
committed so the site builds without the network. Each essay gets its own page at `/blog/<slug>/`.

`blog.canonical` in `src/site.config.js` decides which copy search engines credit: `'substack'` (default)
or `'site'`.

## Run it

```bash
npm install
```

```bash
./scripts/fetch-images.sh
```

```bash
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Not done yet

- Images are fetched from the old Framer site, not committed. One 22 MB GIF on About is left out.
- The Lab page is not ported: it only had placeholder text.
- Two stats on About ("Mentee's Served", "of Projects & Counting") are left out: their numbers are
  animated on the old site and could not be read.
- The page template is generic. Work and Art need their own layouts.
