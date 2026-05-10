import 'react-i18next';

import type { LocaleResources } from '@/i18n/locales/en';
import type { DEFAULT_NAMESPACE } from '@/i18n/config';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: LocaleResources;
  }
}
