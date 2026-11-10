/* Theme definitions. Each system is the same token contract with different values.
   Used by the site (browser) and by build.js (node) to emit themes/<id>.css. */
const THEMES = [
  {
    id: 'sunrise',
    name: 'Sunrise',
    tagline: 'Glass, gradients and a serif with opinions. The original, shipping on npm as the amberbockel-ui React package.',
    status: 'v0.1.0',
    external: { site: 'https://amberbockel.github.io/ui/', repo: 'https://github.com/amberbockel/ui' },
    fonts: { display: '"Prata", Georgia, serif', body: '"DM Sans", system-ui, sans-serif' },
    shape: { rCard: '20px', rCtl: '12px', rBtn: '999px', rImg: '14px', rProd: '20px', displayWeight: '400', displayLs: '-0.01em', displayLh: '1.12', displayScale: '1.1' },
    light: {
      bg: '#fafafa', surface: '#ffffff', surface2: '#f0f0f3', fg: '#1d1d1f', muted: '#636366', border: '#00000014',
      primary: '#71d45c', onPrimary: '#ffffff', btn2Bg: '#ffffff', btn2Border: '#00000014',
      accent: '#e01a8a', accentSoft: '#e01a8a1a',
      t1Bg: '#5b93ff22', t1Fg: '#2456c4', t2Bg: '#ffb8d955', t2Fg: '#a3155f', t3Bg: '#c67fff2e', t3Fg: '#6a2ea8',
      art1: '#ece6ff', art2: '#ffe9f3', art3: '#e6f0ff',
      heroBg: 'linear-gradient(180deg, #e3d4ff 0%, #f8d3e8 45%, #fafafa 100%)',
    },
    dark: {
      bg: '#000000', surface: '#0f0f10', surface2: '#1d1d1f', fg: '#ffffff', muted: '#a1a1a6', border: '#ffffff26',
      primary: '#71d45c', onPrimary: '#ffffff', btn2Bg: '#ffffff0d', btn2Border: '#ffffff26',
      accent: '#e01a8a', accentSoft: '#e01a8a26',
      t1Bg: '#5b93ff33', t1Fg: '#a9c6ff', t2Bg: '#ffb8d933', t2Fg: '#ffb8d9', t3Bg: '#c67fff33', t3Fg: '#dcb3ff',
      art1: '#1c1630', art2: '#2a1422', art3: '#141c30',
      heroBg: 'linear-gradient(180deg, #2a1c4d 0%, #3b1630 45%, #000000 100%)',
    },
    content: {
      brand: 'Miro Prints', art: 'print',
      hero: ['Colour for the walls', 'you actually look at'],
      sub: 'Small-run prints, mixed by hand and numbered. Hang one where the morning light lands.',
      products: [
        { name: 'Morning Field', desc: 'Lavender into peach, 30 × 40 cm.', tag: 'New', spec: 'Giclée, edition of 80' },
        { name: 'Peach Hour', desc: 'Warm pinks for a north-facing room.', tag: 'Popular', spec: 'Giclée, edition of 120' },
        { name: 'Night Garden', desc: 'Periwinkle and green, 50 × 70 cm.', tag: 'Limited', spec: 'Riso, edition of 40' },
      ],
    },
  },
  {
    id: 'sierra',
    name: 'Sierra',
    tagline: 'Sage neutrals, one loud lime and tight grotesque type. Friendly without turning cute.',
    status: 'Preview',
    fonts: { display: '"Wix Madefor Display", system-ui, sans-serif', body: '"Wix Madefor Display", system-ui, sans-serif' },
    shape: { rCard: '28px', rCtl: '16px', rBtn: '999px', rImg: '0px', rProd: '28px', displayWeight: '500', displayLs: '-0.05em', displayLh: '1.1', displayScale: '1.1', bodyLs: '-0.02em', cardBorder: 'transparent', heroAlign: 'left', heroJustify: 'start' },
    light: {
      bg: '#ffffff', surface: '#f4f6f2', surface2: '#e6eae1', fg: '#0b0f0c', muted: '#3e4a40', border: '#c9d1c3',
      primary: '#0b0f0c', onPrimary: '#ffffff', btn2Bg: '#e6eae1', btn2Border: 'transparent',
      accent: '#2f9e4f', accentSoft: '#d7ff5e66',
      t1Bg: '#e9ffb0', t1Fg: '#34460a', t2Bg: '#c8f5ec', t2Fg: '#0e4a40', t3Bg: '#ffe1d4', t3Fg: '#7a3214',
      art1: '#e9ffb0', art2: '#c8f5ec', art3: '#ffe1d4', heroBg: '#ffffff', navBg: '#f4f6f2',
    },
    dark: {
      bg: '#0b0f0c', surface: '#1a201b', surface2: '#242b25', fg: '#ffffff', muted: '#c9d1c3', border: '#3e4a40',
      primary: '#d7ff5e', onPrimary: '#0b0f0c', btn2Bg: '#242b25', btn2Border: 'transparent',
      accent: '#d7ff5e', accentSoft: '#d7ff5e33',
      t1Bg: '#34460a', t1Fg: '#e9ffb0', t2Bg: '#0e4a40', t2Fg: '#c8f5ec', t3Bg: '#5a2a16', t3Fg: '#ffe1d4',
      art1: '#d7ff5e', art2: '#74e6d4', art3: '#ffc2a8', heroBg: '#0b0f0c', navBg: '#1a201b',
    },
    content: {
      brand: 'Dayroom', art: 'object',
      hero: ['Good tools,', 'quietly made'],
      sub: 'A short list of desk things that do one job well and stay out of the way while they do it.',
      products: [
        { name: 'Desk Lamp', desc: 'Warm light, one dial, no app.', tag: 'New', spec: 'Powder-coated steel' },
        { name: 'Enamel Mug', desc: 'Holds 350 ml and a grudge against dishwashers.', tag: 'Popular', spec: 'Enamel on steel' },
        { name: 'Field Notebook', desc: 'Dot grid, lies flat, 144 pages.', tag: 'Limited', spec: 'A5, sewn binding' },
      ],
    },
  },
  {
    id: 'pinkypop',
    name: 'Pinkypop',
    tagline: 'Loud on purpose. A looping script, arched cards and more pink than a brand team would approve.',
    status: 'Preview',
    fonts: { display: '"Borel", "Brush Script MT", cursive', body: '"Figtree", system-ui, sans-serif' },
    shape: { rCard: '28px', rCtl: '16px', rBtn: '999px', rImg: '0px', rProd: '120px 120px 28px 28px', displayWeight: '400', displayLs: '0', displayLh: '1.45', displayScale: '1.12' },
    light: {
      bg: '#fdebf2', surface: '#ffffff', surface2: '#f9d6e3', fg: '#6a1238', muted: '#8f3a5d', border: '#6a123826',
      primary: '#7d1543', onPrimary: '#ffffff', btn2Bg: '#f9d6e3', btn2Border: 'transparent',
      accent: '#ff4f9a', accentSoft: '#ff4f9a26',
      t1Bg: '#ffd0e2', t1Fg: '#8a1848', t2Bg: '#ffe2c7', t2Fg: '#8a4310', t3Bg: '#dfd6ff', t3Fg: '#4a2f9c',
      art1: '#bdf0df', art2: '#ffd9b8', art3: '#d9d2ff', heroBg: '#fdebf2',
    },
    dark: {
      bg: '#2a0b1a', surface: '#3a1126', surface2: '#521a37', fg: '#ffd9e8', muted: '#e6a3c0', border: '#ffd9e833',
      primary: '#ff7fb5', onPrimary: '#3a0a20', btn2Bg: '#521a37', btn2Border: 'transparent',
      accent: '#ff7fb5', accentSoft: '#ff7fb533',
      t1Bg: '#6a1f43', t1Fg: '#ffd0e2', t2Bg: '#5c3414', t2Fg: '#ffe2c7', t3Bg: '#3b2f77', t3Fg: '#dfd6ff',
      art1: '#1f5a4c', art2: '#6b4424', art3: '#3f3680', heroBg: '#2a0b1a',
    },
    content: {
      brand: 'Pinkypop', art: 'drink',
      hero: ['Something sweet', 'for right now'],
      sub: 'Cold drinks poured to order in three colours. Pick the one that matches your afternoon.',
      products: [
        { name: 'Strawberry Milk', desc: 'Fresh strawberry over cold whole milk.', tag: 'Classic', spec: 'Dairy, 16 oz' },
        { name: 'Peach Fizz', desc: 'White peach, soda and a lot of ice.', tag: 'Seasonal', spec: 'Vegan, 16 oz' },
        { name: 'Ube Float', desc: 'Purple yam cream with a vanilla cap.', tag: 'New', spec: 'Dairy, 12 oz' },
      ],
    },
  },
  {
    id: 'ember',
    name: 'Ember',
    tagline: 'Near-black, oversized type and almost no chrome. One ember-orange accent does the talking.',
    status: 'Preview',
    darkFirst: true,
    fonts: { display: '"Inter Tight", system-ui, sans-serif', body: '"Inter Tight", system-ui, sans-serif' },
    shape: { rCard: '0px', rCtl: '2px', rBtn: '999px', rImg: '0px', rProd: '0px', displayWeight: '500', displayLs: '-0.035em', displayLh: '1', displayScale: '1.3', cardBorder: 'transparent', labelCase: 'uppercase', labelLs: '0.03em' },
    light: {
      bg: '#0f0e0e', surface: '#191716', surface2: '#272423', fg: '#ffffff', muted: '#ffffff8c', border: '#ffffff2e',
      primary: '#ffffff', onPrimary: '#0f0e0e', btn2Bg: 'transparent', btn2Border: '#ffffff66',
      accent: '#ff5a2e', accentSoft: '#ff5a2e33',
      t1Bg: '#ffffff1f', t1Fg: '#ffffff', t2Bg: '#ffd98e29', t2Fg: '#ffd98e', t3Bg: '#ff5a2e33', t3Fg: '#ff9d80',
      art1: '#e9dfd2', art2: '#d6c7b1', art3: '#c2b5a4', heroBg: '#0f0e0e',
    },
    dark: {
      bg: '#000000', surface: '#0f0e0e', surface2: '#1c1a19', fg: '#ffffff', muted: '#ffffff8c', border: '#ffffff2e',
      primary: '#ffffff', onPrimary: '#000000', btn2Bg: 'transparent', btn2Border: '#ffffff66',
      accent: '#ff5a2e', accentSoft: '#ff5a2e33',
      t1Bg: '#ffffff1f', t1Fg: '#ffffff', t2Bg: '#ffd98e29', t2Fg: '#ffd98e', t3Bg: '#ff5a2e33', t3Fg: '#ff9d80',
      art1: '#e9dfd2', art2: '#d6c7b1', art3: '#c2b5a4', heroBg: '#000000',
    },
    content: {
      brand: 'Ember', art: 'ceramic',
      hero: ['Made slowly,', 'used daily'],
      sub: 'Wheel-thrown stoneware fired in small batches. Every piece is slightly off, which is the point.',
      products: [
        { name: 'Bud Vase', desc: 'Raw clay foot, iron-red glaze.', tag: 'New', spec: 'Stoneware, 18 cm' },
        { name: 'Serving Bowl', desc: 'Wide, shallow, olive matte glaze.', tag: 'Popular', spec: 'Stoneware, 26 cm' },
        { name: 'Tea Cup', desc: 'Sand glaze, sits well in two hands.', tag: 'Limited', spec: 'Stoneware, 200 ml' },
      ],
    },
  },
];

const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
/* Flat list of [cssVarName, value] for one theme + mode. */
function themeVars(t, mode) {
  const out = [['--ds-font-display', t.fonts.display], ['--ds-font-body', t.fonts.body]];
  for (const k in t.shape) out.push(['--ds-' + kebab(k), t.shape[k]]);
  for (const k in t[mode]) out.push(['--ds-' + kebab(k), t[mode][k]]);
  return out;
}
function themeCss(t) {
  const colorKeys = Object.keys(t.light);
  const base = themeVars(t, 'light').map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const dark = colorKeys.map((k) => `  --ds-${kebab(k)}: ${t.dark[k]};`).join('\n');
  return `/* ${t.name} · token theme */\n:root {\n${base}${t.darkFirst ? '\n  color-scheme: dark;' : ''}\n}\n\n[data-theme="dark"] {\n${dark}\n}\n`;
}
if (typeof module !== 'undefined') module.exports = { THEMES, themeVars, themeCss };
