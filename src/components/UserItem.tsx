import type { User } from '../api/usersApi';
import { useDeleteUserMutation } from '../hooks/users/userMutations';

export const UserItem = ({ user }: { user: User }) => {
  const deleteUserMutation = useDeleteUserMutation();

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="flex gap-2 border-2 border-gray-300 p-2 rounded-md">
      <span>{user.id}</span>
      <span>{user.username}</span>
      <span>{user.age}</span>
      <button
        className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
        onClick={() => handleDeleteUser(user.id)}
      >
        {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};