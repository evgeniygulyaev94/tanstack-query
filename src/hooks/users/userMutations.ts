import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USERS_QUERY_KEY } from './useUsersQuery';
import { usersApi, type User } from '../../api/usersApi';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: usersApi.createUser,
    onMutate: async (variables) => {
      // optimistic update
      await queryClient.cancelQueries({ queryKey: [USERS_QUERY_KEY] });

      const previousUsers = queryClient.getQueryData([USERS_QUERY_KEY]) as User[];
      const tempId = variables.username + '_' + variables.age;
      queryClient.setQueryData(
        [USERS_QUERY_KEY],
        (prevData: User[]) => ([{ id: tempId, ...variables }, ...prevData]),
      );

      return { previousUsers };
    },
    onSuccess: (data, _variables, context) => {
      console.log('User created successfully.');
      // optimistic update
      queryClient.setQueryData([USERS_QUERY_KEY], [data, ...context.previousUsers]);

      // hands cache update
      // queryClient.setQueryData(
      //   [USERS_QUERY_KEY],
      //   (prevData: User[]) => ([data, ...prevData]),
      // );

      // queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
    onError: (error, _variables, context) => {
      console.log('User created error:', error);
      // optimistic update
      queryClient.setQueryData([USERS_QUERY_KEY], context?.previousUsers ? [...context.previousUsers] : []);
    },
    onSettled: () => {
      console.log('User created settled');
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: usersApi.updateUser,
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (_data, id) => {
      console.log('User deleted successfully.');
      queryClient.setQueryData(
        [USERS_QUERY_KEY],
        (prevData: User[]) => prevData.filter((user) => user.id !== id),
      );
    },
  });
};