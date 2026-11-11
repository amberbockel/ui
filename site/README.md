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
- `src/pages/`: the home page and one template for About, Work, Mentor, Art and Blog.
- `src/layouts/Layout.astro`: header, footer, and the system and mode switches.
- `src/styles/`: `components.css` (buttons, cards, badges) and `site.css` (page layout).

## Run it

```bash
npm install
```

```bash
./scripts/fetch-images.sh
```

```bash
npm run posts
```

```bash
python3 scripts/optimize-images.py
```

```bash
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Images

- Site images are fetched from the old Framer site by `scripts/fetch-images.sh`.
- Essay images are downloaded by `npm run posts`, then shrunk by `python3 scripts/optimize-images.py`.
- Neither set is committed yet. Commit them once the site has its own repository.

## Not done yet

- The Lab page is not ported: on the old site it only had placeholder text.
- The Design Leadership tab on About reuses the home page copy: its own text could not be read from the old site.
- Three animated GIFs in essays are large (2 to 8 MB each) and should become video.
- No hosting, domain or scheduled rebuild is set up.
