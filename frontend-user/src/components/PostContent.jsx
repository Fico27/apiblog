import { useState, useEffect, useParams } from "react";

function PostContent() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) {
      setError("No post ID provided");
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading Post...</p>;
  if (error) return <p>Error loading posts: {error}</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostContent;
