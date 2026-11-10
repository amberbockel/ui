// Generates framer/colourways-embed.html: a palette-only switcher for the Framer site.
// It overrides Framer's colour-style variables. Fonts, radii and layout are NOT changed.
const fs = require('fs'), path = require('path');
const { THEMES } = require('../src/themes.js');
// amberbockel.com colour styles (Framer token id -> token key in our themes)
const MAP = {
  'f0e52cc5-6c0c-4a35-83a8-a9aa10767bd0': 'bg',        // Background Primary
  '5fde4758-2820-4a71-aa02-e12442368bdc': 'surface2',  // Background Secondary
  'e812c0bf-3a89-4e2d-b5df-408417580fa0': 'surface2',  // Background Secondary Copy
  'e41565c9-1841-4d95-9f5c-3eddc6c5b71f': 'fg',        // Text Primary
  'b4cfa21f-fe20-468c-942a-7353995b9744': 'muted',     // Text Secondary
  '019f9473-48fa-45f7-9b88-bd0e581a40ff': 'onPrimary', // Text Inverted
  '79c6024b-ba8c-442c-8913-a085b6108c99': 'accent',    // Brand
  'f8d5686b-4bd1-4bb3-8397-be6426e20354': 'accent',    // Text Badge
  'de2085f8-2ba1-4fdd-b63d-681fcdc3d8ad': 'border',    // Border
  'f5cfe51a-325f-4393-919e-bba79ceab161': 'fg',        // Hover
  '9f4f7756-77c2-4608-a166-124db0297b9f': 'surface',   // White
  '219c2d29-187a-40f8-aab3-a7af9bd91f3b': 'surface',   // Absolute White
  'a0464eb8-baba-428a-bf1d-8f7949994f7d': 'bg',        // Light 96
  '32c8f298-47e5-4011-8bd5-6f4cceb9f84e': 'surface2',  // Light 85
  '4743cf5e-b6f4-46c8-9f30-bbba0368c6e7': 'primary',   // Dark 12
  '6ba87c4b-8f80-4906-90b8-e7166e99f2a7': 'muted',     // Grey 30
};
const ways = THEMES.filter((t) => !t.external);
const css = ways.map((t) => `html[data-colourway="${t.id}"] body{${Object.entries(MAP).map(([id, k]) => `--token-${id}:${t.light[k]}`).join(';')}}`).join('\n');
const swatches = [{ id: 'default', name: 'Original', a: '#ffffff', b: '#e69ee0' }].concat(ways.map((t) => ({ id: t.id, name: t.name, a: t.light.bg, b: t.light.accent })));
const SYSTEMS_URL = process.env.SYSTEMS_URL || '';
const out = `<!-- ============================================================
  Colourways for amberbockel.com
  Palette only: this recolours the site. It does not change fonts, corner radii or layout.

  BLOCK 1 goes in Framer > Site Settings > General > Custom Code > "Start of <head> tag"
  BLOCK 2 goes in "End of <body> tag"
  To remove it, delete both blocks and publish.
============================================================ -->

<!-- BLOCK 1: start of <head>. Applies the saved colourway before first paint. -->
<script>try{var c=localStorage.getItem('ab-colourway');if(c&&c!=='default')document.documentElement.setAttribute('data-colourway',c)}catch(e){}</script>

<!-- BLOCK 2: end of <body>. -->
<style id="ab-colourways">
${css}
.abcw{position:fixed;left:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.92);color:#14151a;border:1px solid rgba(0,0,0,.12);box-shadow:0 4px 16px rgba(0,0,0,.12);font:500 12px/1 "DM Sans",system-ui,sans-serif;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.abcw span{letter-spacing:.06em;text-transform:uppercase;font-size:11px;opacity:.7}
.abcw button{width:22px;height:22px;border-radius:999px;border:1px solid rgba(0,0,0,.2);padding:0;cursor:pointer;background:linear-gradient(135deg,var(--a) 50%,var(--b) 50%)}
.abcw button[aria-pressed="true"]{outline:2px solid #14151a;outline-offset:2px}
.abcw button:focus-visible{outline:2px solid #5b93ff;outline-offset:2px}
.abcw a{color:inherit;font-size:11px;margin-left:2px}
@media print{.abcw{display:none}}
</style>
<script>
(function(){
  var KEY='ab-colourway', WAYS=${JSON.stringify(swatches)}, URL=${JSON.stringify(SYSTEMS_URL)}, root=document.documentElement;
  function current(){return root.getAttribute('data-colourway')||'default'}
  function set(id){ if(id==='default')root.removeAttribute('data-colourway'); else root.setAttribute('data-colourway',id); try{localStorage.setItem(KEY,id)}catch(e){} paint() }
  var bar;
  function paint(){ if(!bar)return; var b=bar.querySelectorAll('button'); for(var i=0;i<b.length;i++)b[i].setAttribute('aria-pressed',String(b[i].getAttribute('data-id')===current())) }
  function build(){
    if(document.querySelector('.abcw'))return;
    bar=document.createElement('div'); bar.className='abcw'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','Colourway');
    var label=document.createElement('span'); label.textContent='Colourway'; bar.appendChild(label);
    WAYS.forEach(function(w){ var b=document.createElement('button'); b.type='button'; b.setAttribute('data-id',w.id); b.title=w.name; b.setAttribute('aria-label',w.name+' colourway'); b.style.setProperty('--a',w.a); b.style.setProperty('--b',w.b); b.addEventListener('click',function(){set(w.id)}); bar.appendChild(b) });
    if(URL){ var a=document.createElement('a'); a.href=URL; a.target='_blank'; a.rel='noopener'; a.textContent='Full systems'; bar.appendChild(a) }
    document.body.appendChild(bar); paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build); else build();
})();
</script>
`;
fs.writeFileSync(path.join(__dirname, 'colourways-embed.html'), out);
console.log('wrote framer/colourways-embed.html', out.length, 'bytes');
