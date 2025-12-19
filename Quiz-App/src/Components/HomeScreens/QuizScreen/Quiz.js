import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import LevelGame from "./Components/LevelGame";
import LevelReview from "./Components/LevelReview";
export default function ({ navigation }) {
  const [toggleQuizReview, setToggleQuizReview] = useState(true);
  const GameData = useSelector((state) => state.QuizReducer.QuizData);
  const specialityId = useSelector((state) => state.QuizReducer.Speciality);
  const facultyId = useSelector((state) => state.QuizReducer.Faculty);
  const emdId = useSelector((state) => state.QuizReducer.Emd);
  const levelId = useSelector((state) => state.QuizReducer.Level);
  const [quiz, setQuiz] = useState(
    GameData.find((x) => x._id === specialityId)
      .Faculties.find((x) => x._id === facultyId)
      .Emds.find((x) => x._id === emdId)
      .Levels.find((x) => x._id === levelId).Quizs
  );
  useEffect(() => {
    setQuiz(
      GameData.find((x) => x._id === specialityId)
        .Faculties.find((x) => x._id === facultyId)
        .Emds.find((x) => x._id === emdId)
        .Levels.find((x) => x._id === levelId).Quizs
    );
  }, [levelId]);
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {toggleQuizReview ? (
        <LevelGame
          quiz={quiz}
          navigation={navigation}
          setToggleQuizReview={setToggleQuizReview}
        />
      ) : (
        <LevelReview
          setToggleQuizReview={setToggleQuizReview}
          navigation={navigation}
          quiz={quiz}
        />
      )}
    </View>
  );
}
