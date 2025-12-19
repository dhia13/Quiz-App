import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
  Vibration,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import x from "../../../assets/close.png";
import Bg from "../../../assets/bg.png";

import { setLevelAction } from "../../redux/Actions/QuizActions";
import LevelItem from "./Components/LevelItem";
export default function ({ navigation }) {
  const solved = useSelector((state) => state.QuizReducer.Solved);
  const dispatch = useDispatch();
  const GameData = useSelector((state) => state.QuizReducer.QuizData);
  const specialityId = useSelector((state) => state.QuizReducer.Speciality);
  const facultyId = useSelector((state) => state.QuizReducer.Faculty);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const emdId = useSelector((state) => state.QuizReducer.Emd);
  var [levels, setLevels] = useState(
    GameData.find((x) => x._id === specialityId)
      .Faculties.find((x) => x._id === facultyId)
      .Emds.find((x) => x._id === emdId).Levels
  );
  const handlePress = (id) => {
    navigation.navigate("Quiz");
    dispatch(setLevelAction(id));
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const Restrict = () => {
    const newArr = [...levels];
    newArr[0].lock = false;
    if (solved.includes(newArr[0]._id)) {
      newArr[0].solved = true;
    } else {
      newArr[0].solved = false;
    }
    for (let i = 1; i < newArr.length; i++) {
      if (newArr[i - 1].solved === true) {
        newArr[i].lock = false;
      } else {
        newArr[i].lock = true;
      }
      if (solved.includes(newArr[i]._id)) {
        newArr[i].solved = true;
      } else {
        newArr[i].solved = false;
      }
    }
    setLevels[newArr];
  };
  Restrict();
  const handleGoHome = () => {
    navigation.navigate("Play");
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#6ee9ef" }}>
      <View
        style={{
          marginTop: 0,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          borderBottomWidth: 0.4,
          borderBottomColor: "black",
        }}
      >
        <Pressable
          onPress={() => handleGoHome()}
          android_disableSound={Sound ? false : true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={x} style={{ width: 16, height: 16 }}></Image>
        </Pressable>
        <Text style={{ fontSize: 24 }}>Levels</Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={Bg}
          style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        />
        <View style={{ marginTop: 20, width: "80%", marginBottom: 60 }}>
          <ScrollView>
            {levels.map((item) => (
              <LevelItem
                key={item._id}
                id={item._id}
                title={item.Title}
                handlePress={handlePress}
                lock={item.lock}
                solved={item.solved}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
