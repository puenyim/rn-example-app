import { auth } from '@/i18n/locales/en/auth';
import { common } from '@/i18n/locales/en/common';
import { detail } from '@/i18n/locales/en/detail';
import { home } from '@/i18n/locales/en/home';

export const en = {
  auth,
  common,
  home,
  detail,
} as const;

export type LocaleResources = typeof en;
