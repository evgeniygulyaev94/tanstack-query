import { useState } from 'react';
import { useUsersPaginatedQuery } from '../hooks/users/useUsersQuery';
import { UserItem } from './UserItem';

const USERS_LIMIT = 5;

export const UsersList = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useUsersPaginatedQuery({ page, limit: USERS_LIMIT });
  // console.log(usersData);
  const { data: usersData, total } = data ?? {};

  const handleNextPage = () => setPage((prev) => prev + 1);

  const handlePreviousPage = () => setPage((prev) => prev - 1);

  return (
    <div>
      <h1 className="mb-2">Page: {page}, Total: {total}</h1>
      <div className={isFetching ? 'opacity-50' : ''}>
        {usersData?.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
      <div className="flex mt-2">
        <button
          className="p-2 border border-gray-500 rounded-md cursor-pointer"
          onClick={handlePreviousPage}
        >
          Prev
        </button>
        {!!total && new Array(Math.ceil(total / USERS_LIMIT)).fill(0).map((_, i) => (
          <button
            key={i}
            className="p-2 border border-gray-500 rounded-md cursor-pointer"
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="p-2 border border-gray-500 rounded-md cursor-pointer"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};