import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, createComment, getComments } from '../services/post';

const UserPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getComments(id);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        content: newComment,
        author: commentAuthor,  // This can be dynamic if you have user authentication
        post: id,
      };
      await createComment(commentData);
      setNewComment('');
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='m-2 p-8 md:mx-36'>
      <a className='text-sky-500' href='/posts'>Back to all Posts</a>
      <h2 className='text-4xl my-10'>{post.title}</h2>
      <p className='my-5'>{post.content}</p>
      <p>By: {post.author ? post.author.username : 'Unknown'}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>

      <h3 className='mb-5 mt-24 text-3xl'>Comments</h3>
      {comments.length === 0 ? <p>No comments yet.</p> : (
        <ul>
          {comments.map(comment => (
            <li className='my-4' key={comment._id}>
              <p className=''>{comment.content}</p>
              <p>By: {comment.author} at {new Date(comment.createdAt).toLocaleString()} </p>
               
            </li>
          ))}
        </ul>
      )}

      <h3 className='my-5 text-2xl'>Leave a Comment</h3>
      <form className='flex flex-col items-start gap-3' onSubmit={handleCommentSubmit}>
        <label htmlFor="author">Your Name</label>
        <input
          className='border border-black rounded'
          type="text"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          required
        />
        <label htmlFor="comment">Your Comment</label>
        <textarea
          className='border border-black rounded w-full resize-none h-24'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button className='border border-black rounded p-1' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserPostDetail;