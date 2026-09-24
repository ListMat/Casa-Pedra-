import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--paper, #faf9f6)',
      color: 'var(--ink, #252b29)',
      textAlign: 'center',
      fontFamily: 'var(--font)'
    }}>
      <span style={{
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--teal, #02575f)',
        fontWeight: 600,
        marginBottom: '12px'
      }}>
        404 · Página não encontrada
      </span>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 500,
        margin: '0 0 16px',
        letterSpacing: '-1.5px',
        color: 'var(--teal, #02575f)'
      }}>
        Estrutura não encontrada.
      </h1>
      <p style={{
        maxWidth: '480px',
        color: 'var(--muted, #606663)',
        fontSize: '16px',
        lineHeight: 1.6,
        marginBottom: '32px'
      }}>
        A página que você está buscando pode ter sido movida ou não existe em nosso catálogo arquitetural.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--teal, #02575f)',
          color: '#ffffff',
          padding: '14px 28px',
          borderRadius: 0,
          fontWeight: 500,
          fontSize: '14px',
          textDecoration: 'none'
        }}
      >
        Retornar ao Início <span>↗</span>
      </Link>
    </main>
  );
}
