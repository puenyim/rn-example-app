import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

interface ErrorViewProps {
  title: string;
  message?: string;
  retryLabel: string;
  onRetry: () => void;
}

export function ErrorView({ title, message, retryLabel, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>{retryLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.danger,
    ...typography.heading,
  },
  message: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: {
    color: colors.textInverse,
    ...typography.heading,
  },
});
