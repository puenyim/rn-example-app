import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

interface ListFooterProps {
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreLabel: string;
  endLabel: string;
  itemsCount: number;
}

export function ListFooter({
  loadingMore,
  hasMore,
  loadMoreLabel,
  endLabel,
  itemsCount,
}: ListFooterProps) {
  if (itemsCount === 0) return null;

  if (loadingMore) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.text}>{loadMoreLabel}</Text>
      </View>
    );
  }

  if (!hasMore) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{endLabel}</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  text: {
    color: colors.textMuted,
    ...typography.caption,
  },
});
