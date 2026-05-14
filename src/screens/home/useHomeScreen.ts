import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/auth/authSlice';
import { fetchUsersInitial, fetchUsersNextPage, setGender } from '@/store/users/usersSlice';
import type { GenderFilter } from '@/services/users';
import type { User } from '@/types/user';
import type { CategoryChip } from '@/components/CategoryChips';
import type { HomeScreenProps } from '@/navigation/types';

export function useHomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();

  const {
    items,
    total,
    status,
    loadingMore,
    refreshing,
    hasMore,
    error,
    query: storedQuery,
    gender,
  } = useAppSelector((s) => s.users);

  const [text, setText] = useState(storedQuery);
  const debouncedText = useDebouncedValue(text, 350);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchUsersInitial({}));
    }
  }, [dispatch, status]);

  useEffect(() => {
    const trimmed = debouncedText.trim();
    if (trimmed === storedQuery) return;
    void dispatch(fetchUsersInitial({ query: trimmed }));
  }, [debouncedText, dispatch, storedQuery]);

  const handleEndReached = useCallback(() => {
    if (!hasMore || loadingMore || status === 'loading') return;
    void dispatch(fetchUsersNextPage());
  }, [dispatch, hasMore, loadingMore, status]);

  const handleRefresh = useCallback(() => {
    void dispatch(fetchUsersInitial({ query: text.trim(), refresh: true }));
  }, [dispatch, text]);

  const handlePressItem = useCallback(
    (user: User) => {
      navigation.navigate('CustomerDetail', { user });
    },
    [navigation],
  );

  const handleChangeCategory = useCallback(
    (next: GenderFilter) => {
      if (next === gender) return;
      dispatch(setGender(next));
      void dispatch(fetchUsersInitial({ gender: next, query: text.trim() }));
    },
    [dispatch, gender, text],
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchUsersInitial({ query: text.trim(), gender }));
  }, [dispatch, text, gender]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const categoryOptions = useMemo<CategoryChip<GenderFilter>[]>(
    () => [
      { value: 'all', label: t('category.all') },
      { value: 'male', label: t('category.male') },
      { value: 'female', label: t('category.female') },
    ],
    [t],
  );

  const totalLabel = useMemo(
    () => t('totalLabel', { count: items.length, total }),
    [items.length, t, total],
  );

  const isInitialLoading = status === 'loading' && items.length === 0 && !refreshing;
  const isError = status === 'failed' && items.length === 0;

  return {
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
  };
}
