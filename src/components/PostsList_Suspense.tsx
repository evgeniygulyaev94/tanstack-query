import { useSuspenseQuery, useSuspenseQueries, useQueries } from '@tanstack/react-query';
import { api } from '../api/api';

type Post = {
  id: number;
  title: string;
}

const getPosts = async () => {
  const response = await api.get<Post[]>('/posts');

  if (response.status !== 200) {
    throw new Error('Failed fetching posts');
  }

  return response.data;
};

const getPostById = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`);

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

const postsIds = [1, 2, 3];

export const PostsList = () => {
  const postsData = useQueries({
    queries: postsIds.map((id) => ({
      queryKey: ['posts', id],
      queryFn: () => getPostById(id),
    })),
    combine: (result) =>
      result.reduce<Post[]>((acc, curr) => {
        return curr.data ? [...acc, curr.data] : acc;
      }, []),
  });

  // const [{ data: userData }, { data: postsData }] = useSuspenseQueries({
  //   queries: [
  //     {
  //       queryKey: ['userData'],
  //       queryFn: getAuthData,
  //     },
  //     {
  //       queryKey: ['posts'],
  //       queryFn: getPosts,
  //     },
  //   ],
  // });
  // waterfall
  // const { data: userData } = useSuspenseQuery({
  //   queryKey: ['userData'],
  //   queryFn: getAuthData,
  // });
  //
  // const { data: postsData } = useSuspenseQuery({
  //   queryKey: ['posts'],
  //   queryFn: getPosts,
  // });

  return (
    <div className="flex flex-col gap-4">
      {postsData?.map((post) => (
        <div key={post.id}>{post.id}. {post.title}</div>
      ))}
    </div>
  );
};