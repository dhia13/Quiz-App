import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  BackHandler,
  Alert,
  Pressable,
  Vibration,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCoinsValue } from "../../../../redux/Actions/AuthActions";
import Point from "../../../../../assets/Point.png";
import Coin from "../../../../../assets/Coin.png";
import cutHalf from "../../../../../assets/cutHalf.png";
import addTime from "../../../../../assets/addTime.png";
import bookmarkEmpty from "../../../../../assets/bookmarkEmpty.png";
import bookmarkFilled from "../../../../../assets/bookmarkFilled.png";
import right from "../../../../../assets/right.mp3";
import wrong from "../../../../../assets/wrong.mp3";
import Sound from "react-native-sound";
import {
  BookedAction,
  setPointsAction,
  setRightAnswersAction,
  setWrongAnswersAction,
} from "../../../../redux/Actions/QuizActions";
export default function ({ navigation, quiz, setToggleQuizReview }) {
  Sound.setCategory("Playback");
  const concatAnswers = (rightanswer, falseanswers) => {
    const unshuffledanswers = [];
    for (let i = 0; i < falseanswers.length; i++) {
      unshuffledanswers.push(falseanswers[i]);
    }
    if (!unshuffledanswers.includes(rightanswer)) {
      unshuffledanswers.push(rightanswer);
    }
    return unshuffledanswers;
  };
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AuthReducer.token);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rightanswer, setRightAnswer] = useState(
    quiz[currentQuestion].RightAnswer
  );
  const [falseanswers, setFalseAnswers] = useState(
    quiz[currentQuestion].FalseAnswers
  );
  const [displayAnswers, setDisplayAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const answeredRight = useSelector((state) => state.QuizReducer.RightAnswers);
  const answeredWronge = useSelector((state) => state.QuizReducer.WrongAnswers);
  const coins = useSelector((state) => state.AuthReducer.coins);
  const points = useSelector((state) => state.QuizReducer.Points);
  const [answers, setAnswers] = useState(
    shuffle(concatAnswers(rightanswer, falseanswers))
  );
  const [cuttedAnswers, setCuttedAnswers] = useState([]);
  const [cut, setCut] = useState(false);
  const bookmarks = useSelector((state) => state.QuizReducer.Bookmarks);
  const [booked, setBooked] = useState(false);
  const handleBook = () => {
    dispatch(BookedAction(quiz[currentQuestion]._id, token));
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  useEffect(() => {
    if (bookmarks.includes(quiz[currentQuestion]._id)) {
      setBooked(true);
    } else setBooked(false);
  }, [quiz, currentQuestion, bookmarks]);
  const [counter, setCounter] = useState(quiz[currentQuestion].Counter);
  const SoundSetting = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const [playSuccess, setPlaySuccess] = useState(false);
  // // success SOund useEffect
  useEffect(() => {
    if (playSuccess && SoundSetting) {
      var success = new Sound(right, (error) => {
        if (error) {
          return;
        }
        success.play();
      });
    }
  }, [playSuccess]);
  const [playFail, setPlayFail] = useState(false);
  // // fail SOund useEffect
  useEffect(() => {
    if (playFail && SoundSetting) {
      var fail = new Sound(wrong, (error) => {
        if (error) {
          return;
        }
        fail.play();
      });
    }
  }, [playFail]);
  useEffect(() => {
    setRightAnswer(quiz[currentQuestion].RightAnswer);
    setFalseAnswers(quiz[currentQuestion].FalseAnswers);
    setCounter(quiz[currentQuestion].Counter);
  }, [quiz, currentQuestion]);
  //shuffle and set new answers on question change
  useEffect(() => {
    setAnswers(shuffle(concatAnswers(rightanswer, falseanswers)));
  }, [rightanswer, falseanswers]);
  //answer click handler
  const answerClicked = (i) => {
    if (vibrateState) {
      Vibration.vibrate();
    }
    setDisplayAnswers(true);
    if (i === rightanswer) {
      dispatch(setRightAnswersAction(answeredRight + 1));
      dispatch(setPointsAction(points + 4));
      setPlaySuccess(true);
      setTimeout(() => {
        setDisplayAnswers(false);
        setPlaySuccess(false);
        if (currentQuestion < quiz.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setToggleQuizReview(false);
        }
      }, 1500);
    } else {
      setPlayFail(true);
      setSelectedAnswer(i);
      dispatch(setWrongAnswersAction(answeredWronge + 1));
      dispatch(setPointsAction(points - 2));
      setTimeout(() => {
        setPlayFail(false);
        setDisplayAnswers(false);
        if (currentQuestion < quiz.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          if (points > 0) {
            dispatch(setCoinsValue(+coins + +points, token));
          }
          setToggleQuizReview(false);
        }
      }, 1000);
    }
  };
  // cut two answers
  const handleCutHalf = () => {
    if (coins > 10) {
      if (vibrateState) {
        Vibration.vibrate();
      }
      setCuttedAnswers([falseanswers[0], falseanswers[1]]);
      dispatch(setCoinsValue(coins - 10, token));
      setCut(true);
    }
  };
  // back button options
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            navigation.navigate("Levels");
            dispatch(setPointsAction(0));
            dispatch(setRightAnswersAction(0));
            dispatch(setWrongAnswersAction(0));
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  //handle Counter
  useEffect(() => {
    if (counter === 0) {
      setCounter(null);
      dispatch(setWrongAnswersAction(answeredWronge + 1));
      dispatch(setPointsAction(points - 2));
      setDisplayAnswers(true);
      setTimeout(() => {
        setDisplayAnswers(false);
        if (currentQuestion < quiz.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          if (points > 0) {
            dispatch(setCoinsValue(+coins + +points, token));
          }
          setToggleQuizReview(false);
        }
      }, 1000);
    }
    // exit early when we reach 0
    if (!counter) return;
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [counter]);
  const handleAddTime = () => {
    if (coins > 10) {
      if (vibrateState) {
        Vibration.vibrate();
      }
      setCounter(counter + quiz[currentQuestion].Counter);
      dispatch(setCoinsValue(coins - 10, token));
    }
  };
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {/* counter  */}
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ marginHorizontal: 5 }}>{coins}</Text>
          <Image source={Coin} style={{ width: 24, height: 24 }} />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            width: 42,
            height: 42,
            borderColor: "blue",
            borderWidth: 2,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>{counter}</Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ marginHorizontal: 5 }}>{points}</Text>
          <Image source={Point} style={{ width: 24, height: 24 }} />
        </View>
        <View style={{ marginHorizontal: 20, position: "absolute", right: 20 }}>
          <Pressable
            onPress={() => handleBook()}
            android_disableSound={SoundSetting ? false : true}
          >
            <Image
              source={booked ? bookmarkFilled : bookmarkEmpty}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
        </View>
      </View>
      {/* question and answers */}
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
          {answers.map((i) => (
            <Pressable
              onPress={() => answerClicked(i)}
              key={i}
              android_disableSound={SoundSetting ? false : true}
            >
              <View
                style={{
                  minWidth: 300,
                  minHeight: 60,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: displayAnswers
                    ? i === rightanswer
                      ? "#7be396"
                      : i === selectedAnswer && "#f26363"
                    : cut && cuttedAnswers.includes(i)
                    ? "#bfbfbf"
                    : "white",
                }}
              >
                <Text style={{ fontSize: 16 }}>{i}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {/* bottom options */}
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          // position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          onPress={() => handleCutHalf()}
          android_disableSound={SoundSetting ? false : true}
          style={{ width: 48, height: 48 }}
        >
          <Image source={cutHalf} style={{ width: 48, height: 48 }} />
        </Pressable>
        <Pressable
          onPress={() => handleAddTime()}
          android_disableSound={SoundSetting ? false : true}
        >
          <Image source={addTime} style={{ width: 48, height: 48 }} />
        </Pressable>
      </View>
    </View>
  );
}
