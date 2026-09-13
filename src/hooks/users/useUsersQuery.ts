import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { usersApi } from '../../api/usersApi';

export const USERS_QUERY_KEY = 'users';

export const useUsersQuery = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => usersApi.getUsers({}),
  });
};

export const useUsersPaginatedQuery =
  ({ page, limit }: { page: number, limit: number }) => {
    return useQuery({
      queryKey: [USERS_QUERY_KEY, page],
      queryFn: () => usersApi.getUsers({ page, limit }),
      placeholderData: keepPreviousData,
    });
  };