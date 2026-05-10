import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';
import type { User } from '@/types/user';
import { useTranslation } from 'react-i18next';

interface UserListItemProps {
  user: User;
  onPress: (user: User) => void;
}

function UserListItemComponent({ user, onPress }: UserListItemProps) {
  const { t: tHome } = useTranslation('home');
  const fullName = `${user.firstName} ${user.lastName}`;
  const subtitle = `${tHome('age')} : ${user.age}, ${tHome('gender')} : ${user.gender === 'male' ? tHome('category.male') : tHome('category.female')}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={fullName}
      onPress={() => onPress(user)}
      android_ripple={{ color: colors.primarySoft }}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
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

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {fullName}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export const UserListItem = memo(UserListItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pressed: { opacity: 0.7 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: colors.primary,
    ...typography.heading,
  },
  body: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.text,
    ...typography.heading,
  },
  subtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: 2,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 24,
    paddingHorizontal: spacing.xs,
  },
});
