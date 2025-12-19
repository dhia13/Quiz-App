import { changeScreen, toggleMenu, setGameOn, setGameOff } from "../Types";
const initialState = {
  drawer: false,
  currentTab: "Home",
};
export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case setGameOn:
      return {
        ...state,
        GameOnNavOption: true,
      };
    case setGameOff:
      return {
        ...state,
        GameOnNavOption: false,
      };
    case toggleMenu:
      return {
        ...state,
        drawer: !state.drawer,
      };
    case changeScreen:
      return {
        ...state,
        drawer: !state.drawer,
        currentTab: action.payload,
      };
    default:
      return state;
  }
}
