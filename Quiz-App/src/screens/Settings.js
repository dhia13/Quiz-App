import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMusicAction,
  toggleMusicAction,
  toggleSoundAction,
  toggleVibrationAction,
} from "../redux/Actions/SettingsActions";
import TopIndecator from "../Components/TopIndecator";
import SelectDropdown from "react-native-select-dropdown";
export default function ({ drawer, toggleDrawer, currentTab }) {
  const SoundSettings = useSelector((state) => state.SettingsReducer.Sound);
  const dispatch = useDispatch();
  const toggleSoundSwitch = () => {
    dispatch(toggleSoundAction());
  };
  const Vibration = useSelector((state) => state.SettingsReducer.Vibration);
  const toggleVibrationSwitch = () => {
    dispatch(toggleVibrationAction());
  };
  const Music = useSelector((state) => state.SettingsReducer.Music);
  const toggleMusicSwitch = () => {
    dispatch(toggleMusicAction());
  };
  return (
    <View>
      <TopIndecator
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        currentTab={currentTab}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            width: "80%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Sound</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={SoundSettings ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSoundSwitch}
            value={SoundSettings}
          />
        </View>
        <View
          style={{
            width: "80%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Vibration</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={Vibration ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVibrationSwitch}
            value={Vibration}
          />
        </View>
        <View
          style={{
            width: "80%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Music</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={Music ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleMusicSwitch}
            value={Music}
          />
        </View>
        <View
          style={{
            width: "80%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Song</Text>
          <SelectDropdown
            data={["Focus", "Less Focus", "0 Focus"]}
            onSelect={(selectedItem, index) => {
              dispatch(changeMusicAction(selectedItem));
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
      </View>
    </View>
  );
}
