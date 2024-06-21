const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data;
};

export const getPost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const data = await response.json();
  return data;
};

export const createComment = async (commentData) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  const data = await response.json();
  return data;
};

export const getComments = async (postId) => {
  const response = await fetch(`${API_URL}/comments/posts/${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  const data = await response.json();
  return data;
};