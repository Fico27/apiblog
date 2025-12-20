import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-container">
      <h2>Admin - I Am Your Blog</h2>

      <nav className="nav-container">
        <ul>
          <li>
            <NavLink to="/">All Posts</NavLink>
          </li>
          <li>
            <NavLink to="/new-post">Create New Post</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
