import { common } from '@/i18n/locales/en/common';
import { detail } from '@/i18n/locales/en/detail';
import { home } from '@/i18n/locales/en/home';

export const en = {
  common,
  home,
  detail,
} as const;

export type LocaleResources = typeof en;
