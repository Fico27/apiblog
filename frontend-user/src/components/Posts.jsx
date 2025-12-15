import { useState, useEffect } from "react";

function Posts() {
  // Will get all post info here from backend
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // I will fetch posts from the backend API here... Just gotta set that up.
  });

  return (
    <div className="posts-container">{/* posts.map(blah blah blah) */}</div>
  );
}

export default Posts;
