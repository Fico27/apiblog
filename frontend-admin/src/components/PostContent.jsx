import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/PostContent.css";

function PostContent() {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in as admin");
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const response = await fetch(`/api/admin/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setPublished(post.published);
    }
  }, [post]);

  if (loading) return <p>Loading Post...</p>;
  if (error) return <p>Error loading posts: {error}</p>;
  if (!post) return <p>Post not found!</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Login Failed");
      }

      navigate("/posts");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">Edit Post</h1>

          {error && <h2 className="error-message"> {error}</h2>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="publish-group">
              <input
                type="checkbox"
                id="published"
                className="publish-checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label htmlFor="published">Publish this post</label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/posts")}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostContent;
