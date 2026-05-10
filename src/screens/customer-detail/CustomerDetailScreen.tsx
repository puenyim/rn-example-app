import { useLayoutEffect } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { LanguageToggle } from '@/components/LanguageToggle';
import { colors, radius, spacing, typography } from '@/theme';
import type { CustomerDetailScreenProps } from '@/navigation/types';
import { useCustomerDetailScreen } from './useCustomerDetailScreen';

export function CustomerDetailScreen(props: CustomerDetailScreenProps) {
  const { navigation } = props;
  const { user, t, sections, bankCard, cardRevealed, toggleCard } =
    useCustomerDetailScreen(props);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('title'),
      headerRight: () => (
        <View style={styles.headerRight}>
          <LanguageToggle />
        </View>
      ),
    });
  }, [navigation, t]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        {user.image ? (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarFallbackText}>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Text>
          </View>
        )}
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        {user.company?.title ? (
          <Text style={styles.subtitle}>
            {user.company.title}
            {user.company.name ? ` · ${user.company.name}` : ''}
          </Text>
        ) : null}
      </View>

      {bankCard && (
        <View style={styles.bankCardWrap}>
          <View style={styles.bankCard}>
            <View style={styles.bankCardTop}>
              <Text style={styles.bankCardType}>
                {bankCard.cardType.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.bankCardNumber}>{bankCard.cardNumber}</Text>
            <View style={styles.bankCardBottom}>
              <View>
                <Text style={styles.bankCardLabel}>
                  {t('fields.cardExpire')}
                </Text>
                <Text style={styles.bankCardExpiry}>{bankCard.cardExpire}</Text>
              </View>
              <Pressable
                onPress={toggleCard}
                hitSlop={12}
                style={styles.bankCardToggle}
              >
                <Text style={styles.bankCardToggleText}>
                  {cardRevealed ? t('hide') : t('show')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.card}>
            {section.rows.map((row, idx) => (
              <View
                key={row.label}
                style={[
                  styles.col,
                  idx < section.rows.length - 1 && styles.rowDivider,
                ]}
              >
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue} numberOfLines={2}>
                  {String(row.value)}
                </Text>
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
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    ...typography.title,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
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
  bankCardType: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  bankCardCurrency: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  bankCardNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: spacing.xl,
    fontVariant: ['tabular-nums'],
  },
  bankCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bankCardLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  bankCardExpiry: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  bankCardToggle: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  bankCardToggleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  bankCardIban: {
    marginTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingTop: spacing.md,
  },
  bankCardIbanValue: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    fontVariant: ['tabular-nums'],
  },

  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textMuted,
    ...typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    alignItems: 'flex-start',
  },
  col: {
    flexDirection: 'column',
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    flex: 1,
    color: colors.text,
    ...typography.body,
  },
  rowValue: {
    flex: 1,
    color: colors.textMuted,
    ...typography.body,
  },
  headerRight: {
    paddingRight: spacing.sm,
  },
});
