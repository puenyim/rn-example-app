import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login as loginApi, type LoginCredentials, type AuthResponse } from '@/services/auth';
import type { ApiError } from '@/services/client';

// ─── State ────────────────────────────────────────────────────────────────────

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: AuthResponse['user'] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  status: 'idle',
  error: null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginApi(credentials);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
