import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <div className="profile-links">
      {user ? (
        <>
          <span className="welcome-user">Welcome, {user.username}</span>
          <button onClick={logout} className="logout-button">
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="login-link">
            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </button>
          <button className="signup-link">
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileButton;
