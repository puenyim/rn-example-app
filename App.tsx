import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';

import '@/i18n';

import { RootNavigator } from '@/navigation/RootNavigator';
import { store } from '@/store';
import { useSyncLanguage } from '@/hooks/useSyncLanguage';
import React from 'react';

function AppRoot() {
  useSyncLanguage();
  return <RootNavigator />;
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <StatusBar style="dark" />
      <AppRoot />
    </ReduxProvider>
  );
}