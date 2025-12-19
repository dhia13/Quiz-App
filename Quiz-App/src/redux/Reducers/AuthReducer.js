import {
  logout,
  loginErr,
  loginSuccess,
  validToken,
  invalidToken,
  setCoins,
} from "../Types";
const initialState = {
  token: "",
  loginSuccess: false,
  loginErr: false,
  loginErrMsg: "",
  logged: false,
  username: "",
  role: "user",
  coins: 0,
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case logout:
      return {
        token: "",
        loginSuccess: false,
        loginErr: false,
        loginErrMsg: "",
        logged: false,
        username: "",
        coins: 0,
      };
    case loginSuccess:
      return {
        token: action.payload.token,
        loginSuccess: true,
        loginErr: false,
        loginErrMsg: "",
        logged: true,
        username: action.payload.username,
        role: action.payload.role,
        coins: action.payload.coins,
      };
    case loginErr:
      return {
        token: "",
        loginSuccess: false,
        loginErr: true,
        loginErrMsg: action.payload,
        logged: false,
        username: "",
        role: "",
      };
    case validToken:
      return {
        ...state,
        loginSuccess: true,
        loginErr: false,
        loginErrMsg: "",
        logged: true,
      };
    case invalidToken:
      return {
        token: "",
        loginSuccess: false,
        loginErr: false,
        loginErrMsg: "",
        logged: false,
        username: "",
        role: "",
      };
    case setCoins:
      return {
        ...state,
        coins: action.payload,
      };
    default:
      return state;
  }
}
