'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface Scene {
  src: string;
  thumb: string;
  tag: string;
  title: string;
  label: string;
  alt: string;
}

const SCENES: Scene[] = [
  {
    src: '/assets/hero.webp',
    thumb: '/assets/hero-thumb.webp',
    tag: '01 / MÓVEIS',
    title: 'A pedra como protagonista',
    label: 'Mesa de jantar',
    alt: 'Conceito de mesa escultural em pedra verde em uma sala de jantar contemporânea',
  },
  {
    src: '/assets/console.webp',
    thumb: '/assets/console-thumb.webp',
    tag: '02 / DESIGN',
    title: 'Design que marca presença',
    label: 'Aparador autoral',
    alt: 'Conceito de aparador autoral em pedra clara com objeto decorativo',
  },
  {
    src: '/assets/wall.webp',
    thumb: '/assets/wall-thumb.webp',
    tag: '03 / AMBIENTES',
    title: 'A arquitetura ganha outra leitura',
    label: 'Revestimento',
    alt: 'Conceito de sala com revestimento de parede em pedra de veios expressivos',
  },
];

const INTERVAL = 6000;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isManualOnly, setIsManualOnly] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [progressKey, setProgressKey] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const heroRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync reveal with preloader intro end
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!document.documentElement.classList.contains('cp-intro-active')) {
        setIsRevealed(true);
      }
    }

    const handleIntroEnd = () => {
      setIsRevealed(true);
    };

    window.addEventListener('cp:intro-end', handleIntroEnd);
    const safety = setTimeout(() => {
      setIsRevealed(true);
    }, 3400);

    return () => {
      window.removeEventListener('cp:intro-end', handleIntroEnd);
      clearTimeout(safety);
    };
  }, []);

  // Pre-load all scene images in background on mount
  useEffect(() => {
    SCENES.forEach((scene) => {
      const img = new window.Image();
      img.src = scene.src;
    });

    // Check prefers-reduced-motion or save-data
    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const navConn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
      const saveData = Boolean(navConn?.saveData);

      if (reduced || saveData) {
        setIsManualOnly(true);
        setIsPaused(true);
        setIsRevealed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const goToSlide = useCallback((nextIdx: number, userInitiated = false) => {
    const resolvedIndex = (nextIdx + SCENES.length) % SCENES.length;
    setCurrentIndex(resolvedIndex);
    setProgressKey((prev) => prev + 1);

    if (userInitiated) {
      setFeedback(`Cena ${resolvedIndex + 1} de ${SCENES.length}: ${SCENES[resolvedIndex].title}.`);
    }
  }, []);

  // Main automatic carousel interval loop
  useEffect(() => {
    if (isPaused || isManualOnly) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      goToSlide(currentIndex + 1, false);
    }, INTERVAL);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, isPaused, isManualOnly, goToSlide, progressKey]);

  // Pause when tab is not visible or hero is completely out of view
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else if (!isPaused && !isManualOnly) {
        setProgressKey((prev) => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (heroRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const isVisible = Boolean(entries[0]?.isIntersecting);
          if (!isVisible) {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }
        },
        { threshold: 0 }
      );
      observer.observe(heroRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer?.disconnect();
    };
  }, [isPaused, isManualOnly]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1, true);
    }
  };

  const togglePlayPause = () => {
    if (isManualOnly) return;
    setIsPaused((prev) => {
      const next = !prev;
      if (!next) {
        setProgressKey((k) => k + 1);
      }
      return next;
    });
  };

  const activeScene = SCENES[currentIndex];

  return (
    <section
      ref={heroRef}
      className={`hero hero-gallery ${isRevealed ? 'is-revealed' : ''}`}
      aria-labelledby="hero-title"
      onKeyDown={handleKeyDown}
    >
      {/* Background Slides with smooth cross-fade */}
      <div className="hero-slides" aria-label="Ambientes e móveis em pedra">
        {SCENES.map((scene, idx) => (
          <div
            key={scene.src}
            className={`hero-slide-wrapper ${idx === currentIndex ? 'is-active' : ''}`}
            aria-hidden={idx !== currentIndex}
          >
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="hero-slide-img"
            />
          </div>
        ))}
      </div>

      {/* Hero Headline & Copy */}
      <div className="hero-copy">
        <p className="eyebrow">
          <span></span> DESIGN AUTORAL · MATÉRIA NATURAL
        </p>
        <h1 id="hero-title">
          <span className="motion-line">
            <span className="motion-line-inner">A natureza cria</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">A gente dá forma</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">
              <em>Você vive</em>
            </span>
          </span>
        </h1>
        <p className="hero-description">
          Móveis exclusivos em pedra e revestimentos sob encomenda. Desenhados para
          fazer parte da sua história.
        </p>
        <a className="button hero-cta" href="#contato">
          Converse sobre seu projeto <span aria-hidden="true">↗</span>
        </a>
        <div className="hero-footnote">
          <span>Design da própria casa</span>
          <span>Showroom em São Paulo</span>
        </div>
      </div>

      {/* Gallery Meta & Carousel Controls */}
      <div className="hero-gallery-bottom">
        <div className="hero-gallery-meta">
          <p>
            <span id="hero-slide-number">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(SCENES.length).padStart(2, '0')}{' '}
            <span className="hero-meta-divider">—</span>{' '}
            <span id="hero-slide-title">{activeScene.title}</span>
          </p>
          <span>Estudos visuais · IA</span>
        </div>

        <div className="hero-controls">
          <div className="hero-thumbnails" role="group" aria-label="Escolha uma cena">
            {SCENES.map((scene, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={scene.src}
                  type="button"
                  className="hero-thumb"
                  data-slide={idx}
                  aria-pressed={isSelected}
                  aria-label={`Mostrar cena ${idx + 1}: ${scene.label}`}
                  onClick={() => goToSlide(idx, true)}
                >
                  <img
                    src={scene.thumb}
                    width={80}
                    height={56}
                    alt=""
                    loading="lazy"
                  />
                  <span>
                    <small>{scene.tag}</small>
                    {scene.label}
                  </span>
                  <i
                    key={isSelected ? `prog-${progressKey}` : 'idle'}
                    className={isSelected && !isPaused && !isManualOnly ? 'is-running' : ''}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="hero-playback">
            <button
              type="button"
              id="hero-prev"
              aria-label="Cena anterior"
              onClick={() => goToSlide(currentIndex - 1, true)}
            >
              ←
            </button>
            <button
              type="button"
              id="hero-play"
              disabled={isManualOnly}
              aria-label={
                isManualOnly
                  ? 'Reprodução automática desativada pelas preferências do navegador'
                  : isPaused
                  ? 'Reproduzir carrossel automático'
                  : 'Pausar carrossel automático'
              }
              onClick={togglePlayPause}
            >
              {isManualOnly ? 'Manual' : isPaused ? 'Reproduzir' : 'Pausar'}
            </button>
            <button
              type="button"
              id="hero-next"
              aria-label="Próxima cena"
              onClick={() => goToSlide(currentIndex + 1, true)}
            >
              →
            </button>
          </div>
        </div>

        {/* Screen-reader live region */}
        <p className="sr-only" id="hero-feedback" role="status" aria-live="polite">
          {feedback}
        </p>
      </div>
    </section>
  );
}
