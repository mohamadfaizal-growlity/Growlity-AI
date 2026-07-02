const fs = require('fs');

const files = [
  'd:\\Project\\G-landing page\\src\\pages\\index.astro',
  'd:\\Project\\G-landing page\\code\\index.html',
  'd:\\Project\\G-landing page\\code\\growlity-secret-panel\\index.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/<!-- CONTACT -->[\s\S]*?<!-- MODAL \(for growlity\.com Notify Me trigger\) -->/g, '<!-- MODAL -->');

  content = content.replace(/<p class="eyebrow">Stay Updated<\/p>/, '<p class="eyebrow">Get in Touch</p>');
  content = content.replace(/<div class="modal-title">Get Early Access to ESG intelligence platform<\/div>/, `<div class="modal-title">Let's start your ESG journey</div>`);
  content = content.replace(/<p class="modal-sub">Be the first to know when new features launch\. Enter your details below\.<\/p>/, '<p class="modal-sub">Fill in your details and our team will reach out within 24 hours.</p>');
  content = content.replace(/<button type="submit" class="cf-submit">Notify Me →<\/button>/, '<button type="submit" class="cf-submit">Request a Demo →</button>');
  
  content = content.replace(/async function handleContactSubmit\(e\) {[\s\S]*?}[\s\n]+async function handleModalSubmit/, 'async function handleModalSubmit');

  const oldScriptStart = `// AGGRESSIVE AUTO-SCROLL LOGIC`;
  const oldScriptMatch = content.indexOf(oldScriptStart);
  
  if (oldScriptMatch !== -1) {
    const scriptEnd = `</script>`;
    const scriptEndMatch = content.indexOf(scriptEnd, oldScriptMatch);
    if (scriptEndMatch !== -1) {
      const oldLogic = content.substring(oldScriptMatch, scriptEndMatch);
      const newLogic = `// Intercept all links to #contact and open modal instead
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // AGGRESSIVE AUTO-OPEN LOGIC
  const ref = document.referrer.toLowerCase();
  const url = window.location.href.toLowerCase();
  
  const isFromGrowlity = (ref.includes('growlity') && !ref.includes('vercel.app')) || 
                         url.includes('source=growlity') || 
                         url.includes('notify');
  
  if (isFromGrowlity || window.location.hash === '#contact') {
    const modalBtn = document.querySelector('#modal-form .cf-submit');
    if (modalBtn && url.includes('notify')) {
      modalBtn.innerHTML = 'Notify Me &rarr;';
    }
    
    const forceOpen = () => {
      openModal();
    };
    
    forceOpen();
    window.addEventListener('load', forceOpen);
    setTimeout(forceOpen, 300);
  }
`;
      content = content.substring(0, oldScriptMatch) + newLogic + content.substring(scriptEndMatch);
    }
  }

  content = content.replace(/document\.getElementById\('contact-form'\)\.style\.display = 'none';\n/g, '');
  content = content.replace(/document\.getElementById\('cf-success'\)\.style\.display = 'block';\n/g, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}
