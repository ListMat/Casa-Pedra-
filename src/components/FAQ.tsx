import React from 'react';

export function FAQ() {
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div>
        <p className="eyebrow">04 — ESCOLHAS BEM INFORMADAS</p>
        <h2 id="faq-title">
          <span className="motion-line">
            <span className="motion-line-inner">Beleza para olhar.</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">
              <em>Segurança para escolher.</em>
            </span>
          </span>
        </h2>
        <p>
          Algumas respostas para começar.
          <br />
          A orientação final depende do material e do uso.
        </p>
      </div>

      <div className="faq-list">
        <details>
          <summary>
            Qual é o prazo médio de produção e entrega?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            O prazo médio varia entre <strong>30 e 50 dias úteis</strong> a partir da aprovação do desenho técnico e confirmação das medidas. Cada peça é esculpida sob demanda com rigor artesanal e controle minucioso de acabamento.
          </p>
        </details>

        <details>
          <summary>
            Como funciona a entrega e montagem em apartamentos e edifícios?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Nossa equipe técnica realiza a vistoria prévia de acessos (vãos de porta, corredores e capacidade de elevadores de serviço). Para peças de grandes dimensões ou tampos inteiriços em andares altos, coordenamos o serviço especializado de içamento externo com total segurança.
          </p>
        </details>

        <details>
          <summary>
            A pedra mancha facilmente? Como funciona a proteção para o dia a dia?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Todas as nossas peças recebem tratamento profissional de impermeabilização e selagem hidro-óleo repelente de fábrica, bloqueando a absorção rápida de líquidos como café, vinho e óleos. A manutenção diária é simples, feita apenas com pano macio, água e sabão neutro.
          </p>
        </details>

        <details>
          <summary>
            Posso personalizar medidas, formatos e acabamentos?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Sim. As referências do nosso Ateliê servem como ponto de partida conceitual. Desenvolvemos peças em dimensões milimétricas para o seu espaço, com opções de acabamento superficial (levigado fosco, polido ou escovado) e perfis de borda personalizados.
          </p>
        </details>

        <details>
          <summary>
            Vocês atendem projetos em parceria com arquitetos?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Sim. Trabalhamos em estreita colaboração com escritórios de arquitetura e design de interiores, fornecendo suporte técnico de especificação de rochas, amostras físicas, detalhamento executivo e compatibilização estrutural.
          </p>
        </details>

        <details>
          <summary>
            Posso ver as pedras de perto antes de decidir?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Sim. Recebemos clientes e profissionais em nosso showroom e ateliê em São Paulo com hora marcada, onde é possível tocar nas texturas, apreciar a variação natural dos veios sob luz natural e selecionar as chapas exclusivas do seu projeto.
          </p>
        </details>

        <details>
          <summary>
            Quais regiões vocês atendem?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Atendemos toda a cidade de São Paulo (com ênfase nas zonas oeste, sul e central), Grande São Paulo, Alphaville, interior e litoral paulista com equipe própria de entrega e montagem.
          </p>
        </details>
      </div>
    </section>
  );
}
