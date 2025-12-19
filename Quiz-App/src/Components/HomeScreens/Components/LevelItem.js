import { Text, Image, Pressable } from "react-native";
import OpenLock from "../../../../assets/openLock.png";
import ClosedLock from "../../../../assets/closedLock.png";
import { useSelector } from "react-redux";
export default function ({ id, title, handlePress, lock, solved }) {
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  return (
    <Pressable
      onPress={() => handlePress(id)}
      disabled={lock ? true : false}
      android_disableSound={Sound ? false : true}
      key={id}
      style={{
        width: "100%",
        backgroundColor: lock ? "#d9d9d9" : solved ? "#2dd259" : "white",
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
        flexDirection: "row",
      }}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <Image
        source={lock ? ClosedLock : OpenLock}
        style={{ width: 24, height: 24, marginLeft: 40 }}
      />
    </Pressable>
  );
}
