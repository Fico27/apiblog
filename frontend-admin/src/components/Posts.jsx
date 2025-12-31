import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Posts.css";

function Posts() {
  // Will get all post info here from backend
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in as admin");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/admin/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete? This can not be undone.")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Login Failed");
      }
      //After Deleting post filter the post out instead of reloading.
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>All Posts</h1>
        <NavLink to="/new-post" className="new-post-btn">
          + New Post
        </NavLink>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-info">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <span
              className={`status ${post.published ? "published" : "draft"}`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="post-actions">
            <NavLink to={`/posts/${post.id}`} className="comment-btns1">
              <img src="/assets/edit.png" alt="" />
            </NavLink>
            <button
              onClick={() => handleDelete(post.id)}
              className="comment-btns1"
            >
              <img src="/assets/delete.png" alt="" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
