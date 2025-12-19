import {
  setSpeciality,
  GameData,
  setFaculty,
  setEmd,
  setQuiz,
  setLevel,
  setPoints,
  setWrongAnswers,
  setRightAnswers,
  setCounter,
  setSolved,
  setBooked,
} from "../Types";
const initialState = {
  QuizData: [],
  Speciality: null,
  Faculty: null,
  Emd: null,
  Level: null,
  Quiz: null,
  Question: 1,
  LevelIndex: "",
  Points: 0,
  WrongAnswers: 0,
  RightAnswers: 0,
  Counter: 0,
  Solved: [],
  Bookmarks: [],
};
export default function QuizReducer(state = initialState, action) {
  switch (action.type) {
    case setSolved:
      return {
        ...state,
        Solved: action.payload,
      };
    case setBooked:
      return {
        ...state,
        Bookmarks: action.payload,
      };
    case setPoints:
      return {
        ...state,
        Points: action.payload,
      };
    case setCounter:
      return {
        ...state,
        Counter: action.payload,
      };
    case setWrongAnswers:
      return {
        ...state,
        WrongAnswers: action.payload,
      };
    case setRightAnswers:
      return {
        ...state,
        RightAnswers: action.payload,
      };
    case setSpeciality:
      return {
        ...state,
        Speciality: action.payload,
      };
    case setFaculty:
      return {
        ...state,
        Faculty: action.payload,
      };
    case setEmd:
      return {
        ...state,
        Emd: action.payload,
      };
    case setLevel:
      return {
        ...state,
        Level: action.payload,
      };
    case setQuiz:
      return {
        ...state,
        Quiz: action.payload,
      };
    case GameData:
      return {
        ...state,
        QuizData: action.payload,
      };
    default:
      return state;
  }
}
