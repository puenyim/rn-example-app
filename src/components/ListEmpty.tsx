import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

interface ListEmptyProps {
  title: string;
  subtitle?: string;
}

export function ListEmpty({ title, subtitle }: ListEmptyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    ...typography.heading,
  },
  subtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
