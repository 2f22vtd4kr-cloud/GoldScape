import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppliedImprovements } from '@/contexts/AppliedImprovementsContext';

interface Props {
  sectionId: string;
}

export function SectionSuggestions({ sectionId }: Props) {
  const { applied, unapply } = useAppliedImprovements();
  const items = applied[sectionId] ?? [];
  const [open, setOpen] = useState(true);

  if (!items.length) return null;

  return (
    <div className="border-t border-[#2A5F6F]/25 bg-[#2A5F6F]/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <Lightbulb size={12} className="text-[#4A9FBF]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#4A9FBF]">
              AI Suggested Content · {items.length} item{items.length !== 1 ? 's' : ''} applied
            </span>
          </div>
          {open ? (
            <ChevronUp size={12} className="text-white/25" />
          ) : (
            <ChevronDown size={12} className="text-white/25" />
          )}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-8 space-y-5 border-t border-[#2A5F6F]/15">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.field}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="pt-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                          {item.field}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 border uppercase tracking-wider ${
                            item.priority === 1
                              ? 'text-red-400 border-red-500/20'
                              : item.priority === 2
                              ? 'text-yellow-400 border-yellow-500/20'
                              : 'text-[#4A9FBF] border-[#2A5F6F]/30'
                          }`}
                        >
                          {item.priority === 1 ? 'Critical' : item.priority === 2 ? 'Important' : 'Enhance'}
                        </span>
                      </div>
                      <button
                        onClick={() => unapply(sectionId, item.field)}
                        className="text-white/20 hover:text-red-400/70 transition-colors flex-shrink-0 mt-0.5"
                        title="Remove suggestion"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed pl-3 border-l-2 border-[#2A5F6F]/30">
                      {item.improvement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
