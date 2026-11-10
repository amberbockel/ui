# Open Systems

A portfolio of open source design systems that share one outline: Design Tokens, Atoms, Molecules,
Organisms, Hooks. It is deployed with the demo site at `/ui/systems/`.

| System | What it is | Status |
| --- | --- | --- |
| Sunrise | This React package, `amberbockel-ui` | Released |
| Sierra | Sage, lime and tight grotesque type | Preview |
| Unicorns | Pink, cream and aubergine in condensed type | Preview |
| Ember | Dark-first, oversized type, one orange accent | Preview |

Sierra, Unicorns and Ember are CSS only. They use their own `--ds-*` tokens and a small shared component
stylesheet. They do not restyle the React components in this package.

## Try a theme

```css
@import 'amberbockel-ui/themes/ember.css';
@import 'amberbockel-ui/themes/components.css';
```

```html
<body class="ds">
  <button class="ds-btn ds-btn--primary">Add to bag</button>
</body>
```

Dark mode: set `data-theme="dark"` on `<html>`.

## Layout

- `src/themes.js` holds every token for every system, light and dark. Edit here.
- `src/components.css` is the shared component layer. It only reads `--ds-*` tokens.
- `src/shell.css`, `src/app.js`, `src/page.html` are the site itself.
- `build.js` writes the site (`--site`), the theme CSS for npm (`--themes`), or a shell-less page (`--artifact`).

`npm run demo:build` adds the site to `dist-demo/systems` after the demo build, and `npm run build`
writes the theme CSS into `dist/themes`. Neither output is committed. Preview the site on its own with
`npm run systems:build` and open `dist-demo/systems/index.html`.

## Switching themes

The header switch re-themes the whole site, not a preview. The choice is saved in the browser (`os-theme`).

## Framer colourways

`framer/colourways-embed.html` is a palette-only switcher for amberbockel.com, which is a Framer site. It
overrides Framer's colour-style variables, so it recolours the site but does not change fonts, radii or
layout. Regenerate it with `node systems/framer/build-embed.js` after editing `src/themes.js`. Set
`SYSTEMS_URL` to add a link to this site in the control. It is not installed on the live site.
