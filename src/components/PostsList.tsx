import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { api } from '../api/api';
import { Link } from 'react-router';

type Post = {
  id: number;
  title: string;
}

const getPosts = async (signal: AbortSignal) => {
  const response = await api.get<Post[]>('/posts', { signal });

  if (response.status !== 200) {
    throw new Error('Failed fetching posts');
  }

  return response.data;
};

const getNotifications = async () => {
  const response = await api.get<{ notificationsCount: number }>('/notifications');

  if (response.status !== 200) {
    throw new Error('Failed fetching notifications');
  }

  return response.data;
};

export const PostsList = () => {
  const queryClient = useQueryClient();

  // const { data: notificationsData } = useQuery({
  //   queryKey: ['notifications'],
  //   queryFn: getNotifications,
  //   refetchInterval: 5000,
  //   refetchIntervalInBackground: true,
  //   // staleTime: 1000 * 60 * 60,
  // });

  const { data: postsData, isFetching, isLoading, isPending, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => getPosts(signal),
    // initialData: [{ id: 123, title: 'Initial post' }], // real data
    placeholderData: keepPreviousData, // skeleton
    staleTime: 1000 * 5,
  });

  // помечает данные как устаревшие (stale) и запускает запрос, если на странице есть активный хук (необязательно)
  const invalidatePosts = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };
  // запускает запрос
  const refetchPosts = () => {
    // queryClient.refetchQueries({ queryKey: ['posts'] });
    refetch();
  };
  // чистит кэш и запрашивает данные
  const resetPosts = () => {
    queryClient.resetQueries({ queryKey: ['posts'] });
  };

  const cancelRequest = () => {
    queryClient.cancelQueries({ queryKey: ['posts'] });
  };

  return (
    <>
      {/*<h1>notificationsCount = {notificationsData?.notificationsCount}</h1>*/}
      <button className="border border-gray-500 rounded-md p-2 cursor-pointer" onClick={invalidatePosts}>
        Invalidate
      </button>
      <button className="border border-gray-500 rounded-md p-2 cursor-pointer" onClick={refetchPosts}>
        Refetch
      </button>
      <button className="border border-gray-500 rounded-md p-2 cursor-pointer" onClick={resetPosts}>
        Reset
      </button>
      <button className="border border-gray-500 rounded-md p-2 cursor-pointer" onClick={cancelRequest}>
        Cancel
      </button>
      {isFetching && <div>Fetching...</div>}
      {isLoading && <div>Loading...</div>}
      {isPending && <div>Pending...</div>}
      <div className="flex flex-col gap-4">
        {postsData?.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>{post.id}. {post.title}</Link>
        ))}
      </div>
    </>
  );
};