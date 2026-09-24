import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test guidance combinations
const environments = ['interno', 'externo'];
const uses = ['refeicoes', 'decoracao', 'parede'];
const cares = ['praticidade', 'cuidados'];

const guideLabels = {
  interno: 'Interno',
  externo: 'Externo',
  refeicoes: 'Refeições',
  parede: 'Revestimento de parede',
  decoracao: 'Apoio e decoração',
  praticidade: 'Prioriza praticidade',
  cuidados: 'Aceita cuidados específicos'
};

const compositions = [
  { id: 'J01', type: 'jantar', piece: 'Mesa de jantar', shape: 'Oval', stone: 'Verde com veios expressivos', image: 'hero.webp', label: 'Oval · verde expressivo', description: 'Uma presença escultural para reunir pessoas ao redor da mesa.' },
  { id: 'J02', type: 'jantar', piece: 'Mesa de jantar', shape: 'Retangular', stone: 'Clara e suave', image: 'dining-rect-light.webp', label: 'Retangular · clara e suave', description: 'Linhas retas e uma leitura leve para a sala de jantar.' },
  { id: 'C01', type: 'centro', piece: 'Mesa de centro', shape: 'Orgânica', stone: 'Clara e suave', image: 'coffee-organic-light.webp', label: 'Orgânica · clara e suave', description: 'Curvas livres e uma superfície clara no centro do ambiente.' },
  { id: 'C02', type: 'centro', piece: 'Mesa de centro', shape: 'Oval', stone: 'Escura e marcante', image: 'coffee-oval-dark.webp', label: 'Oval · escura e marcante', description: 'Uma composição de contraste, com contorno oval e veios delicados.' },
  { id: 'A01', type: 'aparador', piece: 'Aparador', shape: 'Oval', stone: 'Clara e suave', image: 'console.webp', label: 'Oval · clara e suave', description: 'Volume e suavidade para receber, apoiar e compor.' },
  { id: 'A02', type: 'aparador', piece: 'Aparador', shape: 'Retangular', stone: 'Verde com veios expressivos', image: 'console-rect-veined.webp', label: 'Retangular · verde expressivo', description: 'Geometria e desenho natural da pedra em uma peça de destaque.' }
];

function getComposition(id) {
  return compositions.find((item) => item.id === id) || null;
}

function getGuidance(answers) {
  const result = [];
  if (answers.environment === 'externo') {
    result.push(
      'Para o exterior, converse sobre exposição ao sol e à chuva, acabamento e adequação do material às condições do local.'
    );
  } else {
    result.push(
      'Para o interior, avalie a relação entre dimensões, circulação, peso e apoio da peça no ambiente.'
    );
  }

  if (answers.use === 'refeicoes') {
    result.push(
      'Como haverá refeições, peça orientação sobre contato com líquidos e alimentos, limpeza e proteção da superfície.'
    );
  } else if (answers.use === 'parede') {
    result.push(
      'Para uma parede, a equipe precisa avaliar a base, o peso, a fixação e o encontro entre as peças.'
    );
  } else {
    result.push(
      'Para apoio e decoração, informe os objetos previstos e como a peça será usada no dia a dia.'
    );
  }

  if (answers.care === 'praticidade') {
    result.push(
      'Sua prioridade é praticidade: compare a rotina de manutenção de cada opção e os cuidados recomendados pelo fornecedor.'
    );
  } else {
    result.push(
      'Você aceita cuidados específicos: inclua acabamento, limpeza e eventual tratamento na conversa sobre o material.'
    );
  }

  return result;
}

