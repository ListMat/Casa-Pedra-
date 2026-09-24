'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { reuseStory } from '@/data/reuseStory';
import { useProjectPreferences } from '@/context/ProjectContext';
import { isMotionEnabled, revealElements, animateElement } from '@/hooks/useMotion';

export function ReuseNarrative() {
  const { setReuse } = useProjectPreferences();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('/assets/offcut.webp');
  const [fadeLayerSrc, setFadeLayerSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestCounterRef = useRef<number>(0);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fadeLayerRef = useRef<HTMLImageElement | null>(null);

  const currentStep = reuseStory[displayedIndex] || reuseStory[0];

  const handleSelectStep = useCallback(
    async (index: number, shouldFocus = false) => {
      const item = reuseStory[index];
      if (!item) return;

      const requestId = ++requestCounterRef.current;
      const targetSrc = `/assets/${item.image}`;
      const isChanged = displayedIndex !== index;

      setActiveIndex(index);
      setErrorMessage(null);

      if (shouldFocus) {
        tabRefs.current[index]?.focus();
      }

      if (currentImageSrc === targetSrc && displayedIndex === index) {
        return;
      }

      setIsLoading(true);

      try {
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

        if (requestId !== requestCounterRef.current) return;

        if (isMotionEnabled() && currentImageSrc) {
          setFadeLayerSrc(currentImageSrc);
        }

        setCurrentImageSrc(targetSrc);
        setDisplayedIndex(index);
        setIsLoading(false);

        if (isChanged) {
          const elsToReveal: HTMLElement[] = [];
          if (titleRef.current) elsToReveal.push(titleRef.current);
          if (textRef.current) elsToReveal.push(textRef.current);
          if (elsToReveal.length > 0) {
            revealElements(elsToReveal, 10);
          }
        }
      } catch {
        if (requestId !== requestCounterRef.current) return;
        setIsLoading(false);
        setErrorMessage(
          'Não foi possível abrir esta etapa. Toque novamente para tentar.'
        );
      }
    },
    [currentImageSrc, displayedIndex]
  );

  // Fade layer transition
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') {
      next = (index + 1) % 3;
    } else if (e.key === 'ArrowLeft') {
      next = (index + 2) % 3;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = 2;
    } else {
      return;
    }
    e.preventDefault();
    handleSelectStep(next, true);
  };

  const tabLabels = ['O fragmento', 'O desenho', 'A nova peça'];

  return (
    <section id="reaproveitamento" className="section reuse" aria-labelledby="reuse-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">DA SOBRA À POSSIBILIDADE</p>
          <h2 id="reuse-heading">
            <span className="motion-line">
              <span className="motion-line-inner">O fim de um corte.</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>O começo de uma ideia.</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Reaproveitar começa com um novo olhar. Percorra este estudo e descubra como um
          fragmento pode inspirar outra forma.
        </p>
      </div>

      <div
        className="story-tabs"
        role="tablist"
        aria-label="Etapas do estudo de reaproveitamento"
      >
        {tabLabels.map((label, index) => (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`story-tab-${index}`}
            data-story={index}
            aria-controls="story-panel"
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => handleSelectStep(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            0{index + 1} <span>{label}</span>
          </button>
        ))}
      </div>

      <div
        id="story-panel"
        className="story-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`story-tab-${activeIndex}`}
        aria-busy={isLoading ? 'true' : 'false'}
      >
        <figure className="story-image-wrap motion-image-frame">
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
            id="story-image"
            src={currentImageSrc}
            width={1448}
            height={1086}
            loading="lazy"
            alt={currentStep.alt}
          />
        </figure>

        <div className="story-copy">
          <p className="eyebrow">UM ESTUDO DE POSSIBILIDADES</p>
          <h3 id="story-title" ref={titleRef}>
            {currentStep.title}
          </h3>
          <p id="story-text" ref={textRef}>
            {currentStep.text}
          </p>

          <p
            id="story-feedback"
            className="micro-feedback"
            role="status"
            hidden={!isLoading && !errorMessage}
          >
            {isLoading ? 'Preparando a próxima etapa…' : errorMessage || ''}
          </p>

          <a
            className="text-link"
            href="#contato"
            id="reuse-cta"
            onClick={() => setReuse()}
          >
            Conversar sobre reaproveitamento <span aria-hidden="true">↗</span>
          </a>

          <p className="experience-note">
            Sequência conceitual gerada com IA, não o registro de um processo real. O
            reaproveitamento depende das características e da disponibilidade das sobras.
          </p>
        </div>
      </div>
    </section>
  );
}
