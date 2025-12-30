import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostContent.css";

function PostContent() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const { postId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Load post and comments
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

  const handleCommentDelete = async (commentId) => {
    if (
      !confirm(
        "Are you sure you want to delete this comment? This can not be undone."
      )
    ) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/comments/${commentId}`, {
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
      //After Deleting comment filter the comment out
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((c) => c.id !== commentId),
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentEdit = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Login Failed");
      }

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === commentId ? { ...c, content: editContent } : c
        ),
      }));

      setEditingCommentId(null);
      setEditContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Login Failed");
      }

      const newComment = await response.json();

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));

      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading Post...</p>;
  if (error) return <p>Error loading posts: {error}</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <>
      <div className="post-container">
        <h1>{post.title}</h1>
        <p>By: {post.author.username}</p>
        <p>{post.content}</p>
      </div>

      <div className="comments-container">
        <h2>Comments</h2>

        <form className="comments-form" onSubmit={handleCommentCreate}>
          <input
            type="text"
            id="comment"
            value={comment}
            placeholder="Leave a comment..."
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit">Post Comment</button>
        </form>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p className="comment-author">{comment.author.username}</p>

              {comment.id === editingCommentId ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="3"
                  ></textarea>
                  <button onClick={() => handleCommentEdit(editingCommentId)}>
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditContent("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <p>{comment.content}</p>
              )}
              <div>
                {currentUser &&
                  currentUser.id === comment.authorId &&
                  comment.id !== editingCommentId && (
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      Edit
                    </button>
                  )}

                {currentUser &&
                  (currentUser.id === comment.authorId ||
                    currentUser.role === "admin") &&
                  comment.id !== editingCommentId && (
                    <button onClick={() => handleCommentDelete(comment.id)}>
                      Delete
                    </button>
                  )}
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </>
  );
}

export default PostContent;
