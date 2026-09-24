'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useProjectPreferences } from '@/context/ProjectContext';
import { animateElement, isMotionEnabled } from '@/hooks/useMotion';

export function Transformation() {
  const { setWall } = useProjectPreferences();
  const [split, setSplit] = useState<number>(50);
  const [dragging, setDragging] = useState<boolean>(false);

  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLSpanElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const hintAnimationRef = useRef<Animation | null>(null);
  const hasInteractedRef = useRef<boolean>(false);

  const cancelHint = useCallback(() => {
    hasInteractedRef.current = true;
    if (hintAnimationRef.current) {
      hintAnimationRef.current.cancel();
      hintAnimationRef.current = null;
    }
  }, []);

  const updateSplit = useCallback((value: number | string) => {
    const num = Math.max(0, Math.min(100, Number(value)));
    setSplit(num);
  }, []);

  // IntersectionObserver for initial hint animation
  useEffect(() => {
    const comparisonEl = comparisonRef.current;
    if (!comparisonEl || typeof window === 'undefined' || !('IntersectionObserver' in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (!hasInteractedRef.current && handleRef.current && isMotionEnabled()) {
            hintAnimationRef.current = animateElement(
              handleRef.current,
              [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-7px)' },
                { transform: 'translateX(7px)' },
                { transform: 'translateX(0)' }
              ],
              { duration: 700, delay: 180, easing: 'ease-in-out' }
            );
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(comparisonEl);
    return () => {
      observer.disconnect();
      if (hintAnimationRef.current) {
        hintAnimationRef.current.cancel();
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    cancelHint();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    const newSplit = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    updateSplit(newSplit);
    sliderRef.current?.focus({ preventScroll: true });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const newSplit = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    updateSplit(newSplit);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <section id="transformacao" className="section transformation" aria-labelledby="wall-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A ARQUITETURA GANHA OUTRA LEITURA</p>
          <h2 id="wall-heading">
            <span className="motion-line">
              <span className="motion-line-inner">O mesmo ambiente.</span>
            </span>
            <span className="motion-line">
              <span className="motion-line-inner">
                <em>Uma nova presença.</em>
              </span>
            </span>
          </h2>
        </div>
        <p>
          Deslize para explorar o efeito da pedra na parede. Repare no contraste, na
          textura e na relação com os móveis.
        </p>
      </div>

      <figure>
        <div
          id="comparison"
          ref={comparisonRef}
          className="comparison"
          style={{ '--split': `${split}%` } as React.CSSProperties}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={cancelHint}
        >
          <Image
            src="/assets/wall-before.webp"
            width={1448}
            height={1086}
            loading="lazy"
            alt="Estudo do ambiente com parede clara sem revestimento"
          />
          <Image
            className="comparison-after"
            src="/assets/wall.webp"
            width={1448}
            height={1086}
            loading="lazy"
            alt="Versão do mesmo ambiente com revestimento de pedra de veios expressivos"
          />
          <span className="comparison-label before-label">Sem revestimento</span>
          <span className="comparison-label after-label">Com pedra</span>
          <div className="comparison-handle" aria-hidden="true">
            <span ref={handleRef}>↔</span>
          </div>
        </div>
        <figcaption className="experience-note">
          Simulação conceitual com IA. As imagens não representam uma obra executada. A
          edição pode apresentar pequenas diferenças de detalhe.
        </figcaption>
      </figure>

      <div className="compare-control">
        <label htmlFor="compare-range">Explore a transformação</label>
        <input
          id="compare-range"
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={split}
          aria-label="Divisão entre ambiente sem revestimento e com pedra"
          aria-valuetext={`${split}% sem revestimento; ${100 - split}% com pedra`}
          onChange={(e) => {
            cancelHint();
            updateSplit(e.target.value);
          }}
          onKeyDown={cancelHint}
          onPointerDown={cancelHint}
        />
        <div className="compare-presets">
          <button
            type="button"
            data-compare="100"
            onClick={() => {
              cancelHint();
              updateSplit(100);
            }}
          >
            Sem revestimento
          </button>
          <button
            type="button"
            data-compare="50"
            onClick={() => {
              cancelHint();
              updateSplit(50);
            }}
          >
            Comparar
          </button>
          <button
            type="button"
            data-compare="0"
            onClick={() => {
              cancelHint();
              updateSplit(0);
            }}
          >
            Com pedra
          </button>
        </div>
      </div>

      <a
        className="text-link"
        id="wall-cta"
        href="#contato"
        onClick={() => setWall()}
      >
        Quero explorar uma parede assim no meu projeto <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
