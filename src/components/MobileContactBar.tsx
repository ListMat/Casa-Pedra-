'use client';

import React, { useState, useEffect } from 'react';

export function MobileContactBar() {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsHidden(entries[0].isIntersecting);
        }
      },
      { threshold: 0 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`mobile-contact ${isHidden ? 'hidden' : ''}`}
      href="#contato"
      aria-label="Converse sobre seu projeto"
    >
      Converse sobre seu projeto <span aria-hidden="true">↗</span>
    </a>
  );
}
