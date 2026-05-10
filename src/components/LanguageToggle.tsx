import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LOCALES } from '@/i18n/config';
import { useAppDispatch, useAppSelector } from '@/store';
import { setLanguage } from '@/store/settings/settingsSlice';
import { colors, radius, spacing, typography } from '@/theme';


export function LanguageToggle() {
  const current = useAppSelector((s) => s.settings.language);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      {LOCALES.map((lang) => {
        const active = lang.code === current;
        return (
          <Pressable
            key={lang.code}
            accessibilityRole="button"
            accessibilityLabel={lang.nativeName}
            accessibilityState={{ selected: active }}
            onPress={() => dispatch(setLanguage(lang.code))}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {lang.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    padding: 2,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.primary,
    ...typography.caption,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.textInverse,
  },
});
