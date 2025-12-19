import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  Vibration,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import leftArrow from "../../../../../assets/leftArrow.png";
import rightArrow from "../../../../../assets/rightArrow.png";
import back from "../../../../../assets/back.png";
export default function ({ setQuestionsReview }) {
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  // set answers right and false when question change
  useEffect(() => {
    if (currentQuestion === quiz.length - 1) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }
  }, [currentQuestion]);
  useEffect(() => {
    if (currentQuestion === 0) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }
  }, [currentQuestion]);
  const handleSetQuestionReview = () => {
    setQuestionsReview(false);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => handleSetQuestionReview()}
          android_disableSound={Sound ? false : true}
        >
          <View style={{ width: 50, height: 50, marginLeft: 10 }}>
            <Image source={back} style={{ width: 42, height: 42 }} />
          </View>
        </Pressable>
      </View>
      <View style={{ width: "100%", height: "80%" }}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: quiz[currentQuestion].Picture }}
              style={{
                width: 200,
                height: 200,
                marginVertical: 10,
              }}
            ></Image>
          </View>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            {quiz[currentQuestion].Question}
          </Text>
          <View
            style={{
              minWidth: 300,
              minHeight: 60,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              backgroundColor: "#7be396",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {quiz[currentQuestion].RightAnswer}
            </Text>
          </View>
          {quiz[currentQuestion].FalseAnswers.map((i) => (
            <View
              key={i}
              style={{
                minWidth: 300,
                minHeight: 60,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f26363",
              }}
            >
              <Text style={{ fontSize: 16 }}>{i}</Text>
            </View>
          ))}
          <View
            style={{
              minWidth: 300,
              minHeight: 60,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              backgroundColor: "white",
            }}
          >
            <Text>Note</Text>
            <Text style={{ fontSize: 16 }}>{quiz[currentQuestion].Review}</Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: "black",
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            height: "100%",
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Pressable
            android_disableSound={Sound ? false : true}
            onPress={() => handlePrevQuestion()}
            disabled={disableLeft ? true : false}
          >
            <Image source={leftArrow} style={{ width: 42, height: 42 }} />
          </Pressable>
        </View>
        <View
          style={{
            height: "100%",
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Pressable
            onPress={() => handleNextQuestion()}
            disabled={disableRight ? true : false}
            android_disableSound={Sound ? false : true}
          >
            <Image source={rightArrow} style={{ width: 42, height: 42 }} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
