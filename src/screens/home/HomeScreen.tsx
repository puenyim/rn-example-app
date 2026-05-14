import { useCallback, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CategoryChips } from '@/components/CategoryChips';
import { ErrorView } from '@/components/ErrorView';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ListEmpty } from '@/components/ListEmpty';
import { ListFooter } from '@/components/ListFooter';
import { SearchBar } from '@/components/SearchBar';
import { UserListItem } from '@/components/UserListItem';
import { colors, radius, spacing, typography } from '@/theme';
import type { User } from '@/types/user';
import type { HomeScreenProps } from '@/navigation/types';
import { useHomeScreen } from './useHomeScreen';

const KEY_EXTRACTOR = (item: User) => String(item.id);
const ITEM_HEIGHT = 48 + spacing.md * 2 + spacing.sm;

export function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;
  const { t: tCommon } = useTranslation('common');
  const {
    t,
    text,
    setText,
    items,
    status,
    loadingMore,
    refreshing,
    hasMore,
    error,
    gender,
    categoryOptions,
    totalLabel,
    isInitialLoading,
    isError,
    handleEndReached,
    handleRefresh,
    handleChangeCategory,
    handleRetry,
    handlePressItem,
    handleLogout,
  } = useHomeScreen(props);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('title'),
      headerRight: () => (
        <View style={styles.headerRight}>
          <LanguageToggle />
          <Pressable
            onPress={handleLogout}
            hitSlop={8}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>↩</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation, t, handleLogout]);

  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => <UserListItem user={item} onPress={handlePressItem} />,
    [handlePressItem],
  );

  if (isError) {
    return (
      <View style={styles.flexCenter}>
        <ErrorView
          title={t('errorTitle')}
          message={error ?? undefined}
          retryLabel={tCommon('retry')}
          onRetry={handleRetry}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <SearchBar
          placeholder={t('searchPlaceholder')}
          value={text}
          onChangeText={setText}
          onClear={() => setText('')}
        />
      </View>

      <View style={styles.chipsWrap}>
        <CategoryChips
          options={categoryOptions}
          value={gender}
          onChange={handleChangeCategory}
        />
      </View>

      {items.length > 0 && (
        <Text style={styles.totalLabel}>{totalLabel}</Text>
      )}

      {isInitialLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={KEY_EXTRACTOR}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          ListEmptyComponent={
            status === 'succeeded' ? (
              <ListEmpty
                title={t('emptyTitle')}
                subtitle={t('emptySubtitle')}
              />
            ) : null
          }
          ListFooterComponent={
            <ListFooter
              loadingMore={loadingMore}
              hasMore={hasMore}
              loadMoreLabel={t('loadMore')}
              endLabel={t('endOfList')}
              itemsCount={items.length}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  chipsWrap: {
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  totalLabel: {
    color: colors.textMuted,
    ...typography.caption,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  logoutBtn: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  logoutText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
});
