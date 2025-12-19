import {
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  Vibration,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setEmdAction } from "../../redux/Actions/QuizActions";
import x from "../../../assets/close.png";
import Bg from "../../../assets/bg.png";
import GameMenuItem from "./Components/GameMenuItem";
export default function ({ navigation }) {
  const dispatch = useDispatch();
  const GameData = useSelector((state) => state.QuizReducer.QuizData);
  const SpecialityId = useSelector((state) => state.QuizReducer.Speciality);
  const facultyId = useSelector((state) => state.QuizReducer.Faculty);
  var Emds = GameData.find((x) => x._id === SpecialityId).Faculties.find(
    (x) => x._id === facultyId
  ).Emds;
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const handlePress = (id) => {
    navigation.navigate("Levels");
    dispatch(setEmdAction(id));
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const handleExitPress = () => {
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
          onPress={() => handleExitPress()}
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
        <Text style={{ fontSize: 24 }}>Emds</Text>
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
            {Emds.map((item) => (
              <GameMenuItem
                key={item._id}
                id={item._id}
                title={item.Title}
                handlePress={handlePress}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
