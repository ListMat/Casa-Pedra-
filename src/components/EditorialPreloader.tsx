'use client';

import React, { useState, useEffect } from 'react';

const WORDS = [
  { text: 'A matéria', sub: 'Rochas naturais nobres' },
  { text: 'A forma', sub: 'Design autoral & arquitetura' },
  { text: 'O tempo', sub: '27 anos de história em família' },
  { text: 'casa pedra', sub: 'Móveis exclusivos sob encomenda', isBrand: true }
];

export function EditorialPreloader() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsFinished(true);
      return;
    }

    // Preload critical hero assets in background
    const criticalImages = ['/assets/hero.webp', '/assets/console.webp', '/assets/wall.webp'];
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Lock body scroll while preloading
    document.body.style.overflow = 'hidden';

    // Start progress bar animation
    const progressStart = Date.now();
    const progressDuration = 1400; // ms

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - progressStart;
      const p = Math.min(100, Math.round((elapsed / progressDuration) * 100));
      setProgress(p);
      if (p >= 100) clearInterval(progressInterval);
    }, 25);

    // Sequence the words
    const t1 = setTimeout(() => setCurrentIndex(1), 380);
    const t2 = setTimeout(() => setCurrentIndex(2), 760);
    const t3 = setTimeout(() => setCurrentIndex(3), 1140);

    // Trigger curtain exit
    const tExit = setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    // Remove component and restore scroll
    const tFinish = setTimeout(() => {
      document.body.style.overflow = '';
      setIsFinished(true);
    }, 2250);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tExit);
      clearTimeout(tFinish);
      document.body.style.overflow = '';
    };
  }, []);

  if (isFinished) return null;

  const currentWord = WORDS[currentIndex];

  return (
    <aside
      className={`editorial-preloader ${isExiting ? 'preloader-exit' : ''}`}
      aria-label="Carregando experiência Casa Pedra"
      role="status"
      aria-live="polite"
    >
      <div className="preloader-overlay">
        {/* Top mini header */}
        <div className="preloader-top">
          <span className="preloader-tag">TESTE TÉCNICO · EXPERIÊNCIA INTERATIVA</span>
          <span className="preloader-year">DESDE 1997</span>
        </div>

        {/* Center Editorial Typography */}
        <div className="preloader-center">
          <div key={currentIndex} className="preloader-text-block">
            <h1 className={`preloader-title ${currentWord.isBrand ? 'brand-name' : ''}`}>
              {currentWord.text}
            </h1>
            <p className="preloader-sub">{currentWord.sub}</p>
          </div>
        </div>

        {/* Bottom progress bar & counter */}
        <div className="preloader-bottom">
          <div className="preloader-meta">
            <span className="preloader-status">
              {progress < 100 ? 'Preparando materiais e composições…' : 'Pronto.'}
            </span>
            <span className="preloader-count">{progress}%</span>
          </div>
          <div className="preloader-bar-track">
            <div
              className="preloader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
