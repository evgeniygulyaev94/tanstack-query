import { useQuery, skipToken } from '@tanstack/react-query';
import { api } from '../api/api';

type Post = {
  id: number;
  title: string;
}

const getPosts = async () => {
  // retryCount++;
  // console.log('getPosts', retryCount);
  // if (true) {
  //   throw new Error('Not implemented');
  // }
  const response = await api.get<Post[]>('/posts');

  if (response.status !== 200) {
    throw new Error('Failed fetching posts');
  }

  return response.data;
};

const getAuthData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ userData: {} });
  }, 1500);
});

export const PostsList = () => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getAuthData,
  });

  const {
    data: postsData,
    isLoading, // first data load
    isPending,
    isFetching, // first and others fetch
    status,
    fetchStatus,
    error,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    // queryFn: isAuth ? getPosts : skipToken,
    staleTime: 1000 * 5, // stale data after time
    gcTime: 1000 * 60 * 5, // unused/inactive cache data remains in memory
    // retry: false,
    enabled: !!userData,
  });

  return (
    <div className="flex flex-col gap-4">
      {isError && <div>Error: {error.message}</div>}
      {/*<div>{status}</div>*/}
      {/*<div>{fetchStatus}</div>*/}
      {/*{isLoading && <div>Loading...</div>}*/}
      {/*{isPending && <div>Pending...</div>}*/}
      {/*{isFetching && <div>Fetching...</div>}*/}
      {postsData?.map((post) => (
        <div key={post.id}>{post.id}. {post.title}</div>
      ))}
    </div>
  );
}