// Resolve corpus viewer — minimal client-side search.
// Loads search-index.json and filters the index list by title/subtitle/number.

(function () {
  const input = document.getElementById('search-input');
  const list = document.getElementById('index-list');
  const noResults = document.getElementById('search-no-results');
  if (!input || !list) return;

  let docs = null;

  async function loadIndex() {
    if (docs !== null) return docs;
    try {
      const res = await fetch('/dist/search-index.json', { cache: 'force-cache' });
      if (!res.ok) {
        // Fallback for opening dist/index.html directly.
        const res2 = await fetch('search-index.json', { cache: 'force-cache' });
        docs = await res2.json();
      } else {
        docs = await res.json();
      }
    } catch (e) {
      docs = [];
    }
    return docs;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderResults(items) {
    if (!items.length) {
      list.innerHTML = '';
      noResults.classList.add('visible');
      return;
    }
    noResults.classList.remove('visible');
    list.innerHTML = items.map(d =>
      '<li><a href="' + escapeHtml(d.href) + '">' +
        '<span class="doc-num">' + escapeHtml(d.label) + '</span>' +
        '<span class="doc-title">' + escapeHtml(d.title) + '</span>' +
      '</a></li>'
    ).join('');
  }

  function filter(query) {
    if (!docs) return;
    const q = query.trim().toLowerCase();
    if (!q) { renderResults(docs); return; }
    const tokens = q.split(/\s+/);
    const matched = docs.filter(d => {
      const hay = (d.label + ' ' + d.title + ' ' + (d.subtitle || '')).toLowerCase();
      return tokens.every(t => hay.includes(t));
    });
    renderResults(matched);
  }

  input.addEventListener('input', () => filter(input.value));

  loadIndex().then(() => {
    if (input.value) filter(input.value);
  });
})();
