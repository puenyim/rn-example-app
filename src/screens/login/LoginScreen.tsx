import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { LanguageToggle } from '@/components/LanguageToggle';
import { colors, radius, spacing, typography } from '@/theme';
import { useLoginScreen } from './useLoginScreen';

export function LoginScreen() {
  const {
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
    apiError,
    handleLogin,
    handleDismissError,
  } = useLoginScreen();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.langRow}>
            <LanguageToggle />
          </View>
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>C</Text>
            </View>
          </View>
          <Text style={styles.appName}>{t('appName')}</Text>
          <Text style={styles.tagline}>{t('tagline')}</Text>
        </View>

        {/* ── Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('title')}</Text>

          {/* API Error Banner */}
          {apiError ? (
            <Pressable onPress={handleDismissError} style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{apiError}</Text>
              <Text style={styles.errorBannerDismiss}>✕</Text>
            </Pressable>
          ) : null}

          {/* Username */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>{t('fields.username')}</Text>
            <TextInput
              style={[styles.input, !!usernameError && styles.inputError]}
              value={username}
              onChangeText={setUsername}
              placeholder={t('placeholders.username')}
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={!isLoading}
            />
            {usernameError ? (
              <Text style={styles.fieldError}>{usernameError}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>{t('fields.password')}</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  !!passwordError && styles.inputError,
                ]}
                value={password}
                onChangeText={setPassword}
                placeholder={t('placeholders.password')}
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                editable={!isLoading}
              />
              <Pressable
                onPress={togglePasswordVisible}
                hitSlop={10}
                style={styles.eyeBtn}
              >
                <Text style={styles.eyeIcon}>
                  {passwordVisible ? '🙈' : '👁️'}
                </Text>
              </Pressable>
            </View>
            {passwordError ? (
              <Text style={styles.fieldError}>{passwordError}</Text>
            ) : null}
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleLogin}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.btn,
              !canSubmit && styles.btnDisabled,
              pressed && canSubmit && styles.btnPressed,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.textInverse} />
            ) : (
              <Text style={styles.btnText}>{t('submit')}</Text>
            )}
          </Pressable>

          {/* Hint */}
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>{t('hint.title')}</Text>
            <Text style={styles.hintText}>
              {t('hint.username')}: <Text style={styles.hintValue}>emilys</Text>
            </Text>
            <Text style={styles.hintText}>
              {t('hint.password')}: <Text style={styles.hintValue}>emilyspass</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },

  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl + spacing.xl,
    paddingBottom: spacing.xl,
  },
  langRow: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  logoWrap: { marginBottom: spacing.md },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  logoText: { color: colors.textInverse, fontSize: 34, fontWeight: '800' },
  appName: {
    color: colors.text,
    ...typography.title,
    marginBottom: spacing.xs,
  },
  tagline: {
    color: colors.textMuted,
    ...typography.caption,
  },

  // Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    color: colors.text,
    ...typography.heading,
    marginBottom: spacing.xl,
  },

  // Error banner
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  errorBannerText: {
    flex: 1,
    color: colors.danger,
    ...typography.caption,
    fontWeight: '500',
  },
  errorBannerDismiss: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '700',
  },

  // Fields
  fieldWrap: { marginBottom: spacing.lg },
  label: {
    color: colors.text,
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    ...typography.body,
  },
  inputError: { borderColor: colors.danger },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1 },
  eyeBtn: {
    position: 'absolute',
    right: spacing.md,
    padding: spacing.xs,
  },
  eyeIcon: { fontSize: 18 },
  fieldError: {
    color: colors.danger,
    ...typography.caption,
    marginTop: spacing.xs,
  },

  // Button
  btn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnPressed: { opacity: 0.85 },
  btnText: {
    color: colors.textInverse,
    ...typography.body,
    fontWeight: '700',
  },

  // Hint
  hintBox: {
    marginTop: spacing.xl,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  hintTitle: {
    color: colors.accent,
    ...typography.caption,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  hintText: {
    color: colors.textMuted,
    ...typography.caption,
  },
  hintValue: {
    color: colors.text,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
