import React from 'react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span></span> DESIGN AUTORAL. MATÉRIA NATURAL.
        </p>
        <h1 id="hero-title">
          <span className="motion-line">
            <span className="motion-line-inner">A natureza cria.</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">A gente dá forma.</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">
              <em>Você vive.</em>
            </span>
          </span>
        </h1>
        <p className="hero-description">
          Móveis exclusivos em pedra e revestimentos sob encomenda. Desenhados para
          fazer parte da sua casa — e da sua história.
        </p>
        <a className="button" href="#contato">
          Converse sobre seu projeto <span aria-hidden="true">↗</span>
        </a>
        <div className="hero-footnote">
          <span>Design da própria casa</span>
          <span>Showroom em São Paulo</span>
        </div>
      </div>
      <figure className="hero-image">
        <Image
          src="/assets/hero.webp"
          width={1672}
          height={941}
          alt="Conceito de mesa escultural em pedra verde em uma sala de jantar contemporânea"
          priority
        />
        <figcaption>
          <span>01 / A PEDRA COMO PROTAGONISTA</span>
          <span>Estudo visual · IA</span>
        </figcaption>
      </figure>
    </section>
  );
}
