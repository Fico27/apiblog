import { NavLink } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find what you're looking for.</p>
      <NavLink to="/posts">
        <button>← Back to Home</button>
      </NavLink>
    </div>
  );
}

export default NotFound;
