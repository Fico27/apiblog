import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-container">
      <h2>I Am Your Blog</h2>

      <nav className="nav-container">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Sign up</a>
          </li>
          <li>
            <a href="">Log in</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