function buildWhatsAppMessage(project, context) {
  const lines = [
    'Olá, Casa Pedra! Gostaria de conversar sobre um projeto sob encomenda.',
    '',
    `Interesse: ${project.interest}`,
    `Cidade e bairro: ${project.location.trim()}`,
    `Investimento previsto: ${project.budget || 'Ainda estou definindo'}`
  ];

  if (context.composition) {
    const c = getComposition(context.composition);
    if (c) {
      lines.push(
        '',
        `Referência do Ateliê: ${c.id} — ${c.piece}; ${c.shape.toLowerCase()}; ${c.stone.toLowerCase()}.`,
        'Composição ilustrativa; gostaria de avaliar a viabilidade com a equipe.'
      );
    }
  }

  if (context.wall) {
    lines.push('Inspiração: revestimento de parede do comparador de ambientes.');
  }

  if (context.reuse) {
    lines.push(
      'Tenho interesse em explorar peças a partir do reaproveitamento de sobras, conforme disponibilidade e viabilidade.'
    );
  }

  if (context.guide) {
    const g = context.guide;
    const env = guideLabels[g.environment] || g.environment;
    const use = guideLabels[g.use] || g.use;
    const care = guideLabels[g.care] || g.care;
    lines.push('', `Guia de uso: ${env}; ${use}; ${care}.`);
  }

  return lines.join('\n');
}

describe('Guia de uso - 12 combinações', () => {
  let count = 0;
  for (const env of environments) {
    for (const use of uses) {
      for (const care of cares) {
        count++;
        it(`Combinação ${count}: ${env} + ${use} + ${care}`, () => {
          const advice = getGuidance({ environment: env, use, care });
          assert.equal(advice.length, 3);
          assert.ok(advice[0].length > 0);
          assert.ok(advice[1].length > 0);
          assert.ok(advice[2].length > 0);
        });
      }
    }
  }
  it('Verifica total de 12 combinações', () => {
    assert.equal(count, 12);
  });
});

describe('Composições do Ateliê', () => {
  it('Contém exatamente 6 composições', () => {
    assert.equal(compositions.length, 6);
  });

  it('Verifica IDs válidos J01, J02, C01, C02, A01, A02', () => {
    const ids = compositions.map((c) => c.id);
    assert.deepEqual(ids, ['J01', 'J02', 'C01', 'C02', 'A01', 'A02']);
  });

  it('Recupera composição por ID', () => {
    const item = getComposition('J01');
    assert.ok(item);
    assert.equal(item.piece, 'Mesa de jantar');
    assert.equal(item.shape, 'Oval');
  });
});

describe('Geração de Mensagem do WhatsApp', () => {
  it('Gera mensagem básica sem referências adicionais', () => {
    const msg = buildWhatsAppMessage(
      { interest: 'Móvel exclusivo', location: 'São Paulo, Pinheiros', budget: 'De R$ 15 mil a R$ 30 mil' },
      {}
    );
    assert.ok(msg.includes('Interesse: Móvel exclusivo'));
    assert.ok(msg.includes('Cidade e bairro: São Paulo, Pinheiros'));
    assert.ok(msg.includes('Investimento previsto: De R$ 15 mil a R$ 30 mil'));
  });

  it('Gera mensagem com todas as referências combinadas', () => {
    const msg = buildWhatsAppMessage(
      { interest: 'Móveis e revestimentos', location: 'São Paulo, Moema' },
      {
        composition: 'J01',
        wall: true,
        reuse: true,
        guide: { environment: 'interno', use: 'refeicoes', care: 'praticidade' }
      }
    );
    assert.ok(msg.includes('Referência do Ateliê: J01 — Mesa de jantar; oval; verde com veios expressivos.'));
    assert.ok(msg.includes('Inspiração: revestimento de parede do comparador de ambientes.'));
    assert.ok(msg.includes('Tenho interesse em explorar peças a partir do reaproveitamento de sobras'));
    assert.ok(msg.includes('Guia de uso: Interno; Refeições; Prioriza praticidade.'));
    assert.ok(msg.includes('Investimento previsto: Ainda estou definindo'));
  });

  it('Codifica URL corretamente com caracteres especiais', () => {
    const msg = buildWhatsAppMessage(
      { interest: 'Móvel exclusivo', location: 'São Paulo, Vila Madalena' },
      {}
    );
    const encoded = encodeURIComponent(msg);
    assert.ok(!encoded.includes('\n'));
    assert.ok(encoded.includes('%C3%A1')); // á
  });
});
