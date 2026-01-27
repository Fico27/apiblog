import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <h2 className="navbar-title">I Am Your Blog</h2>

      <nav className="nav-container">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <a
              href="https://apiblogadmin.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Admin Dashboard
            </a>
          </li>

          {!currentUser ? (
            <>
              <li>
                <NavLink to="/sign-up">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          ) : (
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
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
