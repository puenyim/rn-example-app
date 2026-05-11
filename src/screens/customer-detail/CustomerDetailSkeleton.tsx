import { ScrollView, StyleSheet, View } from 'react-native';

import { Skeleton, SkeletonCircle } from '@/components/Skeleton';
import { colors, radius, spacing } from '@/theme';

const SECTION_ROW_COUNTS = [3, 5, 5, 3];

export function CustomerDetailSkeleton() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      <View style={styles.header}>
        <SkeletonCircle size={96} />
        <Skeleton
          width={180}
          height={22}
          style={styles.namePlaceholder}
        />
        <Skeleton
          width={140}
          height={13}
          style={styles.subtitlePlaceholder}
        />
      </View>

      {/* Bank card */}
      <View style={styles.bankCardWrap}>
        <View style={styles.bankCard}>
          <View style={styles.bankCardTop}>
            <Skeleton
              width={80}
              height={16}
              style={styles.bankCardSkeletonLight}
            />
          </View>
          <Skeleton
            width="70%"
            height={22}
            style={[styles.bankCardSkeletonLight, styles.bankCardNumber]}
          />
          <View style={styles.bankCardBottom}>
            <View>
              <Skeleton
                width={60}
                height={11}
                style={styles.bankCardSkeletonLight}
              />
              <Skeleton
                width={70}
                height={16}
                style={[styles.bankCardSkeletonLight, styles.bankCardExpiry]}
              />
            </View>
            <Skeleton
              width={56}
              height={28}
              borderRadius={radius.pill}
              style={styles.bankCardSkeletonLight}
            />
          </View>
        </View>
      </View>

      {SECTION_ROW_COUNTS.map((rowCount, sectionIdx) => (
        <View key={sectionIdx} style={styles.section}>
          <Skeleton
            width={120}
            height={13}
            style={styles.sectionTitle}
          />
          <View style={styles.card}>
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
              <View
                key={rowIdx}
                style={[
                  styles.col,
                  rowIdx < rowCount - 1 && styles.rowDivider,
                ]}
              >
                <Skeleton width="40%" height={15} />
                <Skeleton
                  width="65%"
                  height={15}
                  style={styles.rowValuePlaceholder}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  namePlaceholder: {
    marginTop: spacing.md,
  },
  subtitlePlaceholder: {
    marginTop: spacing.xs,
  },

  bankCardWrap: {
    marginBottom: spacing.xl,
  },
  bankCard: {
    backgroundColor: '#09AEAE',
    borderRadius: radius.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  bankCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  bankCardNumber: {
    marginBottom: spacing.xl,
  },
  bankCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bankCardExpiry: {
    marginTop: spacing.xs,
  },
  bankCardSkeletonLight: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  col: {
    flexDirection: 'column',
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowValuePlaceholder: {
    marginTop: spacing.xs,
  },
});
