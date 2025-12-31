import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <h2>Admin - I Am Your Blog</h2>

      <nav className="nav-container">
        <ul>
          {user ? (
            <>
              <li>
                <NavLink to="/posts">All Posts</NavLink>
              </li>
              <li>
                <NavLink to="/new-post">Create New Post</NavLink>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
