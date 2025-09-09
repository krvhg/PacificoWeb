document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyBtn');
  const ipEl = document.getElementById('serverIp');
  const msg = document.getElementById('copyMsg');

  function show(text = 'IP copiada correctamente', ms = 1500) {
    msg.textContent = text;
    msg.classList.add('visible');
    msg.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      msg.classList.remove('visible');
      msg.setAttribute('aria-hidden', 'true');
    }, ms);
  }

  copyBtn.addEventListener('click', async () => {
    const text = ipEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      show();
    } catch {
      // fallback para navegadores antiguos
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); show(); } catch { show('No se pudo copiar'); }
      ta.remove();
    }
  });
});

