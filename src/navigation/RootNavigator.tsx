import { useTranslation } from 'react-i18next';
import {
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CustomerDetailScreen } from '@/screens/customer-detail/CustomerDetailScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { colors } from '@/theme';
import type { AppStackParamList } from '@/navigation/types';
import { useAppSelector } from '@/store';

// ─── App Stack (authenticated) ────────────────────────────────────────────────

const AppStack = createNativeStackNavigator<AppStackParamList>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.text,
  },
};

function AppNavigator() {
  const { t: tHome } = useTranslation('home');
  const { t: tDetail } = useTranslation('detail');

  return (
    <AppStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '700' },
        headerLargeTitleShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: tHome('title') }}
      />
      <AppStack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{ title: tDetail('title') }}
      />
    </AppStack.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────

export function RootNavigator() {
  const isAuthenticated = useAppSelector((s) => s.auth.token !== null);

  return (
    <NavigationContainer theme={navTheme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
