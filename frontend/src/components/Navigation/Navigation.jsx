import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const location = useLocation(); // Get the current route
  const isLandingPage = location.pathname === "/"; // Check if it's the landing page

  return (
    <div className={`nav-box ${isLandingPage ? "landing-page" : ""}`}>
      <nav className="navbar">
        <ul className="nav-menu">
          {/* Show WP logo only if NOT on the landing page */}
          {!isLandingPage && (
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <span className="word" data-index="1">WP</span>
              </NavLink>
            </li>
          )}

          {/* Always show the hamburger menu */}
          <li className="nav-item profile-item">
            <ProfileButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;




// function App() {
//   return (
//     <>
//       {/* Comment out Navigation */}
//       {/* <Navigation /> */}
//       <div>
//         {/* Other content */}
//       </div>
//     </>
//   );
// }

// export default App;
