import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../../actions/authen";

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectUrl");
    console.log(redirectUrl);
    return <Navigate to={redirectUrl} />;
  }

  const handleUsernameInput = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit}
              >
                <div className="text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  />
                  <h2
                    data-testid="login-heading"
                  >
                    Sign in to your account
                  </h2>
                </div>
                <label htmlFor="text">Username</label>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    aria-describedby="emailHelp"
                    placeholder="User Name"
                    value={username}
                    required
                    onChange={handleUsernameInput}
                  />
                </div>
                <label htmlFor="text">Password</label>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    value={password}
                    required
                    onChange={handlePasswordInput}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 mb-5 w-100"
                    data-testid="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
