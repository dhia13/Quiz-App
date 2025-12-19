import { View, Text } from "react-native";

import TopIndecator from "../Components/TopIndecator";
export default function ({ drawer, toggleDrawer, currentTab }) {
  return (
    <View styles={{ width: "100%" }}>
      <TopIndecator
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        currentTab={currentTab}
      />
      <Text>admin screen</Text>
    </View>
  );
}
