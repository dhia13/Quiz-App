import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  Vibration,
} from "react-native";
import SpecialityItem from "./Components/SpecialityItem";
import Bg from "../../../assets/bg.png";

import { useSelector } from "react-redux";
import x from "../../../assets/close.png";
export default function ({ navigation }) {
  const GameData = useSelector((state) => state.QuizReducer.QuizData);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const handleClick = () => {
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
          onPress={() => handleClick()}
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
        <Text style={{ fontSize: 24 }}>Specialties</Text>
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
            {GameData.map((item) => (
              <SpecialityItem
                key={item._id}
                navigation={navigation}
                img={item.Image}
                id={item._id}
                title={item.Title}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
