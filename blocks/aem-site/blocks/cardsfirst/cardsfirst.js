// This file contains the JavaScript logic for the "columnsfirst" block. 
// It transforms the block's structure into a column layout, creating 
// responsive columns based on the block's children.

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'columnsfirst';

  [...block.children].forEach((row) => {
    const column = document.createElement('div');
    column.className = 'columnsfirst-column';
    
    while (row.firstElementChild) {
      column.append(row.firstElementChild);
    }

    section.append(column);
  });

  block.replaceChildren(section);
}