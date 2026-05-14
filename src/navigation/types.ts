import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { User } from '@/types/user';

// ─── Auth Stack ───────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

// ─── App Stack ────────────────────────────────────────────────────────────────

export type AppStackParamList = {
  Home: undefined;
  CustomerDetail: { user: User };
};

export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
export type CustomerDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'CustomerDetail'
>;

// ─── Global declaration ───────────────────────────────────────────────────────

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
