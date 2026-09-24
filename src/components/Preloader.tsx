'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

export function Preloader() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const finishedRef = useRef<boolean>(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsPlaying(false);
    document.documentElement.classList.remove('cp-intro-active');
    window.dispatchEvent(new CustomEvent('cp:intro-end'));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      reduced = false;
    }

    const isHidden = typeof document !== 'undefined' && document.hidden;
    const isSaveData = typeof navigator !== 'undefined' && Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData);

    if (reduced || isHidden || isSaveData) {
      finish();
      return;
    }

    // Preload intro images
    const imagesToPreload = [
      '/assets/console-thumb.webp',
      '/assets/wall-thumb.webp',
      '/assets/hero.webp',
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    setIsPlaying(true);
    document.documentElement.classList.add('cp-intro-active');

    const safetyTimer = setTimeout(finish, 3400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', 'Tab', 'Enter', ' ', 'ArrowDown', 'PageDown', 'End'].includes(e.key)) {
        finish();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const introEl = document.getElementById('cp-intro');
      if (introEl && !introEl.contains(e.target as Node)) {
        finish();
      }
    };

    const handleWheel = () => finish();
    const handleVisibility = () => {
      if (document.hidden) finish();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.documentElement.classList.remove('cp-intro-active');
    };
  }, [finish]);

  if (!isMounted || !isPlaying) return null;

  return (
    <aside
      className="cp-intro is-playing"
      id="cp-intro"
      aria-label="Abertura Casa Pedra"
      role="status"
      aria-live="polite"
    >
      <div className="cp-intro-visual" aria-hidden="true">
        <div className="cp-intro-photo">
          {/* Intermediate photos with staggered opacity keyframes */}
          <img
            className="cp-intro-scene-one"
            src="/assets/console-thumb.webp"
            alt=""
          />
          <img
            className="cp-intro-scene-two"
            src="/assets/wall-thumb.webp"
            alt=""
          />
        </div>
        <span className="cp-intro-word cp-intro-casa">casa</span>
        <span className="cp-intro-word cp-intro-pedra">pedra</span>
        <span className="cp-intro-caption">Da natureza. Para a sua história.</span>
      </div>
      <button
        className="cp-intro-skip"
        type="button"
        onClick={finish}
        aria-label="Pular abertura interativa"
      >
        Pular abertura
      </button>
    </aside>
  );
}
