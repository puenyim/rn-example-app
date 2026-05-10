import 'intl-pluralrules';
import '@/i18n/types';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  LOCALES,
  NAMESPACES,
  SUPPORTED_LANGUAGES,
  isAppLanguage,
  type AppLanguage,
} from '@/i18n/config';


export function detectInitialLanguage(): AppLanguage {
  try {
    const code = getLocales()?.[0]?.languageCode?.toLowerCase();
    return isAppLanguage(code) ? code : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

const resources = LOCALES.reduce<Record<AppLanguage, typeof LOCALES[number]['resource']>>(
  (acc, locale) => {
    acc[locale.code] = locale.resource;
    return acc;
  },
  {} as Record<AppLanguage, typeof LOCALES[number]['resource']>,
);

void i18n.use(initReactI18next).init({
  resources,
  lng: detectInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  ns: NAMESPACES as unknown as string[],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  compatibilityJSON: 'v4',
});

export { SUPPORTED_LANGUAGES, type AppLanguage };
export default i18n;
