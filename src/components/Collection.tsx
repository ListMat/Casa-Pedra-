'use client';

import React from 'react';
import Image from 'next/image';
import { useProjectPreferences } from '@/context/ProjectContext';

export function Collection() {
  const { setInterest } = useProjectPreferences();

  return (
    <section id="colecao" className="section collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 — MÓVEIS & ESPAÇOS</p>
          <h2 id="collection-title">
            <span className="motion-line">
              <span className="motion-line-inner">Mais que compor</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>Marcar presença</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Texturas, veios e proporções que tornam cada projeto particular. Da peça que
          reúne a família à parede que transforma o ambiente.
        </p>
      </div>
      <div className="project-grid">
        <article className="project">
          <figure>
            <div className="project-badges">
              <span className="project-badge">Chapa Única · Sob Medida</span>
              <span className="project-badge project-badge-sub">Produção em MG</span>
            </div>
            <Image
              src="/assets/console.webp"
              width={1448}
              height={1086}
              loading="lazy"
              alt="Conceito de aparador escultural claro em pedra com objeto decorativo"
            />
            <figcaption>Estudo visual gerado com IA · peça ilustrativa</figcaption>
          </figure>
          <div className="project-title">
            <h3>Móveis com identidade</h3>
            <span>01</span>
          </div>
          <p>
            Mesas, aparadores e objetos decorativos exclusivos, desenhados pelo
            arquiteto e pela designer de interiores da Casa Pedra.
          </p>
          <a
            className="text-link"
            href="#contato"
            data-interest="Móvel exclusivo"
            onClick={() => setInterest('Móvel exclusivo')}
          >
            Quero criar um móvel <span aria-hidden="true">↗</span>
          </a>
        </article>

        <article className="project project-offset">
          <figure>
            <div className="project-badges">
              <span className="project-badge">Selagem Hidro-óleo Repelente</span>
              <span className="project-badge project-badge-sub">Vistoria Técnica em SP</span>
            </div>
            <Image
              src="/assets/wall.webp"
              width={1448}
              height={1086}
              loading="lazy"
              alt="Conceito de revestimento de parede em pedra de veios expressivos em uma sala"
            />
            <figcaption>Estudo visual gerado com IA · ambiente ilustrativo</figcaption>
          </figure>
          <div className="project-title">
            <h3>Paredes que transformam</h3>
            <span>02</span>
          </div>
          <p>
            Revestimentos em pedra que levam textura, profundidade e personalidade para
            a arquitetura do seu espaço.
          </p>
          <a
            className="text-link"
            href="#contato"
            data-interest="Revestimento de parede"
            onClick={() => setInterest('Revestimento de parede')}
          >
            Quero transformar meu ambiente <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>
  );
}
