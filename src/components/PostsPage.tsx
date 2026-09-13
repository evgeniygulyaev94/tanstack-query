import { Suspense } from 'react';
import { PostsList } from './PostsList';

export const PostsPage = () => {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostsList />
    </Suspense>
  );
};
