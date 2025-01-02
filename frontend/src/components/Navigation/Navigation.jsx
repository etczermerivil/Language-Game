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
              <span className="word" data-index="1">WP</span>
              &nbsp;
              {/* <span className="word" data-index="2">P</span> */}
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
