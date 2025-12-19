import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
export default function ({ id, title, handlePress }) {
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}
