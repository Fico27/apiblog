import { useState, useEffect } from "react";

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
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
          <p>{post.published ? "Published" : "Not Published Yet"}</p>
          <a href={`/posts/${post.id}`}>Edit</a>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Posts;
