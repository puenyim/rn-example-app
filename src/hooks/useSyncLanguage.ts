import { useEffect } from 'react';
import i18n from 'i18next';

import { useAppSelector } from '@/store';

export function useSyncLanguage() {
  const language = useAppSelector((s) => s.settings.language);

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);
}
