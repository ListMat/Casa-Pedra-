import React from 'react';

export function Process() {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 — DO DESEJO AO PROJETO</p>
          <h2 id="process-title">
            <span className="motion-line">
              <span className="motion-line-inner">Começa com uma ideia</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>A sua</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Você não precisa chegar com todas as respostas. Conte o que imagina e vamos
          conversar sobre as possibilidades.
        </p>
      </div>

      <div className="steps">
        <article>
          <span>01 / CONVERSA</span>
          <h3>Seu espaço e seu jeito</h3>
          <p>
            Compartilhe o ambiente, a cidade e o que você deseja criar. Referências e
            medidas aproximadas ajudam.
          </p>
        </article>

        <article>
          <span>02 / ORIENTAÇÃO</span>
          <h3>Escolhas com sentido</h3>
          <p>
            Converse com a equipe sobre materiais, acabamento e indicação de uso para o
            seu projeto.
          </p>
        </article>

        <article>
          <span>03 / PROPOSTA</span>
          <h3>Um projeto sob encomenda</h3>
          <p>
            Escopo, valores e prazos são definidos com a equipe, de acordo com as
            características de cada pedido.
          </p>
        </article>
      </div>
    </section>
  );
}
