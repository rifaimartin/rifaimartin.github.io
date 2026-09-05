import fs from 'fs';
import path from 'path';

// Note: root index.html must keep <script type="module" src="/src/main.jsx"></script>
// so that Vite can always compile from source on every build.
// GitHub Pages deploys dist/ directly via .github/workflows/deploy.yml.

// Clean old hashed index bundles in assets/
if (fs.existsSync('assets')) {
  const oldFiles = fs.readdirSync('assets');
  oldFiles.forEach((f) => {
    if (f.startsWith('index-') && (f.endsWith('.js') || f.endsWith('.css'))) {
      try {
        fs.unlinkSync(path.join('assets', f));
      } catch {}
    }
  });
}

// Copy new build asset files from dist/assets to assets/
if (fs.existsSync('dist/assets')) {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets', { recursive: true });
  }
  const files = fs.readdirSync('dist/assets');
  files.forEach((f) => {
    fs.copyFileSync(path.join('dist/assets', f), path.join('assets', f));
  });
  console.log(`✓ Synced ${files.length} build asset files to assets/`);
}

