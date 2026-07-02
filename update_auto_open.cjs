const fs = require('fs');
const files = [
  'd:\\Project\\G-landing page\\src\\pages\\index.astro',
  'd:\\Project\\G-landing page\\code\\index.html'
];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  const oldScriptStart = `// AGGRESSIVE AUTO-OPEN LOGIC`;
  const oldScriptMatch = content.indexOf(oldScriptStart);
  
  if (oldScriptMatch !== -1) {
    const scriptEnd = `</script>`;
    const scriptEndMatch = content.indexOf(scriptEnd, oldScriptMatch);
    if (scriptEndMatch !== -1) {
      const oldLogic = content.substring(oldScriptMatch, scriptEndMatch);
      const newLogic = `// UNIVERSAL AUTO-OPEN LOGIC (Once per session)
  window.addEventListener('load', () => {
    if (!sessionStorage.getItem('popupShown')) {
      setTimeout(() => {
        openModal();
        sessionStorage.setItem('popupShown', 'true');
      }, 500); // 500ms delay so they see the page first
    }
  });

  // Keep hash check for direct links
  if (window.location.hash === '#contact' || window.location.hash === '#notify') {
    setTimeout(openModal, 100);
  }
`;
      content = content.substring(0, oldScriptMatch) + newLogic + content.substring(scriptEndMatch);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}
