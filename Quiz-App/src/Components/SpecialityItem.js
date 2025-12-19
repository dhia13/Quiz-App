import { View, Text, Image, Pressable, Vibration } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSpecialityAction } from "../../../redux/Actions/QuizActions";
export default function ({ navigation, img, id, title }) {
  const dispatch = useDispatch();
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const handlePress = (id) => {
    navigation.navigate("Faculties");
    dispatch(setSpecialityAction(id));
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  return (
    <Pressable
      onPress={() => handlePress(id)}
      key={id}
      android_disableSound={Sound ? false : true}
      style={{
        width: "100%",
        backgroundColor: "#f4fbfc",
        marginVertical: 8,
        paddingVertical: 18,
        paddingHorizontal: 60,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: img }}
          style={{ width: 32, height: 32, marginLeft: 20 }}
        ></Image>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 30,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
