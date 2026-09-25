import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PrintButton } from './PrintButton';
import './relatorio.css';

export const metadata: Metadata = {
  title: 'Casa Pedra — Relatório do teste técnico',
  robots: {
    index: false,
    follow: false
  }
};

export default function RelatorioPage() {
  return (
    <div className="relatorio-body">
      <div className="toolbar">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="https://casa-pedra.vercel.app/">← Abrir landing page</a>
          <a
            href="https://www.figma.com/design/2jTNO9EnZb3HcxhatfbU1u/Casa-Pedra?node-id=2001-253&t=v6lnkE993hYSZYnp-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Projeto no Figma ↗
          </a>
        </div>
        <PrintButton />
      </div>

      <main>
        {/* Folha 1 */}
        <article className="sheet">
          <div className="topline">
            <span className="brand">casa pedra</span>
            <span>TESTE TÉCNICO · RELATÓRIO 01 / 02</span>
          </div>

          <h1>
            O design como motivo
            <br />
            para iniciar uma conversa.
          </h1>

          <p className="lead">
            Uma landing page para valorizar móveis exclusivos e revestimentos sob
            encomenda, com foco na qualidade das oportunidades comerciais.
          </p>

          <h2>1. Leitura do briefing</h2>
          <p>
            A Casa Pedra precisa atrair projetos de maior valor agregado. Por isso, os
            móveis assumem o protagonismo; a variedade de materiais aparece como suporte
            técnico. A narrativa combina autoria, história familiar e orientação,
            alinhadas a um público que valoriza arquitetura e exclusividade. A
            qualificação combina interesse, região e investimento opcional com
            referências escolhidas nas experiências interativas.
          </p>
          <p className="note">
            <strong>Decisões diante das lacunas:</strong> não foram inventados preço
            mínimo, endereço, prazo, garantia, depoimentos ou certificações. Os 27 anos
            foram mantidos sem deduzir uma data de fundação. O fluxo comercial é uma
            proposta a validar. Os números exigem esclarecimento: 43 pedidos × R$ 20 mil
            = R$ 860 mil, incompatíveis com R$ 30–50 mil/mês. A meta de R$ 150 mil também
            não informa se é mensal ou acumulada. Não foram feitas projeções.
          </p>

          <h2>2. Estrutura e ordem das seções</h2>
          <table>
            <thead>
              <tr>
                <th>Seção</th>
                <th>Por que existe e por que está aqui</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abertura + CTA</td>
                <td>
                  Apresenta desejo e oferta imediatamente. A mesa coloca a categoria
                  prioritária no primeiro contato; o subtítulo explica o serviço.
                </td>
              </tr>
              <tr>
                <td>História em números</td>
                <td>
                  Logo após a promessa, sustenta confiança com fatos do briefing: 27
                  anos, showroom desde 2005 e loja conceito desde 2013.
                </td>
              </tr>
              <tr>
                <td>Móveis e espaços</td>
                <td>
                  Traduz a oferta em duas aplicações. Móveis vêm primeiro;
                  revestimentos ampliam a oportunidade sem dispersar o foco.
                </td>
              </tr>
              <tr>
                <td>Ateliê + comparador</td>
                <td>
                  Após as ofertas, seis composições de móveis ajudam a escolher uma
                  referência; a comparação deslizante revela o impacto do revestimento
                  no mesmo ambiente. Ambos levam contexto ao contato.
                </td>
              </tr>
              <tr>
                <td>Essência + reaproveitamento</td>
                <td>
                  História, equipe e conhecimento sustentam valor. Em seguida, três
                  etapas interativas tornam o reaproveitamento tangível: fragmento,
                  desenho e nova peça. É um estudo conceitual identificado.
                </td>
              </tr>
              <tr>
                <td>Processo + guia de uso</td>
                <td>
                  Explica o atendimento e prepara a escolha. Ambiente, uso e rotina de
                  cuidados geram orientações para conversar com a equipe, sem substituir
                  especificação técnica.
                </td>
              </tr>
              <tr>
                <td>Dúvidas</td>
                <td>
                  Trata resistência, indicação, diferenças, região, preço e prazo antes
                  da decisão final. Respostas não generalizam propriedades técnicas.
                </td>
              </tr>
              <tr>
                <td>Contato</td>
                <td>
                  Reúne referências selecionadas e respostas do guia, com opção de
                  limpar. Encaminha a mensagem ao WhatsApp; acesso direto e CTA móvel
                  permanecem disponíveis.
                </td>
              </tr>
            </tbody>
          </table>

          <h2>3. Copy e conversão</h2>
          <p>
            <strong>“A natureza cria. A gente dá forma. Você vive.”</strong> conecta
            origem, autoria e uso. A linha seguinte esclarece “móveis exclusivos em pedra
            e revestimentos sob encomenda”. <strong>“Converse sobre seu projeto”</strong>{' '}
            convida ao atendimento consultivo;{' '}
            <strong>“Conversar sobre esta composição”</strong> leva a referência do
            Ateliê; <strong>“Continuar no WhatsApp”</strong> informa o próximo passo
            real.
          </p>
          <p className="small">
            Investimento é opcional; faixas não são preços. O Ateliê oferece seis pares
            curados de forma e aparência, não todas as combinações possíveis. As imagens
            não confirmam material, estoque ou viabilidade.
          </p>

          <div className="foot">
            <span>Casa Pedra · Landing page conceitual</span>
            <span>Estratégia & estrutura · 1 / 2</span>
          </div>
        </article>

        {/* Folha 2 */}
        <article className="sheet">
          <div className="topline">
            <span className="brand">casa pedra</span>
            <span>TESTE TÉCNICO · RELATÓRIO 02 / 02</span>
          </div>

          <h2>4. Direção visual e origem das imagens</h2>
          <p>
            Fundo claro, composição editorial e imagens amplas colocam a pedra em
            primeiro plano. A Poppins atende ao briefing: pesos leves nos títulos e
            regulares no texto. O nome foi composto tipograficamente como assinatura
            provisória, já que não foi fornecido um logo.
          </p>

          <div className="swatches">
            <span style={{ '--c': '#02575f' } as React.CSSProperties}>
              #02575f · base e CTAs
            </span>
            <span style={{ '--c': '#e74429' } as React.CSSProperties}>
              #e74429 · detalhe
            </span>
            <span style={{ '--c': '#ec8d00' } as React.CSSProperties}>
              #ec8d00 · acento e foco
            </span>
          </div>

          <p className="small">
            O verde profundo cria unidade e contraste nos botões. Vermelho e laranja
            ficam restritos a detalhes para evitar competição com os materiais. Tons
            claros e cinzas complementam a paleta. As fotografias compartilham luz
            natural, texturas e mobiliário contemporâneo.
          </p>

          <div className="images">
            <div>
              <img src="/assets/hero.webp" alt="Mesa verde ilustrativa" />
              <p>
                <strong>Mesa verde · abertura.</strong> Evidencia o móvel como peça
                central da casa, associando material expressivo e convivência.
              </p>
            </div>
            <div>
              <img src="/assets/console.webp" alt="Aparador claro ilustrativo" />
              <p>
                <strong>Aparador claro · móveis.</strong> Destaca volume, acabamento e a
                possibilidade de uma peça autoral além da mesa.
              </p>
            </div>
            <div>
              <img src="/assets/wall.webp" alt="Parede em pedra ilustrativa" />
              <p>
                <strong>Parede em pedra · revestimentos.</strong> Mostra o impacto do
                material na escala do ambiente e apresenta a segunda oferta.
              </p>
            </div>
          </div>

          <p className="small">
            <strong>Origem e curadoria das imagens:</strong> onze imagens conceituais geradas com
            ferramenta de IA para fins ilustrativos. As três
            originais aparecem acima. Quatro novas composições (mesa retangular clara,
            mesas de centro orgânica clara e oval escura, aparador retangular com veios)
            completam as seis referências do Ateliê, reutilizando mesa e aparador
            originais. Uma edição remove somente o revestimento da cena de parede para o
            comparador. Fragmento, estudo a lápis e objeto pronto compõem a narrativa de
            reaproveitamento. Luz e paleta mantêm unidade. Todas são ilustrações conceituais
            identificadas, sem atribuir obras ou processos reais à empresa.
          </p>

          <h2>5. Design no Figma e Desenvolvimento Next.js</h2>
          <p>
            <strong>Stack e Arquitetura:</strong> A página foi desenhada no{' '}
            <a
              href="https://www.figma.com/design/2jTNO9EnZb3HcxhatfbU1u/Casa-Pedra?node-id=2001-253&t=v6lnkE993hYSZYnp-1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 600 }}
            >
              Figma (ver projeto)
            </a>{' '}
            e desenvolvida utilizando <strong>Next.js 14</strong> (App
            Router), <strong>React 18</strong> e <strong>TypeScript</strong> estrito, com Server Components por padrão e
            Client Components restritos a áreas interativas. <strong>Design no Figma:</strong>{' '}
            concepção visual, hierarquia tipográfica, grid responsivo, sistema de cores e prototipagem da interface. <strong>IA de imagem:</strong> as onze imagens conceituais descritas
            acima. <strong>Web Animations API & CSS puro:</strong> animações nativas
            sem dependências externas pesadas (sem GSAP/Framer Motion). <strong>Next/Font:</strong>{' '}
            Poppins com fallback Arial.
          </p>

          <p className="small">
            <strong>Ajustes e melhorias:</strong> modularização em componentes
            especializados, separação de dados tipados, context provider enxuto para
            sincronização de preferências com o formulário de contato, suporte a
            prefers-reduced-motion dinâmico, acessibilidade completa por teclado (tabs,
            slider e campos de formulário) e proteção contra race conditions no
            carregamento de imagens do Ateliê e Reaproveitamento.
          </p>

          <p className="small">
            <strong>Referências e Benchmarking:</strong> Analisamos os três sites indicados pelo cliente no briefing. A{' '}
            <a
              href="https://www.cosentino.com/pt-br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cosentino
            </a>{' '}
            inspirou a navegação orientada a aplicações práticas (móveis vs. revestimentos) e a clareza nas orientações de uso dos materiais. A{' '}
            <a
              href="https://brasigran.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brasigran
            </a>{' '}
            e a{' '}
            <a
              href="https://michelangelo.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michelangelo
            </a>{' '}
            serviram como padrão de sofisticação para a valorização de rochas nobres (quartzitos e mármores), reforçando a escolha por fotografia arquitetônica ampla, luz natural e ausência de poluição visual.
          </p>

          <h2>Funcionamento e limites da entrega</h2>
          <p className="small">
            O formulário prepara uma mensagem e direciona para{' '}
            <strong>wa.me/5511900000000</strong>; o visitante confirma o envio no
            WhatsApp. O número fictício veio do teste: não é possível comprovar o
            recebimento por uma empresa real. A página não armazena esses dados. Foram
            verificados TypeScript estrito, build de produção, integridade visual nas
            larguras de 360, 390, 768 e 1440 px, seis composições, 12 combinações do
            guia, mensagem de WhatsApp com acentos codificados, trocas rápidas de
            imagens, recuperação de falhas e movimento reduzido por testes
            automatizados e manuais.
          </p>

          <p className="small">
            <strong>Avaliação futura:</strong> acompanhar uso do Ateliê, conclusão do
            guia, início de conversa, oportunidades qualificadas e vendas no CRM. Clique
            em WhatsApp não equivale a venda. Analytics não foi conectado, pois não foram
            fornecidos conta, identificador ou configuração de consentimento.
          </p>

          <div className="foot">
            <span>Imagens conceituais · contato fictício</span>
            <a href="https://casa-pedra.vercel.app/" target="_blank" rel="noopener noreferrer">
              Abrir landing page ↗
            </a>
            <span>Visual & execução · 2 / 2</span>
          </div>
        </article>
      </main>
    </div>
  );
}
