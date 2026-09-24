import { Composition } from '@/types';

export const compositions: Composition[] = [
  {
    id: 'J01',
    type: 'jantar',
    piece: 'Mesa de jantar',
    shape: 'Oval',
    stone: 'Verde com veios expressivos',
    image: 'hero.webp',
    label: 'Oval · verde expressivo',
    description: 'Uma presença escultural para reunir pessoas ao redor da mesa.'
  },
  {
    id: 'J02',
    type: 'jantar',
    piece: 'Mesa de jantar',
    shape: 'Retangular',
    stone: 'Clara e suave',
    image: 'dining-rect-light.webp',
    label: 'Retangular · clara e suave',
    description: 'Linhas retas e uma leitura leve para a sala de jantar.'
  },
  {
    id: 'C01',
    type: 'centro',
    piece: 'Mesa de centro',
    shape: 'Orgânica',
    stone: 'Clara e suave',
    image: 'coffee-organic-light.webp',
    label: 'Orgânica · clara e suave',
    description: 'Curvas livres e uma superfície clara no centro do ambiente.'
  },
  {
    id: 'C02',
    type: 'centro',
    piece: 'Mesa de centro',
    shape: 'Oval',
    stone: 'Escura e marcante',
    image: 'coffee-oval-dark.webp',
    label: 'Oval · escura e marcante',
    description: 'Uma composição de contraste, com contorno oval e veios delicados.'
  },
  {
    id: 'A01',
    type: 'aparador',
    piece: 'Aparador',
    shape: 'Oval',
    stone: 'Clara e suave',
    image: 'console.webp',
    label: 'Oval · clara e suave',
    description: 'Volume e suavidade para receber, apoiar e compor.'
  },
  {
    id: 'A02',
    type: 'aparador',
    piece: 'Aparador',
    shape: 'Retangular',
    stone: 'Verde com veios expressivos',
    image: 'console-rect-veined.webp',
    label: 'Retangular · verde expressivo',
    description: 'Geometria e desenho natural da pedra em uma peça de destaque.'
  }
];

export function getComposition(id: string): Composition | null {
  return compositions.find((item) => item.id === id) || null;
}
