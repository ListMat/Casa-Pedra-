'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { compositions, getComposition } from '@/data/compositions';
import { CompositionType } from '@/types';
import { useProjectPreferences } from '@/context/ProjectContext';
import { isMotionEnabled, revealElements, animateElement } from '@/hooks/useMotion';

export function Atelier() {
  const { context, setComposition } = useProjectPreferences();

  const [pieceType, setPieceType] = useState<CompositionType>('jantar');
  const [selectedId, setSelectedId] = useState<string>('J01');
  const [displayedId, setDisplayedId] = useState<string>('J01');
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('/assets/hero.webp');
  const [fadeLayerSrc, setFadeLayerSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestCounterRef = useRef<number>(0);
  const captionRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLElement | null>(null);
  const fadeLayerRef = useRef<HTMLImageElement | null>(null);

  const currentItem = getComposition(displayedId) || compositions[0];
  const filteredCompositions = compositions.filter((item) => item.type === pieceType);

  const handleSelectComposition = useCallback(
    async (id: string) => {
      const item = getComposition(id);
      if (!item) return;

      const requestId = ++requestCounterRef.current;
      const targetSrc = `/assets/${item.image}`;
      const isChanged = displayedId !== id;

      setSelectedId(id);
      setErrorMessage(null);

      if (currentImageSrc === targetSrc && displayedId === id) {
        return;
      }

      setIsLoading(true);

      try {
        // Pre-load the next image
        const img = new window.Image();
        img.decoding = 'async';
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('image-load'));
          img.src = targetSrc;
        });

        if (img.decode) {
          await img.decode().catch(() => {});
        }

        // Ignore stale requests
        if (requestId !== requestCounterRef.current) return;

        // Perform cross-fade layer transition if motion is enabled
        if (isMotionEnabled() && currentImageSrc) {
          setFadeLayerSrc(currentImageSrc);
        }

        setCurrentImageSrc(targetSrc);
        setDisplayedId(id);
        setIsLoading(false);

        // If this composition was already part of context, keep context updated
        if (context.composition) {
          setComposition(id);
        }

        // Reveal caption micro-animation
        if (isChanged && captionRef.current) {
          revealElements(captionRef.current.children, 8);
        }
      } catch {
        if (requestId !== requestCounterRef.current) return;
        setIsLoading(false);
        setErrorMessage(
          'Não foi possível abrir esta composição. Selecione outra opção ou tente novamente.'
        );
      }
    },
    [currentImageSrc, displayedId, context.composition, setComposition]
  );

  // Fade-out and cleanup the previous image layer
  useEffect(() => {
    if (fadeLayerSrc && fadeLayerRef.current && isMotionEnabled()) {
      const anim = animateElement(fadeLayerRef.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 360
      });
      if (anim) {
        anim.finished.finally(() => setFadeLayerSrc(null));
      } else {
        setFadeLayerSrc(null);
      }
    } else if (fadeLayerSrc) {
      setFadeLayerSrc(null);
    }
  }, [fadeLayerSrc]);

  const handleTypeChange = (newType: CompositionType) => {
    setPieceType(newType);
    const firstOfGroup = compositions.find((item) => item.type === newType);
    if (firstOfGroup) {
      handleSelectComposition(firstOfGroup.id);
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    setComposition(selectedId);
  };

  const altText = `Estudo ilustrativo: ${currentItem.piece.toLowerCase()} ${currentItem.shape.toLowerCase()}, pedra de aparência ${currentItem.stone.toLowerCase()}`;

  return (
    <section id="atelier" className="section atelier" aria-labelledby="atelier-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ATELIÊ CASA PEDRA</p>
          <h2 id="atelier-heading">
            <span className="motion-line">
              <span className="motion-line-inner">Uma peça.</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>A sua identidade.</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Explore seis composições de forma e matéria como ponto de partida. Cada peça é
          executada <strong>sob medida</strong> para o seu espaço, com escolha de dimensões,
          acabamento (levigado, polido ou escovado) e seleção de chapas exclusivas.
        </p>
      </div>

      <div className="atelier-layout">
        <figure
          ref={imageFrameRef}
          className="atelier-visual motion-image-frame"
          aria-busy={isLoading ? 'true' : 'false'}
        >
          {fadeLayerSrc && (
            <img
              ref={fadeLayerRef}
              src={fadeLayerSrc}
              alt=""
              aria-hidden="true"
              className="motion-image-layer"
            />
          )}
          <img
            id="atelier-image"
            src={currentImageSrc}
            width={1672}
            height={941}
            loading="lazy"
            alt={altText}
          />
          <figcaption>
            <span id="atelier-code">ESTUDO {currentItem.id}</span>
            <span>Conceito ilustrativo · IA</span>
          </figcaption>
        </figure>

        <div className="atelier-controls">
          <p className="eyebrow">01 / ESCOLHA O TIPO DE PEÇA</p>
          <div className="atelier-segmented-control" role="tablist" aria-label="Tipo de móvel">
            <button
              type="button"
              role="tab"
              aria-selected={pieceType === 'jantar'}
              className={`segmented-tab ${pieceType === 'jantar' ? 'active' : ''}`}
              onClick={() => handleTypeChange('jantar')}
            >
              Mesa de jantar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={pieceType === 'centro'}
              className={`segmented-tab ${pieceType === 'centro' ? 'active' : ''}`}
              onClick={() => handleTypeChange('centro')}
            >
              Mesa de centro
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={pieceType === 'aparador'}
              className={`segmented-tab ${pieceType === 'aparador' ? 'active' : ''}`}
              onClick={() => handleTypeChange('aparador')}
            >
              Aparador
            </button>
          </div>

          <fieldset>
            <legend>02 / FORMA E EXPRESSÃO MINERAL</legend>
            <div id="atelier-options">
              {filteredCompositions.map((item) => (
                <label
                  key={item.id}
                  className={`composition-choice ${selectedId === item.id ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="composition"
                    value={item.id}
                    checked={selectedId === item.id}
                    onChange={() => handleSelectComposition(item.id)}
                  />
                  <span className="choice-indicator" aria-hidden="true" />
                  <span className="choice-label">{item.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p id="atelier-status" className="sr-only" role="status" aria-live="polite">
            {currentItem.piece} — {currentItem.label}
          </p>

          <div className="atelier-caption" id="atelier-caption" ref={captionRef}>
            <h3 id="atelier-title">
              {currentItem.piece} · {currentItem.shape.toLowerCase()}
            </h3>
            <p id="atelier-description">{currentItem.description}</p>
          </div>

          <p
            id="atelier-feedback"
            className="micro-feedback"
            role="status"
            hidden={!isLoading && !errorMessage}
          >
            {isLoading ? 'Preparando sua composição…' : errorMessage || ''}
          </p>

          <a
            className="button"
            id="atelier-cta"
            href="#contato"
            aria-disabled={isLoading ? 'true' : undefined}
            onClick={handleCtaClick}
          >
            Conversar sobre esta composição <span aria-hidden="true">↗</span>
          </a>

          <p className="experience-note">
            Estudos de referência para inspirar o seu projeto. Medidas milimétricas,
            contornos de borda e viabilidade estrutural são definidos com a nossa equipe
            técnica para atender perfeitamente à planta da sua residência.
          </p>
        </div>
      </div>
    </section>
  );
}
