import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UsersPage } from './components/UsersPage.tsx';
import { PostsPage } from './components/PostsPage.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
