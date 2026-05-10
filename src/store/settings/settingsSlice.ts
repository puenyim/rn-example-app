import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppLanguage } from '@/i18n/config';
import { detectInitialLanguage } from '@/i18n';

export type { AppLanguage };

export interface SettingsState {
  language: AppLanguage;
}

const initialState: SettingsState = {
  language: detectInitialLanguage(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
