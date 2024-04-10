import "./App.css";
import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import SideNav from "./components/Menu/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/LeaderBoard";
import PollPage from "./pages/Poll";
import AddPoll from "./pages/Poll/addPoll";
import NotFound from "./pages/Error/notFound";
import { fetchAndPopulateInitialData } from "./actions/data";
import PrivateRoute from "./components/Route/PrivateRoute";

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(fetchAndPopulateInitialData());
  }, [dispatch]);

  return (
    <div className="app">
      {loggedIn && <SideNav />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route element={<PrivateRoute loggedIn={loggedIn}> </PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/questions/:id" element={<PollPage />} />
          <Route path="/add" exact element={<AddPoll />} />
          <Route path="*" exact element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
