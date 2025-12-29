import { useState, useEffect } from "react";
import "../styles/Posts.css";

function Posts() {
  // Will get all post info here from backend
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>
            By: {post.author.username} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {/* To show a little bit of the post */}
          <p>{post.content.substring(0, 200)}...</p>
          <a href={`/posts/${post.id}`}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default Posts;
