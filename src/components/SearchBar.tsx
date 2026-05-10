import { memo } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  onClear?: () => void;
}

function SearchBarComponent({ onClear, value, ...rest }: SearchBarProps) {
  const hasValue = !!value && value.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.iconLeft}>
        <View style={styles.iconCircle}>
          <View style={styles.iconHandle} />
        </View>
      </View>

      <TextInput
        {...rest}
        value={value}
        style={styles.input}
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="never"
      />

      {hasValue && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={10}
          onPress={onClear}
          style={styles.clear}
        >
          <View style={styles.clearLine1} />
          <View style={styles.clearLine2} />
        </Pressable>
      )}
    </View>
  );
}

export const SearchBar = memo(SearchBarComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  iconLeft: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.6,
    borderColor: colors.textMuted,
  },
  iconHandle: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 6,
    height: 1.6,
    backgroundColor: colors.textMuted,
    transform: [{ rotate: '45deg' }],
  },
  input: {
    flex: 1,
    color: colors.text,
    ...typography.body,
    paddingVertical: 0,
  },
  clear: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  clearLine1: {
    position: 'absolute',
    width: 12,
    height: 1.6,
    backgroundColor: colors.textMuted,
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    position: 'absolute',
    width: 12,
    height: 1.6,
    backgroundColor: colors.textMuted,
    transform: [{ rotate: '-45deg' }],
  },
});
