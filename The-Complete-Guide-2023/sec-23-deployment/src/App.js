import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
// the functional component is valid only if it returns a JSX code, but the import returns the 'Promise'
// and because of that we have to use the 'lazy' function
const BlogPage = lazy(() => import('./pages/Blog'));

// import PostPage, { loader as postLoader } from './pages/Post'; // code before importing lazy loading
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><BlogPage /></Suspense>,
            // 004 - 02:00
            // loading 'loader' function lazily
            // the import gives the promise because loading a code can take a while
            loader: () => import('./pages/Blog').then(module => module.loader())
            // loader: postsLoader // this code was used before the introduction of lazy loading
          },
          {
            path: ':id',
            element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>,
            loader: ({ params }) => import('./pages/Post').then((module) => module.loader({ params }))
            // loader: postLoader
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
