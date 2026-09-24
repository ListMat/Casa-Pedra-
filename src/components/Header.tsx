'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#principal">
        Ir para o conteúdo
      </a>
      <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
        <Link className="brand" href="/" aria-label="Casa Pedra — início">
          casa pedra
          <span>MARMORARIA · DESIGN AUTORAL</span>
        </Link>
        <nav aria-label="Navegação principal">
          <a href="#atelier">Ateliê interativo</a>
          <a href="#transformacao">Ambientes</a>
          <a href="#essencia">Nossa essência</a>
        </nav>
        <a className="header-contact" href="#contato">
          Vamos criar sua peça <span aria-hidden="true">↗</span>
        </a>
      </header>
    </>
  );
}

