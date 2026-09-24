import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="Casa Pedra — início">
          casa pedra
          <span>MARMORARIA · DESIGN AUTORAL</span>
        </Link>
        <p>
          Da natureza.
          <br />
          Para a sua história.
        </p>
        <a href="#principal">Voltar ao topo ↑</a>
      </div>
      <div className="footer-note">
        <p>
          Projeto conceitual para teste técnico. Nome e contato fictícios. Imagens
          ilustrativas geradas com IA, sem representar obras realizadas.
        </p>
      </div>
    </footer>
  );
}
