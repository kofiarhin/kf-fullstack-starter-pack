import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../../redux/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
  };

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1>Auth</h1>
        </Link>

        <nav>
          {user ? (
            <>
              <Link to="/"> Home</Link>
              <Link to="/dashboard"> Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/"> Home</Link>
              <Link to="/login"> Login</Link>
              <Link to="/register"> Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
