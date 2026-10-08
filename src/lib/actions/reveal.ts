import type { Action } from 'svelte/action';

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );
  return observer;
}

/**
 * Fades an element up once it enters the viewport.
 * Pass a delay in ms to stagger siblings. Styling lives in app.css ([data-reveal]).
 */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
  node.setAttribute('data-reveal', '');
  if (delay) node.style.setProperty('--d', `${delay}ms`);

  const io = getObserver();
  io.observe(node);

  return {
    update(next = 0) {
      node.style.setProperty('--d', `${next}ms`);
    },
    destroy() {
      io.unobserve(node);
    },
  };
};
