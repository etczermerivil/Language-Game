import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-box">
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              WP
            </NavLink>
          </li>
          <li className="nav-item profile-item">
            <ProfileButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
