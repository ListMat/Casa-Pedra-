'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { GuideAnswers, ProjectContextState } from '@/types';
import { getComposition } from '@/data/compositions';

interface ProjectContextValue {
  context: ProjectContextState;
  setComposition: (id: string) => void;
  clearComposition: () => void;
  setWall: () => void;
  clearWall: () => void;
  setReuse: () => void;
  clearReuse: () => void;
  setGuide: (answers: GuideAnswers) => void;
  clearGuide: () => void;
  clearContext: () => void;
  interest: string;
  setInterest: (value: string) => void;
  contextSummary: string;
  hasContext: boolean;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<ProjectContextState>({});
  const [interest, setInterest] = useState<string>('');

  const calculateInterest = useCallback((ctx: ProjectContextState): string => {
    const isWall = ctx.wall || ctx.guide?.use === 'parede';
    const isFurniture = Boolean(ctx.composition || ctx.reuse);

    if (isWall) {
      return isFurniture ? 'Móveis e revestimentos' : 'Revestimento de parede';
    }
    if (isFurniture) {
      return 'Móvel exclusivo';
    }
    return '';
  }, []);

  const setComposition = useCallback(
    (id: string) => {
      setContext((prev) => {
        const next = { ...prev, composition: id };
        const calculated = calculateInterest(next);
        if (calculated) setInterest(calculated);
        return next;
      });
    },
    [calculateInterest]
  );

  const setWall = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev, wall: true };
      const calculated = calculateInterest(next);
      if (calculated) setInterest(calculated);
      return next;
    });
  }, [calculateInterest]);

  const setReuse = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev, reuse: true };
      const calculated = calculateInterest(next);
      if (calculated) setInterest(calculated);
      return next;
    });
  }, [calculateInterest]);

  const setGuide = useCallback(
    (answers: GuideAnswers) => {
      setContext((prev) => {
        const next = { ...prev, guide: answers };
        const calculated = calculateInterest(next);
        if (calculated) setInterest(calculated);
        return next;
      });
    },
    [calculateInterest]
  );

  const clearComposition = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev };
      delete next.composition;
      return next;
    });
  }, []);

  const clearWall = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev };
      delete next.wall;
      return next;
    });
  }, []);

  const clearReuse = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev };
      delete next.reuse;
      return next;
    });
  }, []);

  const clearGuide = useCallback(() => {
    setContext((prev) => {
      const next = { ...prev };
      delete next.guide;
      return next;
    });
  }, []);

  const clearContext = useCallback(() => {
    setContext({});
    setInterest('');
  }, []);

  const contextSummary = useMemo(() => {
    const entries: string[] = [];
    if (context.composition) {
      const item = getComposition(context.composition);
      if (item) {
        entries.push(`Ateliê ${item.id}: ${item.piece} · ${item.label}`);
      }
    }
    if (context.wall) {
      entries.push('Inspiração de revestimento selecionada');
    }
    if (context.reuse) {
      entries.push('Interesse em reaproveitamento de sobras');
    }
    if (context.guide) {
      entries.push('Preferências do guia de uso incluídas');
    }
    return entries.join(' / ');
  }, [context]);

  const hasContext = useMemo(() => {
    return Boolean(
      context.composition || context.wall || context.reuse || context.guide
    );
  }, [context]);

  const value = useMemo(
    () => ({
      context,
      setComposition,
      clearComposition,
      setWall,
      clearWall,
      setReuse,
      clearReuse,
      setGuide,
      clearGuide,
      clearContext,
      interest,
      setInterest,
      contextSummary,
      hasContext
    }),
    [
      context,
      setComposition,
      clearComposition,
      setWall,
      clearWall,
      setReuse,
      clearReuse,
      setGuide,
      clearGuide,
      clearContext,
      interest,
      contextSummary,
      hasContext
    ]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjectPreferences() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error(
      'useProjectPreferences must be used within a ProjectPreferencesProvider'
    );
  }
  return ctx;
}
