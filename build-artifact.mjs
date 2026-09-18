/* Generates docs/preview.html — the same page as index.html, but body-only,
   so it can be published as a shareable Artifact. Run: node build-artifact.mjs */
import fs from 'node:fs';

const src = fs.readFileSync('index.html', 'utf8');

const head = src.slice(src.indexOf('<head>'), src.indexOf('</head>'));
const fonts = head.match(/<link href="https:\/\/fonts\.googleapis\.com[\s\S]*?\/>/)[0];
const style = head.match(/<style>[\s\S]*?<\/style>/)[0];
const body = src.slice(src.indexOf('<body>') + 6, src.lastIndexOf('</body>'));

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/preview.html', `<title>Artjoms Suslovs</title>\n${fonts}\n${style}\n${body.trim()}\n`);
console.log('docs/preview.html written —', fs.statSync('docs/preview.html').size, 'bytes');
