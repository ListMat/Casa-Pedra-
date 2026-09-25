import React from 'react';

export function Essence() {
  return (
    <section id="essencia" className="essence section" aria-labelledby="essence-title">
      <div className="essence-intro">
        <p className="eyebrow">02 — NOSSA ESSÊNCIA</p>
        <h2 id="essence-title">
          <span className="motion-line">
            <span className="motion-line-inner">Olhar de designer</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">Conhecimento de quem</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">
              <em>vive a pedra</em>
            </span>
          </span>
        </h2>
        <p>
          Uma empresa familiar com matriz e produção em São Paulo. Há 27 anos,
          aproximamos a riqueza das rochas de quem valoriza arquitetura e design.
        </p>
      </div>

      <div className="principles">
        <article>
          <span>01</span>
          <div>
            <h3>Design dentro de casa</h3>
            <p>
              Arquiteto e designer de interiores da própria equipe criam peças
              exclusivas, unindo intenção estética e conhecimento do material.
            </p>
          </div>
        </article>

        <article>
          <span>02</span>
          <div>
            <h3>O material certo para cada uso</h3>
            <p>
              Mármores, granitos, limestones e quartzitos com impermeabilização hidro-óleo repelente de fábrica. Indicamos a rocha e o acabamento ideais para a rotina do seu espaço.
            </p>
          </div>
        </article>

        <article>
          <span>03</span>
          <div>
            <h3>Um novo olhar para as sobras</h3>
            <p>
              Reaproveitar sobras de pedra faz parte das ações da Casa Pedra. Uma forma
              de valorizar a matéria e abrir espaço para novas possibilidades de criação.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
