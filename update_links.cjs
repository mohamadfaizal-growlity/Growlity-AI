const fs = require('fs');
const files = [
  'd:\\Project\\G-landing page\\src\\pages\\index.astro',
  'd:\\Project\\G-landing page\\code\\index.html'
];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace all <a href="#contact" ...> with <a href="#" onclick="event.preventDefault(); openModal();" ...>
  content = content.replace(/href="#contact"/g, 'href="#" onclick="event.preventDefault(); openModal();"');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}
