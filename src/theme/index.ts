export const colors = {
  background: '#F6F7FB',
  surface: '#FFFFFF',
  border: '#E4E7EE',
  primary: '#09AEAE',
  primary70: 'rgba(9, 174, 174, 0.7)',
  primarySoft: '#E6F7F7',
  text: '#0F172A',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  accent: '#0F766E',
  danger: '#DC2626',
  success: '#16A34A',
  shadow: 'rgba(15, 23, 42, 0.08)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 22, fontWeight: '700' as const },
  heading: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
} as const;
