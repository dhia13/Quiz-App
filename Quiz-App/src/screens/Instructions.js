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
      <View styles={{ width: "80%", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 24, marginVertical: 10 }}>
          Quiz Game Has 2 options
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: "green" }}>
          You get 4 scores for each right answer
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: "red" }}>
          You lose 2 scores for each wrong answer
        </Text>
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          You can use Helpers
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          50/50 removes two answers(-4 coins)
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          reset timer (-2 coins)
        </Text>
      </View>
    </View>
  );
}
