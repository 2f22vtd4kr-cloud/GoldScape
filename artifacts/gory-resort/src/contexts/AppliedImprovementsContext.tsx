import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface ImprovementItem {
  sectionId: string;
  sectionTitle: string;
  priority: 1 | 2 | 3;
  concern: string;
  personas: string[];
  field: string;
  improvement: string;
}

interface AppliedCtx {
  applied: Record<string, ImprovementItem[]>;
  apply: (item: ImprovementItem) => void;
  unapply: (sectionId: string, field: string) => void;
  isApplied: (sectionId: string, field: string) => boolean;
  totalApplied: number;
}

const Ctx = createContext<AppliedCtx | null>(null);
const STORAGE_KEY = 'gory-applied-improvements-v1';

export function AppliedImprovementsProvider({ children }: { children: React.ReactNode }) {
  const [applied, setApplied] = useState<Record<string, ImprovementItem[]>>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? (JSON.parse(s) as Record<string, ImprovementItem[]>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applied));
  }, [applied]);

  const apply = useCallback((item: ImprovementItem) => {
    setApplied(prev => {
      const cur = prev[item.sectionId] ?? [];
      if (cur.some(e => e.field === item.field)) return prev;
      return { ...prev, [item.sectionId]: [...cur, item] };
    });
  }, []);

  const unapply = useCallback((sectionId: string, field: string) => {
    setApplied(prev => {
      const filtered = (prev[sectionId] ?? []).filter(e => e.field !== field);
      if (!filtered.length) {
        const { [sectionId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [sectionId]: filtered };
    });
  }, []);

  const isApplied = useCallback(
    (sectionId: string, field: string) =>
      (applied[sectionId] ?? []).some(e => e.field === field),
    [applied],
  );

  const totalApplied = Object.values(applied).reduce((s, a) => s + a.length, 0);

  return (
    <Ctx.Provider value={{ applied, apply, unapply, isApplied, totalApplied }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppliedImprovements() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppliedImprovements must be inside AppliedImprovementsProvider');
  return ctx;
}
