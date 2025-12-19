import PlayIcon from "../../../assets/Play.png";
import { View, Text, Vibration, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import TopIndecator from "../TopIndecator";
import PlayBg from "../../../assets/playBg.png";
export default function ({ navigation, toggleDrawer }) {
  const drawer = useSelector((state) => state.NavigationReducer.drawer);
  const SoundSettings = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const handleClick = () => {
    navigation.navigate("Specilties");
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  return (
    <View style={{ flex: 1, borderRadius: drawer ? 10 : 0 }}>
      <TopIndecator toggleDrawer={toggleDrawer} />
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={PlayBg}
          style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        />
        <Pressable
          onPress={() => handleClick()}
          android_disableSound={SoundSettings ? false : true}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6ee9ef",
              shadowOffset: 2,
              height: 90,
              width: 340,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <Image source={PlayIcon} style={{ width: 62, height: 62 }}></Image>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>Play Quiz</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
