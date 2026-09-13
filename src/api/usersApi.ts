import { api } from './api';

export interface User {
  id: string;
  username: string;
  age: number;
}

export interface Pagination {
  page: number;
  limit: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const usersApi = {
  getUsers: ({ page = 1, limit = 5 }: Partial<Pagination>) =>
    api.get<User[]>('/users', { params: { _page: page, _limit: limit } })
      .then((res) => {
        const data = res.data;
        const total: number = res.headers['x-total-count'];

        return { data, total };
      }),
  createUser: async (user: { username: string; age: number }) => {
    if (user.age === 666) {
      await delay(1500);
      throw new Error('User create error');
    }

    const response = await api.post<Pick<User, 'age' | 'username'>>('/users', user);

    return response.data;
  },
  updateUser: (user: User) =>
    api.put<User>('/users', user).then((res) => res.data),
  deleteUser: (id: string) =>
    api.delete<User>(`/users/${id}`).then((res) => res.data),
};