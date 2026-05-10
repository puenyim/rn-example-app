import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUsers, type GenderFilter } from '@/services/users';
import { ENV } from '@/config/env';
import type { ApiError } from '@/services/client';
import type { User } from '@/types/user';

export interface UsersState {
  items: User[];
  total: number;
  skip: number;
  limit: number;
  query: string;
  gender: GenderFilter;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: UsersState = {
  items: [],
  total: 0,
  skip: 0,
  limit: ENV.DEFAULT_PAGE_SIZE,
  query: '',
  gender: 'all',
  status: 'idle',
  loadingMore: false,
  refreshing: false,
  error: null,
  hasMore: true,
};

interface FetchInitialArg {
  query?: string;
  gender?: GenderFilter;
  refresh?: boolean;
}


export const fetchUsersInitial = createAsyncThunk<
  {
    query: string;
    gender: GenderFilter;
    data: Awaited<ReturnType<typeof fetchUsers>>;
  },
  FetchInitialArg | undefined,
  { state: { users: UsersState }; rejectValue: ApiError }
>('users/fetchInitial', async (arg, { getState, rejectWithValue }) => {
  const current = getState().users;
  const query = (arg?.query ?? current.query).trim();
  const gender = arg?.gender ?? current.gender;

  try {
    const data = await fetchUsers({
      limit: ENV.DEFAULT_PAGE_SIZE,
      skip: 0,
      q: query || undefined,
      gender,
    });
    return { query, gender, data };
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});


export const fetchUsersNextPage = createAsyncThunk<
  Awaited<ReturnType<typeof fetchUsers>>,
  void,
  { state: { users: UsersState }; rejectValue: ApiError }
>(
  'users/fetchNextPage',
  async (_, { getState, rejectWithValue }) => {
    const { limit, items, query, gender, hasMore } = getState().users;
    if (!hasMore) {
      return rejectWithValue({ message: 'NO_MORE' });
    }
    try {
      return await fetchUsers({
        limit,
        skip: items.length,
        q: query || undefined,
        gender,
      });
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  },
  {
    condition: (_, { getState }) => {
      const { loadingMore, status, hasMore } = getState().users;
      return !loadingMore && status !== 'loading' && hasMore;
    },
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setGender(state, action: PayloadAction<GenderFilter>) {
      state.gender = action.payload;
    },
    resetUsers() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInitial.pending, (state, action) => {
        const isRefresh = !!action.meta.arg?.refresh;
        state.status = 'loading';
        state.error = null;
        state.refreshing = isRefresh;
      })
      .addCase(fetchUsersInitial.fulfilled, (state, action) => {
        const { query, gender, data } = action.payload;
        state.status = 'succeeded';
        state.refreshing = false;
        state.query = query;
        state.gender = gender;
        state.items = data.users;
        state.total = data.total;
        state.skip = data.skip;
        state.limit = data.limit;
        state.hasMore = data.skip + data.users.length < data.total;
      })
      .addCase(fetchUsersInitial.rejected, (state, action) => {
        state.status = 'failed';
        state.refreshing = false;
        state.error = action.payload?.message ?? 'Failed to load users';
      })
      .addCase(fetchUsersNextPage.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchUsersNextPage.fulfilled, (state, action) => {
        const { users, total, skip, limit } = action.payload;
        const existingIds = new Set(state.items.map((u) => u.id));
        const merged = [
          ...state.items,
          ...users.filter((u) => !existingIds.has(u.id)),
        ];
        state.items = merged;
        state.total = total;
        state.skip = skip;
        state.limit = limit;
        state.loadingMore = false;
        state.hasMore = skip + users.length < total;
      })
      .addCase(fetchUsersNextPage.rejected, (state, action) => {
        state.loadingMore = false;
        if (action.payload?.message && action.payload.message !== 'NO_MORE') {
          state.error = action.payload.message;
        }
      });
  },
});

export const { setQuery, setGender, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
