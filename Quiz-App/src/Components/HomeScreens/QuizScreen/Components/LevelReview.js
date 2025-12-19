import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Vibration } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addSolvedAction,
  setLevelAction,
  setPointsAction,
  setRightAnswersAction,
  setWrongAnswersAction,
} from "../../../../redux/Actions/QuizActions";
import Point from "../../../../../assets/Point.png";
import Coin from "../../../../../assets/Coin.png";
import ThumbsUp from "../../../../../assets/thumbsUp.png";
import ThumbsDown from "../../../../../assets/thumbsDown.png";
import { setCoinsValue } from "../../../../redux/Actions/AuthActions";
import QuestionReview from "./QuestionReview";
export default function ({ navigation, setToggleQuizReview, quiz }) {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.QuizReducer.Points);
  const coins = useSelector((state) => state.AuthReducer.coins);
  const token = useSelector((state) => state.AuthReducer.token);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const answeredRight = useSelector((state) => state.QuizReducer.RightAnswers);
  const answeredWronge = useSelector((state) => state.QuizReducer.WrongAnswers);
  const questionsCounts = answeredRight + answeredWronge;
  const answeredPercentage = (answeredRight / questionsCounts) * 100;
  const GameData = useSelector((state) => state.QuizReducer.QuizData);
  const specialityId = useSelector((state) => state.QuizReducer.Speciality);
  const facultyId = useSelector((state) => state.QuizReducer.Faculty);
  const emdId = useSelector((state) => state.QuizReducer.Emd);
  const levelId = useSelector((state) => state.QuizReducer.Level);
  var levels = GameData.find((x) => x._id === specialityId)
    .Faculties.find((x) => x._id === facultyId)
    .Emds.find((x) => x._id === emdId).Levels;
  const [questionsReview, setQuestionsReview] = useState(false);
  useEffect(() => {
    if (answeredPercentage > 40) {
      dispatch(addSolvedAction(levelId, token));
      if (points > 0) {
        dispatch(setCoinsValue(coins + points, token));
      }
    }
  }, [points]);
  const levelIndexFinder = () => {
    let levelIndex;
    levels.forEach((level, i) => {
      if (level._id === levelId) {
        levelIndex = i;
      }
    });
    return levelIndex + 1;
  };
  const [nextLevelIndex, setNextLevelIndex] = useState(levelIndexFinder());
  const playNext = () => {
    if (vibrateState) {
      Vibration.vibrate();
    }
    dispatch(setLevelAction(levels[nextLevelIndex]._id));
    setToggleQuizReview(true);
  };
  useEffect(() => {
    return () => {
      dispatch(setPointsAction(0));
      dispatch(setRightAnswersAction(0));
      dispatch(setWrongAnswersAction(0));
    };
  }, []);
  const handleToggleQuizReview = () => {
    setToggleQuizReview(true);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const levelsLength = levels.length;
  const handleSetQuestionReview = () => {
    setQuestionsReview(true);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const handleGoHome = () => {
    navigation.navigate("Play");
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      {questionsReview ? (
        <QuestionReview quiz={quiz} setQuestionsReview={setQuestionsReview} />
      ) : (
        <View style={{ width: "100%", flex: 1 }}>
          <View
            style={{
              width: "100%",
              height: "15%",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>Total Points </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Point}
                  style={{ width: 32, height: 32, marginRight: 10 }}
                />
                <Text style={{ fontWeight: "500", fontSize: 20 }}>
                  {points}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "30%",
              backgroundColor: answeredPercentage > 40 ? "#7be396" : "#f26363",
              marginTop: 20,
              alignSelf: "center",
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image source={ThumbsUp} style={{ width: 36, height: 36 }} />
                <Text style={{ fontSize: 18, marginLeft: 5 }}>
                  {answeredRight}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <Image source={ThumbsDown} style={{ width: 36, height: 36 }} />
                <Text style={{ fontSize: 18, marginLeft: 5 }}>
                  {answeredWronge}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: "100%",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>{answeredPercentage}%</Text>
            </View>
            <View
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 100,
                }}
              >
                <Image source={Point} style={{ width: 36, height: 36 }} />
                <Text style={{ fontSize: 18, marginLeft: 5 }}>{points}</Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 100,
                }}
              >
                <Image source={Coin} style={{ width: 36, height: 36 }} />
                <Text style={{ fontSize: 18, marginLeft: 5 }}>{coins}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "35%",
              marginTop: 20,
              alignSelf: "center",
              borderRadius: 30,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => handleToggleQuizReview()}
                android_disableSound={Sound ? false : true}
              >
                <Text style={{ fontSize: 16 }}>Play Again</Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => handleSetQuestionReview()}
                android_disableSound={Sound ? false : true}
              >
                <Text style={{ fontSize: 16 }}>Review Answers</Text>
              </Pressable>
            </View>
            {answeredPercentage > 40 && nextLevelIndex < levelsLength && (
              <Pressable
                onPress={playNext}
                android_disableSound={Sound ? false : true}
              >
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Next Level</Text>
                </View>
              </Pressable>
            )}
            <Pressable
              onPress={() => handleGoHome()}
              android_disableSound={Sound ? false : true}
            >
              <View
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>Home</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
