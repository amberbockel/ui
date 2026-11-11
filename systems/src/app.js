/* Site logic: hash routes (home, themes-<id>, docs-<id>), themed stages, copyable theme CSS. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const byId = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const mode = () => root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  const scope = (t) => esc(themeVars(t, mode()).map(([k, v]) => `${k}:${v}`).join(';') + (t.darkFirst ? ';color-scheme:dark' : ''));

  /* ---------- icons ---------- */
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    alert: '<path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v4M12 17.5v.01"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8L12 3Z"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

  /* ---------- product illustrations (drawn, so the repo ships no photos) ---------- */
  let uid = 0;
  const frame = (i, inner) => `<svg viewBox="0 0 300 300" role="img" aria-hidden="true"><rect width="300" height="300" fill="var(--ds-art${i + 1})"/>${inner}</svg>`;
  const ART = {
    shape(i) {
      const ink = '#1b1517', pop = 'var(--ds-accent)';
      const o = [
        `<circle cx="118" cy="150" r="64" fill="${ink}"/><rect x="150" y="96" width="92" height="92" fill="${pop}"/><circle cx="196" cy="208" r="26" fill="#ffffff"/>`,
        `<path d="M78 236V150a72 72 0 0 1 144 0v86Z" fill="${ink}"/><path d="M118 236v-80a32 32 0 0 1 64 0v80Z" fill="${pop}"/><rect x="60" y="236" width="180" height="10" fill="${ink}"/>`,
        `<path d="M150 56l22 60 62-18-38 52 38 52-62-18-22 60-22-60-62 18 38-52-38-52 62 18Z" fill="${ink}"/><circle cx="150" cy="150" r="30" fill="${pop}"/>`,
      ][i];
      return frame(i, o);
    },
    print(i) {
      const c = [['#c9b3ff', '#ffb8d9', '#ffd9b0'], ['#ffb8d9', '#ffcf9e', '#e01a8a'], ['#5b93ff', '#71d45c', '#c67fff']][i];
      const id = 'p' + ++uid;
      return frame(i, `<defs><radialGradient id="${id}a" cx="30%" cy="25%" r="70%"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[0]}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}b" cx="75%" cy="45%" r="65%"><stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}c" cx="40%" cy="95%" r="70%"><stop offset="0" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[2]}" stop-opacity="0"/></radialGradient></defs>
        <rect x="74" y="50" width="152" height="204" fill="#00000018" transform="translate(5 7)"/>
        <rect x="74" y="50" width="152" height="204" fill="#fffdf9"/>
        <rect x="88" y="64" width="124" height="176" fill="#fbf3ec"/>
        <rect x="88" y="64" width="124" height="176" fill="url(#${id}a)"/><rect x="88" y="64" width="124" height="176" fill="url(#${id}b)"/><rect x="88" y="64" width="124" height="176" fill="url(#${id}c)"/>`);
    },
  };
  const art = (t, i) => ART[t.content.art](i);

  /* ---------- shared bits ---------- */
  const badge = (text, i) => `<span class="ds-badge ds-badge--${i + 1}">${esc(text)}</span>`;
  const code = (s) => `<pre class="ds-code"><code>${esc(s)}</code></pre>`;
  function copy(text, btn) {
    const done = () => { const o = btn.innerHTML; btn.innerHTML = ic('check') + 'Copied'; setTimeout(() => (btn.innerHTML = o), 1400); };
    try { navigator.clipboard.writeText(text).then(done, () => selectSheet()); } catch (e) { selectSheet(); }
    function selectSheet() { const pre = $('#sheet-pre'); if (pre) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } }
  }

  /* ---------- storefront demo, same markup for every theme ---------- */
  function demo(t) {
    const c = t.content, initials = c.quote.author.split(' ').map((w) => w[0]).join('');
    return `
    <div class="ds-nav">
      <span class="ds-nav__brand">${esc(c.brand)}</span>
      <div class="ds-nav__links">${c.nav.map((x, i) => `<a class="ds-navlink"${i === 0 ? ' aria-current="page"' : ''}>${esc(x)}</a>`).join('')}</div>
      <div class="ds-nav__tools"><button class="ds-iconbtn" data-toggle-mode aria-label="Switch between light and dark">${ic(mode() === 'dark' ? 'sun' : 'moon')}</button><button class="ds-btn ds-btn--primary ds-btn--sm">Book a session</button></div>
    </div>
    <div class="ds-hero"><span class="ds-badge ds-badge--outline">${esc(c.badge)}</span><h2 class="ds-display">${esc(c.hero[0])}<br>${esc(c.hero[1])}</h2><p>${esc(c.sub)}</p>
      <div class="sys__row"><button class="ds-btn ds-btn--primary">Book a session</button><button class="ds-btn ds-btn--secondary">Read articles</button></div></div>
    <div class="demo-body">
      <section class="stack">
        <p class="sec-label">How I work</p>
        <div class="stats">${c.stats.map(([n, l]) => `<div class="ds-card ds-stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>
      </section>
      <div class="prod-grid">${c.cards.map((x, i) => `
        <article class="prod"><div class="prod__img">${art(t, i)}</div>
          <div class="prod__body">${badge(x.tag, i)}<h3 class="ds-card__title">${esc(x.name)}</h3><p>${esc(x.desc)}</p>
            <div class="prod__buy"><button class="ds-btn ds-btn--secondary ds-btn--sm">${esc(x.cta)}${ic('arrow')}</button></div>
          </div></article>`).join('')}
      </div>
      <div class="two">
        <section class="ds-card quote">
          <span class="quote__mark ds-display" aria-hidden="true">“</span>
          <p class="quote__text ds-display">${esc(c.quote.text)}</p>
          <div class="quote__by"><span class="quote__avatar">${esc(initials)}</span><span><b>${esc(c.quote.author)}</b><small>${esc(c.quote.role)}</small></span></div>
        </section>
        <section class="ds-card stack">
          <h3 class="ds-card__title">Mentorship</h3>
          <div><div class="ds-tabs" role="tablist">${c.tabs.map(([x], i) => `<button class="ds-tab" role="tab" aria-selected="${i === 0}" data-tab="${i}">${esc(x)}</button>`).join('')}</div></div>
          <p id="tab-out" class="ds-muted" style="margin:0;min-height:3em">${esc(c.tabs[0][1])}</p>
          <div class="ds-field"><label class="ds-label" for="goal">What are you working on?</label><input class="ds-input" id="goal" placeholder="Enter your mentoring goals..."></div>
          <div class="sys__row"><button class="ds-btn ds-btn--primary" id="toast-btn">Request a session</button><span id="toast-out"></span></div>
        </section>
      </div>
      <div class="two two--rev">
        <section class="ds-card stack">
          <h3 class="ds-card__title">Use it</h3>
          <div class="ds-cmd"><code>npm install amberbockel-ui</code><button class="ds-btn ds-btn--ghost ds-btn--sm" id="cmd-copy" aria-label="Copy">${ic('copy')}</button></div>
          ${t.external ? code("import { Button } from 'amberbockel-ui'\nimport 'amberbockel-ui/styles'") : code(`@import 'amberbockel-ui/themes/${t.id}.css';\n@import 'amberbockel-ui/themes/components.css';`)}
          <div class="ds-alert">${ic('alert')}${t.external ? 'Released as a React package.' : 'Preview theme. CSS only for now.'}</div>
        </section>
        <section class="ds-card stack">
          <h3 class="ds-card__title">Topics</h3>
          ${c.topics.map(([a, b]) => `<div class="act"><span>${esc(a)}<small>${esc(b)}</small></span></div>`).join('')}
        </section>
      </div>
    </div>
    <div class="ds-footer"><span>${esc(c.brand)}</span><span>Work · Mentorship · Writing · About</span></div>`;
  }

  /* ---------- views ---------- */
  function home() {
    const card = (t) => `
      <article class="sys ds" style="${scope(t)}">
        <div class="sys__art">${[0, 1, 2].map((i) => `<div>${art(t, i)}</div>`).join('')}</div>
        <div class="sys__body">
          <div class="sys__row"><span class="ds-badge ds-badge--outline">${esc(t.status)}</span>${t.external ? '<span class="ds-badge ds-badge--2">React package</span>' : '<span class="ds-badge ds-badge--1">CSS tokens</span>'}</div>
          <h3 class="ds-display sys__name">${esc(t.name)}</h3>
          <p class="ds-muted" style="margin:0">${esc(t.tagline)}</p>
          <div class="sys__row"><div class="dots">${['bg', 'surface2', 'primary', 'accent', 't1Bg', 't2Bg', 't3Bg'].map((k) => `<i style="background:${t[mode()][k]}"></i>`).join('')}</div></div>
        </div>
        <div class="sys__foot">${t.external
          ? `<a class="ds-btn ds-btn--primary ds-btn--sm" href="${t.external.site}" target="_blank" rel="noopener">Visit the docs${ic('ext')}</a><a class="ds-btn ds-btn--secondary ds-btn--sm" href="#themes-${t.id}">Live preview</a>`
          : `<a class="ds-btn ds-btn--primary ds-btn--sm" href="#docs-${t.id}">Open the docs</a><a class="ds-btn ds-btn--secondary ds-btn--sm" href="#themes-${t.id}">Live preview</a>`}</div>
      </article>`;
    return `
    <section class="home-hero"><div class="wrap home-hero__in">
      <p class="eyebrow">Open source design systems by Amber Bockel</p>
      <h1 class="serif">Four systems, one outline</h1>
      <p class="lede">Each system is the same contract of tokens, atoms, molecules, organisms and hooks. What changes is the voice. Pick one, copy its theme file, own it.</p>
      <div class="cta-row"><a class="btn" href="#themes">See the themes</a><a class="btn btn--quiet" href="#docs-sierra">Read the docs</a></div>
      <p class="note">This site is running on <b>${esc(site.name)}</b>. Change it with the theme switch in the header and every page follows.</p>
    </div></section>
    <div class="wrap"><div class="sys-grid">${THEMES.map(card).join('')}</div></div>
    <section class="band"><div class="wrap band__grid">
      <div><p class="eyebrow">The outline</p><h2 class="serif" style="margin-top:10px">Same five layers in every system</h2>
        <p>Borrowed from Sunrise and kept identical across all four, so moving between systems means changing a theme file and nothing else.</p></div>
      <ul class="layers">
        <li><b>Design tokens</b><span>Colour, type, radius. Thirty-odd custom properties with light and dark values.</span></li>
        <li><b>Atoms</b><span>Button, Badge, Input, Icon, CodeBlock.</span></li>
        <li><b>Molecules</b><span>Card, Stat, Tabs, Toast, NavLink, CommandBox, ThemeToggle.</span></li>
        <li><b>Organisms</b><span>Nav, Hero, Section, Footer.</span></li>
        <li><b>Hooks</b><span>Theme, reduced motion and count-up. React hooks in Sunrise, plain functions in the CSS systems.</span></li>
      </ul>
    </div></section>`;
  }

  let sheetOpen = false;
  function themes(t) {
    const pick = (x) => `<button class="pick" style="${scope(x)}" data-go="themes-${x.id}" aria-pressed="${x.id === t.id}">${art(x, 0)}<span>${esc(x.name)}</span>${art(x, 2)}</button>`;
    return `<div class="wrap tv">
      <aside class="panel">
        <h1 class="serif">Themes</h1>
        <p>One set of components, four theme files. Choosing one re-themes this whole site. Copy its tokens into a file you own.</p>
        <button class="btn btn--block" id="use-theme">${sheetOpen ? 'Hide the tokens' : 'Use this theme'}</button>
        ${t.external ? `<a class="btn btn--quiet btn--block" href="${t.external.site}" target="_blank" rel="noopener">Visit the docs${ic('ext')}</a>` : `<a class="btn btn--quiet btn--block" href="#docs-${t.id}">Open the docs</a>`}
        ${sheetOpen ? `<div class="sheet"><div class="row-between"><span class="eyebrow">${esc(t.id)}.css</span><button class="btn btn--quiet" id="copy-theme" style="padding:6px 12px;font-size:13px">${ic('copy')}Copy</button></div><pre id="sheet-pre" tabindex="0">${esc(themeCss(t))}</pre></div>` : ''}
        <hr>
        <div class="picks">${THEMES.map(pick).join('')}</div>
      </aside>
      <div class="stage ds" style="${scope(t)}">${demo(t)}</div>
    </div>`;
  }

  const SECTIONS = [['tokens', 'Design Tokens'], ['atoms', 'Atoms'], ['molecules', 'Molecules'], ['organisms', 'Organisms'], ['hooks', 'Hooks']];
  function docs(t) {
    const m = mode();
    const spec = (title, demoHtml, src, cls = '') => `<div class="spec"><h3>${title}</h3><div class="spec__demo ${cls}">${demoHtml}</div>${src ? code(src) : ''}</div>`;
    const sw = (k) => `<div class="sw"><i style="background:${t[m][k]}"></i><span>${k}</span><code>--ds-${k.replace(/[A-Z]/g, (x) => '-' + x.toLowerCase())}</code></div>`;
    const core = ['bg', 'surface', 'surface2', 'fg', 'muted', 'border', 'primary', 'onPrimary', 'accent', 'accentSoft'];
    const cat = ['t1Bg', 't1Fg', 't2Bg', 't2Fg', 't3Bg', 't3Fg', 'art1', 'art2', 'art3'];
    const c = t.content;
    return `<div class="wrap dv">
      <aside class="dnav">
        <div class="dnav__sys"><p class="eyebrow" style="padding:0 12px 6px">Systems</p>${THEMES.filter((x) => !x.external).map((x) => `<a href="#docs-${x.id}" ${x.id === t.id ? 'aria-current="page"' : ''}>${esc(x.name)}</a>`).join('')}<a href="${THEMES[0].external.site}" target="_blank" rel="noopener">Sunrise ↗</a></div>
        <div class="dnav__sec"><p class="eyebrow" style="padding:0 12px 6px">On this page</p>${SECTIONS.map(([id, label]) => `<a href="#" data-scroll="sec-${id}">${label}</a>`).join('')}</div>
      </aside>
      <article class="doc ds" style="${scope(t)}">
        <header class="doc__head"><span class="ds-badge ds-badge--outline">${esc(t.status)} · CSS tokens</span><h1 class="ds-display">${esc(t.name)}</h1><p>${esc(t.tagline)}</p>
          <div class="sys__row"><a class="ds-btn ds-btn--primary" href="#themes-${t.id}">See it live</a><button class="ds-btn ds-btn--secondary" id="copy-doc">${ic('copy')}Copy ${esc(t.id)}.css</button></div></header>

        <section class="doc__sec" id="sec-tokens"><header><h2 class="ds-display">Design Tokens</h2><p>Custom properties that power the system. Every one has a light and a dark value.</p></header>
          ${spec('Core colors', `<div class="swatches">${core.map(sw).join('')}</div>`, '', 'spec__demo--plain')}
          ${spec('Category colors', `<div class="swatches">${cat.map(sw).join('')}</div>`, '', 'spec__demo--plain')}
          ${spec('Typography', `<div class="type-spec"><span class="ds-display big">${esc(c.hero[0])}</span><span class="ds-muted">Display: ${esc(t.fonts.display.split(',')[0].replace(/"/g, ''))} · Body: ${esc(t.fonts.body.split(',')[0].replace(/"/g, ''))}</span><span>${esc(c.sub)}</span></div>`)}
          ${spec('Shape', `<span class="ds-btn ds-btn--secondary">r-btn ${t.shape.rBtn}</span><span class="ds-input" style="width:auto">r-ctl ${t.shape.rCtl}</span><span class="ds-card" style="padding:10px 16px">r-card ${t.shape.rCard}</span>`)}
          ${spec('Usage', '', `@import "amberbockel-ui/themes/${t.id}.css";\n@import "amberbockel-ui/themes/components.css";\n\n.my-component {\n  background: var(--ds-surface);\n  border: 1px solid var(--ds-border);\n  border-radius: var(--ds-r-card);\n}`, 'spec__demo--plain')}
        </section>

        <section class="doc__sec" id="sec-atoms"><header><h2 class="ds-display">Atoms</h2><p>The smallest pieces. Nothing here knows about layout.</p></header>
          ${spec('Button', `<button class="ds-btn ds-btn--primary">Primary</button><button class="ds-btn ds-btn--secondary">Secondary</button><button class="ds-btn ds-btn--ghost">Ghost</button><button class="ds-btn ds-btn--primary ds-btn--sm">Small</button><button class="ds-btn ds-btn--primary ds-btn--lg">Large${ic('arrow')}</button>`, '<button class="ds-btn ds-btn--primary">Primary</button>\n<button class="ds-btn ds-btn--secondary ds-btn--sm">Small secondary</button>')}
          ${spec('Badge', `<span class="ds-badge">Default</span>${badge(c.cards[0].tag, 0)}${badge(c.cards[1].tag, 1)}${badge(c.cards[2].tag, 2)}<span class="ds-badge ds-badge--outline">Outline</span>`, '<span class="ds-badge ds-badge--1">New</span>')}
          ${spec('Input', `<div class="ds-field" style="flex:1 1 240px"><label class="ds-label" for="doc-in">Email</label><input class="ds-input" id="doc-in" placeholder="you@example.com"></div><label class="opt"><input class="ds-check" type="checkbox" id="doc-ck" checked><span>Remember me</span></label>`, '<div class="ds-field">\n  <label class="ds-label" for="email">Email</label>\n  <input class="ds-input" id="email">\n</div>')}
          ${spec('Icon', `<div class="ds-icons">${['search', 'user', 'bag', 'heart', 'star', 'arrow', 'plus', 'check', 'lock', 'moon'].map((n) => `<span title="${n}">${ic(n)}</span>`).join('')}</div>`)}
          ${spec('CodeBlock', '', '<pre class="ds-code"><code>npm run build</code></pre>', 'spec__demo--plain')}
        </section>

        <section class="doc__sec" id="sec-molecules"><header><h2 class="ds-display">Molecules</h2><p>Atoms composed into something with one clear job.</p></header>
          ${spec('Card', `<div class="ds-card stack" style="background:var(--ds-bg);max-width:340px"><h4 class="ds-card__title">${esc(c.cards[0].name)}</h4><span class="ds-muted">${esc(c.cards[0].desc)}</span><div><button class="ds-btn ds-btn--secondary ds-btn--sm">${esc(c.cards[0].cta)}</button></div></div>`, '<div class="ds-card">\n  <h4 class="ds-card__title">Title</h4>\n  …\n</div>')}
          ${spec('Stat', `<div class="ds-stat"><b>${esc(c.stats[0][0])}</b><span>${esc(c.stats[0][1])}</span></div><div class="ds-stat" style="margin-left:24px"><b>${esc(c.stats[1][0])}</b><span>${esc(c.stats[1][1])}</span></div>`, '<div class="ds-stat"><b>20+</b><span>Design Leadership</span></div>')}
          ${spec('Tabs', `<div class="stack"><div class="ds-tabs" role="tablist">${c.tabs.map(([x], i) => `<button class="ds-tab" role="tab" aria-selected="${i === 0}" data-tab="${i}">${x}</button>`).join('')}</div><span id="tab-out" class="ds-muted">${esc(c.tabs[0][1])}</span></div>`, '<div class="ds-tabs" role="tablist">\n  <button class="ds-tab" role="tab" aria-selected="true">Overview</button>\n</div>')}
          ${spec('Toast', `<button class="ds-btn ds-btn--secondary" id="toast-btn">Show toast</button><span id="toast-out"></span>`, '<div class="ds-toast" role="status">Request sent</div>')}
          ${spec('NavLink', `<a class="ds-navlink" aria-current="page">Work</a><a class="ds-navlink">Mentorship</a><a class="ds-navlink">Writing</a>`, '<a class="ds-navlink" aria-current="page" href="/work">Work</a>')}
          ${spec('CommandBox', `<div class="ds-cmd" style="flex:1"><code>@import "amberbockel-ui/themes/${t.id}.css";</code><button class="ds-btn ds-btn--ghost ds-btn--sm" id="cmd-copy" aria-label="Copy">${ic('copy')}</button></div>`, '<div class="ds-cmd"><code>…</code><button class="ds-btn ds-btn--ghost ds-btn--sm">Copy</button></div>')}
          ${spec('ThemeToggle', `<button class="ds-btn ds-btn--secondary" data-toggle-mode>${ic(m === 'dark' ? 'sun' : 'moon')}Current: ${m}</button>`, 'toggleTheme() // flips data-theme on <html>')}
        </section>

        <section class="doc__sec" id="sec-organisms"><header><h2 class="ds-display">Organisms</h2><p>Page-level structure. These four are enough to stand up a landing page.</p></header>
          ${spec('Nav', `<div class="ds-nav"><span class="ds-nav__brand">${esc(c.brand)}</span><div class="ds-nav__links"><a class="ds-navlink" aria-current="page">Work</a><a class="ds-navlink">Mentorship</a></div><div class="ds-nav__tools"><button class="ds-btn ds-btn--primary ds-btn--sm">Book a session</button></div></div>`, '<div class="ds-nav">\n  <span class="ds-nav__brand">Brand</span>\n  <div class="ds-nav__links">…</div>\n  <div class="ds-nav__tools">…</div>\n</div>', 'spec__demo--frame')}
          ${spec('Hero', `<div class="ds-hero"><h2 class="ds-display">${esc(c.hero[0])}<br>${esc(c.hero[1])}</h2><p>${esc(c.sub)}</p><div class="sys__row"><button class="ds-btn ds-btn--primary">Book a session</button><button class="ds-btn ds-btn--secondary">Read articles</button></div></div>`, '<div class="ds-hero">\n  <h2 class="ds-display">Headline</h2>\n  <p>Supporting line.</p>\n</div>', 'spec__demo--frame')}
          ${spec('Section', `<div class="stack" style="width:100%"><h4 class="ds-card__title">Mentorship approach</h4><span class="ds-muted">A titled wrapper with consistent padding. Everything on this page sits in one.</span></div>`)}
          ${spec('Footer', `<div class="ds-footer"><span>${esc(c.brand)}</span><span>Work · Mentorship · Writing · About</span></div>`, '<footer class="ds-footer">…</footer>', 'spec__demo--frame')}
        </section>

        <section class="doc__sec" id="sec-hooks"><header><h2 class="ds-display">Hooks</h2><p>Sunrise ships these as React hooks. Here they are plain functions, so they work anywhere.</p></header>
          ${spec('useTheme', `<span>Current theme: <b>${m}</b></span><button class="ds-btn ds-btn--secondary ds-btn--sm" data-toggle-mode>Toggle</button>`, "const toggleTheme = () => {\n  const el = document.documentElement\n  el.dataset.theme = el.dataset.theme === 'dark' ? 'light' : 'dark'\n}")}
          ${spec('useReducedMotion', `<span>prefers-reduced-motion: <b>${window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'no preference'}</b></span>`, "const reducedMotion = () =>\n  matchMedia('(prefers-reduced-motion: reduce)').matches")}
          ${spec('useCountUp', `<div class="ds-stat"><b id="count-out">0</b><span>Mentorship minutes</span></div><button class="ds-btn ds-btn--secondary ds-btn--sm" id="count-add">Add 100</button><button class="ds-btn ds-btn--ghost ds-btn--sm" id="count-reset">Reset</button>`, "function countUp(el, to, ms = 600) {\n  const from = +el.textContent, t0 = performance.now()\n  const step = (t) => {\n    const k = Math.min(1, (t - t0) / ms)\n    el.textContent = Math.round(from + (to - from) * k)\n    if (k < 1) requestAnimationFrame(step)\n  }\n  requestAnimationFrame(step)\n}")}
        </section>
      </article>
    </div>`;
  }

  /* ---------- routing + events ---------- */
  let site = THEMES[0];
  try { const saved = localStorage.getItem('os-theme'); if (saved) site = byId(saved); } catch (e) {}
  let current = site;
  /* The executable part: the active theme's tokens become this site's own tokens. */
  function applySite() {
    const c = site[mode()], sh = site.shape, set = (k, v) => root.style.setProperty(k, v);
    set('--page', c.bg); set('--card', c.surface); set('--ink', c.fg); set('--ink-2', c.muted); set('--line', c.border);
    set('--cta', c.fg); set('--on-cta', c.bg); set('--accent', c.accent); set('--soft', c.surface2);
    if (site.id === 'sunrise') root.style.removeProperty('--wash'); else set('--wash', c.heroBg);
    set('--f-display', site.fonts.display); set('--f-body', site.fonts.body);
    set('--f-bls', sh.bodyLs || 'normal'); set('--f-dw', sh.displayWeight); set('--f-dls', sh.displayLs); set('--f-dlh', sh.displayLh); set('--f-ds', sh.displayScale);
    set('--label-case', sh.labelCase || 'none'); set('--label-ls', sh.labelLs || 'inherit'); root.style.colorScheme = site.darkFirst ? 'dark' : ''; set('--btn-shadow', c.btnShadow || 'none'); set('--r-btn', sh.rBtn); set('--r-card', sh.rCard); set('--r-ctl', sh.rCtl);
    root.setAttribute('data-site', site.id);
    try { localStorage.setItem('os-theme', site.id); } catch (e) {}
    $('#site-switch').innerHTML = '<span class="switch__label">Theme</span>' + THEMES.map((t) => `<button data-site="${t.id}" aria-pressed="${t.id === site.id}"><i style="background:${t[mode()].accent}"></i>${esc(t.name)}</button>`).join('');
  }
  function route() {
    const h = (location.hash || '#home').slice(1);
    const [view, id] = h.split('-');
    const main = $('#view');
    let navKey = 'home';
    if (view === 'themes') { if (id) site = byId(id); current = site; applySite(); main.innerHTML = themes(site); navKey = 'themes'; }
    else if (view === 'docs') { let t = id ? byId(id) : site; if (t.external) t = THEMES[1]; current = t; applySite(); main.innerHTML = docs(t); navKey = 'docs'; }
    else { current = site; applySite(); main.innerHTML = home(); }
    document.querySelectorAll('.top nav a').forEach((a) => a.dataset.nav === navKey ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
    $('#mode-btn').innerHTML = ic(mode() === 'dark' ? 'sun' : 'moon');
  }
  function toggleMode() { root.setAttribute('data-theme', mode() === 'dark' ? 'light' : 'dark'); const y = scrollY; route(); scrollTo(0, y); }
  function countUp(el, to) { const from = +el.textContent, t0 = performance.now(); const step = (now) => { const k = Math.min(1, (now - t0) / 600); el.textContent = Math.round(from + (to - from) * k); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a'); if (!el) return;
    if (el.dataset.site) { site = byId(el.dataset.site); const y = scrollY; if ((location.hash || '').startsWith('#themes')) { if (location.hash === '#themes-' + site.id) route(); else location.hash = 'themes-' + site.id; } else route(); requestAnimationFrame(() => scrollTo(0, y)); }
    else if (el.dataset.go) { sheetOpen = sheetOpen && true; const y = scrollY; location.hash = el.dataset.go; requestAnimationFrame(() => scrollTo(0, y)); }
    else if (el.dataset.scroll) { e.preventDefault(); const s = document.getElementById(el.dataset.scroll); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (el.id === 'mode-btn' || 'toggleMode' in el.dataset) toggleMode();
    else if (el.id === 'use-theme') { sheetOpen = !sheetOpen; route(); }
    else if (el.id === 'copy-theme' || el.id === 'copy-doc') copy(themeCss(current), el);
    else if (el.id === 'cmd-copy') copy((el.previousElementSibling && el.previousElementSibling.textContent) || '', el);
    else if (el.dataset.tab) { document.querySelectorAll('.ds-tab').forEach((b) => b.setAttribute('aria-selected', b === el)); $('#tab-out').textContent = current.content.tabs[el.dataset.tab][1]; }
    else if (el.id === 'toast-btn') { $('#toast-out').innerHTML = `<div class="ds-toast" role="status">${ic('check')}Request sent</div>`; setTimeout(() => { const o = $('#toast-out'); if (o) o.innerHTML = ''; }, 2200); }
    else if (el.id === 'count-add') countUp($('#count-out'), +$('#count-out').textContent + 100);
    else if (el.id === 'count-reset') $('#count-out').textContent = '0';
  });
  window.addEventListener('hashchange', route);
  mq.addEventListener('change', route);
  route();
})();
