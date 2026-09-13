import { Link } from 'react-router';
import { useIsFetching, useIsMutating, useMutationState } from '@tanstack/react-query';

export const Header = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const mutationState = useMutationState({
    filters: { mutationKey: ['createUser'] },
  });
  // console.log(mutationState);

  return (
    <>
      {isFetching > 0 &&
        <div className="h-6 bg-yellow-200 w-full absolute top-0 left-0 flex justify-center items-center">
          Fetching...
        </div>
      }
      {isMutating > 0 &&
        <div className="h-6 bg-green-300 w-full absolute top-0 left-0 flex justify-center items-center">
          Mutating...
        </div>
      }
      <div className="p-4 bg-gray-200 ">
        <div className="max-w-4xl mx-auto flex gap-4 justify-end ">
          <Link className="underline" to="/users">
            users
          </Link>
          <Link className="underline" to="/posts">
            posts
          </Link>
        </div>
      </div>
    </>
  );
};
