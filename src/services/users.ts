import type { User, UsersResponse } from '@/types/user';
import { apiClient } from '@/services/client';

export type GenderFilter = 'all' | 'male' | 'female';

export interface FetchUsersParams {
  limit: number;
  skip: number;
  q?: string;
  gender?: GenderFilter;
}


export async function fetchUsers(
  params: FetchUsersParams,
): Promise<UsersResponse> {
  const { limit, skip, q, gender } = params;
  const trimmedQ = q?.trim();
  const hasQuery = !!trimmedQ;
  const hasGender = !!gender && gender !== 'all';

  let path = '/users';
  const query: Record<string, string | number> = { limit, skip };

  if (hasQuery) {
    path = '/users/search';
    query.q = trimmedQ!;
  } else if (hasGender) {
    path = '/users/filter';
    query.key = 'gender';
    query.value = gender!;
  }

  const { data } = await apiClient.get<UsersResponse>(path, {
    params: query,
  });

  if (hasQuery && hasGender) {
    const filtered = data.users.filter((u) => u.gender === gender);
    return {
      ...data,
      users: filtered,
      total: filtered.length,
    };
  }

  return data;
}

export async function fetchUserById(id: number): Promise<User> {
  const { data } = await apiClient.get<User>(`/users/${id}`);
  return data;
}
