import { siteConfig } from '@/config/site';
import { getComposition } from '@/data/compositions';
import { guideLabels } from '@/data/guideData';
import { ProjectContextState, ProjectFormValues } from '@/types';

export function buildWhatsAppMessage(
  project: ProjectFormValues,
  context: ProjectContextState
): string {
  const lines: string[] = [
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

export function getWhatsAppUrl(messageText: string): string {
  return `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(messageText)}`;
}
