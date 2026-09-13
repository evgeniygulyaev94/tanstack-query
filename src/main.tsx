import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './components/App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { UsersPage } from './components/UsersPage.tsx';
import { PostsPage } from './components/PostsPage.tsx';
import { PostDetails } from './components/PostDetails.tsx';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   retry: 2,
    //   refetchOnWindowFocus: true,
    //   staleTime: 1000 * 60 * 5, // 5 minutes
    // }
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);