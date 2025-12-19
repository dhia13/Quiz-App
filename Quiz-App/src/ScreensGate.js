import { Pressable, Text, View } from "react-native";
import Home from "./screens/Home";
import Bookmarks from "./screens/Bookmarks";
import Settings from "./screens/Settings";
import Instructions from "./screens/Instructions";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import Sound from "react-native-sound";
import song1 from "../assets/music1.mp3";
import song2 from "../assets/music2.mp3";
import song3 from "../assets/music3.mp3";
import { useEffect } from "react";
Sound.setCategory("Playback");
var music1 = new Sound(song1, (error) => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
});
var music2 = new Sound(song2, (error) => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
});
var music3 = new Sound(song3, (error) => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
});
export default function ScreensGate({ toggleDrawer }) {
  const selectedMusic = useSelector(
    (state) => state.SettingsReducer.SelectedMusic
  );
  const Music = useSelector((state) => state.SettingsReducer.Music);
  const currentTab = useSelector((state) => state.NavigationReducer.currentTab);
  const drawer = useSelector((state) => state.NavigationReducer.drawer);
  useEffect(() => {
    if (Music && selectedMusic === "Less Focus") {
      music3.stop();
      music2.stop();
      music1.setNumberOfLoops(-1).play();
    } else if (Music && selectedMusic === "0 Focus") {
      music1.stop();
      music3.stop();
      music2.setNumberOfLoops(-1).play();
    } else if (Music && selectedMusic === "Focus") {
      music2.stop();
      music1.stop();
      music3.setNumberOfLoops(-1).play();
    } else {
      music1.stop();
      music2.stop();
      music3.stop();
    }
  }, [Music, selectedMusic]);
  return (
    <View style={{ flex: 1, borderRadius: drawer ? 10 : 0 }}>
      {/* screens */}
      {currentTab === "Home" && <Home toggleDrawer={toggleDrawer} />}
      {currentTab === "Bookmarks" && <Bookmarks toggleDrawer={toggleDrawer} />}
      {currentTab === "Instructions" && (
        <Instructions toggleDrawer={toggleDrawer} />
      )}
      {currentTab === "Settings" && <Settings toggleDrawer={toggleDrawer} />}
    </View>
  );
}
