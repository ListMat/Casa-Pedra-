'use client';

import React, { useState, useRef } from 'react';
import { useProjectPreferences } from '@/context/ProjectContext';
import { buildWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

export function Contact() {
  const {
    context,
    interest,
    setInterest,
    contextSummary,
    hasContext,
    clearContext,
    clearComposition,
    clearWall,
    clearReuse,
    clearGuide
  } = useProjectPreferences();

  const [location, setLocation] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const interestSelectRef = useRef<HTMLSelectElement | null>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);

  const handleClearContext = () => {
    clearContext();
    if (interestSelectRef.current) {
      interestSelectRef.current.value = '';
      interestSelectRef.current.focus();
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('');
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const trimmedLocation = location.trim();
    if (!trimmedLocation && locationInputRef.current) {
      locationInputRef.current.setCustomValidity('Informe sua cidade e seu bairro.');
      locationInputRef.current.reportValidity();
      return;
    }

    const message = buildWhatsAppMessage(
      {
        interest,
        location: trimmedLocation,
        budget
      },
      context
    );

    const targetUrl = getWhatsAppUrl(message);
    window.location.assign(targetUrl);
  };

  return (
    <section id="contato" className="contact section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">VAMOS DAR FORMA À SUA IDEIA?</p>
        <h2 id="contact-title">
          <span className="motion-line">
            <span className="motion-line-inner">Sua próxima peça</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">começa com uma</span>
          </span>
          <span className="motion-line">
            <span className="motion-line-inner">
              <em>boa conversa.</em>
            </span>
          </span>
        </h2>
        <p>
          Conte um pouco sobre o que você imagina. Vamos levar essas informações para o
          WhatsApp da Casa Pedra.
        </p>
        <div className="contact-details">
          <p><strong>Atendimento:</strong> {siteConfig.region}</p>
          <p><strong>Horário:</strong> {siteConfig.hours}</p>
          <p>
            <strong>Showroom & Ateliê em SP:</strong> Agende um atendimento presencial para tocar nas rochas, apreciar os veios sob luz natural e selecionar suas chapas.
          </p>
          <a
            href={`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(siteConfig.defaultWhatsAppMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefere começar direto pelo WhatsApp? ↗
          </a>
        </div>
      </div>

      <form id="project-form" onSubmit={handleSubmit}>
        <p className="form-title">O que vamos criar juntos?</p>

        {hasContext && (
          <div id="project-context" className="project-context">
            <div className="project-context-header">
              <strong>Suas referências para a conversa</strong>
              <button id="clear-context" type="button" onClick={handleClearContext}>
                Limpar tudo
              </button>
            </div>
            <div className="project-chips-list">
              {context.composition && (
                <span className="context-chip">
                  <span>Ateliê: {context.composition}</span>
                  <button
                    type="button"
                    aria-label="Remover composição do Ateliê"
                    onClick={clearComposition}
                  >
                    ×
                  </button>
                </span>
              )}
              {context.wall && (
                <span className="context-chip">
                  <span>Revestimento de Parede</span>
                  <button
                    type="button"
                    aria-label="Remover referência de revestimento"
                    onClick={clearWall}
                  >
                    ×
                  </button>
                </span>
              )}
              {context.reuse && (
                <span className="context-chip">
                  <span>Reaproveitamento</span>
                  <button
                    type="button"
                    aria-label="Remover interesse em reaproveitamento"
                    onClick={clearReuse}
                  >
                    ×
                  </button>
                </span>
              )}
              {context.guide && (
                <span className="context-chip">
                  <span>Guia de Uso</span>
                  <button
                    type="button"
                    aria-label="Remover preferências do guia"
                    onClick={clearGuide}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <p id="project-context-text" className="sr-only" aria-live="polite">
              {contextSummary}
            </p>
          </div>
        )}

        <label htmlFor="interest">
          Tenho interesse em <span aria-hidden="true">*</span>
        </label>
        <select
          id="interest"
          name="interest"
          ref={interestSelectRef}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        >
          <option value="">Selecione seu projeto</option>
          <option value="Móvel exclusivo">Móvel exclusivo</option>
          <option value="Revestimento de parede">Revestimento de parede</option>
          <option value="Móveis e revestimentos">Móveis e revestimentos</option>
          <option value="Outro projeto em pedra">Outro projeto em pedra</option>
        </select>

        <label htmlFor="location">
          Cidade e bairro <span aria-hidden="true">*</span>
        </label>
        <input
          id="location"
          name="location"
          ref={locationInputRef}
          value={location}
          placeholder="Ex.: São Paulo, Alto de Pinheiros"
          autoComplete="address-level2"
          required
          maxLength={120}
          onChange={handleLocationChange}
        />

        <label htmlFor="budget">
          Investimento previsto <span className="optional">(opcional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="">Ainda estou definindo</option>
          <option value="Até R$ 15 mil">Até R$ 15 mil</option>
          <option value="De R$ 15 mil a R$ 30 mil">De R$ 15 mil a R$ 30 mil</option>
          <option value="De R$ 30 mil a R$ 60 mil">De R$ 30 mil a R$ 60 mil</option>
          <option value="Acima de R$ 60 mil">Acima de R$ 60 mil</option>
        </select>

        <button className="button" type="submit">
          Continuar no WhatsApp <span aria-hidden="true">↗</span>
        </button>

        <p className="form-note">
          Você poderá revisar a mensagem antes de enviar no WhatsApp. Estes dados não são
          armazenados pela página.
        </p>
      </form>
    </section>
  );
}
