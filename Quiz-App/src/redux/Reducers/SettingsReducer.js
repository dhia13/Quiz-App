import {
  toggleVibration,
  toggleMusic,
  toggleSound,
  changeMusic,
} from "../Types";
const initialState = {
  Vibration: true,
  Music: true,
  Sound: true,
  SelectedMusic: "Focus",
};
export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case toggleSound:
      return {
        ...state,
        Sound: !state.Sound,
      };
    case toggleVibration:
      return {
        ...state,
        Vibration: !state.Vibration,
      };
    case toggleMusic:
      return {
        ...state,
        Music: !state.Music,
      };
    case changeMusic:
      return {
        ...state,
        SelectedMusic: action.payload,
      };
    default:
      return state;
  }
}
