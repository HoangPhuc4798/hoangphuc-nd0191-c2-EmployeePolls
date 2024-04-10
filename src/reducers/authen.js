import { LOGOUT, SET_AUTHED_USER } from "../actions/authen";

export default function authenUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.authedUser;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
