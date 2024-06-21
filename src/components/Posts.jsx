import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Blog</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title} - {new Date(post.createdAt).toLocaleString()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;