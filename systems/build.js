// Builds Open Systems from systems/src.
//   node systems/build.js --site <dir>     the static site (index.html, components.css, themes/*.css)
//   node systems/build.js --themes <dir>   only the theme CSS, for the npm package
//   node systems/build.js --artifact <file>  the page without a document shell, for preview hosts
const fs = require('fs');
const path = require('path');
const r = (f) => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const { THEMES, themeCss } = require('./src/themes.js');
const arg = (name) => { const i = process.argv.indexOf('--' + name); return i > -1 ? path.resolve(process.argv[i + 1]) : null; };

function writeThemes(dir) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'components.css'), r('components.css'));
  for (const t of THEMES.filter((x) => !x.external)) fs.writeFileSync(path.join(dir, t.id + '.css'), themeCss(t));
}

const themesSrc = r('themes.js').replace(/if \(typeof module[^\n]*\n?/, '');
const page = r('page.html')
  .replace('/*SHELL*/', () => r('shell.css'))
  .replace('/*COMPONENTS*/', () => r('components.css'))
  .replace('/*THEMES*/', () => themesSrc)
  .replace('/*APP*/', () => r('app.js'));

const site = arg('site'), themes = arg('themes'), artifact = arg('artifact');
if (site) {
  const head = page.slice(0, page.indexOf('<header'));
  const body = page.slice(page.indexOf('<header'));
  fs.mkdirSync(site, { recursive: true });
  fs.writeFileSync(path.join(site, 'index.html'), `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}[hidden]{display:none!important}</style>\n${head}</head>\n<body>\n${body}</body>\n</html>\n`);
  writeThemes(path.join(site, 'themes'));
  console.log('site ->', site);
}
if (themes) { writeThemes(themes); console.log('themes ->', themes); }
if (artifact) { fs.mkdirSync(path.dirname(artifact), { recursive: true }); fs.writeFileSync(artifact, page); console.log('artifact ->', artifact); }
if (!site && !themes && !artifact) console.log('nothing to do: pass --site, --themes or --artifact');
