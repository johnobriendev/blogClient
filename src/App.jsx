import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Posts from './components/Posts';
// import PostDetail from './components/PostDetail';
import './index.css';

const router = createBrowserRouter([

  {
    path: '/posts',
    element: <Posts />,
  },
  // {
  //   path: '/posts/:id',
  //   element: <PostDetail />,
  // },
  {
    path: '*',
    element: <Posts />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;