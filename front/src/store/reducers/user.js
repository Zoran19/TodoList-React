import { LOGIN, SAVE_PROFILE, LOGOUT } from "../actions/actionTypes";

export const initialState = {
  token: null,
  email: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case SAVE_PROFILE:
      return {
        ...state,
        ...action.profile,
      };
    default:
      return state;
  }
};

export default reducer;
