import {
  toggleSound,
  toggleVibration,
  toggleMusic,
  changeMusic,
} from "../Types";

export const toggleSoundAction = () => async (dispatch) => {
  dispatch({
    type: toggleSound,
  });
};
export const toggleVibrationAction = () => async (dispatch) => {
  dispatch({
    type: toggleVibration,
  });
};
export const toggleMusicAction = () => async (dispatch) => {
  dispatch({
    type: toggleMusic,
  });
};
export const changeMusicAction = (music) => async (dispatch) => {
  dispatch({
    type: changeMusic,
    payload: music,
  });
};
