import { View, Image, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import menu from "../../assets/menu.png";
import close from "../../assets/close.png";
export default function TopIndecator({ toggleDrawer }) {
  const drawer = useSelector((state) => state.NavigationReducer.drawer);
  const currentTab = useSelector((state) => state.NavigationReducer.currentTab);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        height: 60,
        backgroundColor: "white",
        borderTopLeftRadius: drawer ? 10 : 0,
      }}
    >
      <Pressable
        onPress={toggleDrawer}
        android_disableSound={Sound ? false : true}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 70,
          height: 70,
        }}
      >
        <Image
          source={drawer ? close : menu}
          style={{
            width: 20,
            height: 20,
            tintColor: "black",
          }}
        ></Image>
      </Pressable>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          color: "black",
        }}
      >
        {currentTab}
      </Text>
    </View>
  );
}
