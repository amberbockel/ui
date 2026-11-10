/* Theme definitions. Each system is the same token contract with different values.
   Used by the site (browser) and by build.js (node) to emit themes/<id>.css. */
const THEMES = [
  {
    id: 'amber',
    name: 'amberbockel UI',
    tagline: 'Glass, gradients and a serif with opinions. The original, shipping as a React package.',
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
    id: 'blank',
    name: 'Blank',
    tagline: 'The neutral one. No personality of its own, so yours has somewhere to go.',
    status: 'Preview',
    fonts: { display: '"Hanken Grotesk", system-ui, sans-serif', body: '"Hanken Grotesk", system-ui, sans-serif' },
    shape: { rCard: '14px', rCtl: '10px', rBtn: '999px', rImg: '0px', rProd: '14px', displayWeight: '600', displayLs: '-0.025em', displayLh: '1.1', displayScale: '1' },
    light: {
      bg: '#f1f1f0', surface: '#ffffff', surface2: '#e8e8e6', fg: '#151413', muted: '#5e5c58', border: '#1514131f',
      primary: '#151413', onPrimary: '#ffffff', btn2Bg: '#e8e8e6', btn2Border: 'transparent',
      accent: '#2f5bff', accentSoft: '#2f5bff1a',
      t1Bg: '#d6e4ff', t1Fg: '#1d3f99', t2Bg: '#d5ecd3', t2Fg: '#1f5a25', t3Bg: '#fbe8a8', t3Fg: '#6b4e00',
      art1: '#dcdcda', art2: '#d4d4d1', art3: '#e2e2e0', heroBg: '#f1f1f0',
    },
    dark: {
      bg: '#121211', surface: '#1c1c1b', surface2: '#2a2a28', fg: '#f3f2ef', muted: '#a9a7a2', border: '#ffffff24',
      primary: '#f3f2ef', onPrimary: '#151413', btn2Bg: '#2a2a28', btn2Border: 'transparent',
      accent: '#8fa8ff', accentSoft: '#8fa8ff26',
      t1Bg: '#22335f', t1Fg: '#c3d3ff', t2Bg: '#1f3a22', t2Fg: '#bfe5bd', t3Bg: '#463a10', t3Fg: '#f5dd8f',
      art1: '#2c2c2a', art2: '#343432', art3: '#262624', heroBg: '#121211',
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
    id: 'kiln',
    name: 'Kiln',
    tagline: 'Matte, square-shouldered and slow. Built for products that want the room quiet.',
    status: 'Preview',
    fonts: { display: '"Red Hat Display", system-ui, sans-serif', body: '"Red Hat Text", system-ui, sans-serif' },
    shape: { rCard: '6px', rCtl: '4px', rBtn: '4px', rImg: '0px', rProd: '6px', displayWeight: '600', displayLs: '0', displayLh: '1.15', displayScale: '1.05' },
    light: {
      bg: '#ebe9e4', surface: '#f7f6f2', surface2: '#dedbd3', fg: '#2b2925', muted: '#6a665e', border: '#2b292533',
      primary: '#2b2925', onPrimary: '#f7f6f2', btn2Bg: 'transparent', btn2Border: '#2b2925',
      accent: '#a4502c', accentSoft: '#a4502c22',
      t1Bg: '#d9dde6', t1Fg: '#33405c', t2Bg: '#d8dcc4', t2Fg: '#454a22', t3Bg: '#edd6c6', t3Fg: '#7a3a1c',
      art1: '#d9d6cf', art2: '#d3d0c8', art3: '#dddad3', heroBg: '#ebe9e4',
    },
    dark: {
      bg: '#1b1a18', surface: '#252320', surface2: '#33302b', fg: '#ece8df', muted: '#aaa498', border: '#ece8df33',
      primary: '#ece8df', onPrimary: '#1b1a18', btn2Bg: 'transparent', btn2Border: '#ece8df',
      accent: '#d98a63', accentSoft: '#d98a6326',
      t1Bg: '#2c3447', t1Fg: '#c9d3ea', t2Bg: '#34381f', t2Fg: '#d5dbb4', t3Bg: '#4a2c1d', t3Fg: '#efcdb8',
      art1: '#2e2c28', art2: '#34322d', art3: '#2a2825', heroBg: '#1b1a18',
    },
    content: {
      brand: 'Kiln', art: 'ceramic',
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
  return `/* ${t.name} · token theme */\n:root {\n${base}\n}\n\n[data-theme="dark"] {\n${dark}\n}\n`;
}
if (typeof module !== 'undefined') module.exports = { THEMES, themeVars, themeCss };
