'use client';

import React from 'react';

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      Imprimir / salvar em PDF
    </button>
  );
}
