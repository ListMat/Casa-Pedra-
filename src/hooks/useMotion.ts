'use client';

import { useEffect, useRef } from 'react';

const EASE = 'cubic-bezier(.22,1,.36,1)';

export function isMotionEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  return (
    !reduced.matches &&
    !document.hidden &&
    typeof Element.prototype.animate === 'function'
  );
}

export function animateElement(
  element: Element | null,
  frames: Keyframe[] | PropertyIndexedKeyframes,
  options: KeyframeAnimationOptions = {}
): Animation | null {
  if (!element || !(element instanceof HTMLElement) || !isMotionEnabled()) return null;
  try {
    const animation = element.animate(frames, {
      duration: 420,
      easing: EASE,
      ...options
    });
    return animation;
  } catch {
    return null;
  }
}

export function revealElements(
  elements: ArrayLike<Element> | Element[] | HTMLCollection,
  distance = 14
): void {
  if (!isMotionEnabled()) return;
  const arr = Array.from(elements).filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );
  arr.forEach((element, index) => {
    animateElement(
      element,
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 420,
        delay: Math.min(index * 60, 180),
        fill: 'backwards'
      }
    );
  });
}

/**
 * Hook to trigger scroll reveal animations on section titles, paragraphs,
 * lists and photo shutters, with cleanup on unmount.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const activeAnimations = new Set<Animation>();

    const stopAll = () => {
      activeAnimations.forEach((anim) => anim.cancel());
      activeAnimations.clear();
    };

    const handleReducedChange = () => {
      if (reducedQuery.matches) stopAll();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopAll();
    };

    reducedQuery.addEventListener('change', handleReducedChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const safeAnimate = (
      el: HTMLElement,
      frames: Keyframe[] | PropertyIndexedKeyframes,
      opts: KeyframeAnimationOptions
    ) => {
      if (!isMotionEnabled()) return;
      const anim = el.animate(frames, opts);
      activeAnimations.add(anim);
      const done = () => activeAnimations.delete(anim);
      anim.finished.then(done, done);
    };

    const jobs = new Map<Element, () => void>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const job = jobs.get(entry.target);
          jobs.delete(entry.target);
          if (isMotionEnabled() && job) {
            job();
          }
        });
      },
      { threshold: 0.12 }
    );

    const observe = (element: Element | null, job: () => void) => {
      if (element) {
        jobs.set(element, job);
        observer.observe(element);
      }
    };

    // Hero title lines initial animation
    if (!window.location.hash) {
      const heroLines = document.querySelectorAll('.hero h1 .motion-line-inner');
      heroLines.forEach((line, index) => {
        if (line instanceof HTMLElement) {
          safeAnimate(
            line,
            [{ transform: 'translateY(8px)' }, { transform: 'translateY(0)' }],
            { duration: 550, delay: index * 55, easing: EASE }
          );
        }
      });
    }

    // Section headings h2
    document.querySelectorAll('.section h2').forEach((heading) => {
      observe(heading, () => {
        heading.querySelectorAll('.motion-line-inner').forEach((line, index) => {
          if (line instanceof HTMLElement) {
            safeAnimate(
              line,
              [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }],
              {
                duration: 620,
                delay: index * 65,
                fill: 'backwards',
                easing: EASE
              }
            );
          }
        });
      });
    });

    // Subheadings and paragraphs
    document
      .querySelectorAll('.section-heading > p, .essence-intro > p:last-child')
      .forEach((element) => {
        if (element instanceof HTMLElement) {
          observe(element, () => {
            revealElements([element], 12);
          });
        }
      });

    // Steps and principles groups
    document.querySelectorAll('.steps, .principles').forEach((group) => {
      if (group instanceof HTMLElement) {
        observe(group, () => {
          revealElements(group.children, 18);
        });
      }
    });

    // Project shutters
    document.querySelectorAll('.project figure').forEach((figure) => {
      if (figure instanceof HTMLElement) {
        observe(figure, () => {
          const shutter = document.createElement('span');
          shutter.className = 'motion-shutter';
          shutter.setAttribute('aria-hidden', 'true');
          figure.append(shutter);
          if (isMotionEnabled()) {
            const anim = shutter.animate(
              [{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }],
              { duration: 650, easing: EASE }
            );
            activeAnimations.add(anim);
            const removeShutter = () => {
              activeAnimations.delete(anim);
              shutter.remove();
            };
            anim.finished.then(removeShutter, removeShutter);
          } else {
            shutter.remove();
          }
        });
      }
    });

    return () => {
      observer.disconnect();
      stopAll();
      reducedQuery.removeEventListener('change', handleReducedChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return containerRef;
}
