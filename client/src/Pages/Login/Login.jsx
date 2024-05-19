import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, loginUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, isLoading]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };

    dispatch(loginUser(dataToSubmit));
  };

  return (
    <div>
      <h1 className="heading center"> Login</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="input-group">
            {isError && <p className="error"> {message.error} </p>}
          </div>

          <div className="input-group">
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
