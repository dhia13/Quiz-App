import {
  View,
  Text,
  Image,
  ScrollView,
  Vibration,
  Pressable,
  BackHandler,
} from "react-native";
import TopIndecator from "../Components/TopIndecator";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../env";
import { useEffect, useState } from "react";
export default function ({ drawer, toggleDrawer, currentTab }) {
  const token = useSelector((state) => state.AuthReducer.token);
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    const FillBookmarks = async () => {
      await axios
        .get(`${API_URL}quiz/getBookmarks`, { headers })
        .then((response) => {
          setBookmarks(response.data.Booked);
        });
    };
    FillBookmarks();
  }, []);
  const [singleQuiz, setSingleQuiz] = useState();
  const [singleBooked, setSingleBooked] = useState(false);
  const handleQuizPressed = (id) => {
    for (let i = 0; i < bookmarks.length; i++) {
      console.log(bookmarks[i]._id);
      console.log(id);
      if (bookmarks[i]._id === id) {
        console.log("match");
        setSingleQuiz(bookmarks[i]);
      }
    }
    setSingleBooked(true);
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  useEffect(() => {
    const backAction = () => {
      setSingleBooked(false);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);
  return (
    <View style={{ width: "100%", height: "98%" }}>
      <TopIndecator
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        currentTab={currentTab}
      />
      {singleBooked ? (
        <View style={{ width: "100%", height: "80%" }}>
          <ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: singleQuiz.Picture }}
                style={{
                  width: 200,
                  height: 200,
                  marginVertical: 10,
                }}
              ></Image>
            </View>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              {singleQuiz.Question}
            </Text>
            <View
              style={{
                minWidth: 300,
                minHeight: 60,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#7be396",
              }}
            >
              <Text style={{ fontSize: 16 }}>{singleQuiz.RightAnswer}</Text>
            </View>
            {singleQuiz.FalseAnswers.map((i) => (
              <View
                key={i}
                style={{
                  minWidth: 300,
                  minHeight: 60,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f26363",
                }}
              >
                <Text style={{ fontSize: 16 }}>{i}</Text>
              </View>
            ))}
            <View
              style={{
                minWidth: 300,
                minHeight: 60,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "white",
              }}
            >
              <Text>Note</Text>
              <Text style={{ fontSize: 16 }}>{singleQuiz.Review}</Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          {bookmarks.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20, fontSize: 24 }}>
              No Bookmarks
            </Text>
          ) : (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 20,
                height: "80%",
              }}
            >
              <ScrollView style={{ width: "100%", width: "80%" }}>
                {bookmarks.map((bookmark) => (
                  <Pressable
                    android_disableSound={Sound ? false : true}
                    onPress={() => handleQuizPressed(bookmark._id)}
                    key={bookmark._id}
                    style={{
                      width: "100%",
                      backgroundColor: "#f4fbfc",
                      marginVertical: 8,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={{ uri: bookmark.Picture }}
                        style={{
                          width: 60,
                          height: 60,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      ></Image>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                        }}
                      >
                        {bookmark.Question}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
