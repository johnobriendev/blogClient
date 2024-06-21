import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        const publishedPosts = data.filter(post => post.published); // Filter published posts
        setPosts(publishedPosts);
        // setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='m-2 p-8 md:mx-36 md:my-12'>
      <h1 className='text-4xl mb-5'>Welcome to Our Blog</h1>

      <p className='mb-5'>John O'Brien is a self-taught software developer from Bethlehem, Pennsylvania. In his free time he enjoys playing guitar, disc golf, and learning languages. John holds a B.A. in Economics, Philosophy, and Jazz Studies from the University of Pittsburgh. These are his random thoughts and musings. </p>
      <a className='text-sky-500' href='http://johnobrienguitar.com'>Check out John's Music Website</a>

      <h2 className='text-3xl mb-3 mt-12'>Posts</h2>
    
      <ul>
        {posts.map(post => (
          <li className='flex justify-between mb-3' key={post._id}>
            <Link className='text-xl cursor-pointer' to={`/posts/${post._id}`}>{post.title}</Link>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;