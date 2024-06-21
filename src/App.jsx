import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClientPosts from './components/ClientPosts';
import ClientPostDetail from './components/CientPostDetail';
import './index.css';

const router = createBrowserRouter([

  {
    path: '/posts',
    element: <ClientPosts />,
  },
  {
    path: '/posts/:id',
    element: <ClientPostDetail />,
  },
  {
    path: '*',
    element: <ClientPosts />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;