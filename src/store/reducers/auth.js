import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.token,
      };
    case actionTypes.AUTHENTICATION_FAILED:
      return { ...state, authenticated: false };

    case actionTypes.AUTHENTICATION_LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
      };
    case actionTypes.PAGE_RELOAD:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
