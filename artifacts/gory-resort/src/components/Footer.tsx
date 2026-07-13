import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-white/10 py-12">
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        
        <div className="text-xs text-white/40 uppercase tracking-widest">
          © 2027 GORY RESORT. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-white/60">
          <a href="#" className="hover:text-white transition-colors">{t('footer_privacy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer_terms')}</a>
          <a href="#invest" className="hover:text-white transition-colors">{t('footer_investors')}</a>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
};