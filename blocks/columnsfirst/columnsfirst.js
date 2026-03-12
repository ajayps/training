/**
 * decorate block: wrap the last word of the H2 in a .highlight span
 * @param {Element} block
 */
export default async function decorate(block) {
  if (!block) return;
  const h2 = block.querySelector('h2');
  if (!h2) return;
  // avoid re-wrapping
  if (h2.querySelector('.highlight')) return;

  // Use textContent to avoid accidental HTML injection from authors.
  const text = h2.textContent.trim();
  if (!text) return;
  const parts = text.split(/\s+/);
  if (parts.length === 1) {
    h2.innerHTML = `<span class="highlight">${escapeHtml(parts[0])}</span>`;
    return;
  }
  const last = parts.pop();
  const first = parts.join(' ');
  h2.innerHTML = `${escapeHtml(first)} <span class="highlight">${escapeHtml(last)}</span>`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columnsfirst-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columnsfirst-img-col');
        }
      }
    });
  });
}
