import React, { useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  Vibration,
  View,
} from "react-native";
// Tab ICons...
import home from "../assets/home.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import instructions from "../assets/instructions.png";
import bookmarks from "../assets/bookmark.png";
// Menu

import { useDispatch, useSelector } from "react-redux";
import {
  toggleMenuAction,
  changeCurrentScreenAction,
} from "./redux/Actions/NavigationActions";
import { logoutAction } from "./redux/Actions/AuthActions";
import ScreensGate from "./ScreensGate";
export default function App() {
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.NavigationReducer.currentTab);
  const drawer = useSelector((state) => state.NavigationReducer.drawer);
  const role = useSelector((state) => state.AuthReducer.role);
  const username = useSelector((state) => state.AuthReducer.username);
  const toggleDrawer = () => {
    dispatch(toggleMenuAction());
    Animated.timing(scaleValue, {
      toValue: drawer ? 1 : 0.88,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: drawer ? 0 : 230,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !drawer ? -30 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const setCurrentTab = (tab) => {
    dispatch(changeCurrentScreenAction(tab));
    Animated.timing(scaleValue, {
      toValue: drawer ? 1 : 0.88,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: drawer ? 0 : 230,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !drawer ? -30 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#00ccd3",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {/* drawer menu content */}
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <View style={{ height: 120 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginTop: 30,
              height: 50,
              marginLeft: 10,
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginTop: 0,
              height: 50,
              marginLeft: 10,
            }}
          >
            {role}
          </Text>
        </View>
        <View style={{ flexGrow: 1, marginTop: 10 }}>
          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Bookmarks", bookmarks)}
          {TabButton(currentTab, setCurrentTab, "Instructions", instructions)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}
        </View>
        <View>{TabButton(currentTab, setCurrentTab, "Logout", logout)}</View>
      </View>
      {/* Screens */}
      <Animated.View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: drawer ? 15 : 0,
          // Transforming View...
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            position: "absolute",
            borderRadius: 15,
            top: drawer ? 30 : 0,
            bottom: 0,
            left: 0,
            right: 0,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <ScreensGate currentTab={currentTab} toggleDrawer={toggleDrawer} />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const dispatch = useDispatch();
  return (
    <Pressable
      android_disableSound={Sound ? false : true}
      onPress={() => {
        if (title == "Logout") {
          dispatch(logoutAction());
          if (vibrateState) {
            Vibration.vibrate();
          }
        } else {
          setCurrentTab(title);
          if (vibrateState) {
            Vibration.vibrate();
          }
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? "#5359D1" : "white",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
