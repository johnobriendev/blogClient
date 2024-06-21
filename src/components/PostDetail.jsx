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
    <div className='m-2 p-8'>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By: {post.author ? post.author.username : 'Unknown'}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>

      <h3>Comments</h3>
      {comments.length === 0 ? <p>No comments yet.</p> : (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              {comment.content} - {comment.author.username} at {new Date(comment.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <h3>Leave a Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="author">Your Name</label>
        <input
          type="text"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          required
        />
        <label htmlFor="comment">Your Comment</label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserPostDetail;