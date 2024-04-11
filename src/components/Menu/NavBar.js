import { connect } from "react-redux";
import { handleLogout } from "../../actions/authen";
import { NavLink } from "react-router-dom";

const SideNav = ({ dispatch, authedUserId, avatarURL }) => {
  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-sm bg-secondary navbar-secondary"
        style={{ height: "4em", padding: "0.5em" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav align-middle">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `nav-link ${isActive ? "active" : ""}`;
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) => {
                  return `nav-link ${isActive ? "active" : ""}`;
                }}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) => {
                  return `nav-link ${isActive ? "active" : ""}`;
                }}
              >
                New
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="nav-right d-flex justify-content-start ml-3">
          <img
            src={avatarURL}
            className="rounded-pill m-1"
            width="50px"
            alt="profile"
          ></img>
          {/* <span className="navbar-text" data-testid="user-information">
              {authedUserId}
            </span> */}
          <input
            type="text"
            className="form-control m-1"
            placeholder={authedUserId}
            data-testid="user-information"
            disabled
            value={authedUserId}
          />
          <button onClick={logout} className="btn btn-info m-1">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  avatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(SideNav);
