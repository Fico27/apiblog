import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (loading) return <p>Loading Post...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Not logged in");
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
      <div className="edit-post-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Email"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here!"
            required
          />

          <label htmlFor="published">Publish</label>
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate("/posts")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPost;
