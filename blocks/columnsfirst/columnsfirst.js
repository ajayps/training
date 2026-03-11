import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'columnsfirst';

  const columns = document.createElement('div');
  columns.className = 'columnsfirst-container';

  [...block.children].forEach((row) => {
    const column = document.createElement('div');
    column.className = 'columnsfirst-column';
    
    while (row.firstElementChild) {
      column.append(row.firstElementChild);
    }

    columns.append(column);
  });

  columns.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });

  section.append(columns);
  block.replaceChildren(section);
}