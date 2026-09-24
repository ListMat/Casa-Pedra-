import { GuideAnswers } from '@/types';

export const guideLabels: Record<string, string> = {
  interno: 'Interno',
  externo: 'Externo',
  refeicoes: 'Refeições',
  parede: 'Revestimento de parede',
  decoracao: 'Apoio e decoração',
  praticidade: 'Prioriza praticidade',
  cuidados: 'Aceita cuidados específicos'
};

export function getGuidance(answers: GuideAnswers): string[] {
  const result: string[] = [];

  if (answers.environment === 'externo') {
    result.push(
      'Para áreas externas, avaliamos exposição a intempéries e raios UV, indicando rochas com alta densidade e acabamento escovado antiderrapante.'
    );
  } else {
    result.push(
      'Para o interior, projetamos a peça com base na circulação do cômodo, peso estrutural na laje e proporções harmônicas com o seu mobiliário.'
    );
  }

  if (answers.use === 'refeicoes') {
    result.push(
      'Para refeições e convivência familiar, todas as peças recebem impermeabilização hidro-óleo repelente de fábrica contra café, vinho e óleos. A limpeza é feita apenas com pano macio e detergente neutro.'
    );
  } else if (answers.use === 'parede') {
    result.push(
      'Para revestimento de parede, nossa equipe analisa o tipo de alvenaria/drywall, juntas de dilatação e padrão contínuo de veios entre as chapas.'
    );
  } else {
    result.push(
      'Para apoio e decoração, refinamos a espessura e os detalhes de borda para destacar a presença escultural dos objetos no ambiente.'
    );
  }

  if (answers.care === 'praticidade') {
    result.push(
      'Prioridade em praticidade: indicaremos rochas de baixíssima porosidade e acabamento levigado fosco, que minimizam marcas de toque e facilitam a rotina.'
    );
  } else {
    result.push(
      'Apreço por cuidados nobres: apresentaremos mármores e quartzitos com veios exuberantes, acompanhados de orientação simples para manutenção preventiva periódica.'
    );
  }

  return result;
}
