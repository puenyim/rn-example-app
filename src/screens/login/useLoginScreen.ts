import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';
import { loginThunk, clearError } from '@/store/auth/authSlice';

export function useLoginScreen() {
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector((s) => s.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isLoading = status === 'loading';

  const usernameError =
    username.length > 0 && username.trim().length < 2
      ? t('validation.usernameTooShort')
      : null;

  const passwordError =
    password.length > 0 && password.length < 4
      ? t('validation.passwordTooShort')
      : null;

  const canSubmit =
    username.trim().length >= 2 &&
    password.length >= 4 &&
    !isLoading;

  const handleLogin = useCallback(() => {
    if (!canSubmit) return;
    void dispatch(loginThunk({ username: username.trim(), password }));
  }, [dispatch, username, password, canSubmit]);

  const handleDismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const togglePasswordVisible = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  return {
    t,
    username,
    setUsername,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisible,
    isLoading,
    usernameError,
    passwordError,
    canSubmit,
    apiError: error,
    handleLogin,
    handleDismissError,
  };
}
