import { memo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export interface CategoryChip<T extends string> {
  value: T;
  label: string;
}

interface CategoryChipsProps<T extends string> {
  options: CategoryChip<T>[];
  value: T;
  onChange: (value: T) => void;
  contentInsetHorizontal?: number;
}

function CategoryChipsComponent<T extends string>({
  options,
  value,
  onChange,
  contentInsetHorizontal = spacing.lg,
}: CategoryChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingHorizontal: contentInsetHorizontal },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              styles.chip,
              active && styles.chipActive,
              pressed && !active && styles.chipPressed,
            ]}
          >
            <View>
              <Text
                style={[styles.label, active && styles.labelActive]}
                numberOfLines={1}
              >
                {opt.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export const CategoryChips = memo(
  CategoryChipsComponent,
) as typeof CategoryChipsComponent;

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    backgroundColor: colors.primarySoft,
  },
  label: {
    color: colors.text,
    ...typography.caption,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.textInverse,
  },
});
