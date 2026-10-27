import fs from 'fs';

// Prepares root index.html for Vite compilation by ensuring /src/main.jsx is the entry script
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf-8');
  // Strip previously built bundle tags
  content = content.replace(/<script type="module" crossorigin src=".*?"><\/script>/gi, '');
  content = content.replace(/<link rel="stylesheet" crossorigin href=".*?">/gi, '');
  // Standardize favicon reference if pointing to assets/
  content = content.replace(/\.\/assets\/favicon-[^"]+\.svg/g, './favicon.svg');
  // Strip lines that are only whitespace and collapse redundant spaces
  content = content.split(/\r?\n/).map(line => line.trimEnd()).filter((line, i, arr) => !(line === '' && arr[i - 1] === '')).join('\n');
  // Ensure /src/main.jsx entry script is present before </body>
  if (!content.includes('/src/main.jsx')) {
    content = content.replace('</body>', '    <script type="module" src="/src/main.jsx"></script>\n  </body>');
  }
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log('✓ Prepared index.html with /src/main.jsx source entry');
}
