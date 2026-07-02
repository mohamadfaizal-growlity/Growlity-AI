import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = fs.readFileSync(path.join(__dirname, 'src/pages/index.astro'), 'utf8');

// Extract CSS
const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
const cssContent = cssMatch ? cssMatch[1].trim() : '';

// Extract JS
// There is an inline script tag.
const jsMatch = content.match(/<script is:inline>([\s\S]*?)<\/script>/);
const jsContent = jsMatch ? jsMatch[1].trim() : '';

// Create HTML/PHP
let phpContent = content;
phpContent = phpContent.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="style.css">');
phpContent = phpContent.replace(/<script is:inline>[\s\S]*?<\/script>/, '<script src="script.js"></script>');
phpContent = phpContent.replace(/<script is:inline src="(.*?)"><\/script>/g, '<script src="$1"></script>');

const outDir = path.join(__dirname, 'code');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'style.css'), cssContent);
fs.writeFileSync(path.join(outDir, 'script.js'), jsContent);
fs.writeFileSync(path.join(outDir, 'index.php'), phpContent);

console.log('Files generated successfully in code/ directory.');
