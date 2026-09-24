import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <>
      <a className="skip" href="#principal">
        Ir para o conteúdo
      </a>
      <header className="header">
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
