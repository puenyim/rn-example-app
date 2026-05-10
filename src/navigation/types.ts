import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { User } from '@/types/user';

/**
 * Param list ของ root stack — typed routes
 */
export type RootStackParamList = {
  Home: undefined;

  CustomerDetail: { user: User };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type CustomerDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CustomerDetail'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
