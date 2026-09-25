'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { EnvironmentOption, UseOption, CareOption } from '@/types';
import { getGuidance } from '@/data/guideData';
import { useProjectPreferences } from '@/context/ProjectContext';
import { revealElements } from '@/hooks/useMotion';

export function UsageGuide() {
  const { setGuide, clearGuide } = useProjectPreferences();

  const [environment, setEnvironment] = useState<EnvironmentOption | ''>('');
  const [use, setUse] = useState<UseOption | ''>('');
  const [care, setCare] = useState<CareOption | ''>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [adviceList, setAdviceList] = useState<string[]>([]);
  const [validationNotice, setValidationNotice] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleToggleChoice = (
    type: 'environment' | 'use' | 'care',
    value: string
  ) => {
    setValidationNotice(null);

    if (type === 'environment') {
      setEnvironment((prev) => (prev === value ? '' : (value as EnvironmentOption)));
    } else if (type === 'use') {
      setUse((prev) => (prev === value ? '' : (value as UseOption)));
    } else if (type === 'care') {
      setCare((prev) => (prev === value ? '' : (value as CareOption)));
    }

    // Invalidate previous results when answers change
    if (showResult) {
      setShowResult(false);
      clearGuide();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!environment || !use || !care) {
      const missing: string[] = [];
      if (!environment) missing.push('Ambiente (Etapa 01)');
      if (!use) missing.push('Uso Principal (Etapa 02)');
      if (!care) missing.push('Rotina de Cuidados (Etapa 03)');
      setValidationNotice(`Por favor, selecione uma opção em: ${missing.join(', ')}.`);
      return;
    }

    setValidationNotice(null);

    const answers = {
      environment: environment as EnvironmentOption,
      use: use as UseOption,
      care: care as CareOption
    };

    const guidance = getGuidance(answers);
    setAdviceList(guidance);
    setShowResult(true);
    setGuide(answers);

    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.focus({ preventScroll: true });
        revealElements([resultRef.current], 10);
      }
    }, 10);
  };

  return (
    <section id="guia" className="section usage-guide" aria-labelledby="guide-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">UM GUIA PARA COMEÇAR</p>
          <h2 id="guide-heading">
            <span className="motion-line">
              <span className="motion-line-inner">A escolha da pedra</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>começa pelo uso</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Três respostas ajudam a preparar sua conversa com a equipe. Conte onde e como
          você imagina usar a peça. Clique para selecionar ou desmarcar.
        </p>
      </div>

      <form id="guide-form" onSubmit={handleSubmit} noValidate>
        <div className="guide-fields">
          {/* 01: Ambiente */}
          <fieldset className="guide-step">
            <legend>01 / EM QUAL AMBIENTE?</legend>
            <div className="guide-step-grid guide-step-grid-2">
              <div
                className={`guide-choice ${environment === 'interno' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('environment', 'interno')}
                role="checkbox"
                aria-checked={environment === 'interno'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('environment', 'interno');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/console.webp"
                    alt="Ambiente interno com aparador em pedra clara"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="environment"
                      value="interno"
                      checked={environment === 'interno'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Ambiente Interior"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Interior</span>
                  <span className="guide-choice-desc">Salas, halls e áreas protegidas</span>
                </div>
              </div>

              <div
                className={`guide-choice ${environment === 'externo' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('environment', 'externo')}
                role="checkbox"
                aria-checked={environment === 'externo'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('environment', 'externo');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/dining-rect-light.webp"
                    alt="Ambiente externo ou varanda com mesa em pedra clara"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="environment"
                      value="externo"
                      checked={environment === 'externo'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Ambiente Exterior"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Exterior</span>
                  <span className="guide-choice-desc">Varandas, gourmet e ar livre</span>
                </div>
              </div>
            </div>
          </fieldset>

          {/* 02: Uso Principal */}
          <fieldset className="guide-step">
            <legend>02 / QUAL É O USO PRINCIPAL?</legend>
            <div className="guide-step-grid guide-step-grid-3">
              <div
                className={`guide-choice ${use === 'refeicoes' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('use', 'refeicoes')}
                role="checkbox"
                aria-checked={use === 'refeicoes'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('use', 'refeicoes');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/hero.webp"
                    alt="Mesa de jantar escultural para refeições"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="use"
                      value="refeicoes"
                      checked={use === 'refeicoes'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Uso para Refeições"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Refeições</span>
                  <span className="guide-choice-desc">Mesas de jantar e encontros</span>
                </div>
              </div>

              <div
                className={`guide-choice ${use === 'decoracao' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('use', 'decoracao')}
                role="checkbox"
                aria-checked={use === 'decoracao'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('use', 'decoracao');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/coffee-organic-light.webp"
                    alt="Mesa de centro orgânica para apoio e decoração"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="use"
                      value="decoracao"
                      checked={use === 'decoracao'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Uso para Apoio e decoração"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Apoio e decoração</span>
                  <span className="guide-choice-desc">Mesas de centro e aparadores</span>
                </div>
              </div>

              <div
                className={`guide-choice ${use === 'parede' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('use', 'parede')}
                role="checkbox"
                aria-checked={use === 'parede'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('use', 'parede');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/wall.webp"
                    alt="Painel e revestimento de parede em pedra"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="use"
                      value="parede"
                      checked={use === 'parede'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Uso para Revestimento de parede"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Revestimento de parede</span>
                  <span className="guide-choice-desc">Painéis e destaque arquitetônico</span>
                </div>
              </div>
            </div>
          </fieldset>

          {/* 03: Cuidados */}
          <fieldset className="guide-step">
            <legend>03 / SUA ROTINA DE CUIDADOS</legend>
            <div className="guide-step-grid guide-step-grid-2">
              <div
                className={`guide-choice ${care === 'praticidade' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('care', 'praticidade')}
                role="checkbox"
                aria-checked={care === 'praticidade'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('care', 'praticidade');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/console.webp"
                    alt="Superfície clara de fácil manutenção"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="care"
                      value="praticidade"
                      checked={care === 'praticidade'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Priorizo praticidade"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Priorizo praticidade</span>
                  <span className="guide-choice-desc">Manutenção simples no dia a dia</span>
                </div>
              </div>

              <div
                className={`guide-choice ${care === 'cuidados' ? 'selected' : ''}`}
                onClick={() => handleToggleChoice('care', 'cuidados')}
                role="checkbox"
                aria-checked={care === 'cuidados'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleChoice('care', 'cuidados');
                  }
                }}
              >
                <div className="guide-choice-image-wrap">
                  <Image
                    src="/assets/console-rect-veined.webp"
                    alt="Pedra nobre com veios exuberantes"
                    width={600}
                    height={380}
                    loading="lazy"
                  />
                  <div className="guide-choice-badge">
                    <input
                      type="checkbox"
                      name="care"
                      value="cuidados"
                      checked={care === 'cuidados'}
                      readOnly
                      tabIndex={-1}
                      aria-label="Aceito cuidados específicos"
                    />
                  </div>
                </div>
                <div className="guide-choice-body">
                  <span className="guide-choice-title">Aceito cuidados específicos</span>
                  <span className="guide-choice-desc">Rochas nobres e veios exuberantes</span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        {validationNotice && (
          <p className="micro-feedback" role="alert" style={{ color: 'var(--coral)', marginTop: '12px' }}>
            {validationNotice}
          </p>
        )}

        <button type="submit" className="button" style={{ marginTop: '20px' }}>
          Ver orientações para minha conversa <span aria-hidden="true">↗</span>
        </button>
      </form>

      {showResult && (
        <div
          id="guide-result"
          ref={resultRef}
          className="guide-result"
          tabIndex={-1}
          aria-labelledby="guide-result-title"
        >
          <p className="eyebrow">SEU PONTO DE PARTIDA</p>
          <h3 id="guide-result-title">O que conversar com a equipe</h3>
          <ul id="guide-advice">
            {adviceList.map((advice, index) => (
              <li key={index}>{advice}</li>
            ))}
          </ul>
          <p className="experience-note">
            Estas orientações não especificam um material nem garantem desempenho. A
            escolha final exige análise técnica do projeto e das informações do
            fornecedor.
          </p>
          <a className="text-link" href="#contato">
            Levar minhas respostas para o atendimento <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </section>
  );
}
