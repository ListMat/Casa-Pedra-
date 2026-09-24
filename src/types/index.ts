export type CompositionType = 'jantar' | 'centro' | 'aparador';

export interface Composition {
  id: string;
  type: CompositionType;
  piece: string;
  shape: string;
  stone: string;
  image: string;
  label: string;
  description: string;
}

export interface StoryStep {
  title: string;
  text: string;
  image: string;
  alt: string;
}

export type EnvironmentOption = 'interno' | 'externo';
export type UseOption = 'refeicoes' | 'decoracao' | 'parede';
export type CareOption = 'praticidade' | 'cuidados';

export interface GuideAnswers {
  environment: EnvironmentOption;
  use: UseOption;
  care: CareOption;
}

export interface ProjectContextState {
  composition?: string;
  wall?: boolean;
  reuse?: boolean;
  guide?: GuideAnswers;
}

export interface ProjectFormValues {
  interest: string;
  location: string;
  budget?: string;
}
