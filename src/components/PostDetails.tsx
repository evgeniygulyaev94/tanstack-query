import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { useParams } from 'react-router';

type Post = {
  id: string;
  title: string;
}

const getPostById = async (id: string) => {
  const response = await api.get<Post>(`/posts/${id}`);

  if (response.status !== 200) {
    throw new Error('Failed fetching posts');
  }

  return response.data;
};

export const PostDetails = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: postData } = useQuery({
    queryKey: ['posts', id],
    queryFn: id ? () => getPostById(id) : skipToken,
    placeholderData: () => {
      const posts = queryClient.getQueryData<Post[]>(['posts']);

      return posts?.find((post) => post.id === id);
    },
  });

  return (
    <div>
      {postData?.id}. {postData?.title}
      {postData &&
        <div>
          Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut commodi consequatur corporis
          dolorem eaque
          earum enim eveniet hic, iste iure, libero magnam perspiciatis reiciendis suscipit tempora, totam velit. A?
        </div>
      }
    </div>
  );
};