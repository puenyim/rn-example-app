import { en } from '@/i18n/locales/en';
import { th } from '@/i18n/locales/th';
import type { LocaleResources } from '@/i18n/locales/en';

/**
 * Single source of truth for locales the app supports.
 *
 * Adding a new language is a 3-step drop-in:
 *   1. Create `locales/<code>/{common,home,detail}.ts` typed against the
 *      English namespace types.
 *   2. Add a `locales/<code>.ts` barrel typed as `LocaleResources`.
 *   3. Register the locale below — nothing else in the app needs to change.
 *
 * The `LocaleResources` typing on each `resource` makes step 1 enforced at
 * compile time: a half-translated locale will not build.
 */
export const LOCALES = [
  {
    code: 'en',
    label: 'EN',
    nativeName: 'English',
    resource: en,
  },
  {
    code: 'th',
    label: 'TH',
    nativeName: 'ไทย',
    resource: th,
  },
] as const satisfies ReadonlyArray<{
  code: string;
  label: string;
  nativeName: string;
  resource: LocaleResources;
}>;

export type AppLanguage = (typeof LOCALES)[number]['code'];

export const SUPPORTED_LANGUAGES: readonly AppLanguage[] = LOCALES.map(
  (l) => l.code,
);

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export const NAMESPACES = Object.keys(en) as ReadonlyArray<keyof LocaleResources>;

export const DEFAULT_NAMESPACE: keyof LocaleResources = 'common';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
  );
}
