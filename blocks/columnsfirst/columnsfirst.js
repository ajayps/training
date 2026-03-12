/**
 * columnsfirst block:
 * - Wrap the last word of the H2 in a .highlight span
 * - Add 'columnsfirst-img-col' to columns that contain only a <picture>
 * @param {Element} block
 */

function escapeHtml(str) {
  // minimal, safe escaping for text nodes we inject
  return str.replace(/[&<>\"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m]));
}

export default function decorate(block) {
  if (!block) return;

  // --- 1) Highlight last word of the H2 inside this block ---
  const h2 = block.querySelector('h2');
  if (h2 && !h2.querySelector('.highlight')) {
    const text = (h2.textContent || '').trim();
    if (text) {
      const parts = text.split(/\s+/);
      if (parts.length === 1) {
        // single word -> whole word highlighted
        h2.innerHTML = `<span class="highlight">${escapeHtml(parts[0])}</span>`;
      } else {
        const last = parts.pop();
        const first = parts.join(' ');
        h2.innerHTML = `${escapeHtml(first)} <span class="highlight">${escapeHtml(last)}</span>`;
      }
    }
  }

  // --- 2) Mark columns that are image-only with 'columnsfirst-img-col' ---
  const firstRow = block.firstElementChild;
  if (firstRow && firstRow.children) {
    const cols = [...firstRow.children];
    block.classList.add(`columnsfirst-${cols.length}-cols`);
  }

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is the only content in this column
          picWrapper.classList.add('columnsfirst-img-col');
        }
      }
    });
  });
}