import axios from "axios";
import { API_URL } from "../../env";
import {
  setSpeciality,
  GameData,
  setFaculty,
  setEmd,
  setLevel,
  setQuiz,
  setPoints,
  setWrongAnswers,
  setRightAnswers,
  setCounter,
  addSolved,
  setSolved,
  setBooked,
} from "../Types";
export const setSpecialityAction = (speciality) => async (dispatch) => {
  dispatch({
    type: setSpeciality,
    payload: speciality,
  });
};
export const setFacultyAction = (faculty) => async (dispatch) => {
  dispatch({
    type: setFaculty,
    payload: faculty,
  });
};
export const setEmdAction = (Emd) => async (dispatch) => {
  dispatch({
    type: setEmd,
    payload: Emd,
  });
};
export const setLevelAction = (level) => async (dispatch) => {
  dispatch({
    type: setLevel,
    payload: level,
  });
};
export const setQuizAction = (quiz) => async (dispatch) => {
  dispatch({
    type: setQuiz,
    payload: quiz,
  });
};
export const getGameData = () => async (dispatch) => {
  await axios
    .get(`${API_URL}quiz/GameData`)
    .then((response) => {
      dispatch({
        type: GameData,
        payload: response.data.Data,
      });
    })
    .catch((error) => {
      console.log("err getting game data");
    });
};
export const BookedAction = (bookmark, token) => async (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .put(`${API_URL}quiz/booked`, { bookmark }, { headers })
    .then((response) => {
      dispatch({
        type: setBooked,
        payload: response.data.Booked,
      });
    })
    .catch((error) => {
      console.log("err editing Bookmark");
    });
};
export const setPointsAction = (points) => async (dispatch) => {
  dispatch({
    type: setPoints,
    payload: points,
  });
};
export const setWrongAnswersAction = (wrongAnswers) => async (dispatch) => {
  dispatch({
    type: setWrongAnswers,
    payload: wrongAnswers,
  });
};
export const setRightAnswersAction = (rightAnswers) => async (dispatch) => {
  dispatch({
    type: setRightAnswers,
    payload: rightAnswers,
  });
};
export const setCounterAction = (counter) => async (dispatch) => {
  dispatch({
    type: setCounter,
    payload: counter,
  });
};
export const addSolvedAction = (quiz, token) => async (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .put(`${API_URL}quiz/solved`, { quiz }, { headers })
    .then((response) => {
      dispatch({
        type: setSolved,
        payload: response.data.solved,
      });
    })
    .catch((error) => {
      console.log("err in adding level id to solved");
    });
};
