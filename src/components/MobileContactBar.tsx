'use client';

import React, { useState, useEffect } from 'react';
import { useProjectPreferences } from '@/context/ProjectContext';
import { getComposition } from '@/data/compositions';

export function MobileContactBar() {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { context, interest, hasContext } = useProjectPreferences();

  const selectedComposition = context.composition ? getComposition(context.composition) : null;

  let dynamicLabel = 'Converse sobre seu projeto';
  if (selectedComposition) {
    dynamicLabel = `Consultar ${selectedComposition.piece}`;
  } else if (interest) {
    dynamicLabel = `Consultar ${interest}`;
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const heroSection = document.querySelector('.hero-gallery');
    const contactSection = document.getElementById('contato');

    let heroVisible = true;
    let contactVisible = false;

    const updateVisibility = () => {
      setIsHidden(heroVisible || contactVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroSection) {
            heroVisible = entry.isIntersecting;
          }
          if (entry.target === contactSection) {
            contactVisible = entry.isIntersecting;
          }
        });
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    if (heroSection) observer.observe(heroSection);
    if (contactSection) observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`mobile-contact ${isHidden ? 'hidden' : ''} ${hasContext ? 'has-context' : ''}`}
      href="#contato"
      aria-label={dynamicLabel}
    >
      <div className="mobile-contact-text">
        <span className="mobile-contact-title">{dynamicLabel}</span>
        {selectedComposition && (
          <span className="mobile-contact-sub">{selectedComposition.label}</span>
        )}
      </div>
      <span className="mobile-contact-icon" aria-hidden="true">↗</span>
    </a>
  );
}

