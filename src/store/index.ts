import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import settingsReducer from '@/store/settings/settingsSlice';
import usersReducer from '@/store/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    settings: settingsReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActionPaths: ['payload.original', 'meta.arg'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
