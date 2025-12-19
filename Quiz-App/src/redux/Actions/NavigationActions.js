import { changeScreen, setGameOff, setGameOn, toggleMenu } from "../Types";
export const toggleMenuAction = () => async (dispatch) => {
  dispatch({
    type: toggleMenu,
  });
};
export const changeCurrentScreenAction = (screen) => async (dispatch) => {
  dispatch({
    type: changeScreen,
    payload: screen,
  });
};
export const setGameOnAction = () => async (dispatch) => {
  dispatch({
    type: setGameOn,
  });
};
export const setGameOffAction = () => async (dispatch) => {
  dispatch({
    type: setGameOff,
  });
};
