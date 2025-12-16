import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-container">
      <h2>I Am Your Blog</h2>

      <nav className="nav-container">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <a href="">Sign up</a>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
