/**
 * EDS block: carousel
 * - Works with the author-friendly structure you posted:
 *   .carousel.block > div (slide) > div (media <picture>) + div (body content)
 * - Adds nav arrows, slide index, autoplay, keyboard control.
 * - Minimal DOM changes: only adds classes and helper elements.
 */
const AUTO_MS = 6000; // set to 0 to disable autoplay

function clamp(i, len) {
  return (i + len) % len;
}

function setActive(slides, idx) {
  slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
}

function updateIndex(out, curr, total) {
  if (!out) return;
  const txt = `${curr + 1} / ${total}`;
  out.value = txt;
  out.textContent = txt;
}

export default function decorate(block) {
  block.classList.add('carousel');

  // Each top-level <div> is a slide produced by EDS from the authoring doc.
  const slides = [...block.children];
  if (!slides.length) return;

  // Label/prepare each slide and its 2 child columns
  slides.forEach((slide, i) => {
    slide.classList.add('carousel__slide');
    const cols = [...slide.children];
    const media = cols[0];
    const body = cols[1];

    media?.classList.add('carousel__media'); // contains <picture>
    body?.classList.add('carousel__body');

    // Better image decoding/loading
    const img = media?.querySelector('img');
    if (img) {
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.setAttribute('aria-hidden', 'true');
    }
  });

  // Add nav
  const nav = document.createElement('div');
  nav.className = 'carousel__nav';
  const prev = document.createElement('button');
  prev.className = 'carousel__btn prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = '‹';
  const next = document.createElement('button');
  next.className = 'carousel__btn next';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = '›';
  nav.append(prev, next);
  block.append(nav);

  // Add index
  const idx = document.createElement('output');
  idx.className = 'carousel__index';
  idx.setAttribute('aria-live', 'polite');
  block.append(idx);

  // State & helpers
  let current = 0;
  const total = slides.length;

  function go(delta) {
    current = clamp(current + delta, total);
    setActive(slides, current);
    updateIndex(idx, current, total);
  }

  // Init first slide
  setActive(slides, current);
  updateIndex(idx, current, total);

  // Autoplay
  let timer = null;

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (AUTO_MS > 0) {
      timer = setInterval(() => go(1), AUTO_MS);
    }
  };

  // Events
  prev.addEventListener('click', () => {
    go(-1);
    start();
  });
  next.addEventListener('click', () => {
    go(1);
    start();
  });

  // Pause on hover/focus
  block.addEventListener('pointerenter', stop);
  block.addEventListener('pointerleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', start);

  // Keyboard navigation
  block.tabIndex = 0;
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
      start();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
      start();
    }
  });

  start();
}
