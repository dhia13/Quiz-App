import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Play from "../Components/HomeScreens/Play";
import Specilties from "../Components/HomeScreens/Specilties";
import Faculties from "../Components/HomeScreens/Faculties";
import Emd from "../Components/HomeScreens/Emd";
import Levels from "../Components/HomeScreens/Levels";
import Quiz from "../Components/HomeScreens/QuizScreen/Quiz";
import { useDispatch } from "react-redux";
import { getGameData } from "../redux/Actions/QuizActions";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function ({ toggleDrawer, currentTab, drawer }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameData());
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator options={{ headerShown: false }}>
          <Stack.Screen
            name="Play"
            options={{
              cardStyle: {
                backgroundColor: "transparent",
              },
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: "horizontal",
            }}
          >
            {(props) => (
              <Play
                {...props}
                drawer={drawer}
                toggleDrawer={toggleDrawer}
                currentTab={currentTab}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Specilties"
            component={Specilties}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Faculties"
            component={Faculties}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Emd"
            component={Emd}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Levels"
            component={Levels}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
